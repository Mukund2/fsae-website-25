"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/layout/section";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Section className="relative overflow-hidden text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>

      <div ref={ref} className="relative z-10">
        <h2
          className="font-display text-5xl uppercase tracking-tight md:text-7xl lg:text-8xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(30px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          Join <span className="text-gradient-gold">Spartan Racing</span>
        </h2>
        <p
          className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s",
          }}
        >
          Be part of something extraordinary. No experience required — just passion and dedication.
        </p>
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out 0.3s, transform 0.6s ease-out 0.3s",
          }}
        >
          <a
            href="/join"
            className="glow-gold mt-10 inline-block rounded-none bg-gold px-12 py-5 font-display text-xl uppercase tracking-wider text-background transition-all hover:bg-gold/90 hover:shadow-[0_0_50px_rgba(212,168,67,0.4)]"
          >
            Get Involved
          </a>
        </div>
      </div>
    </Section>
  );
}
