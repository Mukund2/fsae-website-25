"use client";

import { Suspense, lazy } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronDown } from "lucide-react";

const HeroScene = lazy(() => import("./hero-scene"));

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="relative h-svh overflow-hidden bg-background">
      {/* 3D Canvas background */}
      <div className="absolute inset-0">
        {!isMobile ? (
          <Suspense
            fallback={
              <div className="h-full w-full bg-gradient-to-b from-background via-surface to-background" />
            }
          >
            <HeroScene />
          </Suspense>
        ) : (
          <div className="h-full w-full bg-gradient-to-b from-background via-surface to-background">
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/5 blur-3xl" />
          </div>
        )}
      </div>

      {/* Gradient overlay for text legibility */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-background/80 via-transparent to-background/30" />

      {/* Text overlay — uses CSS keyframes instead of Motion to avoid AnimatePresence conflicts */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-tight">
            <span aria-label="SPARTAN">
              {"SPARTAN".split("").map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block text-gold"
                  style={{ animationDelay: `${0.3 + i * 0.04}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
            <br />
            <span aria-label="RACING">
              {"RACING".split("").map((letter, i) => (
                <span
                  key={i}
                  className="hero-letter inline-block text-foreground"
                  style={{ animationDelay: `${0.6 + i * 0.04}s` }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="hero-fade-in mt-4 text-lg text-muted md:text-xl"
            style={{ animationDelay: "1.2s" }}
          >
            San Jos&eacute; State University Formula SAE
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="hero-fade-in absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
        style={{ animationDelay: "1.8s" }}
      >
        <div className="animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted/50" />
        </div>
      </div>
    </section>
  );
}
