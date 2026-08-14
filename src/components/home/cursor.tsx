"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * DOM-follow custom cursor: a lagging dot that grows and can show a label when
 * hovering interactive elements (any [data-cursor] host). Purely decorative —
 * the real OS cursor stays available for keyboard/focus users and the whole
 * thing is disabled on touch / coarse pointers and reduced-motion.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement | null>(null);
  const [label, setLabel] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion()) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const el = dot.current;
    if (!el) return;

    document.body.classList.add(styles.cursorHidden);
    gsap.set(el, { xPercent: -50, yPercent: -50 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.1, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.1, ease: "power3.out" });

    const move = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      const host = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor], a, button, input, textarea, [role='button']",
      );
      if (host) {
        setActive(true);
        setLabel(host.getAttribute("data-cursor") ?? "");
      } else {
        setActive(false);
        setLabel("");
      }
    };
    const leave = () => setActive(false);

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerout", leave);

    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerout", leave);
      document.body.classList.remove(styles.cursorHidden);
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden
      className={`${styles.cursor} ${active ? styles.cursorActive : ""} ${
        label ? styles.cursorLabeled : ""
      }`}
    >
      <span className={styles.cursorLabel}>{label}</span>
    </div>
  );
}
