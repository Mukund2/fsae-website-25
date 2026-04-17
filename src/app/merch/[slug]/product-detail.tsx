"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { MerchProduct, MerchVariant } from "@/lib/fourthwall";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";

function formatPrice(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${value.toFixed(2)}`;
  }
}

/**
 * Find a variant by the currently selected size/color. Returns the first
 * available match, falling back to the single variant when the product has
 * only one.
 */
function findVariant(
  variants: MerchVariant[],
  size: string | null,
  color: string | null
): MerchVariant | null {
  if (variants.length === 1) return variants[0];
  return (
    variants.find((v) => {
      const sizeMatch = !size || v.size === size;
      const colorMatch = !color || v.color?.name === color;
      return sizeMatch && colorMatch;
    }) ?? null
  );
}

export function ProductDetail({ product }: { product: MerchProduct }) {
  const { addItem, loading } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(
    product.sizes[0] ?? null
  );
  const [selectedColor, setSelectedColor] = useState<string | null>(
    product.colors[0]?.name ?? null
  );
  const [activeImage, setActiveImage] = useState(0);

  const selectedVariant = useMemo(
    () => findVariant(product.variants, selectedSize, selectedColor),
    [product.variants, selectedSize, selectedColor]
  );

  const price = selectedVariant?.price ?? product.price;
  const compareAt = selectedVariant?.compareAtPrice ?? product.compareAtPrice;
  const currency = selectedVariant?.currency ?? product.currency;
  const inStock = selectedVariant?.inStock ?? false;

  const canAdd = !!selectedVariant && inStock && !loading;

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addItem(selectedVariant.id, 1);
  };

  const gallery = product.images.length > 0 ? product.images : [];

  return (
    <div className="bg-background">
      {/* Back link */}
      <div className="mx-auto max-w-7xl px-6 pt-32">
        <Link
          href="/merch"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
        >
          <ChevronLeft size={14} />
          Back to Merch
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 md:py-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image gallery */}
          <div>
            <div className="relative aspect-square overflow-hidden border border-border bg-surface">
              {gallery[activeImage] ? (
                <Image
                  src={gallery[activeImage]}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-mono text-xs uppercase tracking-[0.2em] text-foreground/20">
                  No Image
                </div>
              )}
              {!product.available && (
                <div className="absolute right-4 top-4 bg-background/90 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/60">
                  Sold Out
                </div>
              )}
            </div>

            {gallery.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto">
                {gallery.map((img, i) => (
                  <button
                    key={img}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`View image ${i + 1}`}
                    className={cn(
                      "relative h-20 w-20 flex-shrink-0 overflow-hidden border bg-surface",
                      activeImage === i ? "border-gold" : "border-border"
                    )}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <h1 className="font-display text-4xl uppercase tracking-tight md:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-baseline gap-3">
              <span className="font-display text-3xl text-gold">
                {formatPrice(price, currency)}
              </span>
              {compareAt && compareAt > price && (
                <span className="font-mono text-base text-foreground/30 line-through">
                  {formatPrice(compareAt, currency)}
                </span>
              )}
            </div>

            {product.description && (
              <div
                className="prose-merch mt-6 text-base leading-relaxed text-muted"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            )}

            {/* Color selector */}
            {product.colors.length > 1 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  Color
                  {selectedColor && (
                    <span className="ml-2 text-foreground/80">
                      / {selectedColor}
                    </span>
                  )}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      aria-label={c.name}
                      title={c.name}
                      className={cn(
                        "h-10 w-10 border-2",
                        selectedColor === c.name
                          ? "border-gold"
                          : "border-border hover:border-foreground/30"
                      )}
                      style={
                        c.swatch ? { backgroundColor: c.swatch } : undefined
                      }
                    >
                      {!c.swatch && (
                        <span className="font-mono text-[10px]">
                          {c.name.slice(0, 2)}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size selector */}
            {product.sizes.length > 0 && (
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-foreground/40">
                  Size
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.sizes.map((size) => {
                    const variantForSize = product.variants.find(
                      (v) =>
                        v.size === size &&
                        (!selectedColor || v.color?.name === selectedColor)
                    );
                    const disabled = !variantForSize?.inStock;
                    return (
                      <button
                        key={size}
                        type="button"
                        disabled={disabled}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "min-w-[3rem] border px-4 py-2 font-mono text-xs uppercase tracking-[0.15em]",
                          selectedSize === size
                            ? "border-gold bg-gold text-white"
                            : "border-border text-foreground/60 hover:border-foreground/30",
                          disabled && "cursor-not-allowed line-through opacity-40"
                        )}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Add to cart */}
            <div className="mt-10">
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!canAdd}
                className={cn(
                  "flex w-full items-center justify-center gap-2 bg-gold px-8 py-5 font-display text-lg uppercase tracking-wider text-background",
                  canAdd ? "hover:bg-gold/90" : "opacity-50 cursor-not-allowed"
                )}
              >
                {loading
                  ? "Adding…"
                  : !selectedVariant
                    ? "Select options"
                    : !inStock
                      ? "Sold out"
                      : "Add to cart"}
              </button>
              {selectedVariant?.stockCount !== null &&
                selectedVariant?.stockCount !== undefined &&
                selectedVariant.stockCount <= 10 &&
                selectedVariant.stockCount > 0 && (
                  <p className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-gold">
                    Only {selectedVariant.stockCount} left
                  </p>
                )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
