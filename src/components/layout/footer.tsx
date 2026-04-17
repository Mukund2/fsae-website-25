import { SOCIAL_LINKS } from "@/lib/constants";

function InstagramIcon({ size = 18 }: { size?: number }) {
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

function LinkedinIcon({ size = 18 }: { size?: number }) {
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

function FacebookIcon({ size = 18 }: { size?: number }) {
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

export function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-[#FAFAF5]">
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Logo treatment */}
          <h3 className="font-display text-4xl uppercase tracking-tight">
            <span className="font-bold text-gold">Spartan</span>{" "}
            <span className="font-bold text-blue">Racing</span>
          </h3>

          {/* Social icons */}
          <div className="flex items-center gap-5">
            {socialIcons.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="text-muted footer-social"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
