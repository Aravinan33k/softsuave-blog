"use client";

import { useRef, type ReactNode } from "react";
import { caComparison } from "@/lib/home/custom-ai-content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * One icon per comparison area (`caComparison.rows`, in order) — purely
 * decorative (`aria-hidden`, the row's own heading already names the area),
 * just a visual anchor so eight rows of prose don't read as one grey block.
 * Same inline-`<svg>`/stroke convention as `Hero`'s field icons.
 */
const ROW_ICONS: readonly ReactNode[] = [
  // Customization — adjustment sliders
  <path key="customization" d="M4 6h6M14 6h6M4 12h10M18 12h2M4 18h2M10 18h10" />,
  // Data usage — database
  <g key="data-usage">
    <ellipse cx="12" cy="6" rx="7" ry="3" />
    <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
    <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
  </g>,
  // Integration — linked chain
  <g key="integration">
    <path d="M9.5 14.5l5-5" />
    <path d="M13 5.5l1-1a3 3 0 114.2 4.2l-1 1" />
    <path d="M11 18.5l-1 1a3 3 0 11-4.2-4.2l1-1" />
  </g>,
  // Ownership and control — shield
  <g key="ownership-and-control">
    <path d="M12 3.5l6.5 2.8v5.4c0 4-2.7 6.8-6.5 8.3-3.8-1.5-6.5-4.3-6.5-8.3V6.3z" />
    <path d="M9 12.2l2 2 4-4.4" />
  </g>,
  // Scalability — trending up
  <g key="scalability">
    <path d="M4 16.5l5-5 4 4 6.5-7.5" />
    <path d="M15.5 7.5h4v4" />
  </g>,
  // Security — padlock
  <g key="security">
    <rect x="5.5" y="11" width="13" height="9" rx="2" />
    <path d="M8.5 11V8a3.5 3.5 0 017 0v3" />
  </g>,
  // Implementation — build blocks
  <g key="implementation">
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="4" width="7" height="7" rx="1.2" />
    <rect x="4" y="13" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
  </g>,
  // Best suited for — target
  <g key="best-suited-for">
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
 * Custom vs. off-the-shelf comparison.
 *
 * Was a table-on-desktop/cards-on-mobile pair reusing the shared `cmp*`
 * classes; now one responsive layout at every width instead of two parallel
 * markups, no `<table>` needed since each row is really just two labelled
 * values, not a grid of independently-sortable cells: each "area" is its own
 * bordered card, holding its Custom vs. Off-the-shelf pair side by side
 * (stacked below 640px, with a hairline moving from between the pair to
 * under each label).
 *
 * Reveals as one shared ScrollTrigger, staggered row by row: each row's
 * icon+heading fades up first, then its two value cells slide in from
 * opposite edges toward the middle — a small "converging" motion that
 * echoes the vs. framing. A click/tap on a card additionally gives it a
 * quick squash-and-spring — the same click-bounce language as `why-us.tsx`'s
 * proof cards, decorative only (no button role).
 */
export default function Comparison() {
  const { columns, rows } = caComparison;
  const root = useRef<HTMLOListElement | null>(null);

  const bounce = (e: React.MouseEvent<HTMLLIElement>) => {
    if (prefersReducedMotion()) return;
    gsap.fromTo(
      e.currentTarget,
      { scale: 0.97 },
      { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)", overwrite: true },
    );
  };

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.cmpRow}`, root.current);
      if (!items.length) return;

      const heads = items.map((row) => row.querySelector<HTMLElement>(`.${styles.cmpRowHead}`));
      const leads = items.map((row) => row.querySelector<HTMLElement>(`.${styles.cmpCellLead}`));
      const others = items.map((row) =>
        row.querySelector<HTMLElement>(`.${styles.cmpCell}:not(.${styles.cmpCellLead})`),
      );

      gsap.set(heads.filter(Boolean), { opacity: 0, y: 10 });
      gsap.set(leads.filter(Boolean), { opacity: 0, x: -24 });
      gsap.set(others.filter(Boolean), { opacity: 0, x: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      tl.to(heads.filter(Boolean), { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.12 }, 0)
        .to(leads.filter(Boolean), { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 }, 0.1)
        .to(others.filter(Boolean), { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.12 }, 0.1);
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id="comparison">
      <SectionHead
        kicker={caComparison.eyebrow}
        title={caComparison.title}
        intro={caComparison.body}
      />

      <ol ref={root} className={styles.cmpRows}>
        {rows.map((r, i) => (
          <li key={r.area} className={styles.cmpRow} onClick={bounce}>
            <div className={styles.cmpRowHead}>
              <svg {...iconProps} className={styles.cmpRowIcon}>
                {ROW_ICONS[i % ROW_ICONS.length]}
              </svg>
              <h3 className={styles.cmpRowArea}>{r.area}</h3>
            </div>

            <div className={styles.cmpRowGrid}>
              <div className={`${styles.cmpCell} ${styles.cmpCellLead}`}>
                <span className={styles.cmpCellLabel}>
                  <svg {...iconProps} className={styles.cmpCellIcon}>
                    <path d="M5 12.5l4 4 10-10" />
                  </svg>
                  {columns.custom}
                </span>
                <p className={styles.cmpCellText}>{r.custom}</p>
              </div>

              <div className={styles.cmpCell}>
                <span className={styles.cmpCellLabel}>
                  <svg {...iconProps} className={styles.cmpCellIcon}>
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                  {columns.offTheShelf}
                </span>
                <p className={styles.cmpCellText}>{r.offTheShelf}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
