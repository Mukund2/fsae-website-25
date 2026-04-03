"use client";

import { Counter } from "@/components/animation/counter";

const specs = [
  { value: 3, suffix: ".2s", label: "0 to 60 mph" },
  { value: 485, suffix: " lbs", label: "Curb weight" },
  { value: 80, suffix: "kW", label: "Peak power" },
  { value: 85, suffix: " mph", label: "Top speed" },
];

export function Highlights() {
  return (
    <section className="w-full bg-background">
      <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
        <p className="mb-12 font-mono text-xs uppercase tracking-[0.3em] text-gold">
          SR-16e Performance
        </p>
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 md:gap-0">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={i > 0 ? "md:border-l md:border-border md:pl-10" : ""}
            >
              <div className="font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
                <Counter
                  value={spec.value}
                  suffix={spec.suffix}
                  duration={2}
                />
              </div>
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
