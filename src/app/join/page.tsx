import { Metadata } from "next";
import { JoinContent } from "./join-content";

export const metadata: Metadata = {
  title: "Join | SJSU Spartan Racing",
  description: "Join SJSU Spartan Racing. No experience required, just passion and dedication.",
};

export default function JoinPage() {
  return <JoinContent />;
}
