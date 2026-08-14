"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * Infinite horizontal marquee. Duplicates its track and translates -50% on a
 * seamless loop via GSAP; direction and speed configurable. With `velocity` the
 * loop's timeScale is nudged by scroll velocity (faster while scrolling, and it
 * reverses when you scroll up) and eases back to its base — the trionn
 * scroll-reactive footer feel. On reduced-motion it renders a static row.
 */
export default function Marquee({
  children,
  className,
  speed = 30,
  reverse = false,
  separator,
  velocity = false,
}: {
  children: ReactNode[];
  className?: string;
  speed?: number;
  reverse?: boolean;
  separator?: ReactNode;
  velocity?: boolean;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);

  const row = (keyPrefix: string) =>
    children.map((c, i) => (
      <span className={styles.marqueeItem} key={`${keyPrefix}-${i}`}>
        {c}
        {separator ?? <span className={styles.marqueeDot} aria-hidden />}
      </span>
    ));

  useGSAP(
    () => {
      if (prefersReducedMotion() || !wrap.current) return;
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
      };
    },
    { scope: wrap },
  );

  return (
    <div ref={wrap} className={`${styles.marquee} ${className ?? ""}`}>
      <div className={styles.marqueeTrack}>
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
