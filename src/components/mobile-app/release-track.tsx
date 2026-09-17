"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface ReleaseTrackContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Optional button under the track — the section's own CTA on the live page. */
  cta?: { readonly label: string; readonly href: string };
  steps: readonly {
    readonly n: string;
    readonly name: string;
    readonly body: string;
  }[];
}

/**
 * The delivery process as a release track — one horizontal rail with the
 * phases hanging off it, alternating above and below.
 *
 * A schedule is a line, and a run-up to a store release is a line with dates
 * on it, so the section is a line rather than a grid of equal cards. The
 * zigzag is what makes it fit: a phase above and the next below can overlap
 * horizontally without colliding, so each card gets roughly a third of the
 * width for its copy instead of a sixth. The cards sit on a seven-column grid
 * and each spans two of them, which puts the six stations at even sevenths of
 * the rail with no card running off either end.
 *
 * The reveal is the track being laid: the rail draws left to right, each
 * station pops as the rail reaches it, its stem grows out of the line, and its
 * card arrives from the rail's side — above the line the cards rise, below it
 * they drop, so everything reads as growing out of the one line.
 *
 * Below 1080px the rail is dropped entirely and the phases become a plain
 * numbered column: six cards zigzagging either side of a line needs width it
 * does not have there, and a squeezed zigzag reads as a mistake. The numbers
 * live on the cards, not on the markers, so nothing is lost in that layout.
 *
 * Entrance is one detached timeline played once by a bare trigger — never a
 * timeline owned by a ScrollTrigger, which a mid-play `ScrollTrigger.refresh()`
 * would restore at its interrupted progress, paused (see why-us.tsx).
 */
export default function ReleaseTrack({
  content,
  id = "journey",
}: {
  content: ReleaseTrackContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const steps = content.steps;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const line = el.querySelector(`.${styles.trkLine}`);
      const marks = gsap.utils.toArray<HTMLElement>(`.${styles.trkMark}`, el);
      const stems = gsap.utils.toArray<HTMLElement>(`.${styles.trkStem}`, el);
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.trkCard}`, el);
      if (!cards.length) return;

      if (line) gsap.set(line, { scaleX: 0, transformOrigin: "left center" });
      gsap.set(marks, { scale: 0, transformOrigin: "center center" });
      gsap.set(stems, { scaleY: 0 });
      // Above the line the cards rise into place, below it they drop — each
      // one arrives from the rail it belongs to.
      cards.forEach((card) => {
        gsap.set(card, { opacity: 0, y: card.dataset.side === "up" ? 26 : -26 });
      });

      const tl = gsap.timeline({ paused: true });

      if (line) tl.to(line, { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0);
      tl.to(marks, { scale: 1, duration: 0.42, ease: "back.out(2.6)", stagger: 0.16 }, 0.16)
        .to(stems, { scaleY: 1, duration: 0.36, ease: "power2.out", stagger: 0.16 }, 0.28)
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
            stagger: 0.16,
            // Leave no inline transform behind, so the CSS hover lift works.
            clearProps: "transform,opacity",
          },
          0.34,
        );

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
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      {/*
       * The rail is an overlay, not a grid row: the two card rows are sized
       * `1fr 1fr`, so their shared edge is exactly the half-way line the rail
       * sits on, and the row gap is the clearance either side of it. That
       * keeps one line across the whole section without the stations having
       * to be grid items themselves.
       */}
      <div ref={root} className={styles.trkGrid}>
        <div className={styles.trkRail} aria-hidden>
          <span className={styles.trkLine} />
          {steps.map((step, i) => (
            <span
              key={step.n}
              className={styles.trkMark}
              data-side={i % 2 === 0 ? "up" : "down"}
              // Each card spans two of seven columns starting at its own, so
              // its centre — and therefore its station — sits at (i+1)/7.
              style={{ left: `${((i + 1) / (steps.length + 1)) * 100}%` }}
            >
              <span className={styles.trkStem} />
            </span>
          ))}
        </div>

        <ol className={styles.trkList}>
          {steps.map((step, i) => (
            <li
              key={step.n}
              className={styles.trkCard}
              data-side={i % 2 === 0 ? "up" : "down"}
              style={{ ["--col" as string]: i + 1 }}
            >
              <span className={styles.trkNum} aria-hidden>
                {step.n}
              </span>
              <h3 className={styles.trkName}>{step.name}</h3>
              <p className={styles.trkBody}>{step.body}</p>
            </li>
          ))}
        </ol>
      </div>

      {content.cta && (
        <div className={styles.trkCta}>
          <a className={styles.trkCtaLink} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      )}
    </section>
  );
}
