"use client";

import { Marquee } from "@/components/animation/marquee";

interface Sponsor {
  name: string;
  url?: string;
}

const SPONSORS: Sponsor[] = [
  // Title
  { name: "Cadence", url: "https://www.cadence.com" },
  { name: "Military Fasteners", url: "https://www.militaryfasteners.com" },
  { name: "Altium", url: "https://www.altium.com" },
  { name: "Siemens", url: "https://www.siemens.com" },
  { name: "Ansys", url: "https://www.ansys.com" },
  { name: "Toray", url: "https://www.toray.com" },
  { name: "Bergman" },
  { name: "Don Beal" },
  { name: "Roku", url: "https://www.roku.com" },
  // Platinum
  { name: "Motec USA", url: "https://www.motec.com.au" },
  { name: "Levy", url: "https://www.levyrestaurants.com" },
  { name: "BayView Plastics" },
  { name: "Phoenix Contact", url: "https://www.phoenixcontact.com" },
  // Gold
  { name: "Vi-grade", url: "https://www.vi-grade.com" },
  { name: "Cisco", url: "https://www.cisco.com" },
  { name: "Rapid Harness", url: "https://www.rapidharness.com" },
  { name: "SFR SCCA", url: "https://www.sfrscca.org" },
  { name: "Candy Store Foundation" },
  { name: "Lucid Motors", url: "https://www.lucidmotors.com" },
  { name: "Marin Design Works" },
  // Silver
  { name: "Mountz Torque", url: "https://www.mountztorque.com" },
  { name: "Evonik", url: "https://www.evonik.com" },
  { name: "Futek", url: "https://www.futek.com" },
  { name: "About Energy", url: "https://www.aboutenergy.io" },
  { name: "Rivian", url: "https://www.rivian.com" },
  { name: "Volkswagen Group", url: "https://www.volkswagenag.com" },
  // Bronze
  { name: "Star One Credit Union", url: "https://www.starone.org" },
  { name: "Airtech", url: "https://www.airtechintl.com" },
  { name: "Sabalcore", url: "https://www.sabalcore.com" },
  { name: "LCL Machining" },
  { name: "KLA", url: "https://www.kla.com" },
  { name: "Amex", url: "https://www.americanexpress.com" },
  // Partner
  { name: "Rexco", url: "https://www.rfrexco.com" },
  { name: "Chemtrend", url: "https://www.chemtrend.com" },
  { name: "SMC", url: "https://www.smcusa.com" },
  { name: "Dremel", url: "https://www.dremel.com" },
  { name: "FibreGlast", url: "https://www.fibreglast.com" },
  { name: "XRP", url: "https://www.xrp.com" },
  { name: "Matter Hackers", url: "https://www.matterhackers.com" },
  { name: "Bender", url: "https://www.benderinc.com" },
  { name: "VectorNav", url: "https://www.vectornav.com" },
  { name: "Glenrock Builders" },
  { name: "Bojo Tools", url: "https://www.bojotools.com" },
  { name: "Garner Heat Treat" },
  { name: "Bay Technology Mfg" },
  { name: "Curvilinear Components" },
  { name: "Shining 3D", url: "https://www.shining3d.com" },
  { name: "TE Connectivity", url: "https://www.te.com" },
  { name: "Prismatic Powders", url: "https://www.prismaticpowders.com" },
  { name: "Valence Precision" },
];

function SponsorItem({ sponsor }: { sponsor: Sponsor }) {
  const inner = (
    <span className="whitespace-nowrap font-display text-sm uppercase tracking-wider text-foreground/20 sm:text-base">
      {sponsor.name}
    </span>
  );

  if (sponsor.url) {
    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {inner}
      </a>
    );
  }

  return inner;
}

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

        <Marquee speed={120}>
          {SPONSORS.map((sponsor) => (
            <SponsorItem key={sponsor.name} sponsor={sponsor} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
