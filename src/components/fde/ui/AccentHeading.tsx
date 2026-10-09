import type { ElementType } from "react";
import { cn } from "@/lib/fde/utils";

export type HeadingRun = {
  text: string;
  /** Renders in the brand green italic serif face. */
  accent?: boolean;
};

type AccentHeadingProps = {
  runs: HeadingRun[];
  as?: ElementType;
  className?: string;
  accentClassName?: string;
};

/**
 * Renders a headline built from text runs, so the italic serif accents stay
 * data-driven instead of hard-coded in markup. A run of "\n" forces a break.
 */
export function AccentHeading({
  runs,
  as: Tag = "h2",
  className,
  accentClassName,
}: AccentHeadingProps) {
  return (
    // No default text colour: callers set it, so light and dark sections
    // can't end up with two competing colour classes on the same element.
    <Tag className={cn("font-display", className)}>
      {runs.map((run, index) => {
        if (run.text === "\n") return <br key={index} />;

        return run.accent ? (
          <em
            key={index}
            className={cn(
              "font-serif font-normal italic text-gradient",
              accentClassName,
            )}
          >
            {run.text}
          </em>
        ) : (
          <span key={index}>{run.text}</span>
        );
      })}
    </Tag>
  );
}
