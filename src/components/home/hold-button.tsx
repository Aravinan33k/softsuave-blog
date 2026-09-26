"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

/**
 * Prominent enquiry CTA. The coral fill that used to require a press-and-hold
 * now sweeps in on hover (CSS).
 *
 * Two modes, decided by which prop you pass:
 *
 *   href       renders an <a>. Use this whenever the CTA's job is to GO
 *              somewhere. That it is a real anchor rather than a button with a
 *              navigation handler is the point: middle-click, ctrl/cmd-click,
 *              "copy link address" and screen-reader link semantics all come
 *              free, and none of them survive a scripted `location.href`.
 *   onConfirm  renders a <button> that fires the callback and briefly swaps the
 *              label to doneLabel. For an action with no destination.
 *
 * The union makes them mutually exclusive, so a caller cannot ask for a link
 * and a done-state at once — the done-state is meaningless once the page has
 * navigated away.
 */
type HoldButtonProps = { label: string } & (
  | { href: string; onConfirm?: never; doneLabel?: never }
  | { href?: never; onConfirm: () => void; doneLabel?: string }
);

export default function HoldButton(props: HoldButtonProps) {
  const { label } = props;
  const [done, setDone] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Identical fill, text and cursor label in both modes, so which element it
  // is never shows.
  const inner = (
    <>
      <span className={styles.holdFill} aria-hidden />
      <span className={styles.holdText}>
        {props.href ? label : done ? props.doneLabel ?? "Confirmed" : label}
      </span>
    </>
  );

  if (props.onConfirm) {
    const { onConfirm } = props;
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
        {inner}
      </button>
    );
  }

  return (
    <a href={props.href} className={styles.holdBtn} data-cursor="Book">
      {inner}
    </a>
  );
}
