"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartButton } from "@/components/merch/cart-button";

const SIMPLE_NAV_ITEMS = [
  { label: "Cars", href: "/cars" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
] as const;

const MOBILE_NAV_ITEMS = [
  { label: "Cars", href: "/cars" },
  { label: "Team", href: "/about" },
  { label: "Leads", href: "/team" },
  { label: "Racing", href: "/racing" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
] as const;

function RacingDropdown() {
  return (
    <div className="dropdown-reveal absolute left-1/2 top-full z-50 hidden w-[720px] -translate-x-1/2 rounded-lg border border-white/10 bg-[#1A1A1A] pt-6 pb-8 px-8 shadow-xl group-hover:block">
      {/* Caret / connector strip so there's no hover gap */}
      <div className="absolute -top-2 left-0 h-2 w-full" />

      <div className="grid grid-cols-3 gap-8">
        {/* Column 1 */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#FF8000]">
            What is Formula SAE?
          </h4>
          <p className="mt-3 text-[13px] leading-relaxed text-white/60">
            Formula SAE is the world&apos;s largest collegiate engineering
            competition. Student teams design, build, and race open-wheel cars
            judged on engineering excellence.
          </p>
          <Link
            href="/racing"
            className="mt-4 inline-block text-[12px] font-semibold uppercase tracking-wider text-[#FF8000] hover:text-white"
          >
            Learn more
          </Link>
        </div>

        {/* Column 2 */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#FF8000]">
            Dynamic Events
          </h4>
          <ul className="mt-3 flex flex-col gap-2">
            {["Acceleration", "Skidpad", "Autocross", "Endurance"].map(
              (event) => (
                <li key={event}>
                  <Link
                    href="/racing"
                    className="text-[13px] text-white/60 hover:text-white"
                  >
                    {event}
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Column 3 */}
        <div>
          <h4 className="font-display text-xs font-bold uppercase tracking-widest text-[#FF8000]">
            Static Events
          </h4>
          <ul className="mt-3 flex flex-col gap-2">
            {["Design", "Cost", "Business Presentation"].map((event) => (
              <li key={event}>
                <Link
                  href="/racing"
                  className="text-[13px] text-white/60 hover:text-white"
                >
                  {event}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function TeamDropdown() {
  return (
    <div className="dropdown-reveal absolute left-1/2 top-full z-50 hidden w-[320px] -translate-x-1/2 rounded-lg border border-white/10 bg-[#1A1A1A] pt-6 pb-6 px-8 shadow-xl group-hover:block">
      {/* Hover bridge */}
      <div className="absolute -top-2 left-0 h-2 w-full" />

      <div className="flex flex-col gap-4">
        <Link
          href="/about"
          className="group/item flex flex-col"
        >
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF8000]">
            Subteams
          </span>
          <span className="mt-1 text-[13px] text-white/60 group-hover/item:text-white">
            Meet the departments that build the car
          </span>
        </Link>

        <div className="h-px bg-white/10" />

        <Link
          href="/team"
          className="group/item flex flex-col"
        >
          <span className="font-display text-xs font-bold uppercase tracking-widest text-[#FF8000]">
            Leads
          </span>
          <span className="mt-1 text-[13px] text-white/60 group-hover/item:text-white">
            Executive board and subteam leads
          </span>
        </Link>
      </div>
    </div>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <style jsx global>{`
        @keyframes dropdownReveal {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .dropdown-reveal {
          animation: dropdownReveal 0.2s ease-out both;
        }
      `}</style>

      <nav className="fixed top-0 left-0 z-50 w-full px-4 pt-3 lg:px-8">
        <div className="flex w-full items-center justify-between rounded-xl bg-[#1A1A1A]/90 px-4 py-3 shadow-lg backdrop-blur-md lg:px-6">
          {/* Left: Logo + Brand */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0 });
              }
            }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/sr-logo.png"
              alt="Spartan Racing"
              width={48}
              height={27}
              className="h-7 w-auto"
            />
            <span className="font-display text-lg tracking-wider md:text-xl">
              <span className="font-bold text-gold">SPARTAN</span>{" "}
              <span className="font-bold text-blue">RACING</span>
            </span>
          </Link>

          {/* Right: Nav links + Join Us button */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <ul className="flex items-center gap-5 lg:gap-6">
              {/* Cars - simple link */}
              <li>
                <Link
                  href="/cars"
                  className={cn(
                    "text-[13px] font-medium uppercase tracking-wider",
                    isActive("/cars")
                      ? "text-[#FF8000]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Cars
                </Link>
              </li>

              {/* Team - dropdown */}
              <li className="group relative">
                <Link
                  href="/about"
                  className={cn(
                    "text-[13px] font-medium uppercase tracking-wider",
                    isActive("/about") || isActive("/team")
                      ? "text-[#FF8000]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Team
                </Link>
                <TeamDropdown />
              </li>

              {/* Racing - dropdown */}
              <li className="group relative">
                <Link
                  href="/racing"
                  className={cn(
                    "text-[13px] font-medium uppercase tracking-wider",
                    isActive("/racing")
                      ? "text-[#FF8000]"
                      : "text-white/70 hover:text-white"
                  )}
                >
                  Racing
                </Link>
                <RacingDropdown />
              </li>

              {/* Simple nav items */}
              {SIMPLE_NAV_ITEMS.filter(
                (item) => item.label !== "Cars"
              ).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider",
                      isActive(link.href)
                        ? "text-[#FF8000]"
                        : "text-white/70 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="join-btn rounded-lg bg-[#FF8000] px-5 py-2 font-display text-[13px] font-bold uppercase tracking-wider text-white"
            >
              Join Us
            </Link>

            <CartButton />
          </div>

          {/* Mobile right: cart + hamburger */}
          <div className="flex items-center gap-1 md:hidden">
            <CartButton />
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="relative z-50 flex h-10 w-10 items-center justify-center text-white"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-lg md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {MOBILE_NAV_ITEMS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-display text-3xl uppercase tracking-widest",
                isActive(link.href)
                  ? "text-[#FF8000]"
                  : "text-white/70 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-lg bg-[#FF8000] px-8 py-3 font-display text-xl font-bold uppercase tracking-wider text-white"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </>
  );
}
