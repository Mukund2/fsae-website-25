"use client";

import { motion } from "motion/react";
import { useInView } from "@/hooks/use-in-view";
import { useMediaQuery } from "@/hooks/use-media-query";

type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface RevealTextProps {
  children: string;
  as?: TextElement;
  className?: string;
  delay?: number;
  splitBy?: "word" | "line";
  staggerDelay?: number;
}

export function RevealText({
  children,
  as: Tag = "p",
  className,
  delay = 0,
  splitBy = "word",
  staggerDelay = 0.05,
}: RevealTextProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  const segments =
    splitBy === "word"
      ? children.split(/(\s+)/).filter((s) => s.length > 0)
      : children.split("\n");

  if (prefersReducedMotion) {
    return (
      <div ref={ref}>
        <Tag className={className}>{children}</Tag>
      </div>
    );
  }

  return (
    <div ref={ref}>
      <Tag className={className} style={{ overflow: "hidden" }}>
        {segments.map((segment, i) => {
          const isWhitespace = /^\s+$/.test(segment);
          if (isWhitespace) {
            return <span key={i}>{segment}</span>;
          }

          const animIndex =
            splitBy === "word"
              ? segments
                  .slice(0, i)
                  .filter((s) => !/^\s+$/.test(s)).length
              : i;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
              }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ opacity: 0, y: "100%" }}
                animate={
                  isInView
                    ? { opacity: 1, y: "0%" }
                    : { opacity: 0, y: "100%" }
                }
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: delay + animIndex * staggerDelay,
                }}
              >
                {segment}
              </motion.span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
