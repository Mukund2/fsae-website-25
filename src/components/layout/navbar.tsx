"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { CartButton } from "@/components/merch/cart-button";

const NAV_ITEMS = [
  { label: "Cars", href: "/cars" },
  { label: "Team", href: "/about" },
  { label: "Leads", href: "/team" },
  { label: "Racing", href: "/racing" },
  { label: "Sponsors", href: "/sponsors" },
  { label: "Merch", href: "/merch" },
  { label: "Contact", href: "/contact" },
] as const;

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
      {/* Yellow top line */}
      <div className="fixed top-0 left-0 z-[60] h-1 w-full bg-yellow" />

      <nav className="fixed top-1 left-0 z-50 w-full border-b border-border bg-elevated">
        <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
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
              <span className="font-bold text-foreground">SPARTAN</span>{" "}
              <span className="font-light text-foreground/40">RACING</span>
            </span>
          </Link>

          {/* Right: Nav links + Join Us button */}
          <div className="hidden items-center gap-6 md:flex lg:gap-8">
            <ul className="flex items-center gap-5 lg:gap-6">
              {NAV_ITEMS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-[13px] font-medium uppercase tracking-wider",
                      isActive(link.href)
                        ? "text-gold"
                        : "text-foreground/70 hover:text-foreground"
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
              className="bg-gold px-5 py-2 font-display text-[13px] font-bold uppercase tracking-wider text-white"
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
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 flex flex-col items-center justify-center bg-elevated/95 backdrop-blur-lg md:hidden",
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
