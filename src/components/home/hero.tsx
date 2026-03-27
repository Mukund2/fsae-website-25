"use client";

export function Hero() {
  return (
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Video Placeholder — full background */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A] border border-white/5">
        <span className="font-mono text-[13px] text-white/20 tracking-wide text-center px-6">
          VIDEO PLACEHOLDER — Car approaching camera at speed
        </span>
      </div>

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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <div
          className="flex flex-col items-center gap-2"
          style={{
            opacity: 0,
            animation: "heroFadeIn 0.8s ease-out 2.8s forwards",
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/30">
            Scroll
          </span>
          <div
            className="h-8 w-px bg-white/30"
            style={{
              animation: "heroScrollLine 1.8s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
