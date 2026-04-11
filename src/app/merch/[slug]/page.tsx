import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMerchProductBySlug, getMerchProducts } from "@/lib/fourthwall";
import { ProductDetail } from "./product-detail";

export const revalidate = 600;

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const product = await getMerchProductBySlug(slug);
  if (!product) return { title: "Merch" };

  return {
    title: `${product.name} | Merch`,
    description:
      product.descriptionText || `${product.name} — SJSU Spartan Racing`,
    openGraph: {
      title: product.name,
      description: product.descriptionText,
      images: product.image ? [product.image] : undefined,
    },
  };
}

export async function generateStaticParams() {
  const products = await getMerchProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function MerchProductPage({ params }: Params) {
  const { slug } = await params;
  const product = await getMerchProductBySlug(slug);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}
