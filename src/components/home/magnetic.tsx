"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/** Ceiling on how far the wrapper and its inner content may ever travel from
 *  their resting position. The pull is a hint, not a relocation: a CTA that
 *  can outrun the cursor is a CTA that cannot be clicked. */
const MAX_TRAVEL = 10;
const MAX_INNER_TRAVEL = 4;
/** The most one pill can be displaced toward a side: wrapper plus inner. */
const MAX_TOTAL = MAX_TRAVEL + MAX_INNER_TRAVEL;
/** Daylight always left between two pills that are pulling toward each other. */
const SAFETY = 3;

const clampTravel = (v: number, max: number) => Math.max(-max, Math.min(max, v));

/** Room to travel toward each side before this pill would meet a neighbour. */
interface Budget {
  left: number;
  right: number;
  up: number;
  down: number;
}

/**
 * How far this wrapper may move toward each side without touching a sibling.
 *
 * Why the sum and not the single pill's travel: the snap-back runs for 0.6s,
 * so dragging from one CTA to the next leaves the first still displaced while
 * the second is already pulling the other way. Both are off their mark at the
 * same time, so the encroachment is the SUM of the two — which is why a
 * neighbour that also carries this wrapper is only allowed half the gap, and a
 * static one (a plain label, a rule) is allowed the whole of it.
 *
 * Measured from resting rects: this runs on mount and on resize, both of which
 * are moments when nothing is being hovered. Element transforms elsewhere on
 * the page move a whole row together, so the gaps between siblings hold.
 */
function measureBudget(el: HTMLElement): Budget {
  const budget: Budget = {
    left: MAX_TOTAL,
    right: MAX_TOTAL,
    up: MAX_TOTAL,
    down: MAX_TOTAL,
  };
  const parent = el.parentElement;
  if (!parent) return budget;

  const r = el.getBoundingClientRect();

  for (const node of Array.from(parent.children)) {
    if (node === el || !(node instanceof HTMLElement)) continue;
    const s = node.getBoundingClientRect();
    if (!s.width && !s.height) continue;
    const share = node.classList.contains(styles.magnetic) ? 2 : 1;

    // Same row: this sibling constrains horizontal travel.
    if (s.bottom > r.top && s.top < r.bottom) {
      if (s.left >= r.right) budget.right = Math.min(budget.right, (s.left - r.right) / share - SAFETY);
      if (s.right <= r.left) budget.left = Math.min(budget.left, (r.left - s.right) / share - SAFETY);
    }
    // Same column (a wrapped row): it constrains vertical travel.
    if (s.right > r.left && s.left < r.right) {
      if (s.top >= r.bottom) budget.down = Math.min(budget.down, (s.top - r.bottom) / share - SAFETY);
      if (s.bottom <= r.top) budget.up = Math.min(budget.up, (r.top - s.bottom) / share - SAFETY);
    }
  }

  budget.left = Math.max(0, budget.left);
  budget.right = Math.max(0, budget.right);
  budget.up = Math.max(0, budget.up);
  budget.down = Math.max(0, budget.down);
  return budget;
}

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
 *
 * Travel is capped twice: by the constants above, and by `measureBudget` — the
 * room actually available before the pill would meet its neighbour. Without
 * the second cap two adjacent CTAs closed a 14px gap to nothing on a drag from
 * one to the other, and read as overlapping. Deriving the cap from the layout
 * rather than hand-tuning each CTA row means the five rows on this site that
 * put two of these side by side are all correct, and stay correct if a gap
 * changes.
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

      let budget = measureBudget(el);
      // Only on resize: a re-measure while a neighbour sits displaced would
      // read a gap that is about to close again and bank the wrong cap.
      const remeasure = () => {
        budget = measureBudget(el);
      };
      window.addEventListener("resize", remeasure);

      /** Split one axis' pull between wrapper and inner, inside `cap`. */
      const apply = (
        raw: number,
        rawInner: number,
        cap: number,
        outer: (v: number) => void,
        innerTo: ((v: number) => void) | null,
      ) => {
        const total = Math.abs(raw) + Math.abs(rawInner);
        // Scale both parts by the same factor, so the layered feel survives
        // being squeezed — the inner still leads the wrapper, just less far.
        const k = total > cap ? cap / total : 1;
        outer(clampTravel(raw * k, MAX_TRAVEL));
        innerTo?.(clampTravel(rawInner * k, MAX_INNER_TRAVEL));
      };

      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        // Back out whatever displacement is currently applied, so the centre
        // below is where the pill SITS, not where the pull has put it.
        const dx = (gsap.getProperty(el, "x") as number) || 0;
        const dy = (gsap.getProperty(el, "y") as number) || 0;
        const mx = e.clientX - (r.left + r.width / 2 - dx);
        const my = e.clientY - (r.top + r.height / 2 - dy);

        const rawX = mx * strength;
        const rawY = my * strength;
        apply(rawX, mx * innerStrength, rawX >= 0 ? budget.right : budget.left, xTo, ixTo);
        apply(rawY, my * innerStrength, rawY >= 0 ? budget.down : budget.up, yTo, iyTo);
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
        window.removeEventListener("resize", remeasure);
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
