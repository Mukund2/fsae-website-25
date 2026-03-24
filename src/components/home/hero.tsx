"use client";

import { Suspense, lazy, useMemo } from "react";
import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ChevronDown } from "lucide-react";

const HeroScene = lazy(() => import("./hero-scene"));

function LetterReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const letters = useMemo(() => text.split(""), [text]);

  return (
    <span className={className} aria-label={text}>
      {letters.map((letter, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.1, 0.25, 1],
            delay: delay + i * 0.04,
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

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
            {/* Decorative gold glow on mobile */}
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
            <LetterReveal text="SPARTAN" className="text-gold" delay={0.3} />
            <br />
            <LetterReveal
              text="RACING"
              className="text-foreground"
              delay={0.6}
            />
          </h1>
          <motion.p
            className="mt-4 text-lg text-muted md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            San Jos&eacute; State University Formula SAE
          </motion.p>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 z-[2] -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-muted/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
