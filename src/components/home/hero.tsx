"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative mx-4 mt-14 flex h-[75vh] items-end overflow-hidden bg-[#1A1A1A] lg:mx-8">
      {/* Full-bleed car action photo */}
      <Image
        src="/images/flickr/comp-action-1.jpg"
        alt="Spartan Racing car on track at sunset"
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
          <span className="text-[clamp(2.5rem,7vw,5.5rem)] font-light text-white/70">
            Spartan Racing
          </span>
        </h1>
      </div>
    </section>
  );
}
