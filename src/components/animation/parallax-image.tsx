"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "@/hooks/use-media-query";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxImageProps {
  src: string;
  alt: string;
  className?: string;
  speed?: number;
  scale?: number;
}

export function ParallaxImage({
  src,
  alt,
  className,
  speed = 0.3,
  scale = 1.1,
}: ParallaxImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)"
  );

  useEffect(() => {
    if (prefersReducedMotion) return;

    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    const yDistance = speed * 100;

    gsap.set(image, { scale, y: -yDistance });

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.to(image, {
        y: yDistance,
        ease: "none",
      }),
    });

    return () => {
      trigger.kill();
    };
  }, [speed, scale, prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ overflow: "hidden", position: "relative" }}
    >
      <div
        ref={imageRef}
        style={{
          width: "100%",
          height: "100%",
          willChange: prefersReducedMotion ? "auto" : "transform",
        }}
      >
        <img
          src={src}
          alt={alt}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
      </div>
    </div>
  );
}
