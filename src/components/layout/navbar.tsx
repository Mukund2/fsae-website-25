"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

interface DropdownCard {
  title: string;
  href: string;
  image: string;
}

const TEAM_CARDS: DropdownCard[] = [
  { title: "Subteams", href: "/about", image: "/images/team/team-1.jpg" },
  { title: "Leads", href: "/team", image: "/images/team/team-group.jpg" },
];

const RACING_CARDS: DropdownCard[] = [
  { title: "Static Events", href: "/racing#static-events", image: "/images/flickr/comp-action-2.jpg" },
  { title: "Dynamic Events", href: "/racing#acceleration", image: "/images/flickr/driver-day-1.jpg" },
];

function MegaDropdown({ cards, state }: { cards: DropdownCard[]; state: "open" | "closing" | "closed" }) {
  if (state === "closed") return null;

  return (
    <div
      className={cn(
        "overflow-hidden bg-white",
        state === "open" ? "mega-dropdown-open" : "mega-dropdown-close"
      )}
    >
      <div className="flex gap-3 px-6 py-5">
        {cards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group/card relative flex-1 overflow-hidden"
            style={{ aspectRatio: "16/9" }}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="(max-width: 1200px) 33vw, 400px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <span className="absolute bottom-4 left-5 font-display text-[clamp(0.9rem,1.5vw,1.25rem)] font-bold uppercase tracking-wide text-white">
              {card.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function useDropdown() {
  const [state, setState] = useState<"open" | "closing" | "closed">("closed");
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const open = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setState("open");
  }, []);

  const close = useCallback(() => {
    clearTimeout(timeoutRef.current);
    setState((prev) => {
      if (prev !== "open") return prev;
      timeoutRef.current = setTimeout(() => setState("closed"), 280);
      return "closing";
    });
  }, []);

  const cancel = useCallback(() => {
    clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return { state, open, close, cancel };
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const team = useDropdown();
  const racing = useDropdown();
  const navRef = useRef<HTMLElement>(null);

  // Close all dropdowns on route change
  useEffect(() => {
    team.close();
    racing.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

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

  // Handlers that open one dropdown and close others
  const teamEnter = () => { racing.close(); team.open(); };
  const racingEnter = () => { team.close(); racing.open(); };

  return (
    <>
      <style jsx global>{`
        @keyframes megaDown {
          from { opacity: 0; max-height: 0; }
          to   { opacity: 1; max-height: 400px; }
        }
        @keyframes megaUp {
          from { opacity: 1; max-height: 400px; }
          to   { opacity: 0; max-height: 0; }
        }
        .mega-dropdown-open {
          animation: megaDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .mega-dropdown-close {
          animation: megaUp 0.28s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          pointer-events: none;
        }
      `}</style>

      <nav
        ref={navRef}
        className="fixed top-0 left-0 z-50 flex w-full justify-center px-4 py-3 sm:px-6 lg:px-12"
        onMouseLeave={() => { team.close(); racing.close(); }}
      >
        <div className="relative flex w-full max-w-[1200px] flex-col border-b border-border/30 bg-white">
          <div className="flex items-center justify-between px-6 py-3">
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
                <li
                  onMouseEnter={() => { team.close(); racing.close(); }}
                >
                  <Link
                    href="/cars"
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider",
                      isActive("/cars")
                        ? "text-[#FF8000]"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    Cars
                  </Link>
                </li>

                {/* Team - mega dropdown */}
                <li
                  onMouseEnter={teamEnter}
                >
                  <button
                    type="button"
                    onClick={teamEnter}
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider cursor-pointer",
                      isActive("/about") || isActive("/team") || team.state === "open"
                        ? "text-[#FF8000]"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    Team
                  </button>
                </li>

                {/* Racing - mega dropdown */}
                <li
                  onMouseEnter={racingEnter}
                >
                  <button
                    type="button"
                    onClick={racingEnter}
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider cursor-pointer",
                      isActive("/racing") || racing.state === "open"
                        ? "text-[#FF8000]"
                        : "text-foreground/60 hover:text-foreground"
                    )}
                  >
                    Racing
                  </button>
                </li>

                {/* Simple nav items */}
                {SIMPLE_NAV_ITEMS.filter(
                  (item) => item.label !== "Cars"
                ).map((link) => (
                  <li
                    key={link.href}
                    onMouseEnter={() => { team.close(); racing.close(); }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "text-[13px] font-medium uppercase tracking-wider",
                        isActive(link.href)
                          ? "text-[#FF8000]"
                          : "text-foreground/60 hover:text-foreground"
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
                className="join-btn bg-gold px-5 py-2 font-display text-[13px] font-bold uppercase tracking-wider text-white"
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
                className="relative z-50 flex h-10 w-10 items-center justify-center text-foreground"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mega dropdowns render inside the nav container */}
          <MegaDropdown cards={TEAM_CARDS} state={team.state} />
          <MegaDropdown cards={RACING_CARDS} state={racing.state} />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg md:hidden",
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
                "font-display text-2xl sm:text-3xl uppercase tracking-widest",
                isActive(link.href)
                  ? "text-[#FF8000]"
                  : "text-foreground/60 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-[#FF8000] px-8 py-3 font-display text-xl font-bold uppercase tracking-wider text-white"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </>
  );
}
