"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  reverse?: boolean;
}

export function Marquee({
  children,
  className,
  speed = 40,
  reverse = false,
}: MarqueeProps) {
  return (
    <div
      className={cn("overflow-hidden", className)}
      style={{ ["--marquee-speed" as string]: `${speed}s` }}
    >
      <div
        className="flex w-max gap-12"
        style={{
          animation: `marquee var(--marquee-speed) linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        <div className="flex shrink-0 gap-12">{children}</div>
        <div className="flex shrink-0 gap-12" aria-hidden="true">
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
