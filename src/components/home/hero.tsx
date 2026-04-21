"use client";

import { useRef } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden bg-black">
      {/* B-roll video background — edge to edge */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-broll.mp4"
      />

    </section>
  );
}
