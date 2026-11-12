import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/fde/utils";

type MarqueeProps = {
  children: ReactNode;
  /** One full loop, in seconds. Larger = slower. */
  duration?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  /** Soft fade on the left/right edges. */
  fadeEdges?: boolean;
  /** Any CSS length. Applied both between items and after the last one. */
  gap?: string;
  className?: string;
};

/**
 * Infinite auto-scrolling track.
 *
 * Renders `children` as two identical reels. Each reel carries its own
 * trailing gap, so the track is exactly two reels wide and translating it
 * by -50% lands the copy precisely where the original started — no seam,
 * no JS measurement, works during SSR.
 *
 * Motion is opt-in via `motion-safe`, so it stops under
 * `prefers-reduced-motion`.
 */
export function Marquee({
  children,
  duration = 40,
  direction = "left",
  pauseOnHover = true,
  fadeEdges = true,
  gap = "clamp(2.5rem, 6vw, 6rem)",
  className,
}: MarqueeProps) {
  const reelClasses = "flex shrink-0 items-center [gap:var(--marquee-gap)] [padding-inline-end:var(--marquee-gap)]";

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        fadeEdges &&
          "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
      style={
        {
          "--marquee-gap": gap,
          "--marquee-duration": `${duration}s`,
        } as CSSProperties
      }
    >
      <div
        className={cn(
          "flex w-max",
          "motion-safe:animate-[fde-marquee_var(--marquee-duration)_linear_infinite]",
          direction === "right" && "[animation-direction:reverse]",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
        )}
      >
        <div className={reelClasses}>{children}</div>
        {/* Duplicate reel — hidden from AT so each item is announced once. */}
        <div className={reelClasses} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
