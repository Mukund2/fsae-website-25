import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Playfair_Display, Permanent_Marker } from "next/font/google";

// Geist Sans — Vercel's flagship font, the SF tech standard
// The variable is automatically --font-geist-sans
export const geistSans = GeistSans;
export const geistMono = GeistMono;

// Legacy aliases used by layout.tsx
export const bebasNeue = GeistSans;
export const dmSans = GeistSans;
export const jetbrainsMono = GeistMono;

export const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-script",
  display: "swap",
});
