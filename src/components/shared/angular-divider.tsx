import { cn } from "@/lib/utils";

interface AngularDividerProps {
  className?: string;
  flip?: boolean;
  fillColor?: string;
}

export function AngularDivider({
  className,
  flip = false,
  fillColor = "#0a0a0a",
}: AngularDividerProps) {
  return (
    <div
      className={cn(
        "w-full overflow-hidden leading-[0]",
        flip && "rotate-180",
        className
      )}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block h-[60px] w-full md:h-[80px]"
      >
        <polygon points="0,0 1200,120 0,120" fill={fillColor} />
      </svg>
    </div>
  );
}
