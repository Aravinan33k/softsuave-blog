"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * Two-option comparison, one row per decision factor or dimension.
 *
 * `lead` is the first option, `other` the second. `notes` are optional
 * closing paragraphs under the rows — the "when to pick which", or the
 * caveat a lookup table always needs.
 */
export interface ComparisonContent {
  /** Optional — a sub-section under a wider heading may carry no kicker. */
  eyebrow?: string;
  title: string;
  body: string;
  columns: {
    readonly area: string;
    readonly lead: string;
    readonly other: string;
  };
  rows: readonly {
    readonly area: string;
    readonly lead: string;
    readonly other: string;
    /**
     * Which option this factor favours. Read by `comparison-board.tsx` to
     * lean the row's marker and light the winning cell; ignored here.
     * Omit for a factor with no clear winner.
     */
    readonly favors?: "lead" | "other";
  }[];
  notes?: readonly string[];
}

/**
 * Decorative row icons, cycled by row index (`aria-hidden` — the row's own
 * heading already names the dimension). Same inline-`<svg>`/stroke convention
 * as `Hero`'s field icons.
 */
const ROW_ICONS: readonly ReactNode[] = [
  // Question mark in a circle — the primary question
  <g key="question">
    <circle cx="12" cy="12" r="8" />
    <path d="M10 9.6a2 2 0 113.2 1.6c-.7.5-1.2.9-1.2 1.8" />
    <path d="M12 16.2h.01" />
  </g>,
  // Document — typical output
  <g key="output">
    <rect x="5" y="3.5" width="14" height="17" rx="2" />
    <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" />
  </g>,
  // Flag — natural endpoint
  <g key="endpoint">
    <path d="M6 21V4" />
    <path d="M6 5h11l-2 3.5L17 12H6" />
  </g>,
  // Nodes — underlying methods
  <g key="methods">
    <circle cx="6" cy="8" r="2" />
    <circle cx="6" cy="16" r="2" />
    <circle cx="17" cy="12" r="2.4" />
    <path d="M8 8.9l6.7 2.3M8 15.1l6.7-2.3" />
  </g>,
  // People — business role
  <g key="role">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 19.5c0-3.6 2.9-5.8 6.5-5.8s6.5 2.2 6.5 5.8" />
  </g>,
  // Refresh — knowledge that changes
  <g key="refresh">
    <path d="M20 12a8 8 0 01-14.2 5" />
    <path d="M4 12a8 8 0 0114.2-5" />
    <path d="M18.5 3.5V7H15" />
    <path d="M5.5 20.5V17H9" />
  </g>,
  // Sliders — tone / format / behaviour
  <path key="sliders" d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h2M10 18h10" />,
  // Target — best suited for
  <g key="target">
    <circle cx="12" cy="12" r="8" />
    <circle cx="12" cy="12" r="4" />
  </g>,
];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Side-by-side comparison as a list of bordered row cards — each row holds
 * its pair of values (stacked below 640px). A `<table>` of prose columns
 * cannot stay legible at 360px, and each row here is really one dimension
 * described by two values rather than a grid of independently sortable
 * cells.
 *
 * `tone` decides whether the comparison takes a side:
 *
 *   verdict   the default. The lead option is marked with an accent label
 *             and a check, the other with a plain circle — for a "which
 *             should you use" comparison the page has an answer to.
 *   neutral   both options styled identically — for a definitional table
 *             that distinguishes two things without preferring either.
 *
 * Reveals as one detached timeline played once on entry, staggered row by
 * row: each row's icon and heading fade up first, then its two value cells
 * slide in from opposite edges toward the middle, a small "converging"
 * motion that echoes the side-by-side framing. A click on a card gives it a
 * quick squash-and-spring, decorative only.
 */
export default function Comparison({
  content,
  id = "comparison",
  tone = "verdict",
  level = 2,
}: {
  content: ComparisonContent;
  id?: string;
  tone?: "verdict" | "neutral";
  level?: 2 | 3;
}) {
  const { columns, rows, notes } = content;
  const root = useRef<HTMLOListElement | null>(null);
  const neutral = tone === "neutral";

  const bounce = (e: React.MouseEvent<HTMLLIElement>) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.97 },
      { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: "auto", clearProps: "transform" },
    );
  };

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.cmpRow}`, root.current);
      if (!items.length) return;

      const heads = items
        .map((row) => row.querySelector<HTMLElement>(`.${styles.cmpRowHead}`))
        .filter(Boolean) as HTMLElement[];
      const firsts = items
        .map((row) => row.querySelector<HTMLElement>(`.${styles.cmpCell}`))
        .filter(Boolean) as HTMLElement[];
      const lasts = items
        .map((row) => {
          const cells = row.querySelectorAll<HTMLElement>(`.${styles.cmpCell}`);
          return cells.length > 1 ? cells[cells.length - 1] : null;
        })
        .filter(Boolean) as HTMLElement[];

      gsap.set(heads, { opacity: 0, y: 10 });
      gsap.set(firsts, { opacity: 0, x: -24 });
      gsap.set(lasts, { opacity: 0, x: 24 });

      // Detached timeline played once by a bare trigger — a timeline owned by
      // a ScrollTrigger is restored at its interrupted progress, paused, by
      // any refresh that lands mid-play (see why-us.tsx).
      const tl = gsap.timeline({ paused: true });
      tl.to(heads, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.12, clearProps: "transform,opacity" }, 0)
        .to(firsts, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.12, clearProps: "transform,opacity" }, 0.1)
        .to(lasts, { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.12, clearProps: "transform,opacity" }, 0.1);

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
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

  /** Verdict marks a preferred side; neutral gives both the same dot. */
  const cellIcon = (isLead: boolean) => {
    if (neutral) return <circle cx="12" cy="12" r="3.4" fill="currentColor" stroke="none" />;
    return isLead ? <path d="M5 12.5l4 4 10-10" /> : <circle cx="12" cy="12" r="8" />;
  };

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead
        kicker={content.eyebrow}
        title={content.title}
        intro={content.body}
        level={level}
      />

      <ol ref={root} className={styles.cmpRows} aria-label={columns.area}>
        {rows.map((r, i) => (
          <li key={r.area} className={styles.cmpRow} onClick={bounce}>
            <div className={styles.cmpRowHead}>
              <svg {...iconProps} className={styles.cmpRowIcon}>
                {ROW_ICONS[i % ROW_ICONS.length]}
              </svg>
              <h3 className={styles.cmpRowArea}>{r.area}</h3>
            </div>

            <div className={styles.cmpRowGrid}>
              <div className={neutral ? styles.cmpCell : `${styles.cmpCell} ${styles.cmpCellLead}`}>
                <span className={styles.cmpCellLabel}>
                  <svg {...iconProps} className={styles.cmpCellIcon}>
                    {cellIcon(true)}
                  </svg>
                  {columns.lead}
                </span>
                <p className={styles.cmpCellText}>{r.lead}</p>
              </div>

              <div className={styles.cmpCell}>
                <span className={styles.cmpCellLabel}>
                  <svg {...iconProps} className={styles.cmpCellIcon}>
                    {cellIcon(false)}
                  </svg>
                  {columns.other}
                </span>
                <p className={styles.cmpCellText}>{r.other}</p>
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
