"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";

export function Hero() {
  const [Scene, setScene] = useState<ComponentType | null>(null);

  // Refs for entrance animations
  const labelRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const carColRef = useRef<HTMLDivElement>(null);

  // Dynamic import of 3D scene
  useEffect(() => {
    import("./hero-scene").then((mod) => {
      setScene(() => mod.default);
    });
  }, []);

  // Entrance animations using direct DOM manipulation (no CSS transitions)
  useEffect(() => {
    const els = [
      { ref: labelRef, delay: 300, from: "translateY(30px)" },
      { ref: headlineRef, delay: 500, from: "translateY(40px)" },
      { ref: statsRef, delay: 700, from: "translateY(20px)" },
      { ref: badgeRef, delay: 900, from: "translateY(20px)" },
    ];

    // Set initial state
    els.forEach(({ ref }) => {
      if (ref.current) {
        ref.current.style.opacity = "0";
        ref.current.style.transform = "translateY(30px)";
      }
    });

    if (carColRef.current) {
      carColRef.current.style.opacity = "0";
      carColRef.current.style.transform = "translate(-40px, -50%)";
    }

    // Animate car column in
    setTimeout(() => {
      if (!carColRef.current) return;
      const el = carColRef.current;
      const start = performance.now();
      const duration = 800;
      function animateCar(now: number) {
        const t = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - t, 3); // ease-out cubic
        el.style.opacity = String(t > 0.05 ? Math.min(ease * 1.5, 1) : 0);
        el.style.transform = `translate(${-40 * (1 - ease)}px, -50%)`;
        if (t < 1) requestAnimationFrame(animateCar);
      }
      requestAnimationFrame(animateCar);
    }, 200);

    // Stagger text elements in
    els.forEach(({ ref, delay, from }) => {
      setTimeout(() => {
        if (!ref.current) return;
        const el = ref.current;
        const start = performance.now();
        const duration = 700;
        // Parse initial Y offset
        const match = from.match(/(-?\d+)/);
        const fromY = match ? parseInt(match[1]) : 30;
        function animateEl(now: number) {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 3);
          el.style.opacity = String(Math.min(ease * 1.3, 1));
          el.style.transform = `translateY(${fromY * (1 - ease)}px)`;
          if (t < 1) requestAnimationFrame(animateEl);
        }
        requestAnimationFrame(animateEl);
      }, delay);
    });
  }, []);

  return (
    <section className="relative h-svh w-full overflow-hidden bg-[var(--background)]">
      <div className="mx-auto flex h-full max-w-[1400px] items-center px-6 lg:px-12">
        {/* Left Column — 3D Car (square canvas for correct aspect) */}
        <div
          ref={carColRef}
          className="pointer-events-none absolute left-0 top-1/2 z-0 md:left-[-5%]"
          style={{ width: "min(55vw, 600px)", height: "min(55vw, 600px)" }}
        >
          {Scene && <Scene />}
        </div>

        {/* Right Column — Typography */}
        <div className="relative z-10 ml-auto flex w-full flex-col justify-center md:w-[55%] md:pl-8 lg:pl-16">
          {/* Label */}
          <div ref={labelRef} className="mb-6">
            <span
              className="font-body text-[14px] font-light uppercase tracking-[8px] text-[var(--muted)]"
            >
              Spartan
            </span>
            <br />
            <span
              className="font-body text-[32px] font-extralight uppercase tracking-[2px] text-[var(--foreground)]"
              style={{ lineHeight: 1.1 }}
            >
              Racing
            </span>
          </div>

          {/* Big Headline */}
          <h1
            ref={headlineRef}
            className="font-display text-[clamp(3rem,7vw,6.5rem)] uppercase leading-[0.95] tracking-tight text-[var(--foreground)]"
          >
            Built by
            <br />
            Students.
            <br />
            <span className="text-[var(--gold)]">Driven</span> to
            <br />
            Compete.
          </h1>

          {/* Stats line */}
          <div
            ref={statsRef}
            className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2"
          >
            {["16 Cars Built", "100+ Members", "7 Subteams"].map((stat) => (
              <span
                key={stat}
                className="font-body text-[12px] uppercase tracking-[4px] text-[var(--muted)]"
              >
                {stat}
              </span>
            ))}
          </div>

          {/* Est. badge */}
          <div ref={badgeRef} className="mt-6">
            <span className="inline-block bg-[var(--foreground)] px-4 py-2 font-display text-[14px] uppercase tracking-[3px] text-[var(--background)]">
              Est. 1991
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
