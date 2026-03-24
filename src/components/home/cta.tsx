"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/section";
import { useInView } from "@/hooks/use-in-view";

export function CTA() {
  const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.3 });

  return (
    <Section className="text-center">
      <div ref={ref}>
        <motion.h2
          className="font-display text-4xl uppercase tracking-tight md:text-6xl lg:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Join{" "}
          <span className="text-gold">Spartan Racing</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-4 max-w-xl text-lg text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.15,
          }}
        >
          Be part of something extraordinary. No experience required — just
          passion and dedication.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
          }}
        >
          <a
            href="/join"
            className="mt-8 inline-block rounded-none bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-all hover:bg-gold/90 hover:shadow-[0_0_30px_rgba(212,168,67,0.3)]"
          >
            Get Involved
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
