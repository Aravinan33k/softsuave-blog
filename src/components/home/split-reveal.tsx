"use client";

import { useRef, type ElementType, type ReactNode } from "react";
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

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const split = new SplitType(ref.current, {
        types: type === "chars" ? "lines,chars" : "lines,words",
      });
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
    { scope: ref },
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
