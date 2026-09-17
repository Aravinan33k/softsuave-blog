"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";
import type { ProcessContent } from "@/components/landing/process";

/**
 * Process as a spine, not a grid.
 *
 * The steps run down a single coral hairline, each hung off it by a numbered
 * marker with the step's name and body set beside it as a wide two-column
 * row. A sequence is a line, and drawing it as one says more than six equal
 * cards in a grid, which asks the reader to infer the order from the
 * numbers.
 *
 * Motion, as one detached timeline played once on entry:
 *
 *   spine    draws downward from the first marker to the last.
 *   markers  pop in as the line reaches them, so the drawing reads as
 *            causing each step rather than running behind them.
 *   rows     the name and body slide in from the spine, just behind their
 *            own marker.
 *
 * Hover a row and its marker fills, its name brightens, and a short coral
 * tick extends from the spine to the row — the connection made literal.
 * Under reduced motion the spine is simply drawn and every row is visible.
 */
export default function ProcessRail({
  content,
  id = "journey",
}: {
  content: ProcessContent;
  id?: string;
}) {
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.railRow}`, el);
      const markers = gsap.utils.toArray<HTMLElement>(`.${styles.railMarker}`, el);
      const mains = gsap.utils.toArray<HTMLElement>(`.${styles.railMain}`, el);
      const line = el.querySelector<HTMLElement>(`.${styles.railLine}`);
      if (!rows.length) return;

      if (line) gsap.set(line, { scaleY: 0, transformOrigin: "center top" });
      gsap.set(markers, { scale: 0.4, opacity: 0 });
      gsap.set(mains, { opacity: 0, x: -18 });

      // The spine takes as long as the markers and rows together, so the
      // three movements read as one gesture travelling down the section.
      const span = Math.max(0.9, rows.length * 0.12);
      const tl = gsap.timeline({ paused: true });

      if (line) tl.to(line, { scaleY: 1, duration: span, ease: "none" }, 0);
      tl.to(
        markers,
        { scale: 1, opacity: 1, duration: 0.45, ease: "back.out(2)", stagger: span / rows.length },
        0.05,
      ).to(
        mains,
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: span / rows.length,
          clearProps: "transform,opacity",
        },
        0.15,
      );

      // Detached timeline played once by a bare trigger, so a mid-play
      // `ScrollTrigger.refresh()` cannot strand it (see why-us.tsx).
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 78%",
        once: true,
        onEnter: () => tl.play(0),
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      {content.title && (
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      )}

      <ol ref={root} className={styles.rail}>
        {/* The spine sits behind the markers and is drawn by the reveal. */}
        <span className={styles.railLine} aria-hidden />

        {content.steps.map((step) => (
          <li key={step.n} className={styles.railRow}>
            <span className={styles.railMarker} aria-hidden>
              {step.n}
            </span>
            <div className={styles.railMain}>
              <span className={styles.railTick} aria-hidden />
              <h3 className={styles.railName}>{step.name}</h3>
              <p className={styles.railBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
