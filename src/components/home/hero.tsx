"use client";

export function Hero() {
  return (
    <section className="relative flex h-svh w-full items-center justify-center overflow-hidden bg-[#0A0A0A]">
      {/* Video placeholder */}
      <div className="absolute inset-0 flex items-center justify-center bg-[#0A0A0A]">
        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/20">
          Video placeholder: car zooming toward camera
        </p>
      </div>

      {/* Center content overlay */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Main title - appears after video would play */}
        <h1
          className="font-display text-[clamp(4rem,12vw,10rem)] uppercase leading-[0.95] text-white"
          style={{
            opacity: 0,
            animation: "heroFadeIn 0.8s ease-out 3s forwards",
          }}
        >
          Spartan
          <br />
          Racing
        </h1>
      </div>
    </section>
  );
}
