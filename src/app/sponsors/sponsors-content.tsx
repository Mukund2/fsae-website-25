"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { sponsors } from "@/data/sponsors";
import type { Sponsor } from "@/types";

/* ─── Tier config ─── */
const TIER_ORDER = ["title", "platinum", "gold", "silver", "bronze", "partner"] as const;

const TIER_META: Record<
  string,
  { label: string; gridClass: string; cardSize: string; logoH: string }
> = {
  title: {
    label: "TITLE SPONSORS",
    gridClass: "grid-cols-1 sm:grid-cols-2 gap-8",
    cardSize: "p-10 min-h-[200px]",
    logoH: "h-20",
  },
  platinum: {
    label: "PLATINUM SPONSORS",
    gridClass: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    cardSize: "p-8 min-h-[160px]",
    logoH: "h-14",
  },
  gold: {
    label: "GOLD SPONSORS",
    gridClass: "grid-cols-2 lg:grid-cols-3 gap-6",
    cardSize: "p-6 min-h-[140px]",
    logoH: "h-12",
  },
  silver: {
    label: "SILVER SPONSORS",
    gridClass: "grid-cols-2 lg:grid-cols-4 gap-5",
    cardSize: "p-5 min-h-[120px]",
    logoH: "h-10",
  },
  bronze: {
    label: "BRONZE SPONSORS",
    gridClass: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4",
    cardSize: "p-4 min-h-[100px]",
    logoH: "h-8",
  },
  partner: {
    label: "PARTNERS",
    gridClass: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4",
    cardSize: "p-4 min-h-[80px]",
    logoH: "h-7",
  },
};

/* ─── Scroll-reveal hook using IntersectionObserver + RAF ─── */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

    // Set initial hidden state via direct DOM manipulation (no CSS transitions)
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
              // Use Web Animations API (keyframe animation, not CSS transition)
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

/* ─── Sponsor card ─── */
function SponsorCard({
  sponsor,
  tierMeta,
  index,
}: {
  sponsor: Sponsor;
  tierMeta: (typeof TIER_META)[string];
  index: number;
}) {
  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={240}
      height={80}
      className={`${tierMeta.logoH} w-auto object-contain group-hover:scale-110`}
      style={{ willChange: "transform" }}
    />
  ) : (
    <span className="font-display text-base uppercase tracking-[0.12em] text-foreground/30 hover:text-foreground/80 sm:text-lg">
      {sponsor.name}
    </span>
  );

  const card = (
    <div
      data-reveal
      data-reveal-delay={index * 60}
      className={`group flex flex-col items-center justify-center border border-border/50 bg-surface ${tierMeta.cardSize} hover:border-gold/40 hover:shadow-[0_0_24px_rgba(255,128,0,0.08)]`}
    >
      {inner}
    </div>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {card}
      </a>
    );
  }

  return card;
}

/* ─── Tier section ─── */
function TierSection({ tier }: { tier: string }) {
  const tierSponsors = sponsors.filter((s) => s.tier === tier);
  if (tierSponsors.length === 0) return null;

  const meta = TIER_META[tier];

  return (
    <section className="mx-auto max-w-7xl px-6 py-16 md:py-24">
      {/* Tier heading */}
      <div data-reveal>
        <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-gold md:text-base">
          {meta.label}
        </h2>
        <div className="mt-3 h-px w-full bg-gold/30" />
      </div>

      {/* Sponsor grid */}
      <div className={`mt-10 grid ${meta.gridClass}`}>
        {tierSponsors.map((sponsor, i) => (
          <SponsorCard
            key={sponsor.name}
            sponsor={sponsor}
            tierMeta={meta}
            index={i}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Main content ─── */
export function SponsorsContent() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-surface pt-24">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,128,0,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <h1
            data-reveal
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            Our Sponsors
          </h1>
          <p
            data-reveal
            data-reveal-delay="200"
            className="mt-5 max-w-2xl text-lg leading-relaxed text-muted"
          >
            We&apos;re grateful for the support of industry leaders who make our
            racing program possible.
          </p>
        </div>
      </section>

      {/* Tier sections */}
      {TIER_ORDER.map((tier) => (
        <TierSection key={tier} tier={tier} />
      ))}

      {/* Become a Sponsor CTA */}
      <section className="bg-surface py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            data-reveal
            className="font-display text-3xl uppercase tracking-tight md:text-5xl"
          >
            Become a Sponsor
          </h2>
          <p
            data-reveal
            data-reveal-delay="150"
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Partner with the next generation of engineers. Your support fuels
            innovation and helps us compete on the world stage.
          </p>
          <div data-reveal data-reveal-delay="300" className="mt-10">
            <a
              href="mailto:sjsu.fsae@gmail.com"
              className="inline-block bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
