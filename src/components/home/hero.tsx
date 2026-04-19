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

      {/* Hero wrapper — not full height, lets content below peek */}
      <section className="relative w-full px-4 pt-20 lg:px-8">
        <div className="relative flex h-[82vh] min-h-[500px] w-full items-end overflow-hidden rounded-2xl bg-black">
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

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />

          {/* Bottom content area — McLaren style */}
          <div className="relative z-10 flex w-full flex-col gap-6 p-8 pb-10 lg:p-12 lg:pb-14">
            {/* Category label */}
            <div
              className="flex items-center gap-3"
              style={{
                opacity: 0,
                animation: "heroFadeIn 0.6s ease-out 0.5s forwards",
              }}
            >
              <div className="h-px w-8 bg-[#FF8000]" />
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em] text-[#FF8000]">
                Formula SAE
              </span>
            </div>

            {/* Main headline — left-aligned, big */}
            <div
              style={{
                opacity: 0,
                animation: "heroFadeIn 0.8s ease-out 0.7s forwards",
              }}
            >
              <h1 className="font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[1.05] tracking-tight text-white">
                San Jos&eacute; State University
                <br />
                <span className="text-white/60">Spartan Racing</span>
              </h1>
            </div>

            {/* Bottom row: logo + tagline on left, scroll hint on right */}
            <div
              className="flex items-end justify-between"
              style={{
                opacity: 0,
                animation: "heroFadeIn 0.8s ease-out 1s forwards",
              }}
            >
              <div className="flex items-center gap-4">
                <Image
                  src="/images/sr-logo.png"
                  alt="SR"
                  width={40}
                  height={40}
                  className="h-10 w-auto brightness-0 invert"
                />
                <div className="h-8 w-px bg-white/20" />
                <p className="text-sm text-white/50">
                  Engineering excellence since 1991
                </p>
              </div>
            </div>
          </div>

          {/* Centered glitch logo — appears during black section of video */}
          <div
            className="absolute inset-0 z-20 flex items-center justify-center"
            style={{
              opacity: showText ? 1 : 0,
              animation: showText
                ? "heroSlam 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards"
                : "none",
              pointerEvents: "none",
            }}
          >
            <div className="hero-logo-glitch relative h-20 w-20 md:h-28 md:w-28">
              <Image
                src="/images/sr-logo.png"
                alt="SR"
                fill
                className="object-contain brightness-0 invert"
                sizes="112px"
              />
              <div className="glitch-layer-1">
                <Image
                  src="/images/sr-logo.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="112px"
                  style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(15deg)" }}
                />
              </div>
              <div className="glitch-layer-2">
                <Image
                  src="/images/sr-logo.png"
                  alt=""
                  fill
                  className="object-contain"
                  sizes="112px"
                  style={{ filter: "brightness(0) invert(1) sepia(1) saturate(5) hue-rotate(180deg)" }}
                />
              </div>
            </div>
          </div>

          {/* Decorative corner accents — McLaren style */}
          <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
            <div className="h-px w-6 bg-[#FF8000]/60" />
            <div className="h-6 w-px bg-[#FF8000]/60" />
          </div>
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            <div className="h-6 w-px bg-[#FF8000]/60" />
            <div className="h-px w-6 bg-[#FF8000]/60" />
          </div>
        </div>
      </section>
    </>
  );
}
