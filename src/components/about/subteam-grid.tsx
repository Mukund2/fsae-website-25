"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Subteam } from "@/types";

interface SubteamGridProps {
  subteams: Subteam[];
}

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
            // Use RAF for staggered reveal
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

  return (
    <div ref={gridRef} className="grid gap-6 sm:grid-cols-2">
      {subteams.map((sub, i) => (
        <div
          key={sub.abbreviation}
          data-index={i}
          className="subteam-card group relative aspect-[4/3] overflow-hidden"
        >
          {/* Background image */}
          <Image
            src={sub.image}
            alt={sub.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            className="object-cover"
          />

          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

          {/* Gold accent line at top — animated via CSS keyframes when .revealed */}
          <div className="gold-accent-line absolute top-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-gold" />

          {/* Orange arrow */}
          <div className="absolute top-4 right-4">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
              <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

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
      ))}
    </div>
  );
}
