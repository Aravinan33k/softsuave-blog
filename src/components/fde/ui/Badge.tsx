import type { ReactNode } from "react";
import { cn } from "@/lib/fde/utils";

type BadgeProps = {
  /** Small solid pill rendered before the label, e.g. "New". */
  tag?: string;
  icon?: ReactNode;
  children: ReactNode;
  /**
   * `outline` is the white bordered chip, `soft` the filled brand chip,
   * `ink` the translucent chip used on dark sections.
   */
  variant?: "outline" | "soft" | "ink";
  className?: string;
};

const variants = {
  outline:
    "border border-border/80 bg-background/80 shadow-[0_2px_10px_-4px_hsl(220_15%_8%/0.10)] backdrop-blur-sm",
  soft: "bg-primary/10 font-medium text-primary",
  ink: "bg-white/[0.06] font-medium text-primary",
};

export function Badge({
  tag,
  icon,
  children,
  variant = "outline",
  className,
}: BadgeProps) {
  const isOutline = variant === "outline";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1.5 text-xs sm:text-sm",
        // The outline chip insets its left padding to seat the solid tag pill.
        tag ? "pl-1.5 pr-4" : "px-4",
        variants[variant],
        className,
      )}
    >
      {tag ? (
        <span className="rounded-full bg-primary px-2.5 py-0.5 text-[0.7rem] font-semibold text-primary-foreground">
          {tag}
        </span>
      ) : null}
      {icon ? (
        <span className={isOutline ? "text-primary" : undefined}>{icon}</span>
      ) : null}
      <span
        className={isOutline ? "font-medium text-muted-foreground" : undefined}
      >
        {children}
      </span>
    </span>
  );
}
