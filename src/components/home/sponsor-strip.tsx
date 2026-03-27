"use client";

import { Marquee } from "@/components/animation/marquee";

const SPONSORS = [
  // Title
  "Cadence", "Military Fasteners", "Altium", "Siemens", "Ansys", "Toray", "Bergman", "Don Beal", "Roku",
  // Platinum
  "Motec USA", "Levy", "BayView Plastics", "Phoenix Contact",
  // Gold
  "Vi-grade", "Cisco", "Rapid Harness", "SFR SCCA", "Candy Store Foundation", "Lucid Motors", "Marin Design Works",
  // Silver
  "Mountz Torque", "Evonik", "Futek", "About Energy", "Rivian Volkswagen Group",
  // Bronze
  "Star One Credit Union", "Airtech", "Sabalcore", "LCL Machining", "KLA", "Amex",
  // Partner
  "Rexco", "Chemtrend", "SMC", "Dremel", "FibreGlast", "XRP", "Matter Hackers",
  "Bender", "VectorNav", "Glenrock Builders", "Bojo Tools", "Garner Heat Treat",
  "Bay Technology Manufacturing", "Curvilinear Components", "Shining 3D",
  "Te Connectivity", "Prismatic Powders", "Valence Precision",
] as const;

export function SponsorStrip() {
  return (
    <section className="w-full bg-surface py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center font-display text-[clamp(1rem,2vw,1.2rem)] uppercase tracking-[0.2em] text-muted">
          Trusted by Our Sponsors
        </h2>
      </div>

      {/* Marquee with fade edges */}
      <div className="relative mt-10">
        {/* Left fade */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-surface to-transparent sm:w-40" />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-surface to-transparent sm:w-40" />

        <Marquee speed={60}>
          {SPONSORS.map((name) => (
            <span
              key={name}
              className="whitespace-nowrap font-display text-sm uppercase tracking-wider text-foreground/20 sm:text-base"
            >
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
