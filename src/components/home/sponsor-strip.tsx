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
    <section className="border-y border-gold/20 bg-background py-10">
      <p className="mb-6 text-center text-xs uppercase tracking-[0.3em] text-muted">
        Our Sponsors
      </p>
      <Marquee speed={35}>
        {sponsors.map((name) => (
          <span
            key={name}
            className="whitespace-nowrap font-display text-2xl uppercase tracking-wider text-muted/40 transition-colors hover:text-muted/70 md:text-3xl"
          >
            {name}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
