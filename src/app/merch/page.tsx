import { Metadata } from "next";
import { MerchContent } from "./merch-content";
import { getMerchProducts } from "@/lib/fourthwall";

export const metadata: Metadata = {
  title: "Merch | SJSU Spartan Racing",
  description:
    "Official SJSU Spartan Racing merchandise. Rep the team with tees, hoodies, caps, and more.",
};

// Revalidate the page every 10 minutes so product updates flow through.
export const revalidate = 600;

export default async function MerchPage() {
  const products = await getMerchProducts();
  return <MerchContent products={products} />;
}
