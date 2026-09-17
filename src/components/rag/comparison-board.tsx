"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import type { ComparisonContent } from "@/components/common/comparison";
import styles from "@/components/landing/landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Where the marker rests, as a percentage along the track. */
const LEAN = { lead: 14, other: 86, none: 50 } as const;

const iconProps = {
  viewBox: "0 0 20 20",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Comparison as a decision board.
 *
 * Every factor is a row card with a "lean" track across it: a hairline with
 * the lead option at the left end and the other at the right, and a coral
 * marker that rests toward whichever side the factor favours (centred when
 * neither does). Under the track sit the two answers, the winning one lit
 * with a check and the other dimmed with a dash. A verdict chip in the row
 * head names the winner in words for anyone who does not read the track.
 * The notes then carry the nuance a row of verdicts cannot.
 *
 * Motion (skipped under reduced motion, where every marker simply sits at
 * its rest position): rows fade up in sequence; each marker travels from the
 * centre to its side with a spring, and the winning cell lights the moment
 * it lands.
 *
 * Reads the same `ComparisonContent` as `comparison.tsx`, plus the optional
 * `favors` on each row.
 */
export default function ComparisonBoard({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const items = gsap.utils.toArray<HTMLElement>(`.${styles.boardRow}`, el);
      if (!items.length) return;

      // Initial state set up front, then a paused timeline of `to` tweens
      // that a bare trigger plays once. Deliberately not a timeline owned by
      // a ScrollTrigger: a `ScrollTrigger.refresh()` landing mid-play would
      // restore such a timeline at its interrupted progress, paused, leaving
      // rows stranded half-revealed (see why-us.tsx).
      const markers = items.map((row) => row.querySelector<HTMLElement>(`.${styles.boardMarker}`));
      const wins = items.map((row) => row.querySelector<HTMLElement>(`.${styles.boardCellWin}`));
      const chips = items.map((row) => row.querySelector<HTMLElement>(`.${styles.boardVerdict}`));

      gsap.set(items, { opacity: 0, y: 22 });
      gsap.set(markers.filter(Boolean), { left: "50%", scale: 0.6 });
      gsap.set(wins.filter(Boolean), { "--lit": 0 });
      gsap.set(chips.filter(Boolean), { opacity: 0, x: 8 });

      const tl = gsap.timeline({ paused: true });
      items.forEach((row, i) => {
        const marker = markers[i];
        const win = wins[i];
        const chip = chips[i];
        const at = i * 0.14;

        tl.to(row, { opacity: 1, y: 0, duration: 0.55, ease: "power2.out", clearProps: "transform,opacity" }, at);
        if (marker) {
          const rest = marker.dataset.rest ?? "50%";
          tl.to(marker, { left: rest, scale: 1, duration: 0.9, ease: "elastic.out(1, 0.55)" }, at + 0.25);
        }
        if (win) {
          tl.to(win, { "--lit": 1, duration: 0.45, ease: "power2.out" }, at + 0.55);
        }
        if (chip) {
          tl.to(chip, { opacity: 1, x: 0, duration: 0.4, ease: "power2.out", clearProps: "transform,opacity" }, at + 0.6);
        }
      });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 82%",
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

      <div ref={root}>
        {/* Legend: which end of every track is which. */}
        <div className={styles.boardLegend} aria-hidden>
          <span className={`${styles.boardLegendEnd} ${styles.boardLegendLead}`}>
            <span className={styles.boardLegendDot} />
            {columns.lead}
          </span>
          <span className={styles.boardLegendMid}>{columns.area}</span>
          <span className={styles.boardLegendEnd}>
            {columns.other}
            <span className={styles.boardLegendDot} />
          </span>
        </div>

        <ol className={styles.boardRows}>
          {rows.map((r, i) => {
            const favors = r.favors ?? "none";
            const rest = `${LEAN[favors]}%`;
            const winner = favors === "lead" ? columns.lead : favors === "other" ? columns.other : null;

            const cell = (side: "lead" | "other", label: string, value: string) => {
              const wins = favors === side;
              const loses = favors !== "none" && !wins;
              return (
                <div
                  className={[
                    styles.boardCell,
                    side === "other" ? styles.boardCellOther : "",
                    wins ? styles.boardCellWin : "",
                    loses ? styles.boardCellLose : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <span className={styles.boardCellLabel}>{label}</span>
                  <span className={styles.boardCellValue}>
                    <svg {...iconProps} className={styles.boardCellIcon}>
                      {wins ? <path d="M4 10.6l4 3.8 8-8.8" /> : <path d="M5 10h10" />}
                    </svg>
                    {value}
                  </span>
                </div>
              );
            };

            return (
              <li key={r.area} className={styles.boardRow}>
                <div className={styles.boardRowHead}>
                  <span className={styles.boardIndex} aria-hidden>
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.boardArea}>{r.area}</h3>
                  {winner && (
                    <span
                      className={`${styles.boardVerdict}${
                        favors === "lead" ? ` ${styles.boardVerdictLead}` : ""
                      }`}
                    >
                      {winner}
                    </span>
                  )}
                </div>

                <div className={styles.boardTrack} aria-hidden>
                  <span className={styles.boardTrackLine} />
                  <span className={styles.boardTrackTick} />
                  <span className={styles.boardMarker} data-rest={rest} style={{ left: rest }} />
                </div>

                <div className={styles.boardCells}>
                  {cell("lead", columns.lead, r.lead)}
                  {cell("other", columns.other, r.other)}
                </div>
              </li>
            );
          })}
        </ol>

        {notes && notes.length > 0 && (
          <div className={styles.cmpNotes}>
            {notes.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
