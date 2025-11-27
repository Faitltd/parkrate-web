"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getOrCreateUserId } from "@/lib/client-id";
import {
  fetchParkState,
  markReviewHelpful,
  submitReview,
  toggleSavePark,
  type ParkStateResponse,
} from "@/lib/park-api";
import type { Review, ThemePark } from "@/lib/types";

type HelpfulMap = Record<string, boolean>;

const buildHelpfulMap = (ids: string[]): HelpfulMap =>
  ids.reduce((acc, id) => ({ ...acc, [id]: true }), {});

export const useParkInteractions = (park: ThemePark) => {
  const reviewFormRef = useRef<HTMLDivElement>(null);
  const messageTimeoutRef = useRef<number | null>(null);

  const [userId, setUserId] = useState<string | null>(null);
  const [reviews, setReviews] = useState<Review[]>(park.reviews);
  const [helpfulVotes, setHelpfulVotes] = useState<HelpfulMap>({});
  const [saved, setSaved] = useState(false);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const clearMessage = () => {
    if (messageTimeoutRef.current) {
      window.clearTimeout(messageTimeoutRef.current);
      messageTimeoutRef.current = null;
    }
  };

  const setTempMessage = useCallback((message: string) => {
    clearMessage();
    setActionMessage(message);
    messageTimeoutRef.current = window.setTimeout(() => setActionMessage(null), 3000);
  }, []);

  const applyState = useCallback((state: ParkStateResponse) => {
    setReviews(state.reviews);
    setHelpfulVotes(buildHelpfulMap(state.votedReviewIds));
    setSaved(state.saved);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const syncState = async () => {
      const uid = getOrCreateUserId();
      if (!uid) {
        setLoading(false);
        return;
      }

      setUserId(uid);
      setLoading(true);

      try {
        const state = await fetchParkState(park.id, uid);
        if (!isMounted) return;
        applyState(state);
        setSyncError(null);
      } catch (error) {
        if (!isMounted) return;
        setSyncError("Using default data (offline mode)");
        setReviews(park.reviews);
        setHelpfulVotes({});
        setSaved(false);
      } finally {
        if (!isMounted) return;
        setSelectedRating(null);
        setReviewText("");
        setLoading(false);
      }
    };

    void syncState();

    return () => {
      isMounted = false;
      clearMessage();
    };
  }, [applyState, park.id, park.reviews]);

  const requireUser = () => {
    if (!userId) {
      setTempMessage("Missing user session; reload the page.");
      return false;
    }
    return true;
  };

  const handleReviewSubmit = async () => {
    if (!reviewText.trim() || !selectedRating) {
      setTempMessage("Please add text and a star rating before posting.");
      return;
    }
    if (!requireUser()) return;

    setLoading(true);
    try {
      const state = await submitReview(park.id, userId as string, reviewText.trim(), selectedRating);
      applyState(state);
      setTempMessage("Thanks for sharing your experience!");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to post your review right now.";
      setTempMessage(message);
    } finally {
      setSelectedRating(null);
      setReviewText("");
      setLoading(false);
    }
  };

  const handleHelpful = async (reviewId: string) => {
    if (helpfulVotes[reviewId]) return;
    if (!requireUser()) return;

    try {
      const state = await markReviewHelpful(park.id, userId as string, reviewId);
      applyState(state);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to update vote. Please try again.";
      setTempMessage(message);
    }
  };

  const handleSave = async () => {
    if (!requireUser()) return;

    setLoading(true);
    try {
      const state = await toggleSavePark(park.id, userId as string, !saved);
      applyState(state);
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

  return {
    actionMessage,
    handleDirections,
    handleHelpful,
    handleReviewSubmit,
    handleSave,
    handleShare,
    helpfulVotes,
    loading,
    reviewFormRef,
    reviewText,
    reviews,
    saved,
    selectedRating,
    setReviewText,
    setSelectedRating,
    syncError,
  };
};
