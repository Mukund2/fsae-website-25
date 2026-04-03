"use client";

import { Counter } from "@/components/animation/counter";

const specs = [
  { value: 3.2, label: "0 to 60 mph", suffix: "s", decimals: true },
  { value: 485, label: "Curb weight", suffix: " lbs", decimals: false },
  { value: 80, label: "Peak power", suffix: "kW", decimals: false },
  { value: 85, label: "Top speed", suffix: " mph", decimals: false },
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
              className={`${
                i > 0 ? "md:border-l md:border-border md:pl-10" : ""
              }`}
            >
              <div className="font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
                <Counter
                  value={spec.decimals ? Math.round(spec.value * 10) : spec.value}
                  suffix=""
                  className=""
                  duration={2}
                />
                {spec.decimals ? null : null}
              </div>
              <div className="mt-1 font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl" style={{ display: "none" }} />
              <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                {spec.suffix && <span className="text-foreground/60">{spec.suffix}</span>}
                {" "}{spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
