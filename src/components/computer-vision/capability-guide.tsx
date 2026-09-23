"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * A "match the capability to the problem" guide.
 *
 * `columns` names the four attributes every row carries; `rows` supplies the
 * problem and its four values. `notes` are optional closing paragraphs — the
 * caveat a lookup table always needs.
 */
export interface CapabilityGuideContent {
  eyebrow: string;
  title: string;
  body: string;
  columns: {
    readonly problem: string;
    readonly input: string;
    readonly capability: string;
    readonly validation: string;
    readonly outcome: string;
  };
  rows: readonly {
    readonly problem: string;
    readonly input: string;
    readonly capability: string;
    readonly validation: string;
    readonly outcome: string;
  }[];
  notes?: readonly string[];
}

const iconProps = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Capability guide — a five-column lookup table rendered as one card per
 * business problem instead of an actual `<table>`.
 *
 * A table of five prose columns cannot stay legible: at 360px it becomes a
 * horizontal scroller that hides most of the row, and even on desktop five
 * columns of sentences read as a wall. Each row is really one problem
 * described by four labelled attributes, not a grid of independently
 * sortable cells, so it is built as a card: the problem is the heading, and
 * the four attributes sit beneath it as labelled fields — stacked on mobile,
 * four across from 1000px. The capability (what you would buy) and the
 * outcome (what you get) are the two the reader is actually scanning for, so
 * the capability carries the accent and the outcome is ruled off at the end
 * of the row.
 *
 * Entrance is one staggered fade/lift per card, played once by a bare
 * trigger so a mid-play `ScrollTrigger.refresh()` cannot strand it.
 */
export default function CapabilityGuide({
  content,
  id = "capabilities",
}: {
  content: CapabilityGuideContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.capCard}`, root.current);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 26 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.12,
            clearProps: "transform,opacity",
          });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <ol ref={root} className={styles.capRows}>
        {rows.map((r) => (
          <li key={r.problem} className={styles.capCard}>
            <div className={styles.capHead}>
              {/* An icon picked from the problem, not a "01" ordinal: the Sep
                  corrections review asked for icons in place of numbers. */}
              <CardIconBadge
                title={r.problem}
                body={r.input}
                size="sm"
                className={styles.capIndex}
              />
              <span className={styles.capProblemLabel}>{columns.problem}</span>
              <h3 className={styles.capProblem}>{r.problem}</h3>
            </div>

            <div className={styles.capFields}>
              <div className={styles.capField}>
                <span className={styles.capFieldLabel}>
                  <svg {...iconProps} className={styles.capFieldIcon}>
                    <rect x="2.5" y="4" width="15" height="11" rx="2" />
                    <circle cx="10" cy="9.5" r="2.6" />
                  </svg>
                  {columns.input}
                </span>
                <p className={styles.capFieldValue}>{r.input}</p>
              </div>

              <div className={`${styles.capField} ${styles.capFieldKey}`}>
                <span className={styles.capFieldLabel}>
                  <svg {...iconProps} className={styles.capFieldIcon}>
                    <path d="M3 12.5l4-4 3 3 7-7" />
                    <path d="M13 4.5h4v4" />
                  </svg>
                  {columns.capability}
                </span>
                <p className={styles.capFieldValue}>{r.capability}</p>
              </div>

              <div className={styles.capField}>
                <span className={styles.capFieldLabel}>
                  <svg {...iconProps} className={styles.capFieldIcon}>
                    <path d="M10 2.5l6 2.5v4.6c0 3.4-2.4 5.8-6 7-3.6-1.2-6-3.6-6-7V5z" />
                    <path d="M7.6 10.2l1.7 1.7 3.3-3.7" />
                  </svg>
                  {columns.validation}
                </span>
                <p className={styles.capFieldValue}>{r.validation}</p>
              </div>

              <div className={`${styles.capField} ${styles.capFieldOutcome}`}>
                <span className={styles.capFieldLabel}>
                  <svg {...iconProps} className={styles.capFieldIcon}>
                    <path d="M3 10h11" />
                    <path d="M10.5 6l4 4-4 4" />
                  </svg>
                  {columns.outcome}
                </span>
                <p className={styles.capFieldValue}>{r.outcome}</p>
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
