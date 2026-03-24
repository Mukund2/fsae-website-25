"use client";

import { useEffect, useState } from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger animation on next frame after mount
    requestAnimationFrame(() => setMounted(true));
  }, []);

  return (
    <div
      style={{
        opacity: mounted ? 1 : 0,
        transform: mounted ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
      }}
    >
      {children}
    </div>
  );
}
