"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Cars", href: "/cars" },
  { label: "Team", href: "/about" },
  { label: "Leads", href: "/team" },
  { label: "Racing", href: "/racing" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Contact", href: "/contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const isHome = pathname === "/";

  return (
    <>
      {/* Orange top line - McLaren style */}
      <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-gold" />

      <nav
        className={cn(
          "fixed top-1 left-0 z-50 w-full",
          isHome && !scrolled
            ? "bg-transparent"
            : "bg-white border-b border-border"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Brand - McLaren style: bold/light two-weight */}
          <Link
            href="/"
            onClick={(e) => {
              if (pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0 });
              }
            }}
            className="group flex items-center"
          >
            <span className={cn(
              "font-display text-xl tracking-wider md:text-2xl",
              isHome && !scrolled ? "text-white" : "text-foreground"
            )}>
              <span className="font-bold">SPARTAN</span>{" "}
              <span className="font-light opacity-60">RACING</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6">
              {NAV_ITEMS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider",
                      isHome && !scrolled
                        ? isActive(link.href)
                          ? "text-gold"
                          : "text-white/80 hover:text-white"
                        : isActive(link.href)
                          ? "text-gold"
                          : "text-foreground/70 hover:text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Orange accent button - McLaren "Racing Club" style */}
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gold px-5 py-2 font-display text-[13px] font-bold uppercase tracking-wider text-white"
            >
              Join Us
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className={cn(
              "relative z-50 flex h-10 w-10 items-center justify-center md:hidden",
              isHome && !scrolled && !mobileOpen ? "text-white" : "text-foreground"
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
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-white/95 backdrop-blur-lg md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full"
        )}
        aria-hidden={!mobileOpen}
      >
        <nav className="flex flex-col items-center gap-8">
          {NAV_ITEMS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "font-display text-3xl uppercase tracking-widest",
                isActive(link.href)
                  ? "text-gold"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 bg-gold px-8 py-3 font-display text-xl font-bold uppercase tracking-wider text-white"
          >
            Join Us
          </Link>
        </nav>
      </div>
    </>
  );
}
