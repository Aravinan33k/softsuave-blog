"use client";

import { useRef } from "react";
import { why } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/** Two full 0-9 sequences so each digit column can roll a full loop before it
 *  settles on its final value (classic split-flap / odometer feel). */
const ODO = Array.from({ length: 20 }, (_, i) => i % 10);

/** Per-stat icon + supporting line (aligned to why.stats by index). */
const META = [
  {
    icon: "specialists",
    line: "Engineers, data scientists, and AI specialists building production systems in-house.",
  },
  {
    icon: "years",
    line: "Years of delivering reliable software and production-ready AI solutions.",
  },
  {
    icon: "clients",
    line: "Startups, SMBs, and enterprises trusting us from first idea to launch and beyond.",
  },
  {
    icon: "countries",
    line: "Countries served through successful client partnerships.",
  },
] as const;

function StatIcon({ name }: { name: string }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "specialists":
      return (
        <svg viewBox="0 0 48 48" className={styles.stackIconSvg}>
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="19" cy="20" r="4.5" {...common} />
          <circle cx="30" cy="21.5" r="3.5" {...common} />
          <path d="M12 33c0-4 3.2-6.5 7-6.5s7 2.5 7 6.5" {...common} />
          <path d="M27 27.5c3 .3 5.5 2.4 5.5 5.5" {...common} />
        </svg>
      );
    case "years":
      return (
        <svg viewBox="0 0 48 48" className={styles.stackIconSvg}>
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="24" cy="21" r="8" {...common} />
          <path d="M24 17v4l2.5 2" {...common} />
          <path d="M19 28l-2.5 8 7.5-4 7.5 4-2.5-8" {...common} />
        </svg>
      );
    case "clients":
      return (
        <svg viewBox="0 0 48 48" className={styles.stackIconSvg}>
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <circle cx="24" cy="24" r="12" {...common} />
          <path d="M12 24h24M24 12c3.5 3.4 3.5 20.6 0 24M24 12c-3.5 3.4-3.5 20.6 0 24" {...common} />
        </svg>
      );
    case "countries":
    default:
      return (
        <svg viewBox="0 0 48 48" className={styles.stackIconSvg}>
          <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" opacity="0.4" fill="none" />
          <path d="M24 12c5 0 8 3.4 8 8 0 5.5-8 16-8 16s-8-10.5-8-16c0-4.6 3-8 8-8z" {...common} />
          <circle cx="24" cy="20" r="3" {...common} />
        </svg>
      );
  }
}

/**
 * "Why Soft Suave" proof band — four square stat cards in a single row that
 * fits one screen (no scroll-through-to-reveal stacking; every number stays
 * fully readable throughout). Entering view fires one shared timeline: cards
 * fade/rise in together, then each card's odometer figure rolls into place
 * as its icon/line reveal lands. Reduced motion: figures set straight to
 * their final value, cards static.
 */
export default function Stats() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!root.current) return;
      const reduce = prefersReducedMotion();

      const landing = (t: Element) => -(Number((t as HTMLElement).dataset.digit) + 10) * 5;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.stackCard}`, root.current);

      if (reduce) {
        cards.forEach((card) => {
          gsap.utils
            .toArray<HTMLElement>(`.${styles.odoStrip}`, card)
            .forEach((s) => gsap.set(s, { yPercent: landing(s) }));
        });
        return;
      }

      // cards start fanned outward from center (tilted away on their Y axis)
      // and slightly below/behind, then converge inward into their grid slot —
      // reads as the row "assembling" itself rather than a plain fade-up.
      const mid = (cards.length - 1) / 2;
      const fromX = (_i: number, t: Element) => (cards.indexOf(t as HTMLElement) - mid) * 46;
      const fromRotateY = (_i: number, t: Element) => (cards.indexOf(t as HTMLElement) - mid) * -9;

      gsap.set(cards, {
        opacity: 0,
        y: 34,
        scale: 0.9,
        rotateX: -10,
        x: fromX,
        rotateY: fromRotateY,
        transformOrigin: "50% 100%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top 78%",
          toggleActions: "restart none restart reset",
        },
      });

      // cards swing/fan in and settle with a light spring overshoot, using the
      // section's existing 3D perspective so the entrance feels tied to the
      // card design rather than a generic fade. Replays on every re-entry.
      tl.to(
        cards,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: 0.9,
          ease: "back.out(1.5)",
          stagger: 0.09,
        },
        0,
      );

      // each card's number counts up and settles, staggered
      cards.forEach((card, i) => {
        const strips = gsap.utils.toArray<HTMLElement>(`.${styles.odoStrip}`, card);
        const at = 0.25 + i * 0.14;
        gsap.set(strips, { yPercent: 0 });
        tl.to(
          strips,
          { yPercent: (_i: number, t: Element) => landing(t), duration: 1.1, ease: "power4.out", stagger: 0.06 },
          at,
        ).from(
          card.querySelectorAll(`.${styles.stackReveal}`),
          { opacity: 0, y: 14, duration: 0.5, ease: "power2.out", stagger: 0.06 },
          at + 0.1,
        );
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.whyStackSection}>
      <div ref={root} className={styles.stackWrap}>
        {why.stats.map((s, i) => {
          const meta = META[i] ?? META[0];
          const digits = String(s.value).split("");
          return (
            <div key={s.label} className={styles.stackTilt}>
              <article className={styles.stackCard}>
                <div className={styles.stackTab}>
                  <span className={styles.stackTabDot} aria-hidden />
                  <span className={styles.stackTabTitle}>{s.label}</span>
                  <span className={styles.stackTabDot} aria-hidden />
                </div>

                <div className={styles.stackBody}>
                  <div className={`${styles.stackIcon} ${styles.stackReveal}`}>
                    <StatIcon name={meta.icon} />
                  </div>

                  <span className={styles.stackNum}>
                    <span className={styles.odometer} aria-hidden>
                      {digits.map((ch, di) => (
                        <span key={di} className={styles.odoCol}>
                          <span className={styles.odoStrip} data-digit={ch}>
                            {ODO.map((n, ri) => (
                              <span key={ri} className={styles.odoDigit}>
                                {n}
                              </span>
                            ))}
                          </span>
                        </span>
                      ))}
                      <span className={styles.odoSuffix}>{s.suffix}</span>
                    </span>
                    <span className={styles.srOnly}>
                      {s.value}
                      {s.suffix}
                    </span>
                  </span>

                  <p className={`${styles.stackLine} ${styles.stackReveal}`}>{meta.line}</p>
                </div>
              </article>
            </div>
          );
        })}
      </div>
    </section>
  );
}
