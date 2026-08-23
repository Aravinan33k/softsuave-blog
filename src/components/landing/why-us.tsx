"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";
import type { CardGridContent } from "./industries";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Why Soft Suave — the differentiators as six bordered cards, each led by a
 * large serif figure (the one place this surface still uses the brand
 * display serif). Cards spring in on a bounce rather than a plain fade, and
 * a click/tap replays that same spring on just that card — a small tactile
 * reward for engaging with a proof point, in the homepage's motion vocabulary
 * (`back.out`/`elastic.out` overshoot eases, same family as `stats.tsx`'s
 * card entrance) without borrowing its odometer set piece.
 */
export default function WhyUs({
  content,
  id = "why",
}: {
  content: CardGridContent;
  id?: string;
}) {
  const root = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.proofItem}`, root.current);
      gsap.from(cards, {
        opacity: 0,
        y: 36,
        scale: 0.9,
        duration: 0.75,
        ease: "back.out(1.7)",
        stagger: 0.09,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  // A quick squash-and-spring on the clicked card only — decorative, so it is
  // not given a button role: nothing else happens, there is nothing here a
  // screen reader user would otherwise miss.
  const bounce = (e: React.MouseEvent<HTMLLIElement>) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.94 },
      { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: true },
    );
  };

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <ul ref={root} className={styles.proofGrid}>
        {content.items.map((item, i) => (
          <li key={item.name} className={styles.proofItem} onClick={bounce}>
            <span className={styles.proofFigure} aria-hidden>
              {pad(i + 1)}
            </span>
            <h3 className={styles.proofName}>{item.name}</h3>
            <p className={styles.proofBody}>{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
