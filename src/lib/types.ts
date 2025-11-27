export interface Review {
  id: string;
  author: string;
  authorInitials: string;
  rating: number;
  date: string;
  text: string;
  helpful: number;
  categoryRatings?: {
    food?: number;
    rides?: number;
    parking?: number;
    cleanliness?: number;
    staff?: number;
    value?: number;
  };
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
