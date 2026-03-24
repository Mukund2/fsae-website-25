"use client";

import { Suspense, lazy, useEffect, useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronDown } from "lucide-react";

const HeroScene = lazy(() => import("./hero-scene"));

export function Hero() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger animations after hydration
    const timer = setTimeout(() => setShow(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

      {/* Text overlay */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-tight">
            <span aria-label="SPARTAN">
              {"SPARTAN".split("").map((letter, i) => (
                <span
                  key={i}
                  className="inline-block text-gold transition-all duration-500 ease-out"
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${300 + i * 40}ms`,
                  }}
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
                  className="inline-block text-foreground transition-all duration-500 ease-out"
                  style={{
                    opacity: show ? 1 : 0,
                    transform: show ? "translateY(0)" : "translateY(40px)",
                    transitionDelay: `${600 + i * 40}ms`,
                  }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p
            className="mt-4 text-lg text-muted transition-all duration-600 ease-out md:text-xl"
            style={{
              opacity: show ? 1 : 0,
              transform: show ? "translateY(0)" : "translateY(20px)",
              transitionDelay: "1200ms",
            }}
          >
            San Jos&eacute; State University Formula SAE
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2 transition-opacity duration-600"
        style={{
          opacity: show ? 1 : 0,
          transitionDelay: "1800ms",
        }}
      >
        <div className="animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted/50" />
        </div>
      </div>
    </section>
  );
}
