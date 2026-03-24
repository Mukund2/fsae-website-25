"use client";

import { useEffect, useRef, useState, useCallback, type ComponentType } from "react";
import { ChevronDown } from "lucide-react";

interface HeroSceneProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [Scene, setScene] = useState<ComponentType<HeroSceneProps> | null>(null);

  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  const setLetterRef = useCallback(
    (i: number) => (el: HTMLSpanElement | null) => {
      lettersRef.current[i] = el;
    },
    []
  );

  // Dynamically import the 3D scene only on the client
  useEffect(() => {
    import("./hero-scene").then((mod) => {
      setScene(() => mod.default);
    });
  }, []);

  // Track scroll progress for text fade-in
  useEffect(() => {
    function handleScroll() {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const scrollable = container.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(Math.max(-rect.top / scrollable, 0), 1);
      setScrollProgress(progress);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Stagger letter reveal on mount
  useEffect(() => {
    const letters = lettersRef.current.filter(Boolean) as HTMLSpanElement[];

    letters.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(40px)";
    });
    if (subtitleRef.current) {
      subtitleRef.current.style.opacity = "0";
    }

    letters.forEach((el, i) => {
      const delay = i < 7 ? 800 + i * 60 : 1100 + (i - 7) * 60;
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, delay);
    });

    setTimeout(() => {
      if (subtitleRef.current) {
        subtitleRef.current.style.opacity = "1";
      }
    }, 1800);
  }, []);

  // Text fades out as user scrolls into the rotation zone
  const textOpacity = Math.max(0, 1 - scrollProgress * 3);
  // Scroll indicator fades quickly
  const scrollIndicatorOpacity = Math.max(0, 1 - scrollProgress * 5);

  return (
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky viewport — stays fixed while user scrolls through the 400vh */}
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-[#0a0a0a]">
        {/* 3D Canvas — fills the sticky container */}
        <div className="absolute inset-0 z-0">
          {Scene && <Scene containerRef={containerRef} />}
        </div>

        {/* Text overlay — fades out as scroll progresses */}
        <div
          className="pointer-events-none relative z-10 flex h-full flex-col items-center justify-center"
          style={{ opacity: textOpacity }}
        >
          <div className="text-center">
            <h1 className="font-display text-[clamp(3rem,12vw,10rem)] uppercase leading-[0.9] tracking-tight">
              <span aria-label="SPARTAN">
                {"SPARTAN".split("").map((letter, i) => (
                  <span
                    key={`s${i}`}
                    ref={setLetterRef(i)}
                    className="inline-block text-[#D4A843]"
                    style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
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
                    className="inline-block text-white"
                    style={{ textShadow: "0 2px 40px rgba(0,0,0,0.5)" }}
                  >
                    {letter}
                  </span>
                ))}
              </span>
            </h1>
            <p
              ref={subtitleRef}
              className="mt-4 text-lg text-white/70 md:text-xl"
            >
              San Jos&eacute; State University Formula SAE
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <div className="animate-bounce">
            <ChevronDown className="h-8 w-8 text-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
