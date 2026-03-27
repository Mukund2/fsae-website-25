"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
  gap?: string;
}

export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
  gap = "gap-12",
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ ["--marquee-speed" as string]: `${speed}s` }}
    >
      <div
        className={cn("flex w-max", gap)}
        style={{
          animation: `marquee var(--marquee-speed) linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        <div className={cn("flex shrink-0", gap)}>{children}</div>
        <div className={cn("flex shrink-0", gap)} aria-hidden="true">
          {children}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
