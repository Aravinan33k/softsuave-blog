"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * Magnetic hover wrapper: while the pointer is over the element it translates
 * toward the cursor (via gsap.quickTo) and snaps back on leave — the trionn
 * pill-CTA / nav feel. Inner content can also lift a touch for a layered pull.
 * Disabled on coarse pointers and under reduced-motion so keyboard/focus and
 * touch users get the plain element.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.4,
  innerStrength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
  innerStrength?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;
      if (!window.matchMedia("(pointer: fine)").matches) return;

      const inner = el.firstElementChild as HTMLElement | null;
      const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3" });
      const ixTo = inner ? gsap.quickTo(inner, "x", { duration: 0.7, ease: "power3" }) : null;
      const iyTo = inner ? gsap.quickTo(inner, "y", { duration: 0.7, ease: "power3" }) : null;

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const mx = e.clientX - (r.left + r.width / 2);
        const my = e.clientY - (r.top + r.height / 2);
        xTo(mx * strength);
        yTo(my * strength);
        ixTo?.(mx * innerStrength);
        iyTo?.(my * innerStrength);
      };
      const leave = () => {
        xTo(0);
        yTo(0);
        ixTo?.(0);
        iyTo?.(0);
      };

      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      return () => {
        el.removeEventListener("pointermove", move);
        el.removeEventListener("pointerleave", leave);
      };
    },
    { scope: ref },
  );

  return (
    <span ref={ref} className={`${styles.magnetic} ${className ?? ""}`}>
      <span className={styles.magneticInner}>{children}</span>
    </span>
  );
}
