const STORAGE_KEY = "parkrate-user-id";

/**
 * Returns a stable user id for client-only features, creating one when absent.
 */
export const getOrCreateUserId = () => {
  if (typeof window === "undefined") return null;

  const existing = window.localStorage.getItem(STORAGE_KEY);
  if (existing) return existing;

  const generated = crypto.randomUUID ? crypto.randomUUID() : `user-${Date.now()}`;
  window.localStorage.setItem(STORAGE_KEY, generated);
  return generated;
};
