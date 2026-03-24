"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border bg-white/80 backdrop-blur-md"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand */}
          <Link href="/" className="group flex items-center gap-1">
            <span className="font-display text-2xl tracking-wider md:text-[1.7rem]">
              <span
                className={cn(
                  "transition-colors group-hover:text-[#e4bc63]",
                  scrolled ? "text-gold" : "text-gold"
                )}
              >
                SPARTAN
              </span>{" "}
              <span className={scrolled ? "text-foreground" : "text-white"}>
                RACING
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "relative py-1 text-sm font-medium uppercase tracking-widest transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2",
                    scrolled
                      ? isActive(link.href)
                        ? "text-gold"
                        : "text-foreground/70 hover:text-foreground"
                      : isActive(link.href)
                        ? "text-gold"
                        : "text-white/80 hover:text-white"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-[1.5px] bg-gold transition-all duration-300",
                      isActive(link.href) ? "w-full" : "w-0"
                    )}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "relative z-50 flex h-10 w-10 items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 md:hidden",
              mobileOpen
                ? "text-foreground"
                : scrolled
                  ? "text-foreground"
                  : "text-white"
            )}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_LINKS.map((link, i) => (
            <div
              key={link.href}
              style={{
                opacity: mobileOpen ? 1 : 0,
                transform: mobileOpen ? "translateX(0)" : "translateX(40px)",
                transition: `opacity 0.3s ease-out ${mobileOpen ? 0.05 * i : 0}s, transform 0.3s ease-out ${mobileOpen ? 0.05 * i : 0}s`,
              }}
            >
              <Link
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "font-display text-3xl uppercase tracking-widest transition-colors duration-200",
                  isActive(link.href)
                    ? "text-gold"
                    : "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
