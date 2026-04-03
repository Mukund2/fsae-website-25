"use client";
import { useState, useEffect, useCallback } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  const handleChange = useCallback((e: MediaQueryListEvent) => {
    setMatches(e.matches);
  }, []);

  useEffect(() => {
    const media = window.matchMedia(query);
    // Use a microtask to avoid synchronous setState in effect
    queueMicrotask(() => setMatches(media.matches));
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [query, handleChange]);

  return matches;
}
