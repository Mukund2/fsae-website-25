"use client";

import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Background image */}
      <Image
        src="/images/sr16/car-action-1.jpg"
        alt="Spartan Racing car in action"
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />

      {/* Center content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Main title */}
        <h1
          className="font-display text-[clamp(4rem,12vw,10rem)] uppercase leading-[0.95] text-white"
          style={{
            opacity: 0,
            animation: "heroFadeIn 0.8s ease-out 1.5s forwards",
          }}
        >
          Spartan
          <br />
          Racing
        </h1>

        {/* Subtitle */}
        <p
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.3em] text-white/50"
          style={{
            opacity: 0,
            animation: "heroFadeIn 0.8s ease-out 2s forwards",
          }}
        >
          Formula SAE — San José State University
        </p>

        {/* Stats ticker */}
        <p
          className="mt-6 font-mono text-[11px] uppercase tracking-[0.3em] text-white/40"
          style={{
            opacity: 0,
            animation: "heroFadeIn 0.8s ease-out 2.4s forwards",
          }}
        >
          35+ Years · 16 Cars Built · 100+ Members · 2nd Overall 2025
        </p>
      </div>

      {/* Bottom scan line */}
      <div className="absolute bottom-0 left-0 z-10 h-px w-full bg-[#0EA5E9]/30" />
    </section>
  );
}
