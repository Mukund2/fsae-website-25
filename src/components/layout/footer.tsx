import { Camera } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";

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
    <footer className="bg-background">
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl tracking-wider">
              <span className="text-gold">SPARTAN</span>{" "}
              <span className="text-foreground">RACING</span>
            </h3>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.flickr.com/photos/89473850@N02/albums/"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2 font-mono text-xs uppercase tracking-widest text-muted hover:text-gold"
            >
              View our gallery on Flickr
            </a>
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex items-center justify-center text-muted hover:text-gold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-border pt-4 text-center text-xs text-muted">
          &copy; {new Date().getFullYear()} SJSU Spartan Racing. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
