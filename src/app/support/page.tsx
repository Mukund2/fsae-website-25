import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | SJSU Spartan Racing",
  description:
    "Support SJSU Spartan Racing through donations or sponsorship partnerships.",
};

export default function SupportPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[45vh] items-end pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(200,149,46,0.08)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#C8952E] hero-fade-in">
            Make an Impact
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Support Spartan Racing
          </h1>
        </div>
      </section>

      {/* Why donate */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
            Why Donate
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Every dollar directly funds the design, manufacturing, and testing
            of our next competition car. Your support helps us purchase raw
            materials, machining time, electronics, and cover travel expenses
            to Formula SAE events across the country.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            Spartan Racing is entirely student-run. We rely on the generosity
            of alumni, local businesses, and the engineering community to keep
            building faster, lighter, and more innovative cars each season.
          </p>
        </div>
      </section>

      {/* CTA buttons */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="flex flex-wrap gap-4">
          <Link
            href="https://www.givecampus.com/campaigns/67453/donations/new?designation=spartanracingformulasae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-gold bg-gold px-8 py-3 font-mono text-sm uppercase tracking-widest text-white hover:bg-gold/90"
          >
            Donate Now
          </Link>
          <Link
            href="mailto:sjsu.fsae@gmail.com"
            className="inline-block border border-gold bg-gold/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-gold hover:bg-gold/20"
          >
            Become a Sponsor
          </Link>
        </div>
      </section>
    </>
  );
}
