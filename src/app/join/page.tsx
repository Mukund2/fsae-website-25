import { Metadata } from "next";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Join | SJSU Spartan Racing",
  description: "Join SJSU Spartan Racing — no experience required, just passion and dedication.",
};

export default function JoinPage() {
  return (
    <>
      {/* Hero */}
      <section className="flex min-h-[50vh] items-center bg-surface pt-24">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="font-display text-5xl uppercase tracking-tight md:text-7xl">
            Join <span className="text-gold">Us</span>
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted">
            Be part of something bigger. Build a race car. Launch your career.
          </p>
        </div>
      </section>

      {/* Why Join */}
      <Section>
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Why <span className="text-gold">Spartan Racing?</span>
        </h2>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Hands-On Experience",
              description: "Design, manufacture, and test real engineering systems. No textbook can replace building a race car.",
            },
            {
              title: "Industry Connections",
              description: "Our alumni work at Tesla, Apple, SpaceX, Boeing, and more. Build your network while building a car.",
            },
            {
              title: "Competition Travel",
              description: "Represent SJSU at national FSAE competitions. Test your skills against 100+ university teams.",
            },
            {
              title: "Leadership Growth",
              description: "Lead a subteam, manage projects, and develop skills that set you apart in any career.",
            },
            {
              title: "All Majors Welcome",
              description: "Engineering, business, design — we need diverse skills to build a winning team.",
            },
            {
              title: "No Experience Needed",
              description: "We teach everything from scratch. Your enthusiasm matters more than your resume.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-surface p-8">
              <h3 className="font-display text-xl uppercase">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Apply CTA */}
      <Section className="bg-surface text-center">
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-5xl">
          Ready to <span className="text-gold">Apply?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Fill out our interest form and we&apos;ll reach out with next steps. Recruitment is ongoing — apply anytime.
        </p>
        <a
          href="https://forms.gle/placeholder"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block bg-gold px-8 py-4 font-display text-lg uppercase tracking-wider text-background transition-colors hover:bg-gold/90"
        >
          Apply Now
        </a>
      </Section>

      {/* Contact */}
      <Section>
        <h2 className="font-display text-3xl uppercase tracking-tight md:text-4xl">
          Get in <span className="text-gold">Touch</span>
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-lg uppercase text-muted">Email</h3>
            <a href="mailto:sjsu.fsae@gmail.com" className="text-gold hover:underline">
              sjsu.fsae@gmail.com
            </a>
          </div>
          <div>
            <h3 className="font-display text-lg uppercase text-muted">Location</h3>
            <p>San José State University</p>
            <p className="text-muted">One Washington Square, San José, CA 95192</p>
          </div>
        </div>
      </Section>
    </>
  );
}
