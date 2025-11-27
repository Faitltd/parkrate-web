import type { CategoryRatings, ThemePark } from "./types";

const hasValue = (value: unknown) =>
  typeof value === "string" ? value.trim().length > 0 : value !== null && value !== undefined;

const requiredCategoryRatings: Array<keyof CategoryRatings> = [
  "food",
  "rides",
  "parking",
  "cleanliness",
  "staff",
  "value",
];

export const validateThemeParks = (parks: ThemePark[]) => {
  const errors: string[] = [];

  parks.forEach((park) => {
    if (!hasValue(park.name)) errors.push(`${park.id}: missing name`);
    if (!hasValue(park.location)) errors.push(`${park.id}: missing location`);
    if (!hasValue(park.image)) errors.push(`${park.id}: missing image`);
    if (!hasValue(park.description)) errors.push(`${park.id}: missing description`);
    if (!hasValue(park.hours)) errors.push(`${park.id}: missing hours`);
    if (!hasValue(park.phone)) errors.push(`${park.id}: missing phone`);
    if (!hasValue(park.website)) errors.push(`${park.id}: missing website`);
    if (!Array.isArray(park.categories) || park.categories.length === 0) {
      errors.push(`${park.id}: missing categories`);
    }
    if (!Array.isArray(park.features) || park.features.length === 0) {
      errors.push(`${park.id}: missing features`);
    }

    requiredCategoryRatings.forEach((key) => {
      const value = park.categoryRatings?.[key];
      if (typeof value !== "number" || Number.isNaN(value)) {
        errors.push(`${park.id}: missing rating for ${key}`);
      }
    });
  });

  if (errors.length > 0) {
    const message = `Invalid park data detected:\n${errors.join("\n")}`;
    if (process.env.NODE_ENV === "production") {
      throw new Error(message);
    } else {
      console.warn(message);
    }
  }
};

