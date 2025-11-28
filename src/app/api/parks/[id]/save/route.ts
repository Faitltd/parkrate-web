import { NextRequest, NextResponse } from "next/server";
import { toggleSave } from "@/lib/parkStore";
import type { ReviewSort } from "@/lib/types";

const parseSort = (value: string | null): ReviewSort =>
  value === "newest" ? "newest" : "helpful";

const parseNumberParam = (value: string | number | null | undefined, fallback: number) => {
  const numeric = typeof value === "string" ? Number(value) : typeof value === "number" ? value : NaN;
  return Number.isFinite(numeric) && numeric > 0 ? Math.floor(numeric) : fallback;
};

const getUserId = (req: NextRequest) =>
  req.headers.get("x-user-id") || req.nextUrl.searchParams.get("userId") || "";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id: parkId } = await params;
  const userId = getUserId(req);
  if (!userId) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const payload = body as {
    save?: boolean;
    sort?: ReviewSort;
    page?: number;
    pageSize?: number;
  };

  const save = Boolean(payload.save);
  const sort = parseSort((payload.sort as string | undefined) ?? req.nextUrl.searchParams.get("sort"));
  const page = parseNumberParam(payload.page, 1);
  const pageSize = parseNumberParam(payload.pageSize, 6);

  const result = await toggleSave(parkId, userId, save, sort, page, pageSize);
  if (!result) {
    return NextResponse.json({ error: "Park not found" }, { status: 404 });
  }

  return NextResponse.json(result);
}
