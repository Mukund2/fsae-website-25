"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

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
    <>
      <style jsx global>{`
        @keyframes heroSlam {
          0% {
            opacity: 0;
            transform: scale(3) translateY(-20px);
            filter: blur(8px);
          }
          60% {
            opacity: 1;
            transform: scale(0.95) translateY(2px);
            filter: blur(0);
          }
          75% {
            transform: scale(1.02) translateY(-1px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
            filter: blur(0);
          }
        }

        @keyframes heroSlamOut {
          0% {
            opacity: 1;
            transform: scale(1);
            filter: blur(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.8) translateY(10px);
            filter: blur(4px);
          }
        }

        @keyframes glitchLogo {
          0%, 100% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
          5% {
            transform: translate(-3px, 1px);
            filter: brightness(1.5) hue-rotate(20deg);
          }
          10% {
            transform: translate(2px, -2px);
            filter: brightness(0.8) hue-rotate(-15deg);
          }
          15% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
          40% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
          42% {
            transform: translate(4px, 0);
            filter: brightness(1.8);
          }
          44% {
            transform: translate(-2px, 1px);
            filter: brightness(0.6);
          }
          46% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
          70% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
          72% {
            transform: translate(-1px, -2px);
            filter: brightness(1.3) hue-rotate(10deg);
          }
          74% {
            transform: translate(3px, 1px);
            filter: brightness(0.7);
          }
          76% {
            transform: translate(0, 0);
            filter: brightness(1);
          }
        }

        @keyframes glitchClip1 {
          0%, 100% { clip-path: inset(0 0 100% 0); }
          5% { clip-path: inset(20% 0 60% 0); }
          10% { clip-path: inset(50% 0 20% 0); }
          15%, 40% { clip-path: inset(0 0 100% 0); }
          42% { clip-path: inset(30% 0 40% 0); }
          44% { clip-path: inset(70% 0 10% 0); }
          46%, 70% { clip-path: inset(0 0 100% 0); }
          72% { clip-path: inset(10% 0 70% 0); }
          74% { clip-path: inset(60% 0 20% 0); }
          76% { clip-path: inset(0 0 100% 0); }
        }

        @keyframes glitchClip2 {
          0%, 100% { clip-path: inset(0 0 100% 0); }
          5% { clip-path: inset(60% 0 20% 0); }
          10% { clip-path: inset(10% 0 70% 0); }
          15%, 40% { clip-path: inset(0 0 100% 0); }
          42% { clip-path: inset(50% 0 30% 0); }
          44% { clip-path: inset(15% 0 65% 0); }
          46%, 70% { clip-path: inset(0 0 100% 0); }
          72% { clip-path: inset(40% 0 40% 0); }
          74% { clip-path: inset(5% 0 80% 0); }
          76% { clip-path: inset(0 0 100% 0); }
        }

        .hero-logo-glitch {
          animation: glitchLogo 2s ease-in-out infinite;
        }

        .hero-logo-glitch::before,
        .hero-logo-glitch::after {
          content: '';
          position: absolute;
          inset: 0;
          background: inherit;
        }

        .glitch-layer-1 {
          position: absolute;
          inset: 0;
          animation: glitchClip1 2s ease-in-out infinite;
          transform: translate(4px, -2px);
          opacity: 0.7;
          mix-blend-mode: screen;
        }

        .glitch-layer-2 {
          position: absolute;
          inset: 0;
          animation: glitchClip2 2s ease-in-out infinite;
          transform: translate(-4px, 2px);
          opacity: 0.7;
          mix-blend-mode: screen;
        }
      `}</style>

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

        {/* SPARTAN RACING text + glitch logo - appears during black section */}
        <div
          className="relative z-10 flex flex-col items-center gap-6"
          style={{
            opacity: showText ? 1 : 0,
            animation: showText
              ? "heroSlam 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
              : "none",
          }}
        >
          {/* Glitching SR Logo */}
          <div className="hero-logo-glitch relative h-16 w-16 md:h-20 md:w-20">
            <Image
              src="/images/sr-logo.png"
              alt="SR"
              fill
              className="object-contain brightness-0 invert"
              sizes="80px"
            />
            {/* Glitch layers */}
            <div className="glitch-layer-1">
              <Image
                src="/images/sr-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="80px"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(15deg)" }}
              />
            </div>
            <div className="glitch-layer-2">
              <Image
                src="/images/sr-logo.png"
                alt=""
                fill
                className="object-contain"
                sizes="80px"
                style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)" }}
              />
            </div>
          </div>

          {/* SPARTAN RACING text */}
          <h1 className="font-display uppercase leading-[0.92] tracking-tight text-center">
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
    </>
  );
}
