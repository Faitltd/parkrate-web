import type { Review } from "./types";

export type ParkStateResponse = {
  reviews: Review[];
  saved: boolean;
  votedReviewIds: string[];
};

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const message = typeof data?.error === "string" ? data.error : "Unexpected response from server";
    throw new Error(message);
  }

  return data as ParkStateResponse;
};

const withUserHeaders = (userId: string) => ({
  "x-user-id": userId,
});

export const fetchParkState = async (parkId: string, userId: string) => {
  const response = await fetch(`/api/parks/${parkId}`, {
    headers: withUserHeaders(userId),
    cache: "no-store",
  });

  return handleResponse(response);
};

const postParkAction = async (
  parkId: string,
  userId: string,
  payload: Record<string, unknown>
) => {
  const response = await fetch(`/api/parks/${parkId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withUserHeaders(userId),
    },
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

export const submitReview = async (parkId: string, userId: string, text: string, rating: number) =>
  postParkAction(parkId, userId, { action: "addReview", text, rating });

export const markReviewHelpful = async (parkId: string, userId: string, reviewId: string) =>
  postParkAction(parkId, userId, { action: "markHelpful", reviewId });

export const toggleSavePark = async (parkId: string, userId: string, save: boolean) =>
  postParkAction(parkId, userId, { action: "toggleSave", save });
