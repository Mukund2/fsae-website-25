"use client";

import { useEffect, useRef, useState } from "react";
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
  const prefersReducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setRevealed(true);
      return;
    }
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const segments =
    splitBy === "word"
      ? children.split(/(\s+)/).filter((s) => s.length > 0)
      : children.split("\n");

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>;
  }

  let wordIndex = 0;

  return (
    <div ref={containerRef}>
      <Tag className={className} style={{ overflow: "hidden" }}>
        {segments.map((segment, i) => {
          const isWhitespace = /^\s+$/.test(segment);
          if (isWhitespace) {
            return <span key={i}>{segment}</span>;
          }

          const currentWordIndex = wordIndex++;
          const totalDelay = delay + currentWordIndex * staggerDelay;

          return (
            <span
              key={i}
              style={{
                display: "inline-block",
                overflow: "hidden",
                verticalAlign: "top",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "translateY(0)" : "translateY(100%)",
                  transition: `opacity 0.5s ease-out ${totalDelay}s, transform 0.5s ease-out ${totalDelay}s`,
                }}
              >
                {segment}
              </span>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
