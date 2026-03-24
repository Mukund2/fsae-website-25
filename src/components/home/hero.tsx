"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const setLetterRef = useCallback(
    (i: number) => (el: HTMLSpanElement | null) => {
      lettersRef.current[i] = el;
    },
    []
  );

  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    // Start hidden
    letters.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    });
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = "0";
    }
    if (scrollRef.current) {
      scrollRef.current.style.opacity = "0";
    }

    // Stagger reveal each letter — no CSS transition, just direct set
    letters.forEach((el, i) => {
      const delay = i < 7 ? 300 + i * 60 : 600 + (i - 7) * 60;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });

    // Subtitle
    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
      }
    }, 1200);

    // Scroll indicator
    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = "1";
      }
    }, 1800);
  }, []);

  return (
    <section className="relative h-svh overflow-hidden bg-background">
      {/* Background effects */}
      <div className="absolute inset-0">
        <div className="h-full w-full bg-gradient-to-b from-background via-surface to-background" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[120px]" />
        <div className="absolute left-1/3 top-1/3 h-64 w-64 rounded-full bg-blue/[0.04] blur-[100px]" />
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
                  key={`s${i}`}
                  ref={setLetterRef(i)}
                  className="inline-block text-gold"
                >
                  {letter}
                </span>
              ))}
            </span>
            <br />
            <span aria-label="RACING">
              {"RACING".split("").map((letter, i) => (
                <span
                  key={`r${i}`}
                  ref={setLetterRef(7 + i)}
                  className="inline-block text-foreground"
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-lg text-muted md:text-xl"
          >
            San Jos&eacute; State University Formula SAE
          </p>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
      >
        <div className="animate-bounce">
          <ChevronDown className="h-8 w-8 text-muted/50" />
        </div>
      </div>
    </section>
  );
}
