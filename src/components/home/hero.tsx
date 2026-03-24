"use client";

import { useEffect, useRef, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

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

    letters.forEach((el, i) => {
      const delay = i < 7 ? 300 + i * 60 : 600 + (i - 7) * 60;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });

    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
      }
    }, 1200);

    setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.style.opacity = "1";
      }
    }, 1800);
  }, []);

  return (
    <section className="relative h-svh overflow-hidden">
      {/* Full-bleed background photo */}
      <Image
        src="/images/hero/car-action.jpg"
        alt="SJSU Spartan Racing car at golden hour"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Text overlay */}
      <div className="relative z-[2] flex h-full flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-tight">
            <span aria-label="SPARTAN">
              {"SPARTAN".split("").map((letter, i) => (
                <span
                  key={`s${i}`}
                  ref={setLetterRef(i)}
                  className="inline-block text-white"
                  style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
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
                  className="inline-block text-white/90"
                  style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}
                >
                  {letter}
                </span>
              ))}
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="mt-4 text-lg text-white/80 md:text-xl"
            style={{ textShadow: "0 1px 20px rgba(0,0,0,0.5)" }}
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
          <ChevronDown className="h-8 w-8 text-white/60" />
        </div>
      </div>
    </section>
  );
}
