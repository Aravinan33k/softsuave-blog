"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/**
 * Prominent enquiry CTA. The coral fill that used to require a press-and-hold
 * now sweeps in on hover (CSS); a single click fires onConfirm and briefly
 * swaps the label to doneLabel, then reverts to the original label.
 */
export default function HoldButton({
  label,
  doneLabel = "Confirmed",
  onConfirm,
}: {
  label: string;
  holdingLabel?: string;
  doneLabel?: string;
  onConfirm: () => void;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <button
      type="button"
      className={`${styles.holdBtn} ${done ? styles.holdDone : ""}`}
      data-cursor="Book"
      onClick={() => {
        setDone(true);
        onConfirm();
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setDone(false), 2500);
      }}
    >
      <span className={styles.holdFill} aria-hidden />
      <span className={styles.holdText}>{done ? doneLabel : label}</span>
    </button>
  );
}
