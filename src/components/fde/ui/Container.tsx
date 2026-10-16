import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/fde/utils";

type ContainerProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  /** `wide` matches the header shell, `default` the content column. */
  size?: "default" | "wide" | "narrow";
};

const sizes = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
};

export function Container({
  as: Tag = "div",
  children,
  className,
  size = "default",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}>
      {children}
    </Tag>
  );
}
