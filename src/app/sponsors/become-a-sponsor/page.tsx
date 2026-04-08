import { Metadata } from "next";
import { BecomeASponsorContent } from "./become-a-sponsor-content";

export const metadata: Metadata = {
  title: "Become a Sponsor | SJSU Spartan Racing",
  description: "Support the next generation of engineers. View our sponsorship tiers and benefits.",
};

export default function BecomeASponsorPage() {
  return <BecomeASponsorContent />;
}
