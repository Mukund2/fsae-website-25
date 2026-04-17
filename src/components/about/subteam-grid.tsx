"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Subteam } from "@/types";

interface SubteamGridProps {
  subteams: Subteam[];
}

/**
 * Layout pattern for 8 cards:
 * Row 1: 3 portrait cards (tall)
 * Row 2: 2 landscape cards (wide)
 * Row 3: 3 portrait cards (tall)
 *
 * This creates visual variety without implying hierarchy --
 * every card gets equal visual weight overall.
 */

// Which indices are landscape (wide, shorter)
const LANDSCAPE_INDICES = new Set([3, 4]);

export function SubteamGrid({ subteams }: SubteamGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".subteam-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const index = Number(card.dataset.index ?? 0);
            requestAnimationFrame(() => {
              card.style.animationDelay = `${index * 0.1}s`;
              card.classList.add("revealed");
            });
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  // Split into rows: first 3, next 2, last 3
  const row1 = subteams.slice(0, 3);
  const row2 = subteams.slice(3, 5);
  const row3 = subteams.slice(5, 8);

  const renderCard = (sub: Subteam, globalIndex: number) => {
    const isLandscape = LANDSCAPE_INDICES.has(globalIndex);
    return (
      <div
        key={sub.abbreviation}
        data-index={globalIndex}
        className={`subteam-card group relative overflow-hidden ${
          isLandscape ? "aspect-[16/9]" : "aspect-[3/4]"
        }`}
      >
        {/* Background image */}
        <Image
          src={sub.image}
          alt={sub.name}
          fill
          sizes={isLandscape
            ? "(max-width: 640px) 100vw, 50vw"
            : "(max-width: 640px) 100vw, 33vw"
          }
          className="object-cover"
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

        {/* Gold accent line at top */}
        <div className="gold-accent-line absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          <h3 className="font-display text-2xl uppercase tracking-tight text-white md:text-3xl">
            {sub.name}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-white/70 max-w-md">
            {sub.description}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div ref={gridRef} className="flex flex-col gap-6">
      {/* Row 1: 3 portrait cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {row1.map((sub, i) => renderCard(sub, i))}
      </div>

      {/* Row 2: 2 landscape cards */}
      <div className="grid gap-6 sm:grid-cols-2">
        {row2.map((sub, i) => renderCard(sub, i + 3))}
      </div>

      {/* Row 3: 3 portrait cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {row3.map((sub, i) => renderCard(sub, i + 5))}
      </div>
    </div>
  );
}
