import { NextRequest, NextResponse } from "next/server";
import { createReview, loadParkData, loadReviewsPage, recordVote, toggleSave } from "@/lib/parkStore";
import type { ReviewSort } from "@/lib/types";

export const runtime = "nodejs";

const getUserId = (req: NextRequest) =>
  req.headers.get("x-user-id") ||
  req.nextUrl.searchParams.get("userId") ||
  "";

const parseSort = (value: string | null): ReviewSort =>
  value === "newest" ? "newest" : "helpful";

const parseNumberParam = (value: string | number | null | undefined, fallback: number) => {
  const numeric = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: parkId } = await params;
  const data = await loadParkData(parkId);
  if (!data) {
    return NextResponse.json({ error: "Park not found" }, { status: 404 });
  }

  const searchParams = req.nextUrl.searchParams;
  const userId = getUserId(req) || null;
  const sort = parseSort(searchParams.get("sort"));
  const page = parseNumberParam(searchParams.get("page"), 1);
  const pageSize = parseNumberParam(searchParams.get("pageSize"), 6);

  const state = await loadReviewsPage(parkId, userId, sort, page, pageSize);
  return NextResponse.json(state);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: parkId } = await params;
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
    visitDate?: string;
    sort?: ReviewSort;
    page?: number;
    pageSize?: number;
  };

  const action = payload?.action ?? "";
  const sort = parseSort((payload.sort as string | null) ?? null);
  const page = parseNumberParam(payload.page, 1);
  const pageSize = parseNumberParam(payload.pageSize, 6);

  switch (action) {
    case "addReview": {
      const text = (payload.text as string | undefined)?.trim();
      const rating = Number(payload.rating);
      const visitDate = payload.visitDate ? new Date(payload.visitDate).toISOString().slice(0, 10) : null;

      if (!text || !rating || Number.isNaN(rating) || rating < 1 || rating > 5) {
        return NextResponse.json({ error: "Review text and rating are required" }, { status: 400 });
      }

      const result = await createReview(
        parkId,
        {
          userId,
          text,
          rating,
          visitDate,
          userName: "You",
        },
        { sort, page, pageSize }
      );

      return result ? NextResponse.json(result.page) : NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    case "markHelpful": {
      const reviewId = payload.reviewId as string | undefined;
      if (!reviewId) {
        return NextResponse.json({ error: "Missing review id" }, { status: 400 });
      }

      const result = await recordVote(reviewId, userId, 1);
      if (!result) {
        return NextResponse.json({ error: "Review not found" }, { status: 404 });
      }
      if (result.duplicate) {
        return NextResponse.json({ error: "You already voted!", review: result.review }, { status: 409 });
      }

      const state = await loadReviewsPage(parkId, userId, sort, page, pageSize);
      return NextResponse.json(state);
    }

    case "toggleSave": {
      const shouldSave = Boolean(payload.save);
      const state = await toggleSave(parkId, userId, shouldSave, sort, page, pageSize);
      return state ? NextResponse.json(state) : NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    default:
      return NextResponse.json({ error: "Unsupported action" }, { status: 400 });
  }
}
