"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex h-svh w-full items-end overflow-hidden bg-[#1A1A1A]">
      {/* Full-bleed car action photo */}
      <Image
        src="/images/sr16/car-action-1.jpg"
        alt="Spartan Racing car on track"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Gradient overlay - darker at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Bottom-left content - McLaren style */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-12"
        style={{
          opacity: 0,
          animation: "heroFadeIn 0.8s ease-out 0.5s forwards",
        }}
      >
        {/* Small orange label */}
        <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.4em] text-gold">
          Formula SAE
        </p>

        {/* Two-weight massive heading with orange arrow */}
        <h1 className="font-display uppercase leading-[0.92] tracking-tight">
          <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white">
            Home of
          </span>
          <span className="flex items-end gap-4 text-[clamp(2.5rem,7vw,5.5rem)] font-light text-white/70">
            Spartan Racing
            {/* Orange arrow - McLaren signature */}
            <svg width="40" height="40" viewBox="0 0 20 20" fill="none" className="mb-2 shrink-0 text-gold lg:mb-4">
              <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </h1>
      </div>
    </section>
  );
}
