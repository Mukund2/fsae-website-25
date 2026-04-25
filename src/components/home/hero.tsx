"use client";

import { useRef } from "react";

const JOIN_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="relative h-[85vh] min-h-[500px] w-full overflow-hidden bg-black">
      {/* B-roll video background — edge to edge.
          DO NOT MODIFY this <video> element. */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/hero-broll.mp4"
      />

      {/* Bottom legibility gradient — keeps overlay text readable
          without flattening the cinematic feel of the b-roll. */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 45%, rgba(0,0,0,0.45) 80%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Overlay content — bottom-left, intentionally asymmetric.
          Mono kicker + display headline + understated CTA. */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full px-6 pb-14 sm:pb-16 lg:px-12 lg:pb-20">
          <div className="mx-auto max-w-[1200px]">
            <div className="max-w-3xl">
              {/* Mono kicker */}
              <p
                className="hero-fade-in font-mono text-[10px] uppercase text-white/65 sm:text-[11px]"
                style={{
                  letterSpacing: "0.32em",
                  animationDelay: "1.0s",
                }}
              >
                Est. 1991  ·  San José State University
              </p>

              {/* Display headline */}
              <h1
                className="mt-4 font-display font-bold uppercase italic leading-[0.92] tracking-tight text-white sm:mt-5"
                style={{
                  fontSize: "clamp(2.75rem, 8vw, 6.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                <span
                  className="hero-fade-in inline-block"
                  style={{ animationDelay: "1.25s" }}
                >
                  Spartan
                </span>{" "}
                <span
                  className="hero-fade-in inline-block"
                  style={{
                    animationDelay: "1.45s",
                    fontFamily: "var(--font-script), serif",
                    color: "#D1B27A",
                    fontStyle: "italic",
                  }}
                >
                  Racing
                </span>
              </h1>

              {/* Tagline */}
              <p
                className="hero-fade-in mt-5 max-w-md text-[14px] leading-relaxed text-white/75 sm:text-[15px]"
                style={{ animationDelay: "1.65s" }}
              >
                The fastest Formula SAE car in the West — designed,
                built and raced by SJSU students.
              </p>

              {/* CTA + secondary link */}
              <div
                className="hero-fade-in mt-7 flex flex-wrap items-center gap-5"
                style={{ animationDelay: "1.85s" }}
              >
                <a
                  href={JOIN_FORM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hero-cta"
                >
                  Join the Team
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 15L15 5M15 5H8M15 5V12"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <a
                  href="#join-us"
                  className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 underline-offset-4 hover:text-white hover:underline"
                >
                  Or scroll to learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
