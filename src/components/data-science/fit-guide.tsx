"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * A "does this fit?" routing table.
 *
 * `columns` names the four headings the brief's table carries; each row is one
 * business problem routed through them. `notes` are the closing caveat a
 * lookup table always needs.
 */
export interface FitGuideContent {
  eyebrow: string;
  title: string;
  body: string;
  columns: {
    readonly problem: string;
    readonly data: string;
    readonly start: string;
    readonly next: string;
  };
  rows: readonly {
    readonly problem: string;
    readonly data: string;
    readonly start: string;
    readonly next: string;
  }[];
  notes?: readonly string[];
}

/** Chevron between stages of the track. */
const Chevron = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 10h11" />
    <path d="M11 6l4 4-4 4" />
  </svg>
);

/** Fork glyph opening the fallback branch. */
const Fork = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M4 3v6a4 4 0 004 4h8" />
    <path d="M12.5 9.5l3.5 3.5-3.5 3.5" />
  </svg>
);

/**
 * Fit guide — the brief's four-column triage table, rendered as one routed row
 * per business problem rather than an actual `<table>`.
 *
 * Four columns of prose cannot hold a table below roughly 1200px without
 * becoming a horizontal scroller that hides most of the row, and the columns
 * are not peers anyway: the first three are a *path* (this problem, with this
 * data, starts here) and the fourth is the branch you take when the answer is
 * "not this". So the first three run left to right joined by chevrons, with
 * the starting point — the answer the reader came for — lit on an accent
 * panel, and the fourth is demoted below a dashed rule behind a fork glyph.
 * On a narrow viewport the track stacks and the chevrons turn to point down,
 * so the reading order never changes.
 *
 * Each row reveals on its own trigger as it is reached: the row lifts in, the
 * three stages arrive left to right, the chevrons draw between them, and the
 * starting point lights last (`--lit`, tweened 0 → 1, which the accent panel's
 * tint and text colour read through `color-mix`). Every reveal is a detached
 * timeline played once by a bare trigger — never a timeline owned by a
 * ScrollTrigger, which a mid-play `ScrollTrigger.refresh()` would restore at
 * its interrupted progress, paused (see why-us.tsx).
 */
export default function FitGuide({
  content,
  id = "fit",
}: {
  content: FitGuideContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const rowEls = gsap.utils.toArray<HTMLElement>(`.${styles.fitRow}`, root.current);
      if (!rowEls.length) return;

      const triggers: ScrollTrigger[] = [];
      const timelines: gsap.core.Timeline[] = [];

      rowEls.forEach((row) => {
        const cells = row.querySelectorAll(`.${styles.fitCell}`);
        const links = row.querySelectorAll(`.${styles.fitLink}`);
        const start = row.querySelector(`.${styles.fitStart}`);
        const branch = row.querySelector(`.${styles.fitBranch}`);

        gsap.set(row, { opacity: 0, y: 26 });
        gsap.set(cells, { opacity: 0, y: 12 });
        gsap.set(links, { opacity: 0, scaleX: 0.2, transformOrigin: "left center" });
        if (start) gsap.set(start, { "--lit": 0 });
        if (branch) gsap.set(branch, { opacity: 0, x: -12 });

        const tl = gsap.timeline({ paused: true });

        tl.to(row, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,opacity",
        })
          .to(
            cells,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
              stagger: 0.12,
              clearProps: "transform,opacity",
            },
            0.05,
          )
          .to(
            links,
            {
              opacity: 1,
              scaleX: 1,
              duration: 0.4,
              ease: "power2.out",
              stagger: 0.12,
              clearProps: "transform,opacity",
            },
            0.18,
          );

        if (start) tl.to(start, { "--lit": 1, duration: 0.5, ease: "power2.out" }, 0.42);
        if (branch) {
          tl.to(
            branch,
            {
              opacity: 1,
              x: 0,
              duration: 0.45,
              ease: "power2.out",
              clearProps: "transform,opacity",
            },
            0.5,
          );
        }

        timelines.push(tl);
        triggers.push(
          ScrollTrigger.create({
            trigger: row,
            start: "top 88%",
            once: true,
            onEnter: () => tl.play(0),
          }),
        );
      });

      return () => {
        triggers.forEach((t) => t.kill());
        timelines.forEach((t) => t.kill());
      };
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <ol ref={root} className={styles.fitRows}>
        {rows.map((r) => (
          <li key={r.problem} className={styles.fitRow}>
            <div className={styles.fitTrack}>
              <div className={`${styles.fitCell} ${styles.fitProblem}`}>
                <span className={styles.fitLabel}>
                  {/* An icon picked from the problem, not a "01" ordinal: the
                      Sep corrections review asked for icons in place of numbers. */}
                  <CardIconBadge title={r.problem} size="sm" className={styles.fitIndex} />
                  {columns.problem}
                </span>
                <h3 className={styles.fitProblemName}>{r.problem}</h3>
              </div>

              <span className={styles.fitLink} aria-hidden>
                <Chevron />
              </span>

              <div className={styles.fitCell}>
                <span className={styles.fitLabel}>{columns.data}</span>
                <p className={styles.fitValue}>{r.data}</p>
              </div>

              <span className={styles.fitLink} aria-hidden>
                <Chevron />
              </span>

              <div className={`${styles.fitCell} ${styles.fitStart}`}>
                <span className={styles.fitLabel}>{columns.start}</span>
                <p className={styles.fitValue}>{r.start}</p>
              </div>
            </div>

            <div className={styles.fitBranch}>
              <span className={styles.fitFork} aria-hidden>
                <Fork />
              </span>
              <div>
                <span className={styles.fitLabel}>{columns.next}</span>
                <p className={styles.fitValue}>{r.next}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {notes && notes.length > 0 && (
        <div className={styles.cmpNotes}>
          {notes.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
      )}
    </section>
  );
}
