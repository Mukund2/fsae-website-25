import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export function Section({
  children,
  className,
  id,
  fullWidth = false,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 md:py-32",
        fullWidth ? "w-full" : "mx-auto max-w-7xl px-6",
        className
      )}
    >
      {children}
    </section>
  );
}
