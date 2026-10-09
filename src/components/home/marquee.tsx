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
  staticFrom,
  fill = false,
}: {
  children: ReactNode[];
  className?: string;
  speed?: number;
  reverse?: boolean;
  separator?: ReactNode;
  /**
   * Viewport width (px) from which the row never loops: an overflowing row
   * wraps its items onto another line instead of scrolling. Below it the row
   * behaves as usual. For a section whose review asked the rows to hold still
   * (the Vue.js page's technology band).
   */
  staticFrom?: number;
  /**
   * Loop a row even when one copy of it is narrower than the strip, by
   * repeating its items until they fill the strip — the way ExploreMarquee
   * loops its short rows. Opt-in: a hire page's one-to-three-chip rows are
   * meant to sit still, but a band where every other row scrolls should not
   * leave its shortest one parked (Software Development page review: "last
   * category (Design and QA) has no scrolling effect").
   */
  fill?: boolean;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  /** Whether one copy of the row is wider than the strip it sits in. */
  const [overflows, setOverflows] = useState(false);
  /** Whether the row is held still and wrapping, per `staticFrom`. */
  const [wrapped, setWrapped] = useState(false);
  /** How many times one copy of the row repeats the items, per `fill`. */
  const [reps, setReps] = useState(1);

  useEffect(() => {
    const host = wrap.current;
    const track = rail.current;
    if (!host || !track) return;

    const measure = () => {
      if (staticFrom !== undefined && window.innerWidth >= staticFrom) {
        setWrapped(true);
        setOverflows(false);
        setReps(1);
        return;
      }
      setWrapped(false);
      // `scrollWidth` is layout width, so it is unaffected by the transform the
      // loop is applying; `getBoundingClientRect` would be. Divide by the
      // copies currently rendered to get back to one row's width.
      const copies = overflows ? 2 : 1;
      const single = track.scrollWidth / copies / reps;
      if (!single) return;
      const still = prefersReducedMotion();
      // With `fill`, enough repeats that one copy outruns the strip.
      const nextReps = fill && !still ? Math.floor((host.clientWidth + 2) / single) + 1 : 1;
      setReps(nextReps);
      // A hair of tolerance: sub-pixel layout should not start a loop that
      // moves the row by half a pixel.
      setOverflows(!still && single * nextReps > host.clientWidth + 2);
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    observer.observe(track);
    return () => observer.disconnect();
  }, [overflows, reps, fill, children.length, staticFrom]);

  /**
   * A row that stops looping on resize (it no longer overflows, or `staticFrom`
   * took over) must sit at its left edge. Killing the tween leaves its last
   * inline transform behind — up to half a track to the left — so it is
   * cleared here. A plain effect, so it runs after `useGSAP`'s layout-effect
   * cleanup and has the last word.
   */
  useEffect(() => {
    if (!overflows && rail.current) gsap.set(rail.current, { clearProps: "transform" });
  }, [overflows]);

  const row = (keyPrefix: string) =>
    Array.from({ length: reps }, (_, r) =>
      children.map((c, i) => (
        <span
          className={styles.marqueeItem}
          key={`${keyPrefix}-${r}-${i}`}
          // A `fill` repeat is the same words again, so only the first is read.
          aria-hidden={r > 0 || undefined}
        >
          {c}
          {/* The separator sits between items. In the loop that includes after
              the last one, which is what divides it from the copy that follows;
              in a static row it would be a dot hanging off the end. */}
          {(overflows || i < children.length - 1) &&
            (separator ?? <span className={styles.marqueeDot} aria-hidden />)}
        </span>
      )),
    );

  useGSAP(
    () => {
      if (!overflows || prefersReducedMotion() || !wrap.current) return;
      const track = wrap.current.querySelector<HTMLElement>(`.${styles.marqueeTrack}`);
      if (!track) return;
      const dur = children.length * reps * (60 / speed);
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
    // `revertOnUpdate`: without it a dependency change neither reverts the
    // context nor runs the cleanup above, so a row that stopped overflowing on
    // resize kept its loop running under the static layout.
    { scope: wrap, dependencies: [overflows, reps], revertOnUpdate: true },
  );

  return (
    <div
      ref={wrap}
      className={`${styles.marquee} ${className ?? ""}`}
      data-loop={overflows ? "on" : "off"}
      data-wrap={wrapped ? "on" : undefined}
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
