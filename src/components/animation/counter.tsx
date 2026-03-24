"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useTransform } from "motion/react";
import { useInView } from "@/hooks/use-in-view";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  duration?: number;
}

export function Counter({
  value,
  suffix = "",
  prefix = "",
  className,
  duration = 2,
}: CounterProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>({ threshold: 0.5 });
  const [hasAnimated, setHasAnimated] = useState(false);

  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(springValue, (v) =>
    `${prefix}${Math.round(v)}${suffix}`
  );

  useEffect(() => {
    if (isInView && !hasAnimated) {
      springValue.set(value);
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated, springValue, value]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
