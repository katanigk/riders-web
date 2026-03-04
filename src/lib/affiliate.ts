const STORAGE_KEY = "riders_affiliate_ref";

export function getAffiliateRef(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem(STORAGE_KEY);
}

export function setAffiliateRef(ref: string): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, ref);
}

export function clearAffiliateRef(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

/**
 * Reads ?ref= from current URL and stores in sessionStorage.
 * Call once on app mount (client-side).
 */
export function captureAffiliateFromUrl(): void {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const ref = params.get("ref");
  if (ref && ref.trim()) {
    setAffiliateRef(ref.trim());
  }
}
