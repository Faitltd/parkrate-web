export type VoteValue = 1 | -1;

export type ReviewSort = "helpful" | "newest";

export interface Review {
  id: string;
  author: string;
  authorInitials: string;
  rating: number;
  text: string;
  photos?: string[];
  /**
   * Legacy human readable date string (e.g. "2 days ago") kept for seed data.
   */
  date?: string;
  /**
   * ISO timestamp for when the review was created.
   */
  createdAt?: string;
  /**
   * ISO date string representing when the visitor went to the park.
   */
  visitDate?: string | null;
  /**
   * Seed helpfulness total from static content.
   */
  helpful?: number;
  /**
   * Persisted helpful vote count.
   */
  helpfulVotes?: number;
  /**
   * Persisted unhelpful vote count.
   */
  unhelpfulVotes?: number;
  /**
   * Optional owner id; filled for newly submitted reviews.
   */
  userId?: string | null;
  /**
   * Park association; inferred when missing.
   */
  parkId?: string;
}

export interface NormalizedReview {
  id: string;
  parkId: string;
  author: string;
  authorInitials: string;
  rating: number;
  text: string;
  photos: string[];
  visitDate: string | null;
  createdAt: string;
  helpfulVotes: number;
  unhelpfulVotes: number;
  netHelpful: number;
  userVote: VoteValue | null;
}

export interface ReviewPage {
  parkId: string;
  reviews: NormalizedReview[];
  total: number;
  page: number;
  pageSize: number;
  sort: ReviewSort;
  saved: boolean;
  hasMore: boolean;
}

export interface CategoryRatings {
  food: number;
  rides: number;
  parking: number;
  cleanliness: number;
  staff: number;
  value: number;
}

export type AudienceType = "Kids" | "Adults" | "Families" | "All Ages";
export type ParkType = "Water Park" | "Dry Park" | "Mixed";

export interface ThemePark {
  id: string;
  name: string;
  location: string;
  description: string;
  image: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  categories: string[];
  audienceType: AudienceType;
  parkType: ParkType;
  features: string[];
  hours: string;
  phone: string;
  website: string;
  reviews: Review[];
  categoryRatings: CategoryRatings;
}
