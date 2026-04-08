import { Metadata } from "next";
import { MerchContent } from "./merch-content";

export const metadata: Metadata = {
  title: "Merch | SJSU Spartan Racing",
  description:
    "Official SJSU Spartan Racing merchandise. Rep the team with tees, hoodies, caps, and more.",
};

export default function MerchPage() {
  return <MerchContent />;
}
