"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { merch, CATEGORIES } from "@/data/merch";
import type { MerchItem } from "@/data/merch";
import { cn } from "@/lib/utils";

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

/* --- Category label map --- */
const CATEGORY_LABELS: Record<string, string> = {
  apparel: "Apparel",
  headwear: "Headwear",
  accessories: "Accessories",
};

/* --- Merch card --- */
function MerchCard({ item, index }: { item: MerchItem; index: number }) {
  return (
    <div
      data-reveal
      data-reveal-delay={index * 80}
      className="group border border-border bg-elevated"
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
              <span className="font-mono text-[10px] uppercase tracking-[0.2em]">
                Coming Soon
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-5">
        <p className="font-display text-lg uppercase tracking-tight">
          {item.name}
        </p>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          {item.description}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-mono text-lg text-gold">
            ${item.price}
          </span>
          {item.sizes && (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/30">
              {item.sizes.join(" / ")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/* --- Main content --- */
export function MerchContent() {
  const revealRef = useScrollReveal();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? merch.filter((m) => m.category === activeCategory)
    : merch;

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-surface pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,128,0,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.3em] text-gold"
          >
            Official Gear
          </p>
          <h1
            data-reveal
            data-reveal-delay="100"
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            <span className="font-bold">Team</span>
            <br />
            <span className="font-light text-foreground/40">Merch</span>
          </h1>
          <p
            data-reveal
            data-reveal-delay="200"
            className="mt-5 max-w-2xl text-lg leading-relaxed text-muted"
          >
            Rep Spartan Racing. All proceeds go directly toward building the
            next car.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        {/* Category filters */}
        <div data-reveal className="flex flex-wrap gap-3">
          <button
            onClick={() => setActiveCategory(null)}
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 border",
              activeCategory === null
                ? "border-gold bg-gold text-white"
                : "border-border text-foreground/50 hover:border-foreground/30"
            )}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() =>
                setActiveCategory(activeCategory === cat ? null : cat)
              }
              className={cn(
                "font-mono text-[11px] uppercase tracking-[0.2em] px-4 py-2 border",
                activeCategory === cat
                  ? "border-gold bg-gold text-white"
                  : "border-border text-foreground/50 hover:border-foreground/30"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>

        <div className="mt-3 h-px w-full bg-border/50" />

        {/* Product grid */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item, i) => (
            <MerchCard key={item.slug} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            data-reveal
            className="font-display text-3xl uppercase tracking-tight md:text-5xl"
          >
            <span className="font-bold">Want to</span>
            <br />
            <span className="font-light text-foreground/40">Order?</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay="150"
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Merch sales open periodically throughout the year. Reach out to
            place an order or ask about availability.
          </p>
          <div data-reveal data-reveal-delay="300" className="mt-10">
            <a
              href="mailto:sjsu.fsae@gmail.com"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              Contact Us
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="text-background"
              >
                <path
                  d="M5 15L15 5M15 5H8M15 5V12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
