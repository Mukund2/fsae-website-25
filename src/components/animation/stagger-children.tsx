interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}

export function StaggerChildren({
  children,
  className,
}: StaggerChildrenProps) {
  return <div className={className}>{children}</div>;
}
