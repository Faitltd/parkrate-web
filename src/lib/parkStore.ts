import { promises as fs } from "fs";
import path from "path";
import { findParkById } from "./parks";
import { themeParks } from "./data";
import type {
  NormalizedReview,
  Review,
  ReviewPage,
  ReviewSort,
  ThemePark,
  VoteValue,
} from "./types";

type ParkState = {
  reviews: Review[];
  votes: Record<string, Record<string, VoteValue>>;
  savedBy: string[];
  reviewSubmissions: Record<string, string>;
};

type Store = {
  version: number;
  parks: Record<string, ParkState>;
};

const STORE_VERSION = 2;
const STORE_PATH = (() => {
  const custom = process.env.PARK_STATE_PATH;
  if (custom) {
    return path.isAbsolute(custom) ? custom : path.join(process.cwd(), custom);
  }
  return path.join(process.cwd(), ".data", "park-state.json");
})();
const REVIEW_COOLDOWN_MS = 30_000;
const MAX_PAGE_SIZE = 50;

const defaultState = (): Store => ({
  version: STORE_VERSION,
  parks: {},
});

const hashString = (value: string) =>
  value.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) >>> 0, 0);

const seededDate = (seed: string) => {
  const base = new Date("2024-06-01T12:00:00Z").getTime();
  const offsetDays = hashString(seed) % 180;
  return new Date(base - offsetDays * 86_400_000).toISOString();
};

const parseDateString = (value: string | undefined, seed: string) => {
  if (!value) return seededDate(seed);

  const relativeMatch = value.match(/(\d+)\s+(day|week|month|year)s?\s+ago/i);
  if (relativeMatch) {
    const amount = Number(relativeMatch[1]);
    const unit = relativeMatch[2].toLowerCase();
    const now = Date.now();
    const unitMs: Record<string, number> = {
      day: 86_400_000,
      week: 7 * 86_400_000,
      month: 30 * 86_400_000,
      year: 365 * 86_400_000,
    };
    const delta = unitMs[unit] ?? unitMs.day;
    return new Date(now - amount * delta).toISOString();
  }

  if (value.toLowerCase() === "yesterday") {
    return new Date(Date.now() - 86_400_000).toISOString();
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  return seededDate(seed);
};

const deriveInitials = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "AN";

const normalizeReviewShape = (review: Review, parkId: string): Review => {
  const author = review.author?.trim() || "Anonymous";
  const visitDate =
    typeof review.visitDate === "string" && review.visitDate.trim().length > 0
      ? review.visitDate
      : null;
  const photos = Array.isArray(review.photos)
    ? review.photos.filter((url) => typeof url === "string" && url.trim().length > 0)
    : [];

  return {
    ...review,
    parkId: review.parkId ?? parkId,
    author,
    authorInitials: review.authorInitials?.trim() || deriveInitials(author),
    text: review.text ?? "",
    createdAt: review.createdAt ?? parseDateString(review.date, review.id),
    visitDate,
    photos,
    helpfulVotes:
      typeof review.helpfulVotes === "number"
        ? review.helpfulVotes
        : typeof review.helpful === "number"
          ? review.helpful
          : 0,
    unhelpfulVotes: typeof review.unhelpfulVotes === "number" ? review.unhelpfulVotes : 0,
  };
};

const normalizeParkState = (state: Partial<ParkState> | undefined): ParkState => ({
  reviews: state?.reviews ?? [],
  votes: state?.votes ?? {},
  savedBy: state?.savedBy ?? [],
  reviewSubmissions: state?.reviewSubmissions ?? {},
});

const migrateStore = (raw: unknown): Store => {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return defaultState();

  const store = raw as Partial<Store> & { parks?: Record<string, unknown> };
  const parks = store.parks ?? {};
  const upgraded: Record<string, ParkState> = {};

  Object.entries(parks).forEach(([parkId, state]) => {
    const normalized = normalizeParkState(state as Partial<ParkState>);
    const legacyHelpful = (state as { helpfulVotes?: Record<string, string[]> })?.helpfulVotes;
    if (legacyHelpful) {
      normalized.votes = Object.fromEntries(
        Object.entries(legacyHelpful).map(([reviewId, voters]) => [
          reviewId,
          Object.fromEntries((voters ?? []).map((uid) => [uid, 1 as VoteValue])),
        ])
      );
    }

    normalized.reviews = (normalized.reviews ?? []).map((review) =>
      normalizeReviewShape(review, parkId)
    );
    upgraded[parkId] = normalized;
  });

  return {
    version: STORE_VERSION,
    parks: upgraded,
  };
};

const ensureStore = async (): Promise<Store> => {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    const parsed = JSON.parse(raw) as Store;
    return parsed.version === STORE_VERSION ? migrateStore(parsed) : migrateStore(parsed);
  } catch (error) {
    return defaultState();
  }
};

const writeStore = async (store: Store) => {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(store, null, 2), "utf8");
};

const getPark = (parkId: string): ThemePark | undefined => findParkById(themeParks, parkId);

const getParkState = (store: Store, parkId: string): ParkState => {
  const existing = store.parks[parkId];
  if (!existing) {
    store.parks[parkId] = {
      reviews: [],
      votes: {},
      savedBy: [],
      reviewSubmissions: {},
    };
    return store.parks[parkId];
  }

  const hydrated = normalizeParkState(existing);
  store.parks[parkId] = hydrated;
  return hydrated;
};

const hydrateReview = (
  review: Review,
  parkId: string,
  state: ParkState,
  userId: string | null
): NormalizedReview => {
  const normalized = normalizeReviewShape(review, parkId);
  const votes = state.votes[normalized.id] ?? {};
  const helpfulDelta = Object.values(votes).filter((vote) => vote === 1).length;
  const unhelpfulDelta = Object.values(votes).filter((vote) => vote === -1).length;
  const helpfulVotes = (normalized.helpfulVotes ?? 0) + helpfulDelta;
  const unhelpfulVotes = (normalized.unhelpfulVotes ?? 0) + unhelpfulDelta;

  return {
    id: normalized.id,
    parkId: normalized.parkId ?? parkId,
    author: normalized.author,
    authorInitials: normalized.authorInitials,
    rating: normalized.rating,
    text: normalized.text,
    photos: normalized.photos ?? [],
    visitDate: normalized.visitDate ?? null,
    createdAt: normalized.createdAt ?? new Date().toISOString(),
    helpfulVotes,
    unhelpfulVotes,
    netHelpful: helpfulVotes - unhelpfulVotes,
    userVote: userId ? votes[userId] ?? null : null,
  };
};

const hydrateReviews = (park: ThemePark, state: ParkState, userId: string | null) =>
  [...park.reviews, ...state.reviews].map((review) =>
    hydrateReview(review, park.id, state, userId)
  );

const sortReviews = (reviews: NormalizedReview[], sort: ReviewSort) => {
  const sorted = [...reviews];
  sorted.sort((a, b) => {
    if (sort === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime() || b.netHelpful - a.netHelpful;
    }

    const helpfulDiff = b.netHelpful - a.netHelpful;
    if (helpfulDiff !== 0) return helpfulDiff;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return sorted;
};

const clampPage = (page: number) => (Number.isFinite(page) && page > 0 ? Math.floor(page) : 1);
const clampPageSize = (size: number) => {
  const safe = Number.isFinite(size) && size > 0 ? Math.floor(size) : 10;
  return Math.min(safe, MAX_PAGE_SIZE);
};

const buildReviewPage = (
  park: ThemePark,
  state: ParkState,
  userId: string | null,
  sort: ReviewSort,
  page: number,
  pageSize: number
): ReviewPage => {
  const currentPage = clampPage(page);
  const currentPageSize = clampPageSize(pageSize);
  const sorted = sortReviews(hydrateReviews(park, state, userId), sort);

  const start = (currentPage - 1) * currentPageSize;
  const end = start + currentPageSize;

  return {
    parkId: park.id,
    reviews: sorted.slice(start, end),
    total: sorted.length,
    page: currentPage,
    pageSize: currentPageSize,
    sort,
    saved: userId ? state.savedBy.includes(userId) : false,
    hasMore: end < sorted.length,
  };
};

const findReviewContext = async (reviewId: string) => {
  const store = await ensureStore();

  for (const park of themeParks) {
    const state = getParkState(store, park.id);
    const persisted = state.reviews.find((review) => review.id === reviewId);
    if (persisted) {
      return { park, state, store, review: persisted };
    }

    const baseReview = park.reviews.find((review) => review.id === reviewId);
    if (baseReview) {
      return { park, state, store, review: baseReview };
    }
  }

  return null;
};

export const loadParkData = async (parkId: string) => {
  const park = getPark(parkId);
  if (!park) return null;

  const store = await ensureStore();
  const state = getParkState(store, parkId);
  return { park, state, store };
};

export const loadReviewsPage = async (
  parkId: string,
  userId: string | null,
  sort: ReviewSort,
  page: number,
  pageSize: number
): Promise<ReviewPage | null> => {
  const data = await loadParkData(parkId);
  if (!data) return null;

  const { park, state } = data;
  return buildReviewPage(park, state, userId, sort, page, pageSize);
};

export const createReview = async (
  parkId: string,
  input: {
    userId: string | null;
    text: string;
    rating: number;
    visitDate?: string | null;
    userName?: string | null;
    photos?: string[];
  },
  options: { sort?: ReviewSort; page?: number; pageSize?: number } = {}
) => {
  const data = await loadParkData(parkId);
  if (!data) return null;

  const { park, state, store } = data;
  const { sort = "helpful", page = 1, pageSize = 6 } = options;

  if (input.userId) {
    const last = state.reviewSubmissions[input.userId];
    if (last && Date.now() - new Date(last).getTime() < REVIEW_COOLDOWN_MS) {
      throw new Error("Please wait a moment before posting another review.");
    }
    state.reviewSubmissions[input.userId] = new Date().toISOString();
  }

  const author = input.userName?.trim() || "Anonymous";
  const newReview: Review = {
    id: crypto.randomUUID?.() ?? `review-${Date.now()}`,
    parkId,
    userId: input.userId,
    author,
    authorInitials: deriveInitials(author),
    rating: input.rating,
    text: input.text,
    visitDate: input.visitDate ?? null,
    createdAt: new Date().toISOString(),
    helpfulVotes: 0,
    unhelpfulVotes: 0,
    photos: Array.isArray(input.photos)
      ? input.photos.filter((photo) => typeof photo === "string" && photo.trim().length > 0)
      : [],
  };

  state.reviews = [newReview, ...state.reviews];
  await writeStore(store);

  return {
    review: hydrateReview(newReview, park.id, state, input.userId),
    page: buildReviewPage(park, state, input.userId, sort, page, pageSize),
  };
};

export const recordVote = async (reviewId: string, userId: string, vote: VoteValue) => {
  const context = await findReviewContext(reviewId);
  if (!context) return null;

  const { park, state, store, review } = context;
  const votes = state.votes[reviewId] ?? {};
  const alreadyVoted = votes[userId];

  if (alreadyVoted !== undefined) {
    return {
      parkId: park.id,
      duplicate: true,
      review: hydrateReview(review, park.id, state, userId),
    };
  }

  state.votes[reviewId] = { ...votes, [userId]: vote };
  await writeStore(store);

  return {
    parkId: park.id,
    duplicate: false,
    review: hydrateReview(review, park.id, state, userId),
  };
};

export const toggleSave = async (
  parkId: string,
  userId: string,
  save: boolean,
  sort: ReviewSort,
  page: number,
  pageSize: number
) => {
  const data = await loadParkData(parkId);
  if (!data) return null;
  const { park, state, store } = data;

  const savedSet = new Set(state.savedBy);
  if (save) savedSet.add(userId);
  else savedSet.delete(userId);
  state.savedBy = Array.from(savedSet);
  await writeStore(store);

  return buildReviewPage(park, state, userId, sort, page, pageSize);
};

export const loadForUser = async (
  parkId: string,
  userId: string | null,
  sort: ReviewSort,
  page: number,
  pageSize: number
) => loadReviewsPage(parkId, userId, sort, page, pageSize);
