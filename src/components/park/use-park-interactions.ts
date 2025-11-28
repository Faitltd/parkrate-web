"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getOrCreateUserId } from "@/lib/client-id";
import { fetchParkReviews, submitReview, toggleSavePark, voteOnReview } from "@/lib/park-api";
import type { NormalizedReview, ReviewSort, ThemePark, VoteValue } from "@/lib/types";

const PAGE_SIZE = 6;

const sortLocally = (reviews: NormalizedReview[], sort: ReviewSort) => {
  const sorted = [...reviews];
  sorted.sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() || b.netHelpful - a.netHelpful;
    }
    const diff = b.netHelpful - a.netHelpful;
    if (diff !== 0) return diff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return sorted;
};

const logInteraction = (event: string, payload: Record<string, unknown>) => {
  if (typeof window === "undefined") return;
  // Lightweight analytics hook for future integration
  console.info(`[analytics] ${event}`, payload);
};

const buildVotesMap = (reviews: NormalizedReview[]) =>
  reviews.reduce<Record<string, VoteValue>>((acc, review) => {
    if (review.userVote) acc[review.id] = review.userVote;
    return acc;
  }, {});

const buildOfflineReviews = (park: ThemePark): NormalizedReview[] =>
  park.reviews.map((review, index) => {
    const helpful = review.helpfulVotes ?? review.helpful ?? 0;
    const unhelpful = review.unhelpfulVotes ?? 0;
    const createdAt =
      review.createdAt ??
      new Date(Date.now() - index * 86_400_000).toISOString();

    return {
      id: review.id,
      parkId: park.id,
      author: review.author,
      authorInitials: review.authorInitials,
      rating: review.rating,
      text: review.text,
      visitDate: review.visitDate ?? null,
      createdAt,
      helpfulVotes: helpful,
      unhelpfulVotes: unhelpful,
      netHelpful: helpful - unhelpful,
      userVote: null,
    };
  });

export const useParkInteractions = (park: ThemePark) => {
  const reviewFormRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<NormalizedReview[]>(() =>
    sortLocally(buildOfflineReviews(park), "helpful")
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [total, setTotal] = useState<number>(Math.max(park.reviewCount ?? park.reviews.length, park.reviews.length));
  const [hasMore, setHasMore] = useState(false);
  const [saved, setSaved] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [visitDate, setVisitDate] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [sort, setSort] = useState<ReviewSort>("helpful");
  const [userVotes, setUserVotes] = useState<Record<string, VoteValue>>({});

  const clearMessage = () => {
    if (messageTimeoutRef.current) {
      window.clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  };

  const setTempMessage = useCallback((message: string) => {
    clearMessage();
    setActionMessage(message);
    messageTimeoutRef.current = window.setTimeout(() => setActionMessage(null), 3500);
  }, []);

  const applyPage = useCallback(
    (pageData: { reviews: NormalizedReview[]; saved: boolean; total: number; page: number; pageSize: number; hasMore: boolean; sort: ReviewSort }, reset = false) => {
      setSaved(pageData.saved);
      setTotal(pageData.total);
      setPage(pageData.page);
      setPageSize(pageData.pageSize);
      setHasMore(pageData.hasMore);
      setUserVotes((prev) => ({ ...prev, ...buildVotesMap(pageData.reviews) }));

      setReviews((current) => {
        const base = reset ? [] : [...current];
        const merged = new Map<string, NormalizedReview>();
        base.forEach((review) => merged.set(review.id, review));
        pageData.reviews.forEach((review) => merged.set(review.id, review));
        return sortLocally(Array.from(merged.values()), pageData.sort);
      });
    },
    []
  );

  const fetchPage = useCallback(
    async (targetPage: number, reset = false, nextSort: ReviewSort = sort) => {
      if (!userId) return;

      const isLoadMore = targetPage > 1;
      if (isLoadMore) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      try {
        const state = await fetchParkReviews(park.id, userId, {
          sort: nextSort,
          page: targetPage,
          pageSize,
        });
        applyPage(state, reset || targetPage === 1);
        setSyncError(null);
      } catch (error) {
        setSyncError("Using offline review data");
        setHasMore(false);
        setPage(1);
        setPageSize(PAGE_SIZE);
        setReviews(buildOfflineReviews(park));
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    },
    [applyPage, pageSize, park, sort, userId]
  );

  useEffect(() => {
    const uid = getOrCreateUserId();
    setUserId(uid);
  }, []);

  useEffect(() => {
    if (!userId) return;
    void fetchPage(1, true, sort);

    return () => {
      clearMessage();
    };
  }, [fetchPage, sort, userId]);

  const requireUser = () => {
    if (!userId) {
      setTempMessage("Missing user session; reload the page.");
      return false;
    }
    return true;
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || !selectedRating) {
      setTempMessage("Add your story and a star rating before posting.");
      return;
    }
    if (!requireUser()) return;

    setLoading(true);
    try {
      const visit = visitDate ? new Date(visitDate).toISOString().slice(0, 10) : null;
      const state = await submitReview(
        park.id,
        userId as string,
        reviewText.trim(),
        selectedRating,
        visit,
        { sort, page: 1, pageSize }
      );
      applyPage(state, true);
      logInteraction("review_submit", {
        parkId: park.id,
        rating: selectedRating,
        visitDate: Boolean(visit),
      });
      setTempMessage("Thanks for sharing your experience!");
      setSyncError(null);
      setSelectedRating(null);
      setVisitDate("");
      setReviewText("");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to post your review right now.";
      setTempMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (reviewId: string, vote: VoteValue) => {
    if (userVotes[reviewId]) {
      setTempMessage("You already voted!");
      return;
    }
    if (!requireUser()) return;

    const previous = reviews;
    setUserVotes((prev) => ({ ...prev, [reviewId]: vote }));

    const optimistic = reviews.map((review) =>
      review.id === reviewId
        ? {
            ...review,
            helpfulVotes: review.helpfulVotes + (vote === 1 ? 1 : 0),
            unhelpfulVotes: review.unhelpfulVotes + (vote === -1 ? 1 : 0),
            netHelpful: review.netHelpful + (vote === 1 ? 1 : -1),
            userVote: vote,
          }
        : review
    );
    setReviews(sortLocally(optimistic, sort));

    try {
      const updated = await voteOnReview(reviewId, userId as string, vote);
      setReviews((current) =>
        sortLocally(
          current.map((review) =>
            review.id === reviewId
              ? {
                  ...review,
                  ...updated,
                  netHelpful: updated.helpfulVotes - updated.unhelpfulVotes,
                }
              : review
          ),
          sort
        )
      );
      logInteraction("review_vote", { reviewId, parkId: updated.parkId, vote });
    } catch (error) {
      setReviews(previous);
      setUserVotes((prev) => {
        const next = { ...prev };
        delete next[reviewId];
        return next;
      });
      const message =
        error instanceof Error ? error.message : "Unable to update vote. Please try again.";
      setTempMessage(message);
    }
  };

  const handleSave = async () => {
    if (!requireUser()) return;

    setLoading(true);
    try {
      const state = await toggleSavePark(park.id, userId as string, !saved, {
        sort,
        page,
        pageSize,
      });
      applyPage(state, false);
      setTempMessage(!saved ? "Saved for later" : "Removed from saved");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update saved parks right now.";
      setTempMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDirections = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${park.name} ${park.location}`)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setTempMessage("Opening directions...");
  };

  const handleShare = async () => {
    const shareData = {
      title: park.name,
      text: `Check out ${park.name} on ParkRate`,
      url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setTempMessage("Shared!");
      } else if (navigator.clipboard && shareData.url) {
        await navigator.clipboard.writeText(shareData.url);
        setTempMessage("Link copied to clipboard");
      } else {
        setTempMessage("Share not supported in this browser");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Share cancelled";
      setTempMessage(message);
    }
  };

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    await fetchPage(page + 1, false, sort);
  }, [fetchPage, hasMore, loadingMore, page, sort]);

  const changeSort = (nextSort: ReviewSort) => {
    if (nextSort === sort) return;
    setSort(nextSort);
  };

  const totalPages = useMemo(() => Math.ceil(total / pageSize), [pageSize, total]);

  return {
    actionMessage,
    changeSort,
    handleDirections,
    handleReviewSubmit,
    handleSave,
    handleShare,
    handleVote,
    hasMore,
    loading,
    loadingMore,
    loadMore,
    page,
    pageSize,
    reviewFormRef,
    reviewText,
    reviews,
    saved,
    selectedRating,
    setReviewText,
    setSelectedRating,
    setVisitDate,
    sort,
    syncError,
    total,
    totalPages,
    userVotes,
    visitDate,
  };
};
