"use client";

import { motion } from "motion/react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Children } from "react";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

const containerVariants = (delay: number, staggerDelay: number) => ({
  hidden: {},
  visible: {
    transition: {
      delayChildren: delay,
      staggerChildren: staggerDelay,
    },
  },
});

const childVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
    },
  },
};

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(delay, staggerDelay)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {Children.map(children, (child) => (
        <motion.div variants={childVariants}>{child}</motion.div>
      ))}
    </motion.div>
  );
}
