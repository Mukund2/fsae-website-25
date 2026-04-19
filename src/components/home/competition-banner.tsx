"use client";

import Link from "next/link";

export function CompetitionBanner() {
  return (
    <section className="relative w-full overflow-hidden" style={{ background: "#0D1117" }}>
      {/* Geometric pattern background - diagonal racing-inspired shapes */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `
          repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            rgba(255,255,255,0.02) 40px,
            rgba(255,255,255,0.02) 80px
          ),
          repeating-linear-gradient(
            45deg,
            transparent,
            transparent 60px,
            rgba(255,255,255,0.015) 60px,
            rgba(255,255,255,0.015) 120px
          )
        `
      }} />

      {/* Larger geometric blocks like McLaren's checkered pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{
          background: `
            linear-gradient(135deg, transparent 25%, rgba(255,255,255,0.03) 25%, rgba(255,255,255,0.03) 50%, transparent 50%, transparent 75%, rgba(255,255,255,0.02) 75%)
          `,
          backgroundSize: '120px 120px'
        }} />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-12 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Left: Competition info */}
          <div>
            <h2 className="font-display font-bold uppercase leading-[0.92] tracking-tight text-white" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
              FSAE Michigan 2026
            </h2>
            <p className="mt-2 font-display text-[clamp(1.2rem,3vw,2rem)] uppercase leading-[0.95] tracking-tight text-white/40">
              14 — 17 May 2026
            </p>
            <p className="mt-4 font-mono text-[12px] uppercase tracking-[0.2em] text-white/30">
              Michigan International Speedway — Brooklyn, MI
            </p>
          </div>

          {/* Right: Michigan state silhouette + CTA */}
          <div className="flex flex-col items-start md:items-end gap-6">
            {/* Michigan silhouette - use an SVG path of Michigan state */}
            <svg viewBox="0 0 200 200" className="h-32 w-32 md:h-48 md:w-48" fill="none">
              {/* Simplified Michigan state outline */}
              <path d="M80,180 L60,160 L55,140 L60,120 L55,100 L65,80 L75,75 L85,80 L100,75 L110,80 L120,75 L130,80 L140,90 L145,110 L140,130 L145,150 L135,170 L120,180 L100,175 Z" fill="#B8965A" />
              {/* Upper peninsula */}
              <path d="M30,70 L50,55 L70,50 L90,55 L100,65 L90,70 L75,75 L65,80 L50,75 L35,75 Z" fill="#B8965A" />
              {/* Location dot */}
              <circle cx="95" cy="120" r="5" fill="white" />
              <text x="105" y="125" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">BROOKLYN</text>
              <text x="105" y="137" fill="white" fontSize="10" fontFamily="monospace">MICHIGAN</text>
            </svg>

            {/* CTA Button */}
            <Link
              href="/racing"
              className="group flex items-center justify-between gap-8 border border-white/20 px-6 py-3 min-w-[260px]"
            >
              <span className="font-display text-sm font-bold uppercase tracking-wider text-white">
                Find Out More
              </span>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
                <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Gold accent line at bottom */}
      <div className="h-1 w-full bg-gold" />
    </section>
  );
}
