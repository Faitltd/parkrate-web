import { promises as fs } from "fs";
import path from "path";
import type { Review, ThemePark } from "./types";
import { findParkById } from "./parks";
import { themeParks } from "./data";

type ParkState = {
  reviews: Review[];
  helpfulVotes: Record<string, string[]>; // reviewId -> userIds
  savedBy: string[]; // userIds
};

type Store = {
  parks: Record<string, ParkState>;
};

const STORE_PATH = path.join(process.cwd(), ".data", "park-state.json");

const defaultState = (): Store => ({ parks: {} });

const ensureStore = async (): Promise<Store> => {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  try {
    const raw = await fs.readFile(STORE_PATH, "utf8");
    return JSON.parse(raw) as Store;
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
  if (!store.parks[parkId]) {
    store.parks[parkId] = { reviews: [], helpfulVotes: {}, savedBy: [] };
  }
  return store.parks[parkId];
};

const buildReviews = (parkId: string, base: ThemePark, state: ParkState) => {
  return [...base.reviews, ...state.reviews].map((review) => ({
    ...review,
    helpful: review.helpful + (state.helpfulVotes[review.id]?.length ?? 0),
  }));
};

export const loadParkData = async (parkId: string) => {
  const park = getPark(parkId);
  if (!park) return null;

  const store = await ensureStore();
  const state = getParkState(store, parkId);
  return { park, store, state };
};

export const buildResponse = (parkId: string, userId: string | null, park: ThemePark, state: ParkState) => {
  const reviews = buildReviews(parkId, park, state);
  const votedReviewIds = userId
    ? Object.entries(state.helpfulVotes)
        .filter(([, voters]) => voters.includes(userId))
        .map(([reviewId]) => reviewId)
    : [];

  return {
    reviews,
    saved: userId ? state.savedBy.includes(userId) : false,
    votedReviewIds,
  };
};

export const addReview = async (parkId: string, review: Review) => {
  const data = await loadParkData(parkId);
  if (!data) return null;
  const { park, store, state } = data;

  state.reviews = [review, ...state.reviews];
  await writeStore(store);
  return buildResponse(parkId, null, park, state);
};

export const markHelpful = async (parkId: string, reviewId: string, userId: string) => {
  const data = await loadParkData(parkId);
  if (!data) return null;
  const { park, store, state } = data;

  const voters = state.helpfulVotes[reviewId] ?? [];
  if (!voters.includes(userId)) {
    state.helpfulVotes[reviewId] = [...voters, userId];
    await writeStore(store);
  }

  return buildResponse(parkId, userId, park, state);
};

export const toggleSave = async (parkId: string, userId: string, save: boolean) => {
  const data = await loadParkData(parkId);
  if (!data) return null;
  const { park, store, state } = data;

  const set = new Set(state.savedBy);
  if (save) set.add(userId);
  else set.delete(userId);
  state.savedBy = Array.from(set);
  await writeStore(store);

  return buildResponse(parkId, userId, park, state);
};

export const loadForUser = async (parkId: string, userId: string | null) => {
  const data = await loadParkData(parkId);
  if (!data) return null;
  const { park, state } = data;
  return buildResponse(parkId, userId, park, state);
};
