import { Metadata } from "next";
import { RacingContent } from "./racing-content";

export const metadata: Metadata = {
  title: "Competition | SJSU Spartan Racing",
  description: "Learn about Formula SAE, competition events, and Spartan Racing's key results.",
};

export default function RacingPage() {
  return <RacingContent />;
}
