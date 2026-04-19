import { Inter, IBM_Plex_Mono, Playfair_Display, Permanent_Marker } from "next/font/google";

export const bebasNeue = Inter({
  weight: ["700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const dmSans = Inter({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const jetbrainsMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
