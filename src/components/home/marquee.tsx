"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * Infinite horizontal marquee — but only when there is something to scroll.
 *
 * The loop works by rendering the row twice and translating the track -50%, so
 * the second copy is under the cursor by the time the first has left. That is
 * seamless *provided one copy is at least as wide as the strip*. It was not
 * checked, and the hire pages broke it: their technology rows carry one to
 * three chips, so a copy covered a third of the row. The track then scrolled a
 * couple of hundred pixels into blank space and snapped back, the reverse rows
 * started life already shifted half a track — content entering from the middle
 * of the row with the leading chip cut off at the edge — and a row of two tools
 * read as four, because both copies were on screen at once.
 *
 * So the row now measures itself: it loops only when its content genuinely
 * overflows, and otherwise renders once, static, from the left edge, with no
 * trailing separator dangling after the last item. Rows that do overflow — the
 * client logos, the awards chips, the fuller technology groups — behave exactly
 * as before. Remeasured on resize, since which case a row falls into changes
 * with the viewport.
 *
 * Direction and speed are configurable. On reduced motion it renders the static
 * row whatever the width.
 */
export default function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  separator,
}: {
  children: ReactNode[];
  className?: string;
  speed?: number;
  reverse?: boolean;
  separator?: ReactNode;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  /** Whether one copy of the row is wider than the strip it sits in. */
  const [overflows, setOverflows] = useState(false);

  useEffect(() => {
    const host = wrap.current;
    const track = rail.current;
    if (!host || !track) return;

    const measure = () => {
      // `scrollWidth` is layout width, so it is unaffected by the transform the
      // loop is applying; `getBoundingClientRect` would be. Divide by the
      // copies currently rendered to get back to one row's width.
      const copies = overflows ? 2 : 1;
      const row = track.scrollWidth / copies;
      if (!row) return;
      // A hair of tolerance: sub-pixel layout should not start a loop that
      // moves the row by half a pixel.
      setOverflows(!prefersReducedMotion() && row > host.clientWidth + 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    observer.observe(track);
    return () => observer.disconnect();
  }, [overflows, children.length]);

  const row = (keyPrefix: string) =>
    children.map((c, i) => (
      <span className={styles.marqueeItem} key={`${keyPrefix}-${i}`}>
        {c}
        {/* The separator sits between items. In the loop that includes after
            the last one, which is what divides it from the copy that follows;
            in a static row it would be a dot hanging off the end. */}
        {(overflows || i < children.length - 1) &&
          (separator ?? <span className={styles.marqueeDot} aria-hidden />)}
      </span>
    ));

  useGSAP(
    () => {
      if (!overflows || prefersReducedMotion() || !wrap.current) return;
      const track = wrap.current.querySelector<HTMLElement>(`.${styles.marqueeTrack}`);
      if (!track) return;
      const dur = children.length * (60 / speed);
      const tween = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        { xPercent: reverse ? 0 : -50, duration: dur, ease: "none", repeat: -1 },
      );

      const onEnter = () => {
        gsap.to(tween, { timeScale: 0, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      };
      const onLeave = () => {
        gsap.to(tween, { timeScale: 1, duration: 0.5, ease: "power2.out", overwrite: "auto" });
      };

      const wrapEl = wrap.current;
      wrapEl.addEventListener("mouseenter", onEnter);
      wrapEl.addEventListener("mouseleave", onLeave);

      return () => {
        wrapEl.removeEventListener("mouseenter", onEnter);
        wrapEl.removeEventListener("mouseleave", onLeave);
        tween.kill();
        gsap.set(track, { xPercent: 0 });
      };
    },
    { scope: wrap, dependencies: [overflows] },
  );

  return (
    <div
      ref={wrap}
      className={`${styles.marquee} ${className ?? ""}`}
      data-loop={overflows ? "on" : "off"}
    >
      <div ref={rail} className={styles.marqueeTrack}>
        {row("a")}
        {/* The trailing copy exists to cover the gap the first leaves as it
            scrolls out. It is the same words twice, so it is hidden from
            assistive tech rather than read out again. */}
        {overflows && (
          <span className={styles.marqueeCopy} aria-hidden>
            {row("b")}
          </span>
        )}
      </div>
    </div>
  );
}
