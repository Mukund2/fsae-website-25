import { Metadata } from "next";
import { SponsorsContent } from "./sponsors-content";

export const metadata: Metadata = {
  title: "Sponsors | SJSU Spartan Racing",
  description: "Our sponsors make it all possible. Partner with SJSU Spartan Racing.",
};

export default function SponsorsPage() {
  return <SponsorsContent />;
}
