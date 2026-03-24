import { Metadata } from "next";
import { FAQContent } from "./faq-content";

export const metadata: Metadata = {
  title: "FAQ | SJSU Spartan Racing",
  description: "Frequently asked questions about SJSU Spartan Racing.",
};

export default function FAQPage() {
  return <FAQContent />;
}
