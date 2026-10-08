import type { ProtocolStep } from "@/lib/fde/content/protocol";
import { cn } from "@/lib/fde/utils";

/**
 * One node on the protocol timeline.
 *
 * The connecting rule is the `border-t` on this component's lower block:
 * because the columns are adjacent with no gap, their borders butt together
 * into a single continuous line without any absolute positioning.
 */
export function TimelineStep({ step }: { step: ProtocolStep }) {
  const isTerminal = step.variant === "terminal";

  return (
    <li className="flex flex-col items-center">
      <span
        aria-hidden
        className={cn(
          "h-3.5 w-3.5 rounded-full",
          isTerminal
            ? "bg-primary"
            : "border-2 border-muted-foreground/45 bg-background",
        )}
      />

      <span
        className={cn(
          "mt-3 font-mono text-[0.68rem] tracking-[0.14em]",
          isTerminal ? "text-primary" : "text-muted-foreground",
        )}
      >
        {step.day}
      </span>

      <div className="mt-2.5 w-full border-t border-border pt-4 text-center">
        <p
          className={cn(
            isTerminal
              ? "font-mono text-[0.95rem] font-medium text-primary"
              : "font-display text-[1.05rem] font-bold tracking-[-0.01em] text-foreground",
          )}
        >
          {step.title}
        </p>
        <p className="mt-1.5 text-sm text-muted-foreground">{step.subtitle}</p>
      </div>
    </li>
  );
}
