"use client";

type TextElement = "h1" | "h2" | "h3" | "h4" | "p" | "span";

interface RevealTextProps {
  children: string;
  as?: TextElement;
  className?: string;
  delay?: number;
  splitBy?: "word" | "line";
  staggerDelay?: number;
}

export function RevealText({
  children,
  as: Tag = "p",
  className,
}: RevealTextProps) {
  return <Tag className={className}>{children}</Tag>;
}
