"use client";

import { useEffect, useRef, useState, Children } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
}: StaggerChildrenProps) {
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = containerRef.current;
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
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={containerRef} className={className}>
      {Children.map(children, (child, i) => {
        const totalDelay = delay + i * staggerDelay;
        return (
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.5s ease-out ${totalDelay}s, transform 0.5s ease-out ${totalDelay}s`,
            }}
          >
            {child}
          </div>
        );
      })}
    </div>
  );
}
