import type { NormalizedReview, ReviewPage, ReviewSort } from "./types";

export type ParkStateResponse = ReviewPage;

const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    const message = typeof data?.error === "string" ? data.error : "Unexpected response from server";
    throw new Error(message);
  }

  return data as ParkStateResponse;
};

const withUserHeaders = (userId?: string | null): HeadersInit | undefined =>
  userId
    ? {
        "x-user-id": userId,
      }
    : undefined;

export const fetchParkReviews = async (
  parkId: string,
  userId: string | null,
  options: { sort?: ReviewSort; page?: number; pageSize?: number } = {}
) => {
  const { sort = "helpful", page = 1, pageSize = 6 } = options;
  const params = new URLSearchParams({
    sort,
    page: String(page),
    pageSize: String(pageSize),
  });

  const response = await fetch(`/api/parks/${parkId}/reviews?${params.toString()}`, {
    headers: withUserHeaders(userId),
    cache: "no-store",
  });

  return handleResponse(response);
};

export const submitReview = async (
  parkId: string,
  userId: string,
  text: string,
  rating: number,
  visitDate: string | null,
  options: { sort?: ReviewSort; page?: number; pageSize?: number } = {}
) => {
  const response = await fetch(`/api/parks/${parkId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withUserHeaders(userId),
    },
    body: JSON.stringify({
      rating,
      review_text: text,
      visit_date: visitDate,
      ...options,
    }),
  });

  return handleResponse(response);
};

export const voteOnReview = async (reviewId: string, userId: string, vote: 1 | -1) => {
  const response = await fetch(`/api/reviews/${reviewId}/vote`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withUserHeaders(userId),
    },
    body: JSON.stringify({ vote }),
  });

  const data = await response.json();
  if (!response.ok) {
    const message = typeof data?.error === "string" ? data.error : "Unexpected response from server";
    throw new Error(message);
  }

  return data.review as NormalizedReview;
};

export const toggleSavePark = async (
  parkId: string,
  userId: string,
  save: boolean,
  options: { sort?: ReviewSort; page?: number; pageSize?: number } = {}
) => {
  const response = await fetch(`/api/parks/${parkId}/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...withUserHeaders(userId),
    },
    body: JSON.stringify({ save, ...options }),
  });

  return handleResponse(response);
};
