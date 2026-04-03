import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact | SJSU Spartan Racing",
  description:
    "Get in touch with SJSU Spartan Racing. Email, address, and social media.",
};

const socialItems = [
  {
    label: "Instagram",
    href: SOCIAL_LINKS.instagram,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: SOCIAL_LINKS.linkedin,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "Flickr",
    href: SOCIAL_LINKS.flickr,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M0 12c0 3.074 2.494 5.564 5.565 5.564 3.075 0 5.569-2.49 5.569-5.564S8.641 6.436 5.565 6.436C2.495 6.436 0 8.926 0 12zm12.866 0c0 3.074 2.493 5.564 5.567 5.564C21.502 17.564 24 15.074 24 12s-2.498-5.564-5.567-5.564c-3.074 0-5.567 2.49-5.567 5.564z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: SOCIAL_LINKS.youtube,
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

function OrangeArrow() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-gold">
      <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <>
      {/* Hero section with team photo background */}
      <section className="relative flex min-h-[50vh] items-center justify-center overflow-hidden pt-32 pb-16">
        <Image
          src="/images/team/team-1.jpg"
          alt="SJSU Spartan Racing team"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/65" />
        <div className="relative z-10 text-center px-6 pt-24 pb-16">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold hero-fade-in">
            Get In Touch
          </p>
          <h1
            className="mt-3 font-display text-5xl uppercase tracking-tight text-white md:text-7xl hero-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="font-bold">Contact</span>
            <br />
            <span className="font-light text-white/40">Us</span>
          </h1>
        </div>
      </section>

      {/* Two-column info section */}
      <section className="bg-white mx-auto max-w-7xl px-6 py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-2 items-start">
          {/* Left -- contact info card */}
          <div className="border border-border bg-surface p-8 md:p-10 space-y-8">
            {/* Email */}
            <div className="flex items-start justify-between">
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
              <OrangeArrow />
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

            {/* Social links with icons */}
            <div>
              <h2 className="font-display text-xl uppercase tracking-tight">
                Social Media
              </h2>
              <div className="mt-4 flex gap-4">
                {socialItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="flex h-11 w-11 items-center justify-center border border-border text-foreground/60 hover:border-gold hover:text-gold"
                  >
                    {item.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right -- image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src="/images/flickr/comp-action-1.jpg"
              alt="SJSU Spartan Racing at competition"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Full-width image divider */}
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <Image
          src="/images/team/team-2.jpg"
          alt="SJSU Spartan Racing workshop"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <p className="max-w-2xl text-center font-display text-3xl uppercase tracking-tight text-white md:text-4xl">
            Engineering Excellence Since 1991
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-surface py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
            <span className="font-bold">Want to</span>
            <br />
            <span className="font-light text-foreground/40">Join?</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted">
            We&apos;re always looking for passionate engineers, designers, and
            business minds to join our team.
          </p>
          <div className="mt-8">
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background hover:bg-gold/90"
            >
              Join Us
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-background">
                <path d="M5 15L15 5M15 5H8M15 5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
