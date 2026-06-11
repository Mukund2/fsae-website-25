"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { Car } from "@/types";

interface CarTimelineProps {
  cars: Car[];
}

/** Headline year for a car: the leading year of its season range ("2025-2024" → "2025"). */
function headlineYear(years: string): string {
  return years.split("-")[0].trim();
}

function specs(car: Car): string[] {
  return [car.motor, car.power, car.torque, car.battery].filter(
    (v): v is string => Boolean(v)
  );
}

export function CarTimeline({ cars }: CarTimelineProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const cards = grid.querySelectorAll<HTMLElement>(".car-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const card = entry.target as HTMLElement;
            const index = Number(card.dataset.index ?? 0);
            card.style.animationDelay = `${(index % 3) * 0.08}s`;
            card.classList.add("sr-revealed");
            observer.unobserve(card);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {cars.map((car, i) => {
        const year = headlineYear(car.years);
        const chips = specs(car);
        return (
          <article key={car.slug} data-index={i} className="car-card sr-reveal">
            <div className="car-card-inner flex h-full flex-col overflow-hidden rounded-lg border border-border bg-elevated">
            {/* Photo */}
            <div className="relative aspect-[16/10] overflow-hidden bg-surface">
              {car.image && (
                <Image
                  src={car.image}
                  alt={`Spartan Racing ${car.name}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="car-card-img object-cover"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

              {car.badge && (
                <span className="absolute right-3 top-3 rounded-full bg-gold px-3 py-1 font-display text-[0.7rem] uppercase tracking-wide text-white">
                  {car.badge}
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                <h3 className="font-display text-3xl uppercase italic tracking-tight text-white">
                  {car.name}
                </h3>
                {year && (
                  <span className="font-display text-2xl italic text-gold-light">
                    {year}
                  </span>
                )}
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col gap-3 p-5">
              {chips.length > 0 && (
                <ul className="flex flex-wrap gap-2">
                  {chips.map((chip) => (
                    <li
                      key={chip}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                    >
                      {chip}
                    </li>
                  ))}
                </ul>
              )}

              {car.description && (
                <p className="text-sm leading-relaxed text-muted">
                  {car.description}
                </p>
              )}
            </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
