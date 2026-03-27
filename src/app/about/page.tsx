import { Metadata } from "next";
import { subteams } from "@/data/team";
import { SubteamGrid } from "@/components/about/subteam-grid";

export const metadata: Metadata = {
  title: "Subteams | SJSU Spartan Racing",
  description:
    "Meet the 8 subteams behind SJSU Spartan Racing — from Aerodynamics to R&D, every group plays a critical role in building a competitive formula-style race car.",
};

export default function SubteamsPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[45vh] items-end pb-16 pt-32 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold hero-fade-in">
            8 Subteams &middot; One Mission
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Our Team
          </h1>
          <p
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted hero-fade-in"
            style={{ animationDelay: "0.25s" }}
          >
            A multidisciplinary group of engineers, designers, and business
            minds united by a single goal: build a faster car every year.
          </p>
        </div>
      </section>

      {/* Subteam cards */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <SubteamGrid subteams={subteams} />
      </section>
    </>
  );
}
