"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const InlineFlipbook = dynamic(
  () => import("@/components/home/inline-flipbook").then((m) => m.InlineFlipbook),
  { ssr: false }
);

/* --- Scroll-reveal hook using IntersectionObserver + Web Animations API --- */
function useScrollReveal() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll<HTMLElement>("[data-reveal]");

    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(32px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const delay = parseInt(el.dataset.revealDelay || "0", 10);

          setTimeout(() => {
            requestAnimationFrame(() => {
              el.animate(
                [
                  { opacity: 0, transform: "translateY(32px)" },
                  { opacity: 1, transform: "translateY(0px)" },
                ],
                {
                  duration: 600,
                  easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
                  fill: "forwards",
                }
              );
            });
          }, delay);

          observer.unobserve(el);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return containerRef;
}

/* --- Arrow icon --- */
function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Download icon --- */
function DownloadIcon({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path d="M10 3v10m0 0l-4-4m4 4l4-4M4 15h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* --- Tier data --- */
const TIERS = [
  { key: "partner", label: "Partner", price: "Under $2,500", color: "text-muted" },
  { key: "bronze", label: "Bronze", price: "$2,500+", color: "text-amber-600" },
  { key: "silver", label: "Silver", price: "$5,000+", color: "text-gray-400" },
  { key: "gold", label: "Gold", price: "$10,000+", color: "text-gold" },
  { key: "platinum", label: "Platinum", price: "$20,000+", color: "text-blue-400" },
  { key: "title", label: "Title", price: "$30,000+", color: "text-gold" },
] as const;

interface Benefit {
  name: string;
  values: Record<string, string>;
}

const BENEFITS: Benefit[] = [
  {
    name: "Invitation to unveiling",
    values: { partner: "\u2713", bronze: "\u2713", silver: "\u2713", gold: "\u2713", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Honored on website",
    values: { partner: "\u2713", bronze: "\u2713", silver: "\u2713", gold: "\u2713", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Logo on car",
    values: {
      partner: "X-Small",
      bronze: "Small",
      silver: "Medium",
      gold: "Medium + prominent",
      platinum: "Large + prominent",
      title: "X-Large + most prominent",
    },
  },
  {
    name: "Logo on team gear",
    values: { partner: "\u2014", bronze: "\u2014", silver: "Small", gold: "Medium", platinum: "Medium", title: "Large + X-Large" },
  },
  {
    name: "Feature on social media",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2713", gold: "\u2713", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Access to Design Review Presentations",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2713", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Spartan Racing Gift Basket",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2713", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Access to team resumes",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2014", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Vehicle display at sponsor location",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2014", platinum: "\u2713", title: "\u2713" },
  },
  {
    name: "Profile on website",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2014", platinum: "\u2014", title: "\u2713" },
  },
  {
    name: "Personal Sponsor Driver Day",
    values: { partner: "\u2014", bronze: "\u2014", silver: "\u2014", gold: "\u2014", platinum: "\u2014", title: "\u2713" },
  },
];

/* --- Stat block --- */
function StatBlock({ value, label, delay }: { value: string; label: string; delay: number }) {
  return (
    <div data-reveal data-reveal-delay={delay} className="text-center">
      <p className="font-display text-4xl uppercase tracking-tight text-gold md:text-5xl">{value}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{label}</p>
    </div>
  );
}

/* --- Desktop tier table --- */
function TierTable() {
  return (
    <div className="hidden overflow-x-auto lg:block">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border border-border/50 bg-surface p-4 text-left font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Benefit
            </th>
            {TIERS.map((tier) => (
              <th
                key={tier.key}
                className="border border-border/50 bg-surface p-4 text-center"
              >
                <span className={`block font-display text-base uppercase tracking-wider ${tier.color}`}>
                  {tier.label}
                </span>
                <span className="mt-1 block font-mono text-xs text-muted">{tier.price}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {BENEFITS.map((benefit, i) => (
            <tr key={i}>
              <td className="border border-border/50 p-4 text-sm text-foreground/80">
                {benefit.name}
              </td>
              {TIERS.map((tier) => {
                const val = benefit.values[tier.key];
                const isCheck = val === "\u2713";
                const isDash = val === "\u2014";
                return (
                  <td
                    key={tier.key}
                    className={`border border-border/50 p-4 text-center text-sm ${
                      isCheck ? "text-gold font-bold" : isDash ? "text-foreground/20" : "text-foreground/70"
                    }`}
                  >
                    {val}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* --- Mobile tier cards --- */
function TierCards() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:hidden">
      {TIERS.map((tier, ti) => (
        <div
          key={tier.key}
          data-reveal
          data-reveal-delay={ti * 80}
          className="border border-border/50 bg-surface"
        >
          {/* Card header */}
          <div className="border-b border-border/50 p-5">
            <h3 className={`font-display text-2xl uppercase tracking-wider ${tier.color}`}>
              {tier.label}
            </h3>
            <p className="mt-1 font-mono text-sm text-muted">{tier.price}</p>
          </div>
          {/* Benefits list */}
          <ul className="divide-y divide-border/30 p-5">
            {BENEFITS.map((benefit, bi) => {
              const val = benefit.values[tier.key];
              const isDash = val === "\u2014";
              if (isDash) return null;
              return (
                <li key={bi} className="flex items-start justify-between gap-3 py-3">
                  <span className="text-sm text-foreground/80">{benefit.name}</span>
                  <span className={`shrink-0 text-sm font-bold ${val === "\u2713" ? "text-gold" : "text-foreground/60"}`}>
                    {val}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* --- Main content --- */
export function BecomeASponsorContent() {
  const revealRef = useScrollReveal();

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative flex min-h-[50vh] items-center overflow-hidden bg-surface pt-32 pb-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(0,85,162,0.06)_0%,_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6">
          <p
            data-reveal
            className="font-mono text-xs uppercase tracking-[0.3em] text-gold"
          >
            Support Our Team
          </p>
          <h1
            data-reveal
            data-reveal-delay="100"
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl"
          >
            <span className="font-bold">Become a</span>
            <br />
            <span className="font-light text-foreground/40">Sponsor</span>
          </h1>
          <p
            data-reveal
            data-reveal-delay="200"
            className="mt-5 max-w-2xl text-lg leading-relaxed text-muted"
          >
            Support the next generation of engineers. Your investment fuels
            innovation, builds careers, and puts cutting-edge technology on the track.
          </p>
          <div data-reveal data-reveal-delay="350" className="mt-8 flex flex-wrap gap-4">
            <a
              href="#tiers"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              View Tiers
              <ArrowIcon className="text-background" />
            </a>
            <a
              href="#packet"
              className="inline-flex items-center gap-2 border border-gold/50 px-8 py-4 font-display text-lg uppercase tracking-wider text-gold hover:bg-gold/10"
            >
              Sponsor Packet
              <ArrowIcon className="text-gold" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Support Us */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div data-reveal>
          <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-gold md:text-base">
            Why Support Us
          </h2>
          <div className="mt-3 h-px w-full bg-gold/30" />
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2">
          <div data-reveal data-reveal-delay="100">
            <p className="text-lg leading-relaxed text-muted">
              Building a competitive Formula SAE car costs over{" "}
              <span className="font-bold text-foreground">$120,000 per year</span>.
              As a 501(c)(3) nonprofit, all donations to Spartan Racing are{" "}
              <span className="font-bold text-foreground">tax deductible</span>.
              Your support directly enables students to design, build, and race
              a world-class open-wheel vehicle.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <StatBlock value="$120K+" label="Annual cost to build a competitive car" delay={150} />
            <StatBlock value="501(c)(3)" label="Tax-deductible nonprofit organization" delay={200} />
            <StatBlock value="50+" label="Engineering students gain hands-on experience" delay={250} />
            <StatBlock value="1000+" label="Students see your brand on campus yearly" delay={300} />
          </div>
        </div>

        {/* Benefit cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Tax Deductible",
              desc: "All donations are tax deductible through our 501(c)(3) nonprofit status.",
            },
            {
              title: "Talent Pipeline",
              desc: "Access resumes and connect with top engineering talent before they graduate.",
            },
            {
              title: "Brand Exposure",
              desc: "Your logo on the car, team gear, and social media reaches thousands.",
            },
            {
              title: "Competition Presence",
              desc: "Represent your brand at national FSAE competitions and campus events.",
            },
          ].map((card, i) => (
            <div
              key={i}
              data-reveal
              data-reveal-delay={i * 80 + 200}
              className="border border-border/50 bg-surface p-6"
            >
              <h3 className="font-display text-lg uppercase tracking-wider text-foreground">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsor Tier Breakdown */}
      <section id="tiers" className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div data-reveal>
            <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-gold md:text-base">
              Sponsorship Tiers
            </h2>
            <div className="mt-3 h-px w-full bg-gold/30" />
          </div>
          <p data-reveal data-reveal-delay="100" className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Choose a tier that fits your goals. Every level of support makes a real
            impact on our team&apos;s ability to compete.
          </p>

          <div data-reveal data-reveal-delay="200" className="mt-12">
            <TierTable />
            <TierCards />
          </div>
        </div>
      </section>

      {/* How to Donate */}
      <section className="mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div data-reveal>
          <h2 className="font-mono text-sm uppercase tracking-[0.25em] text-gold md:text-base">
            How to Donate
          </h2>
          <div className="mt-3 h-px w-full bg-gold/30" />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Mail a check */}
          <div data-reveal data-reveal-delay="100" className="border border-border/50 bg-surface p-8">
            <h3 className="font-display text-xl uppercase tracking-wider text-foreground">
              Mail a Check
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Make checks payable to{" "}
              <span className="font-bold text-foreground">
                &ldquo;Spartan Racing Associated Students&rdquo;
              </span>{" "}
              and mail to:
            </p>
            <address className="mt-4 border-l-2 border-gold/40 pl-4 font-mono text-sm not-italic leading-loose text-foreground/80">
              Mechanical Engr. Bldg
              <br />
              ATTN: Formula SAE Ally Almiranez
              <br />
              One Washington Square
              <br />
              San Jose, CA 95192-0087
            </address>
          </div>

          {/* Give online */}
          <div data-reveal data-reveal-delay="200" className="border border-border/50 bg-surface p-8">
            <h3 className="font-display text-xl uppercase tracking-wider text-foreground">
              Give Online
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Donate securely through our website. Online donations are processed
              through San Jose State University and are fully tax deductible.
            </p>
            <div className="mt-6">
              <a
                href="mailto:sjsuformulasae@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-gold hover:text-gold/80"
              >
                Contact us for online donation link
                <ArrowIcon className="text-gold" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Sponsor Packet Flipbook */}
      <section id="packet" className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center">
            <h2
              data-reveal
              className="font-display text-3xl uppercase tracking-tight md:text-5xl"
            >
              <span className="font-bold">Sponsor</span>
              <br />
              <span className="font-light text-foreground/40">Packet</span>
            </h2>
            <p
              data-reveal
              data-reveal-delay="150"
              className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
            >
              Browse the full sponsorship packet below — team achievements, tiers,
              and how your support makes a difference.
            </p>
          </div>
          <div data-reveal data-reveal-delay="300" className="mt-12">
            <InlineFlipbook pdfUrl="/Spartan-Racing-Sponsor-Packet-2025-26.pdf" />
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2
            data-reveal
            className="font-display text-3xl uppercase tracking-tight md:text-5xl"
          >
            <span className="font-bold">Ready to</span>
            <br />
            <span className="font-light text-foreground/40">Partner Up?</span>
          </h2>
          <p
            data-reveal
            data-reveal-delay="150"
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Reach out to our team to discuss sponsorship opportunities, schedule
            a visit, or learn more about Spartan Racing.
          </p>
          <div data-reveal data-reveal-delay="300" className="mt-10">
            <a
              href="mailto:sjsuformulasae@gmail.com"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              Contact Us
              <ArrowIcon className="text-background" />
            </a>
          </div>
          <p
            data-reveal
            data-reveal-delay="400"
            className="mt-6 font-mono text-sm text-muted"
          >
            sjsuformulasae@gmail.com
          </p>
        </div>
      </section>
    </div>
  );
}
