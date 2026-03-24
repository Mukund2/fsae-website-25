"use client";

import { motion } from "motion/react";
import { Section } from "@/components/layout/section";

export function CTA() {
  return (
    <Section className="relative overflow-hidden text-center">
      {/* Background radial glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <div className="h-[500px] w-[500px] rounded-full bg-gold/[0.06] blur-[120px]" />
      </div>

      <div className="relative z-10">
        <motion.h2
          className="font-display text-5xl uppercase tracking-tight md:text-7xl lg:text-8xl"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Join{" "}
          <span className="text-gradient-gold">Spartan Racing</span>
        </motion.h2>
        <motion.p
          className="mx-auto mt-6 max-w-xl text-lg text-muted md:text-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
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
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1, margin: "100px" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
            delay: 0.3,
          }}
        >
          <a
            href="/join"
            className="glow-gold mt-10 inline-block rounded-none bg-gold px-12 py-5 font-display text-xl uppercase tracking-wider text-background transition-all hover:bg-gold/90 hover:shadow-[0_0_50px_rgba(212,168,67,0.4)]"
          >
            Get Involved
          </a>
        </motion.div>
      </div>
    </Section>
  );
}
