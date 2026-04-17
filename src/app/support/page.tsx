import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support | SJSU Spartan Racing",
  description:
    "Support SJSU Spartan Racing through donations or sponsorship partnerships.",
};

function OrangeArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SupportPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[50vh] items-center pt-32 pb-16 overflow-hidden">
        <Image
          src="/images/sr16/car-action-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background" />

        <div className="relative mx-auto max-w-7xl px-6">
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="font-bold">Support</span>
            <br />
            <span className="font-bold text-gold">Spartan</span>{" "}
            <span className="font-bold text-blue">Racing</span>
          </h1>
        </div>
      </section>

      {/* Why donate */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl hero-fade-in" style={{ animationDelay: "0.2s" }}>
            <span className="font-bold">Why</span>{" "}
            <span className="font-light text-foreground/40">Donate</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted hero-fade-in" style={{ animationDelay: "0.3s" }}>
            Every dollar directly funds the design, manufacturing, and testing
            of our next competition car. Your support helps us purchase raw
            materials, machining time, electronics, and cover travel expenses
            to Formula SAE events across the country.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted hero-fade-in" style={{ animationDelay: "0.4s" }}>
            Spartan Racing is entirely student-run. We rely on the generosity
            of alumni, local businesses, and the engineering community to keep
            building faster, lighter, and more innovative cars each season.
          </p>
        </div>
      </section>

      {/* Photo break */}
      <section className="relative mx-auto max-w-7xl px-6 pb-16 md:pb-24">
        <div className="relative aspect-[21/9] w-full overflow-hidden">
          <Image
            src="/images/flickr/comp-action-1.jpg"
            alt="Spartan Racing at competition"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>
      </section>

      {/* CTA buttons */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="flex flex-wrap gap-4 hero-fade-in" style={{ animationDelay: "0.5s" }}>
          <Link
            href="https://www.givecampus.com/campaigns/67453/donations/new?designation=spartanracingformulasae"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-gold bg-gold px-8 py-3 font-mono text-sm uppercase tracking-widest text-white hover:bg-gold/90"
          >
            Donate Now
            <OrangeArrow />
          </Link>
          <Link
            href="mailto:sjsuformulasae@gmail.com"
            className="inline-flex items-center gap-2 border border-gold bg-gold/10 px-8 py-3 font-mono text-sm uppercase tracking-widest text-gold hover:bg-gold/20"
          >
            Become a Sponsor
            <OrangeArrow />
          </Link>
        </div>
      </section>
    </>
  );
}
