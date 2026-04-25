import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Syne } from "next/font/google";

// Display: Syne — geometric, bold, tech-forward, has real character
// Used for headings, titles, CTAs — the "exciting" font
const syne = Syne({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

// Body: Geist Sans — clean, modern, highly readable
// Used for paragraphs, nav, labels — the "professional" font
export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Legacy aliases used by layout.tsx
export const bebasNeue = syne;  // display font
export const dmSans = GeistSans;  // body font
export const jetbrainsMono = GeistMono;
