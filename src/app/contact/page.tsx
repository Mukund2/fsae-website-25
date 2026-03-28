import { Metadata } from "next";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | SJSU Spartan Racing",
  description:
    "Get in touch with SJSU Spartan Racing — email, address, and social media.",
};

const socialItems = [
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Flickr", href: SOCIAL_LINKS.flickr },
  { label: "YouTube", href: SOCIAL_LINKS.youtube },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero banner */}
      <section className="relative flex min-h-[45vh] items-end pb-16 pt-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-surface via-surface/80 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,168,67,0.08)_0%,_transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold hero-fade-in">
            Get In Touch
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Contact
          </h1>
        </div>
      </section>

      {/* Contact details */}
      <section className="mx-auto max-w-7xl px-6 pb-24 md:pb-32">
        <div className="grid gap-16 md:grid-cols-2">
          {/* Left — info */}
          <div className="space-y-10">
            {/* Email */}
            <div>
              <h2 className="font-display text-xl uppercase tracking-tight">
                Email
              </h2>
              <Link
                href="mailto:sjsu.fsae@gmail.com"
                className="mt-2 block font-mono text-sm text-gold hover:underline"
              >
                sjsu.fsae@gmail.com
              </Link>
            </div>

            {/* Address */}
            <div>
              <h2 className="font-display text-xl uppercase tracking-tight">
                Address
              </h2>
              <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                Mechanical Engineering Dept.
                <br />
                1 Washington Square
                <br />
                San Jos&eacute;, CA 95192
              </p>
            </div>

            {/* Club Room */}
            <div>
              <h2 className="font-display text-xl uppercase tracking-tight">
                Club Room
              </h2>
              <p className="mt-2 font-mono text-sm leading-relaxed text-muted">
                Engineering Building
                <br />
                Rooms 344, 123, 130
              </p>
            </div>
          </div>

          {/* Right — social */}
          <div>
            <h2 className="font-display text-xl uppercase tracking-tight">
              Social Media
            </h2>
            <ul className="mt-4 space-y-4">
              {socialItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-border px-6 py-3 font-mono text-sm uppercase tracking-widest text-foreground hover:border-gold hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
