import type { Metadata } from "next";
import { cars } from "@/data/cars";
import { CarTimeline } from "@/components/history/car-timeline";

export const metadata: Metadata = {
  title: "Our History",
  description:
    "Every Spartan Racing car since 1989 — from SR-0 and the combustion era through the electric SRE line to today's SR-17. Decades of design, manufacturing, and competition.",
};

export default function HistoryPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[44vh] items-center overflow-hidden pt-32 pb-12">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,85,162,0.08)_0%,_transparent_60%)]" />

        <div className="relative mx-auto w-full max-w-7xl px-6">
          <span className="font-display text-[clamp(1.4rem,3vw,2rem)] italic text-gold">
            Since 1989
          </span>
          <h1
            className="mt-3 font-display font-bold uppercase italic leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "#C2850C" }}
          >
            Our History
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Every car we&apos;ve built, from the 1989 senior project that started
            it all, through more than a decade of combustion machines, to the
            electric race cars we field today. This is the full Spartan Racing
            lineage.
          </p>
        </div>
      </section>

      {/* Car lineage */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <CarTimeline cars={cars} />
      </section>
    </>
  );
}
