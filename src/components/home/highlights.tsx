"use client";

import Image from "next/image";

const specs = [
  { value: "3.2s", label: "0–60 mph" },
  { value: "485", label: "lbs curb weight" },
  { value: "80kW", label: "peak power" },
  { value: "85", label: "mph top speed" },
];

export function Highlights() {
  return (
    <section className="bg-surface">
      {/* Full-width car photo */}
      <div className="relative aspect-[21/9] w-full overflow-hidden">
        <Image
          src="/images/cars/car-2.jpg"
          alt="Two SJSU Spartan Racing cars side by side at sunset"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Specs strip */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <p className="mb-10 text-xs uppercase tracking-[0.3em] text-muted">
          SR-16e Performance
        </p>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-0">
          {specs.map((spec, i) => (
            <div
              key={spec.label}
              className={`${
                i > 0 ? "md:border-l md:border-border md:pl-8" : ""
              }`}
            >
              <div className="font-display text-5xl tracking-tight text-foreground md:text-6xl lg:text-7xl">
                {spec.value}
              </div>
              <div className="mt-2 text-sm uppercase tracking-widest text-muted">
                {spec.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
