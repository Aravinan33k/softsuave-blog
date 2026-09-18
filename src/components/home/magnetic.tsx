"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/** How far, in px, the wrapper and its inner content may ever travel from
 *  their resting position. The pull is a hint, not a relocation: a CTA that
 *  can outrun the cursor is a CTA that cannot be clicked. */
const MAX_TRAVEL = 10;
const MAX_INNER_TRAVEL = 4;

const clampTravel = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/**
 * Magnetic hover wrapper: while the pointer is over the element it translates
 * toward the cursor (via gsap.quickTo) and snaps back on leave — the trionn
 * pill-CTA / nav feel. Inner content can also lift a touch for a layered pull.
 * Disabled on coarse pointers and under reduced-motion so keyboard/focus and
 * touch users get the plain element.
 *
 * The offset is measured from the element's RESTING centre, not its live
 * `getBoundingClientRect()` centre. The rect moves with the element, so
 * measuring against it fed the displacement back into itself: near an edge the
 * pill walked out from under the pointer, fired `pointerleave`, snapped back,
 * was re-entered, and jittered — QA's "CTA buttons move when the user tries to
 * click them" (BUG-002). Against the resting centre the displacement is a pure
 * function of cursor position, so the pill always moves TOWARD the cursor and
 * settles. It is also clamped, so the pointer is never left outside the target.
 */
export default function Magnetic({
  children,
  className,
  strength = 0.22,
  innerStrength = 0.08,
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
        // Back out whatever displacement is currently applied, so the centre
        // below is where the pill SITS, not where the pull has put it.
        const dx = (gsap.getProperty(el, "x") as number) || 0;
        const dy = (gsap.getProperty(el, "y") as number) || 0;
        const mx = e.clientX - (r.left + r.width / 2 - dx);
        const my = e.clientY - (r.top + r.height / 2 - dy);
        xTo(clampTravel(mx * strength, MAX_TRAVEL));
        yTo(clampTravel(my * strength, MAX_TRAVEL));
        ixTo?.(clampTravel(mx * innerStrength, MAX_INNER_TRAVEL));
        iyTo?.(clampTravel(my * innerStrength, MAX_INNER_TRAVEL));
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
