import type { AudienceType, ParkType, ThemePark } from "./types";

export type SortOption =
  | "rating-high"
  | "rating-low"
  | "reviews"
  | "food"
  | "rides"
  | "parking"
  | "cleanliness"
  | "staff"
  | "value"
  | "alphabetical";

export type ParkFilters = {
  searchTerm: string;
  audience: AudienceType | "all";
  parkType: ParkType | "all";
};

const regionMatchers: Record<string, RegExp[]> = {
  California: [/\bCA\b/],
  Florida: [/\bFL\b/],
  "East Coast": [/\bPA\b/, /\bVA\b/, /\bNY\b/, /\bMA\b/, /\bNH\b/, /\bNJ\b/, /\bNC\b/],
  Midwest: [/\bOH\b/, /\bIL\b/, /\bWI\b/, /\bMI\b/, /\bMN\b/, /\bIN\b/, /\bKY\b/],
  South: [/\bTX\b/, /\bTN\b/, /\bMO\b/],
  West: [/\bCO\b/, /\bUT\b/],
  Canada: [/Ontario/, /Quebec/, /\bBC\b/, /Alberta/],
  Mexico: [/Mexico/],
};

type RegionKey = keyof typeof regionMatchers | "Other";

const normalize = (value: string) => value.trim().toLowerCase();

const matchesSearch = (park: ThemePark, query: string) => {
  if (!query) return true;

  return (
    park.name.toLowerCase().includes(query) ||
    park.location.toLowerCase().includes(query) ||
    park.categories.some((category) => category.toLowerCase().includes(query))
  );
};

export const filterParks = (parks: ThemePark[], filters: ParkFilters) => {
  const query = normalize(filters.searchTerm);

  return parks.filter((park) => {
    const matchesAudience = filters.audience === "all" || park.audienceType === filters.audience;
    const matchesType = filters.parkType === "all" || park.parkType === filters.parkType;

    return matchesSearch(park, query) && matchesAudience && matchesType;
  });
};

export const sortParks = (parks: ThemePark[], sortBy: SortOption) => {
  const sorted = [...parks];

  sorted.sort((a, b) => {
    switch (sortBy) {
      case "rating-high":
        return b.rating - a.rating;
      case "rating-low":
        return a.rating - b.rating;
      case "reviews":
        return b.reviewCount - a.reviewCount;
      case "food":
        return b.categoryRatings.food - a.categoryRatings.food;
      case "rides":
        return b.categoryRatings.rides - a.categoryRatings.rides;
      case "parking":
        return b.categoryRatings.parking - a.categoryRatings.parking;
      case "cleanliness":
        return b.categoryRatings.cleanliness - a.categoryRatings.cleanliness;
      case "staff":
        return b.categoryRatings.staff - a.categoryRatings.staff;
      case "value":
        return b.categoryRatings.value - a.categoryRatings.value;
      case "alphabetical":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return sorted;
};

export const getFilteredAndSortedParks = (
  parks: ThemePark[],
  filters: ParkFilters,
  sortBy: SortOption
) => sortParks(filterParks(parks, filters), sortBy);

export const groupParksByRegion = (parks: ThemePark[]) => {
  const grouped: Record<RegionKey, ThemePark[]> = Object.fromEntries(
    [...Object.keys(regionMatchers), "Other"].map((region) => [region, [] as ThemePark[]])
  ) as Record<RegionKey, ThemePark[]>;

  parks.forEach((park) => {
    const region = (Object.entries(regionMatchers).find(([, patterns]) =>
      patterns.some((pattern) => pattern.test(park.location))
    )?.[0] ?? "Other") as RegionKey;

    grouped[region].push(park);
  });

  return grouped;
};

export const findParkById = (parks: ThemePark[], id: string) =>
  parks.find((park) => park.id === id);
