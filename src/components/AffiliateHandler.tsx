"use client";

import { useEffect } from "react";
import { captureAffiliateFromUrl } from "@/lib/affiliate";

/**
 * Captures ?ref= from URL on mount and stores in sessionStorage.
 * Used when a guest arrives via a rider's affiliate link.
 */
export default function AffiliateHandler() {
  useEffect(() => {
    captureAffiliateFromUrl();
  }, []);
  return null;
}
