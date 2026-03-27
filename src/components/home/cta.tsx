export function JoinUs() {
  return (
    <section
      id="join-us"
      className="bg-surface px-6 py-16"
    >
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-8 sm:flex-row sm:items-center">
        <h2 className="font-display text-2xl uppercase tracking-wider text-foreground">
          Ready to join?
        </h2>

        <div className="flex items-center gap-4">
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSc5dX8x-oh8OP0M61hb4o8S3POhIpPr7bCrbw0sXiaoXK3l6g/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-6 py-2 font-mono text-[13px] uppercase tracking-[0.15em] text-foreground"
          >
            Apply Now
          </a>
          <a
            href="https://join.slack.com/t/sjsuspartanracing"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-foreground/20 px-6 py-2 font-mono text-[13px] uppercase tracking-[0.15em] text-foreground"
          >
            Join our Slack
          </a>
        </div>
      </div>
    </section>
  );
}
