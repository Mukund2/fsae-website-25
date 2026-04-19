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
    <div
      ref={gridRef}
      className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
    >
      {subteams.map((sub, i) => (
        <div
          key={sub.abbreviation}
          data-index={i}
          className="subteam-card group relative overflow-hidden aspect-[3/4]"
        >
          {/* Background image */}
          <Image
            src={sub.image}
            alt={sub.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
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
          </div>

          {/* Hover description overlay */}
          <div className="lead-card-desc absolute inset-0 flex items-center bg-foreground/90 p-5 md:p-6 opacity-0 pointer-events-none">
            <div className="overflow-y-auto max-h-full">
              <p className="font-display text-sm uppercase tracking-tight text-gold">
                {sub.name}
              </p>
              <p className="mt-1 font-display text-[10px] uppercase tracking-widest text-white/50">
                {sub.abbreviation}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {sub.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
