"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { MerchProduct } from "@/lib/fourthwall";

/* --- Scroll-reveal hook (same pattern as sponsors) --- */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.revealDelay || "0", 10);

          setTimeout(() => {
            requestAnimationFrame(() => {
              el.animate(
                [
                  { opacity: 0, transform: "translateY(32px)" },
                  { opacity: 1, transform: "translateY(0px)" },
                ],
                {
                  duration: 600,
                  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  fill: "forwards",
                }
              );
            });
          }, delay);

          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* --- Price formatting --- */
function formatPrice(value: number, currency: string): string {
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: value % 1 === 0 ? 0 : 2,
    }).format(value);
  } catch {
    return `$${value}`;
  }
}

/* --- Merch card --- */
function MerchCard({ item, index }: { item: MerchProduct; index: number }) {
  return (
    <Link
      href={`/merch/${item.slug}`}
      data-reveal
      data-reveal-delay={index * 80}
      className="group block border border-border bg-elevated hover:border-gold/60"
    >
      {/* Product image */}
      <div className="relative aspect-square bg-surface">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-foreground/15">
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="font-display text-[10px] uppercase tracking-[0.2em]">
                Coming Soon
              </span>
            </div>
          </div>
        )}
        {!item.available && (
          <div className="absolute right-3 top-3 bg-background/90 px-2 py-1 font-display text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Sold Out
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-display text-lg uppercase tracking-tight">
          {item.name}
        </p>
        {item.descriptionText && (
          <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">
            {item.descriptionText}
          </p>
        )}

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-lg text-gold">
              {formatPrice(item.price, item.currency)}
            </span>
            {item.compareAtPrice && item.compareAtPrice > item.price && (
              <span className="font-display text-xs text-foreground/30 line-through">
                {formatPrice(item.compareAtPrice, item.currency)}
              </span>
            )}
          </div>
          {item.sizes.length > 0 && (
            <span className="font-display text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              {item.sizes.join(" / ")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/* --- Main content --- */
export function MerchContent({ products }: { products: MerchProduct[] }) {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative flex items-center overflow-hidden bg-surface pt-32 pb-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h1
            data-reveal
            className="font-display font-bold uppercase italic leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#C8A24E" }}
          >
            Merch
          </h1>
        </div>
      </section>

      {/* Grid or empty state */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {products.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((item, i) => (
              <MerchCard key={item.id} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div
            data-reveal
            className="border border-border bg-elevated px-8 py-16 text-center"
          >
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
              Stocking the shelves
            </p>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-muted">
              Our shop is being prepared. Check back soon, or reach out below
              to ask about availability.
            </p>
          </div>
        )}
      </section>

    </div>
  );
}
