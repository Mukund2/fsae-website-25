"use client";

export function Hero() {
  return (
    <section className="relative flex h-svh w-full items-end overflow-hidden bg-[#0A0A0A]">
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/20">
          Video placeholder: car approaching camera
        </p>
      </div>

      {/* Bottom-left content */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16"
        style={{
          opacity: 0,
          animation: "heroFadeIn 0.8s ease-out 2s forwards",
        }}
      >
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.4em] text-white/60">
          Formula SAE
        </p>
        <h1 className="font-display text-[clamp(3rem,8vw,7rem)] font-bold uppercase leading-[0.95] text-white">
          Spartan
          <br />
          Racing
        </h1>
        <p className="mt-4 font-mono text-sm tracking-wide text-white/50">
          San Jose State University
        </p>
      </div>
    </section>
  );
}
