import { NextRequest, NextResponse } from "next/server";
import { createReview, loadReviewsPage } from "@/lib/parkStore";
import type { ReviewSort } from "@/lib/types";

const parseSort = (value: string | null): ReviewSort =>
  value === "newest" ? "newest" : "helpful";

const parseNumberParam = (value: string | number | null | undefined, fallback: number) => {
  const numeric = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
};

const getUserId = (req: NextRequest) =>
  req.headers.get("x-user-id") || req.nextUrl.searchParams.get("userId") || "";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: parkId } = await params;
  const searchParams = req.nextUrl.searchParams;
  const sort = parseSort(searchParams.get("sort"));
  const page = parseNumberParam(searchParams.get("page"), 1);
  const pageSize = parseNumberParam(searchParams.get("pageSize"), 6);
  const userId = getUserId(req) || null;

  const pageData = await loadReviewsPage(parkId, userId, sort, page, pageSize);
  if (!pageData) {
    return NextResponse.json({ error: "Park not found" }, { status: 404 });
  }

  return NextResponse.json(pageData);
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: parkId } = await params;
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Authentication required to post a review" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as {
    rating?: number;
    review_text?: string;
    reviewText?: string;
    visit_date?: string;
    visitDate?: string;
    user?: string;
    userName?: string;
    sort?: ReviewSort;
    page?: number;
    pageSize?: number;
  };

  const rating = Number(payload.rating);
  const sort = parseSort((payload.sort as string | undefined) ?? req.nextUrl.searchParams.get("sort"));
  const page = parseNumberParam(payload.page, 1);
  const pageSize = parseNumberParam(payload.pageSize, 6);
  const text = (payload.review_text ?? payload.reviewText ?? "").trim();
  const userName = (payload.user ?? payload.userName ?? "").trim() || undefined;
  const visitDateRaw = (payload.visit_date ?? payload.visitDate ?? "").trim();
  const visitDate = visitDateRaw ? new Date(visitDateRaw).toISOString().slice(0, 10) : null;

  if (!text || Number.isNaN(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Review text and a rating between 1 and 5 are required" },
      { status: 400 }
    );
  }

  try {
    const result = await createReview(
      parkId,
      { userId, text, rating, visitDate, userName },
      { sort, page, pageSize }
    );

    if (!result) {
      return NextResponse.json({ error: "Park not found" }, { status: 404 });
    }

    return NextResponse.json(result.page, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to submit review right now.";
    const status = message.toLowerCase().includes("wait") ? 429 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
