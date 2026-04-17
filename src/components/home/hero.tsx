"use client";

export function Hero() {
  return (
    <section className="relative flex h-screen items-end overflow-hidden bg-[#1A1A1A]">
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-white/30">
          Video Coming Soon
        </p>
      </div>

      {/* Gradient overlay - darker at bottom for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Bottom-left content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 lg:px-12"
        style={{
          opacity: 0,
          animation: "heroFadeIn 0.8s ease-out 0.5s forwards",
        }}
      >
        <h1 className="font-display uppercase leading-[0.92] tracking-tight">
          <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white">
            Spartan Racing
          </span>
          <span className="block text-[clamp(2.5rem,7vw,5.5rem)] font-bold text-white">
            Formula SAE
          </span>
        </h1>
      </div>
    </section>
  );
}
