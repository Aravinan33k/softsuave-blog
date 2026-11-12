import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/fde/utils";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** `wide` matches the header shell, `default` the content column. */
  size?: "default" | "wide" | "narrow";
};

// `default` and `wide` run gutter to gutter on the site's own frame (the
// marketing `--gutter`), so every FDE section starts and ends on the same
// vertical lines as the header, footer and every other page at 1920px.
// They were 1152px and 1280px columns centred in the page.
const sizes = {
  narrow: "max-w-3xl px-4 sm:px-6 lg:px-8",
  default: "max-w-none px-[var(--gutter)]",
  wide: "max-w-none px-[var(--gutter)]",
};

export function Container({
  as: Tag = "div",
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full", sizes[size], className)}>
      {children}
    </Tag>
  );
}
