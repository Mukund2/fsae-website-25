import Link from "next/link";
import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/constants";

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function FacebookIcon({ size = 20 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIcons = [
  { href: SOCIAL_LINKS.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: SOCIAL_LINKS.facebook, icon: FacebookIcon, label: "Facebook" },
] as const;

const navColumns = [
  {
    title: "Team",
    links: [
      { label: "About", href: "/about" },
      { label: "Leads", href: "/team" },
      { label: "History", href: "/history" },
    ],
  },
  {
    title: "Racing",
    links: [
      { label: "Cars", href: "/cars" },
      { label: "Competitions", href: "/racing" },
      { label: "Merch", href: "/merch" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Sponsors", href: "/sponsors" },
      { label: "Support", href: "/support" },
      { label: "Contact", href: "/contact" },
      { label: "FAQ", href: "/faq" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="bg-[#111]">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Left: Logo + SR badge */}
          <div className="md:col-span-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/sr-logo.png"
                  alt="SR Logo"
                  width={48}
                  height={48}
                  className="opacity-90"
                />
                <h3 className="font-display text-3xl uppercase tracking-tight">
                  <span className="font-bold text-gold">Spartan</span>{" "}
                  <span className="font-bold text-blue">Racing</span>
                </h3>
              </div>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/40">
              San Jos&eacute; State University Formula SAE Racing Team.
              Engineering excellence since 1991.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-4">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="footer-social-icon text-white/40"
                >
                  <Icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Center + Right: Navigation columns */}
          <div className="grid grid-cols-3 gap-8 md:col-span-6 md:col-start-7">
            {navColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-display text-xs font-bold uppercase tracking-[0.2em] text-white/30">
                  {column.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="footer-link text-sm text-white/60"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 border-t border-gold/30 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-xs text-white/30">
              &copy; 2025 SJSU Spartan Racing. All rights reserved.
            </p>
            <Link
              href="/join"
              className="footer-join-link font-display text-xs font-bold uppercase tracking-[0.15em] text-gold/70"
            >
              Join the Team
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
