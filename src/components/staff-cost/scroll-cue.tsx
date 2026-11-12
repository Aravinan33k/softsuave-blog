"use client";

import styles from "./staff-cost-calculator.module.css";

/** The banner's scroll mouse: a decorative cue that carries the reader down to the calculator. */
export default function ScrollCue({ targetId }: { targetId: string }) {
  return (
    <button
      type="button"
      className={styles.mouse}
      aria-label="Scroll to the calculator"
      onClick={() => document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" })}
    >
      <span className={styles.mouseBody} aria-hidden>
        <span className={styles.mouseDot} />
      </span>
      <span className={styles.mouseArrow} aria-hidden />
      <span className={styles.mouseArrow} aria-hidden />
    </button>
  );
}
