import { promises as fs } from "fs";
import os from "os";
import path from "path";
import { describe, expect, it, beforeEach, afterEach, vi } from "vitest";

const reloadStore = async () => {
  vi.resetModules();
  return import("@/lib/parkStore");
};

describe("parkStore review logic", () => {
  let tempDir: string;

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "parkrate-store-"));
    process.env.PARK_STATE_PATH = path.join(tempDir, "park-state.json");
  });

  afterEach(async () => {
    await fs.rm(tempDir, { recursive: true, force: true });
    delete process.env.PARK_STATE_PATH;
    vi.resetModules();
  });

  it("sorts reviews by helpfulness then recency", async () => {
    const { loadReviewsPage } = await reloadStore();
    const page = await loadReviewsPage("disneyland", "tester", "helpful", 1, 5);
    expect(page).not.toBeNull();
    const reviews = page!.reviews;
    for (let index = 1; index < reviews.length; index += 1) {
      const prev = reviews[index - 1];
      const current = reviews[index];
      expect(prev.netHelpful).toBeGreaterThanOrEqual(current.netHelpful);
    }
  });

  it("prevents duplicate votes for the same user and review", async () => {
    const { recordVote, loadReviewsPage } = await reloadStore();
    const page = await loadReviewsPage("disneyland", "tester", "helpful", 1, 3);
    const targetReview = page!.reviews[0];

    const first = await recordVote(targetReview.id, "user-1", 1);
    expect(first?.duplicate).toBe(false);

    const second = await recordVote(targetReview.id, "user-1", 1);
    expect(second?.duplicate).toBe(true);
    expect(second?.review.helpfulVotes).toBe(first?.review.helpfulVotes);
  });

  it("adds new reviews and returns newest-first ordering", async () => {
    const { createReview } = await reloadStore();
    const result = await createReview(
      "disneyland",
      { userId: "user-2", text: "Fresh review from tests", rating: 5, visitDate: "2024-08-01" },
      { sort: "newest", page: 1, pageSize: 4 }
    );

    expect(result).not.toBeNull();
    expect(result!.page.reviews[0].text).toBe("Fresh review from tests");
    expect(result!.page.reviews[0].userVote).toBeNull();
  });

  it("paginates review requests", async () => {
    const { loadReviewsPage } = await reloadStore();
    const firstPage = await loadReviewsPage("disneyland", "reader", "helpful", 1, 2);
    const secondPage = await loadReviewsPage("disneyland", "reader", "helpful", 2, 2);

    expect(firstPage?.hasMore).toBe(true);
    expect(firstPage?.reviews[0].id).not.toBe(secondPage?.reviews[0].id);
  });
});
