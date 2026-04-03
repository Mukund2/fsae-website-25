import Image from "next/image";

export function JoinUs() {
  return (
    <section id="join-us" className="relative overflow-hidden">
      <div className="relative flex min-h-[50vh] items-center justify-center px-6 py-24">
        {/* Background image */}
        <Image
          src="/images/team/team-1.jpg"
          alt="Spartan Racing team"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black/70" />

        {/* Content */}
        <div className="relative z-10 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/50">
            Get Involved
          </p>
          <h2 className="mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] uppercase tracking-wider text-white">
            Build something extraordinary
          </h2>
          <p className="mx-auto mt-4 max-w-md font-body text-sm leading-relaxed text-white/60">
            Engineers, designers, and builders working on real problems.
            No experience required — just passion.
          </p>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block border border-[#0EA5E9] bg-[#0EA5E9] px-8 py-3 font-mono text-[13px] uppercase tracking-[0.15em] text-white"
          >
            Join Us
          </a>
        </div>
      </div>
    </section>
  );
}
