import { NextRequest, NextResponse } from "next/server";
import { recordVote } from "@/lib/parkStore";
import type { ReviewSort, VoteValue } from "@/lib/types";

const parseSort = (value: string | null): ReviewSort =>
  value === "newest" ? "newest" : "helpful";

const parseNumberParam = (value: string | number | null | undefined, fallback: number) => {
  const numeric = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
};

const getUserId = (req: NextRequest) =>
  req.headers.get("x-user-id") || req.nextUrl.searchParams.get("userId") || "";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const userId = getUserId(req);

  if (!userId) {
    console.warn(`Vote rejected for review ${id}: missing user id`);
    return NextResponse.json({ error: "Authentication required to vote" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as { vote?: VoteValue; sort?: ReviewSort; page?: number; pageSize?: number };
  const vote = Number(payload.vote) as VoteValue;

  if (vote !== 1 && vote !== -1) {
    console.warn(`Vote rejected for review ${id}: invalid payload`);
    return NextResponse.json({ error: "Vote must be 1 or -1" }, { status: 400 });
  }

  const result = await recordVote(id, userId, vote);
  if (!result) {
    console.warn(`Vote rejected for review ${id}: not found`);
    return NextResponse.json({ error: "Review not found" }, { status: 404 });
  }

  const responsePayload = {
    review: result.review,
    parkId: result.parkId,
  };

  if (result.duplicate) {
    console.warn(`Duplicate vote attempt on review ${id} by user ${userId}`);
    return NextResponse.json({ ...responsePayload, error: "You already voted!" }, { status: 409 });
  }

  return NextResponse.json(responsePayload, { status: 200 });
}
