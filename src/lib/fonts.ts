import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Syne } from "next/font/google";

/**
 * Site fonts. Each export below exposes a CSS variable that Tailwind reads
 * (wired up in globals.css under `@theme inline`):
 *
 *   displayFont → --font-display      → headings, titles, CTAs   (Syne)
 *   bodyFont    → --font-geist-sans   → body text, nav, labels   (Geist Sans)
 *   monoFont    → --font-geist-mono   → rarely used              (Geist Mono)
 *
 * To change a font: swap the import and the matching object here — nothing
 * else needs to change because the rest of the site references the CSS
 * variables (e.g. `font-display`), not the font itself.
 */
export const displayFont = Syne({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const bodyFont = GeistSans;
export const monoFont = GeistMono;
