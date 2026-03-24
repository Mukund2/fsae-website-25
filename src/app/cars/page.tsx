"use client";

import Link from "next/link";
import { useState } from "react";
import { Section } from "@/components/layout/section";
import { cars } from "@/data/cars";
import { RevealText } from "@/components/animation/reveal-text";

type Filter = "all" | "electric" | "combustion";

export default function CarsPage() {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredCars = filter === "all" ? cars : cars.filter((car) => car.type === filter);

  const filters: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Electric", value: "electric" },
    { label: "Combustion", value: "combustion" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden pt-24">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <RevealText
            as="h1"
            className="font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            The Garage
          </RevealText>
          <RevealText
            as="p"
            className="mt-4 max-w-2xl text-lg text-muted"
            delay={0.3}
          >
            From combustion to electric — a legacy of innovation on four wheels.
          </RevealText>
        </div>
      </section>

      {/* Filter Tabs + Car Grid */}
      <Section>
        {/* Filter tabs */}
        <div className="mb-12 flex gap-2">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`relative rounded-full px-6 py-2 text-sm font-medium uppercase tracking-wider transition-colors duration-200 ${
                filter === f.value
                  ? "bg-gold text-background"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Car grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCars.map((car, i) => (
            <div
              key={car.slug}
              style={{
                opacity: 1,
                animation: `fadeScaleIn 0.3s ease-out ${i * 0.05}s both`,
              }}
            >
              <Link
                href={`/cars/${car.slug}`}
                className="group relative block overflow-hidden rounded-lg border border-transparent bg-surface transition-all duration-300 hover:border-gold/40 hover:bg-elevated hover:shadow-[0_0_20px_rgba(212,168,67,0.1)]"
              >
                <div className="aspect-video w-full bg-elevated transition-transform duration-300 group-hover:scale-105">
                  <div className="flex h-full items-center justify-center">
                    <span className="font-display text-2xl text-muted/20">{car.name}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-2xl uppercase">{car.name}</h3>
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium uppercase tracking-wider text-gold">
                      {car.type}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{car.year}</p>
                  <p className="mt-3 line-clamp-2 text-sm text-muted">{car.description}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <style>{`
          @keyframes fadeScaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
          }
        `}</style>
      </Section>
    </>
  );
}
