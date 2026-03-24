import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center animate-[fadeIn_0.6s_ease-out]">
      <h1 className="font-display text-[10rem] leading-none text-[#D4A843] sm:text-[14rem]">
        404
      </h1>
      <h2 className="mt-2 font-display text-2xl uppercase tracking-widest text-white sm:text-3xl">
        Page Not Found
      </h2>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block border border-[#D4A843] px-8 py-3 font-display text-sm uppercase tracking-widest text-[#D4A843] transition-all duration-300 hover:bg-[#D4A843] hover:text-[#0a0a0a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A843] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
      >
        Back to Home
      </Link>
    </div>
  );
}
