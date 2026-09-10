"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

type Section = { id: string; label: string };
const SECTIONS: Section[] = [
  { id: "top", label: "Intro" },
  { id: "why", label: "Why Us" },
  { id: "clients", label: "Clients" },
  { id: "industries", label: "Industries" },
  { id: "services", label: "Services" },
  { id: "journey", label: "Journey" },
  { id: "work", label: "Case Studies" },
  { id: "integrations", label: "Integrations" },
  { id: "awards", label: "Awards" },
  { id: "tech", label: "Tech Stack" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
];

const pad = (n: number) => String(n + 1).padStart(2, "0");

/**
 * Chapter counter — an editorial corner readout ("03 / 11 · CASE STUDIES") in
 * eyebrow type with a thin coral tick that fills with scroll progress. Clicking
 * it opens a compact section list; picking one jumps via the global Lenis anchor
 * routing. Deliberately tiny: no text ever sits over section content.
 */
export default function ChapterNav() {
  const [open, setOpen] = useState(false);
  const [idx, setIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [footerOffset, setFooterOffset] = useState(0);
  /** Footer is in view far enough that lifting can no longer clear it. */
  const [retired, setRetired] = useState(false);
  const root = useRef<HTMLDivElement | null>(null);
  const list = useRef<HTMLDivElement | null>(null);

  // Scroll-spy the active section + overall progress + footer avoidance.
  useEffect(() => {
    let raf = 0;
    const GAP = 28; // px between nav and footer content

    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.42;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= line) current = i;
      });
      setIdx(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);

      // Avoid overlapping the footer: step the readout up off the footer's top
      // edge as it arrives, then retire it once it can no longer clear it.
      //
      // Lifting alone used to be the whole strategy, capped at the readout's own
      // height + GAP. That cap is why the chip ended up parked squarely over the
      // "Talk to us" phone numbers at the bottom of the page: the footer is
      // ~700px on desktop and ~1000px on mobile, so `overlap` runs far past the
      // ~63px the cap allows and the lift stops well inside the footer. Raising
      // the cap cannot fix it either — a fixed element cannot dodge a footer
      // taller than the viewport; it would just fly off the top instead.
      //
      // So past that point it fades out, which is also what it means: this is a
      // SECTION counter, the footer is not a section, and there is nothing left
      // to report once the reader is in it. That restores the promise in this
      // component's own docstring — no text ever sits over content.
      const footer = document.querySelector("footer");
      if (footer && root.current) {
        const footerTop = footer.getBoundingClientRect().top;
        const viewH = window.innerHeight;
        const navH = root.current.offsetHeight;
        const overlap = viewH - footerTop + GAP;
        const liftable = navH + GAP;
        setFooterOffset(overlap > 0 ? Math.min(overlap, liftable) : 0);
        setRetired(overlap > liftable);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close on Escape or a click outside.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  // Stagger the list open.
  useEffect(() => {
    if (!open || prefersReducedMotion() || !list.current) return;
    const items = list.current.querySelectorAll(`.${styles.chapItem}`);
    const tl = gsap.timeline();
    tl.fromTo(list.current, { autoAlpha: 0, y: 8 }, { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" });
    tl.fromTo(items, { opacity: 0, x: 10 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out", stagger: 0.028 }, 0.04);
    return () => {
      tl.kill();
    };
  }, [open]);

  return (
    <div
      ref={root}
      className={`${styles.chapNav} ${retired ? styles.chapNavRetired : ""}`}
      style={{ transform: `translateY(${-footerOffset}px)` }}
      aria-hidden={retired || undefined}
      // hovering the readout reveals the section names; clicking one jumps there
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {open && !retired && (
        <div ref={list} className={styles.chapList} role="menu" aria-label="Sections">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={styles.chapItem}
              aria-current={i === idx ? "true" : undefined}
              onClick={() => setOpen(false)}
              data-cursor="Go"
            >
              <span className={styles.chapItemNum}>{pad(i)}</span>
              <span>{s.label}</span>
            </a>
          ))}
        </div>
      )}

      <button
        className={styles.chapBar}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Sections"
        data-cursor="Sections"
      >
        <span
          className={styles.chapTick}
          style={{ ["--p" as string]: progress } as React.CSSProperties}
          aria-hidden
        />
        <span className={styles.chapCount}>
          {pad(idx)} / {pad(SECTIONS.length - 1)}
        </span>
        <span className={styles.chapSep} aria-hidden>
          ·
        </span>
        <span className={styles.chapName}>{SECTIONS[idx].label}</span>
      </button>
    </div>
  );
}
