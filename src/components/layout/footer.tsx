import Link from "next/link";
import { Camera } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "@/lib/constants";

const SUBTEAMS = [
  "Chassis",
  "Powertrain",
  "Suspension",
  "Aerodynamics",
  "Electronics",
  "Business",
  "Operations",
] as const;

function InstagramIcon({ size = 16 }: { size?: number }) {
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

function LinkedinIcon({ size = 16 }: { size?: number }) {
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

function YoutubeIcon({ size = 16 }: { size?: number }) {
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
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

const socialIcons = [
  { href: SOCIAL_LINKS.instagram, icon: InstagramIcon, label: "Instagram" },
  { href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon, label: "LinkedIn" },
  { href: SOCIAL_LINKS.flickr, icon: Camera, label: "Flickr" },
  { href: SOCIAL_LINKS.youtube, icon: YoutubeIcon, label: "YouTube" },
] as const;

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#141414]">
      {/* Top gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/30 to-transparent" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#D4A843]/[0.03] to-transparent" aria-hidden="true" />

      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="space-y-5">
            <h3 className="font-display text-2xl tracking-wider">
              <span className="text-[#D4A843]">SPARTAN</span>{" "}
              <span className="text-white">RACING</span>
            </h3>
            <p className="text-sm leading-relaxed text-white/50">
              Engineering excellence since 1991. Designing, building, and racing
              formula-style vehicles at San&nbsp;Jos&eacute; State University.
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/50 transition-all duration-200 hover:border-[#D4A843]/40 hover:text-[#D4A843] hover:shadow-[0_0_12px_rgba(212,168,67,0.15)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#141414]"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Navigation
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/50 transition-colors duration-200 hover:text-[#D4A843]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subteams Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Subteams
            </h4>
            <ul className="space-y-3">
              {SUBTEAMS.map((team) => (
                <li key={team}>
                  <span className="text-sm text-white/50">{team}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white/30">
              Contact
            </h4>
            <address className="space-y-3 not-italic">
              <p className="text-sm leading-relaxed text-white/50">
                San Jos&eacute; State University
                <br />
                One Washington Square
                <br />
                San Jos&eacute;, CA 95192
              </p>
              <a
                href="mailto:sjsu.fsae@gmail.com"
                className="inline-block text-sm text-white/50 transition-colors duration-200 hover:text-[#D4A843]"
              >
                sjsu.fsae@gmail.com
              </a>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-white/30 sm:flex-row">
          <span>&copy; 2024 SJSU Spartan Racing. All rights reserved.</span>
          <span>Built with passion by Spartan Racing</span>
        </div>
      </div>
    </footer>
  );
}
