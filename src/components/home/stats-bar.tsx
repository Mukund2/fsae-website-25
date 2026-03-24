"use client";

import { Counter } from "@/components/animation/counter";

const stats = [
  { value: 35, suffix: "+", label: "Years Active" },
  { value: 16, suffix: "", label: "Cars Built" },
  { value: 100, suffix: "+", label: "Team Members" },
  { value: 7, suffix: "", label: "Subteams" },
];

export function StatsBar() {
  return (
    <section className="border-y border-gold/20 bg-surface">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4 md:py-16">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <Counter
              value={stat.value}
              suffix={stat.suffix}
              className="font-display text-4xl text-gold md:text-5xl"
            />
            <div className="mt-2 text-sm uppercase tracking-widest text-muted">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
