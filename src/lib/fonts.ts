import { Chakra_Petch, Space_Grotesk, JetBrains_Mono } from "next/font/google";

export const bebasNeue = Chakra_Petch({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const dmSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});
