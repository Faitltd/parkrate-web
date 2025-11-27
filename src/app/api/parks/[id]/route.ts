import { NextResponse } from "next/server";
import { loadForUser, addReview, markHelpful, toggleSave, loadParkData } from "@/lib/parkStore";
import type { Review } from "@/lib/types";

export const runtime = "nodejs";

const getUserId = (req: Request) =>
  req.headers.get("x-user-id") ||
  new URL(req.url).searchParams.get("userId") ||
  "";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const parkId = params.id;
  const data = await loadParkData(parkId);
  if (!data) {
    return NextResponse.json({ error: "Park not found" }, { status: 404 });
  }

  const userId = getUserId(_req);
  const state = await loadForUser(parkId, userId);
  return NextResponse.json(state);
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const parkId = params.id;
  const exists = await loadParkData(parkId);
  if (!exists) return NextResponse.json({ error: "Park not found" }, { status: 404 });

  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Missing user id" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as {
    action?: string;
    text?: string;
    rating?: number;
    reviewId?: string;
    save?: boolean;
  };

  const action = payload?.action ?? "";

  switch (action) {
    case "addReview": {
      const text = (payload.text as string | undefined)?.trim();
      const rating = Number(payload.rating);

      if (!text || !rating || Number.isNaN(rating) || rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Review text and rating are required" }, { status: 400 });
      }

      const newReview: Review = {
        id: crypto.randomUUID?.() ?? `review-${Date.now()}`,
        author: "You",
        authorInitials: "Y",
        rating,
        date: "just now",
        text,
        helpful: 0,
      };

      const state = await addReview(parkId, newReview);
      return state ? NextResponse.json(state) : NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    case "markHelpful": {
      const reviewId = payload.reviewId as string | undefined;
      if (!reviewId) {
        return NextResponse.json({ error: "Missing review id" }, { status: 400 });
      }

      const state = await markHelpful(parkId, reviewId, userId);
      return state ? NextResponse.json(state) : NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    case "toggleSave": {
      const shouldSave = Boolean(payload.save);
      const state = await toggleSave(parkId, userId, shouldSave);
      return state ? NextResponse.json(state) : NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    default:
      return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }
}
