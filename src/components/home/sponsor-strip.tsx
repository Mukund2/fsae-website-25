"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Marquee } from "@/components/animation/marquee";

interface Sponsor {
  name: string;
  url?: string;
  logo?: string;
}

const SPONSORS: Sponsor[] = [
  { name: "Cadence", url: "https://www.cadence.com", logo: "/images/sponsors/cadence.png" },
  { name: "Military Fasteners", url: "https://www.militaryfasteners.com", logo: "/images/sponsors/military-fasteners.png" },
  { name: "Altium", url: "https://www.altium.com", logo: "/images/sponsors/altium.png" },
  { name: "Siemens", url: "https://www.siemens.com", logo: "/images/sponsors/siemens.png" },
  { name: "Ansys", url: "https://www.ansys.com", logo: "/images/sponsors/ansys.png" },
  { name: "Toray", url: "https://www.toray.com", logo: "/images/sponsors/toray.png" },
  { name: "Bergman" },
  { name: "Don Beal" },
  { name: "Roku", url: "https://www.roku.com", logo: "/images/sponsors/roku.png" },
  { name: "Motec USA", url: "https://www.motec.com.au", logo: "/images/sponsors/motec.png" },
  { name: "Levy", url: "https://www.levyrestaurants.com", logo: "/images/sponsors/levy.png" },
  { name: "BayView Plastics" },
  { name: "Phoenix Contact", url: "https://www.phoenixcontact.com", logo: "/images/sponsors/phoenix-contact.png" },
  { name: "Vi-grade", url: "https://www.vi-grade.com", logo: "/images/sponsors/vi-grade.png" },
  { name: "Cisco", url: "https://www.cisco.com", logo: "/images/sponsors/cisco.png" },
  { name: "Rapid Harness", url: "https://www.rapidharness.com", logo: "/images/sponsors/rapid-harness.png" },
  { name: "SFR SCCA", url: "https://www.sfrscca.org", logo: "/images/sponsors/sfr-scca.png" },
  { name: "Candy Store Foundation" },
  { name: "Lucid Motors", url: "https://www.lucidmotors.com", logo: "/images/sponsors/lucid-motors.png" },
  { name: "Marin Design Works" },
  { name: "Mountz Torque", url: "https://www.mountztorque.com", logo: "/images/sponsors/mountz-torque.png" },
  { name: "Evonik", url: "https://www.evonik.com", logo: "/images/sponsors/evonik.png" },
  { name: "Futek", url: "https://www.futek.com", logo: "/images/sponsors/futek.svg" },
  { name: "About Energy", url: "https://www.aboutenergy.io", logo: "/images/sponsors/about-energy.png" },
  { name: "Rivian", url: "https://www.rivian.com", logo: "/images/sponsors/rivian.png" },
  { name: "Volkswagen Group", url: "https://www.volkswagenag.com", logo: "/images/sponsors/volkswagen.svg" },
  { name: "Star One Credit Union", url: "https://www.starone.org", logo: "/images/sponsors/star-one.svg" },
  { name: "Airtech", url: "https://www.airtechintl.com", logo: "/images/sponsors/airtech.png" },
  { name: "Sabalcore", url: "https://www.sabalcore.com", logo: "/images/sponsors/sabalcore.png" },
  { name: "LCL Machining" },
  { name: "KLA", url: "https://www.kla.com", logo: "/images/sponsors/kla.png" },
  { name: "Amex", url: "https://www.americanexpress.com", logo: "/images/sponsors/amex.png" },
  { name: "Rexco", url: "https://www.rfrexco.com" },
  { name: "Chemtrend", url: "https://www.chemtrend.com", logo: "/images/sponsors/chemtrend.png" },
  { name: "SMC", url: "https://www.smcusa.com", logo: "/images/sponsors/smc.png" },
  { name: "Dremel", url: "https://www.dremel.com", logo: "/images/sponsors/dremel.png" },
  { name: "FibreGlast", url: "https://www.fibreglast.com", logo: "/images/sponsors/fibreglast.svg" },
  { name: "XRP", url: "https://www.xrp.com", logo: "/images/sponsors/xrp.png" },
  { name: "Matter Hackers", url: "https://www.matterhackers.com", logo: "/images/sponsors/matter-hackers.png" },
  { name: "Bender", url: "https://www.benderinc.com", logo: "/images/sponsors/bender.svg" },
  { name: "VectorNav", url: "https://www.vectornav.com", logo: "/images/sponsors/vectornav.svg" },
  { name: "Glenrock Builders" },
  { name: "Bojo Tools", url: "https://www.bojotools.com", logo: "/images/sponsors/bojo-tools.png" },
  { name: "Garner Heat Treat" },
  { name: "Bay Technology Mfg" },
  { name: "Curvilinear Components" },
  { name: "Shining 3D", url: "https://www.shining3d.com", logo: "/images/sponsors/shining-3d.png" },
  { name: "TE Connectivity", url: "https://www.te.com", logo: "/images/sponsors/te-connectivity.svg" },
  { name: "Prismatic Powders", url: "https://www.prismaticpowders.com", logo: "/images/sponsors/prismatic-powders.png" },
  { name: "Valence Precision" },
];

function SponsorItem({ sponsor }: { sponsor: Sponsor }) {
  const inner = sponsor.logo ? (
    <Image
      src={sponsor.logo}
      alt={sponsor.name}
      width={140}
      height={48}
      className="h-7 w-auto object-contain opacity-40 sm:h-9"
      style={{ filter: "grayscale(100%)" }}
    />
  ) : (
    <span className="whitespace-nowrap font-display text-base uppercase tracking-[0.15em] text-foreground/30 sm:text-lg">
      {sponsor.name}
    </span>
  );

  if (sponsor.url) {
    return (
      <a href={sponsor.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
        {inner}
      </a>
    );
  }

  return <span className="flex items-center">{inner}</span>;
}

function animateElement(
  el: HTMLElement,
  from: { x?: number; y?: number; opacity?: number },
  to: { x?: number; y?: number; opacity?: number },
  duration: number,
  delay: number
) {
  const startX = from.x ?? 0;
  const startY = from.y ?? 0;
  const startO = from.opacity ?? 0;
  const endX = to.x ?? 0;
  const endY = to.y ?? 0;
  const endO = to.opacity ?? 1;

  el.style.opacity = String(startO);
  el.style.transform = `translate(${startX}px, ${startY}px)`;

  setTimeout(() => {
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      const currentX = startX + (endX - startX) * eased;
      const currentY = startY + (endY - startY) * eased;
      const currentO = startO + (endO - startO) * eased;

      el.style.opacity = String(currentO);
      el.style.transform = `translate(${currentX}px, ${currentY}px)`;

      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, delay);
}

export function SponsorStrip() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const animEls = section.querySelectorAll<HTMLElement>("[data-anim]");
    animEls.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateX(-40px)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animEls.forEach((el, i) => {
              animateElement(
                el,
                { x: -40, opacity: 0 },
                { x: 0, opacity: 1 },
                600,
                i * 100
              );
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div data-anim>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] uppercase leading-[0.95] tracking-tight">
              <span className="font-bold text-foreground">Trusted by</span>
              <br />
              <span className="font-light text-foreground/40">Our Sponsors</span>
            </h2>
          </div>
          <Link
            href="/sponsors"
            data-anim
            className="inline-flex items-center gap-2 font-mono text-[13px] uppercase tracking-[0.15em] text-gold"
          >
            View All Sponsors
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
              <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="relative mt-10">
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-gradient-to-r from-white to-transparent sm:w-52" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-gradient-to-l from-white to-transparent sm:w-52" />

        <Marquee speed={120} gap="gap-16 sm:gap-20">
          {SPONSORS.map((sponsor) => (
            <SponsorItem key={sponsor.name} sponsor={sponsor} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
