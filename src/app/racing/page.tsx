import { Metadata } from "next";
import { RacingContent } from "./racing-content";

export const metadata: Metadata = {
  title: "Racing | SJSU Spartan Racing",
  description: "Competition results and achievements from SJSU Spartan Racing.",
};

export default function RacingPage() {
  return <RacingContent />;
}
