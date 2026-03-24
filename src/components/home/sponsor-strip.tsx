"use client";

import { Marquee } from "@/components/animation/marquee";

const sponsors = [
  "SolidWorks",
  "Ansys",
  "Lincoln Electric",
  "Altium",
  "SJSU College of Engineering",
  "Brembo",
  "SKF",
  "Henkel",
  "Continental",
  "Bosch",
];

export function SponsorStrip() {
  return (
    <section className="relative bg-background py-12">
      {/* Top gold gradient line */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <p className="mb-8 text-center text-xs uppercase tracking-[0.3em] text-muted">
        Our Sponsors
      </p>
      <Marquee speed={35}>
        {sponsors.map((name) => (
          <span
            key={name}
            className="flex items-center gap-8 whitespace-nowrap font-display text-3xl uppercase tracking-wider text-muted/40 transition-colors hover:text-muted/70 md:text-4xl"
          >
            {name}
            <span className="inline-block h-2 w-2 rounded-full bg-gold/30" aria-hidden="true" />
          </span>
        ))}
      </Marquee>

      {/* Bottom gold gradient line */}
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  );
}
