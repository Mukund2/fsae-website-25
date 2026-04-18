"use client";

import { useEffect, useRef, useState } from "react";

const BLACK_START = 3.33;
const BLACK_END = 5.63;

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showText, setShowText] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const check = () => {
      const t = video.currentTime;
      const shouldShow = t >= BLACK_START && t <= BLACK_END;
      setShowText((prev) => {
        if (prev !== shouldShow) return shouldShow;
        return prev;
      });
      rafRef.current = requestAnimationFrame(check);
    };

    rafRef.current = requestAnimationFrame(check);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className="relative flex h-screen items-center justify-center overflow-hidden bg-black">
      {/* B-roll video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-broll.mp4"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* SPARTAN RACING text - appears during black section */}
      <div
        className="relative z-10 text-center"
        style={{
          opacity: showText ? 1 : 0,
          animation: showText
            ? "heroFadeIn 0.4s ease-out forwards"
            : "heroFadeOut 0.3s ease-in forwards",
        }}
      >
        <h1 className="font-display uppercase leading-[0.92] tracking-tight">
          <span className="block text-[clamp(3rem,8vw,7rem)] font-bold">
            <span className="text-gold">Spartan</span>{" "}
            <span className="text-blue">Racing</span>
          </span>
        </h1>
      </div>

      {/* Bottom subtitle - always visible */}
      <div
        className="absolute bottom-0 left-0 z-10 w-full px-6 pb-10 lg:px-12"
        style={{
          opacity: 0,
          animation: "heroFadeIn 0.8s ease-out 1s forwards",
        }}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-white/50">
          Formula SAE
        </p>
      </div>
    </section>
  );
}
