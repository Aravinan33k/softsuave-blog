"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import SplitType from "split-type";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** split granularity for the reveal */
  type?: "words" | "chars";
  stagger?: number;
  duration?: number;
  ease?: string;
  start?: string;
  end?: string;
  delay?: number;
  /** scrub the reveal to scroll (for pinned scenes) instead of a one-shot play */
  scrub?: boolean;
};

/**
 * Editorial masked text reveal (SplitText stand-in via SplitType): text is split
 * into lines + words/chars, each line clips its content (overflow mask), and the
 * pieces lift up from below (yPercent 110 -> 0) with a rotation + fade and a
 * stagger as the element scrolls into view. Can also be scrubbed to scroll for
 * pinned scenes. Reduced-motion safe.
 */
export default function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  type = "words",
  stagger = 0.05,
  duration = 0.62,
  ease = "expo.out",
  start = "top 85%",
  end = "top 45%",
  delay = 0,
  scrub = false,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);

  // Publish the width of the heading's longest line as `--fit-width`.
  //
  // A wrapped block is as wide as its container, not as its text, so a heading
  // beside a divider (the split section heads) leaves the slack of its last
  // wrap as extra space before the rule — the gap either side of it no longer
  // matches. The split-head CSS caps the heading at this width so its column
  // hugs the text. Capping at the widest line can never change where a line
  // breaks, and the variable does nothing where no rule reads it.
  //
  // Re-measured on resize and once the web fonts land: the property comes off
  // first so the heading wraps at its natural width, then goes back on in the
  // same frame, so nothing paints in between. The root element is observed —
  // not the heading's own column, whose width this changes.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    let frame = 0;
    const measure = () => {
      el.style.removeProperty("--fit-width");
      const range = document.createRange();
      range.selectNodeContents(el);
      const left = el.getBoundingClientRect().left;
      let right = left;
      for (const rect of range.getClientRects()) right = Math.max(right, rect.right);
      if (right > left) el.style.setProperty("--fit-width", `${Math.ceil(right - left) + 1}px`);
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(measure);
    };
    const observer = new ResizeObserver(schedule);
    observer.observe(document.documentElement);
    document.fonts?.ready.then(schedule);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const split = new SplitType(ref.current, {
        types: type === "chars" ? "lines,chars" : "lines,words",
      });

      // SplitType puts each visual line in its own block and drops the space
      // at every wrap, so anything reading the text — crawlers, SEO audits —
      // got "Builtfor", "AllSizes". A space between block lines renders as
      // nothing; `revert()` restores the original markup, spaces and all.
      split.lines?.slice(0, -1).forEach((line) => line.after(" "));
      const targets = (type === "chars" ? split.chars : split.words) ?? [];
      if (!targets.length) return;

      // Each line is a clip-path/overflow mask; pieces rise from below with a
      // slight rotation + fade for a bolder, clearly-in-view reveal.
      gsap.set(split.lines, {
        overflow: "hidden",
        clipPath: "inset(-10% 0% -35% 0%)",
        paddingBottom: "0.28em",
        marginBottom: "-0.28em",
      });
      gsap.set(targets, { yPercent: 110, rotate: 0.001, opacity: 0 });
      gsap.to(targets, {
        yPercent: 0,
        opacity: 1,
        duration,
        ease,
        stagger,
        delay,
        scrollTrigger: scrub
          ? { trigger: ref.current, start, end, scrub: 0.8 }
          : { trigger: ref.current, start, once: true },
      });

      return () => split.revert();
    },
    // `Tag` can change after hydration (see `useDesktopScene`), which mounts a
    // new element; re-split it rather than leave it unsplit.
    { scope: ref, dependencies: [Tag], revertOnUpdate: true },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
