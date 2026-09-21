"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

/**
 * A comparison section: one "area" per row, each holding two or more labelled
 * values side by side.
 *
 * This is the content-driven generalisation of the earlier card-per-row
 * version of this layout. `components/common/comparison.tsx` still renders
 * that one and still owns the `.cmpRow*`/`.cmpCell*` classes this component
 * does not touch — do not delete those when tidying the stylesheet.
 * `components/custom-ai/comparison.tsx` used to be a second copy of it and is
 * now a thin adapter over this component, passing its own row icons.
 * Several of the delivery-model landing pages need
 * the same section with their own copy — staff augmentation vs. traditional
 * hiring, one engagement model against another, India against the other
 * outsourcing destinations — and the last of those needs four value columns,
 * not two. Rather than a fourth copy of the markup, the shape is a prop and the
 * column count is whatever `columns` holds.
 *
 * Rendered as a real `<table>`. Stating each column heading once at the top,
 * instead of repeating it on every row, is what makes this read as a comparison
 * rather than a stack of boxes, and it lets a screen reader announce the column
 * per cell for free. Below 760px the table reflows to one card per row (the
 * headings move inline, since a four-column table cannot survive a phone), so
 * every element carries an explicit ARIA role — `display: block` otherwise
 * drops table semantics in WebKit and NVDA.
 */
export interface ComparisonContent {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Column headings for the value cells, in order. The first is the "lead"
   * column and takes the coral accent — on a vs. comparison that is the option
   * the page is about.
   */
  columns: readonly string[];
  /**
   * One row per comparison area. `values` is positional against `columns`, so
   * the two arrays must be the same length.
   */
  rows: readonly { readonly area: string; readonly values: readonly string[] }[];
  /**
   * Row markers, positional against `rows`, for a page whose areas have real
   * subjects worth drawing — a padlock on Security reads as the row's meaning,
   * where `ROW_MARKS` can only cycle shapes that mean nothing in particular.
   *
   * Each entry is the *inside* of a 24×24 stroke `<svg>` (a `<path>`/`<g>`),
   * not the element itself: the wrapper carries the shared `iconProps` and
   * `.cmpAreaIcon`, so a caller cannot drift off the section's icon style.
   * Omitted — the usual case — falls back to the generic marks, and a list
   * shorter than `rows` falls back for the rows it does not cover.
   */
  icons?: readonly ReactNode[];
  /**
   * Paint the lead column as the option this section RECOMMENDS: a coral wash
   * down its full height, the other columns' prose stepped back, and a tick
   * against each lead cell that actually beats the alternatives.
   *
   * OFF BY DEFAULT, and that default is load-bearing. Not every table here is
   * an argument. `it-outsourcing-content`'s destination matrix opens by saying
   * "India is not automatically the right answer", and it means it — Mexico
   * wins the working-hour row outright. Washing India's column coral would
   * contradict the section's own standfirst and turn an honest comparison into
   * a claim. Turn this on only where the page is genuinely arguing for column
   * one.
   */
  verdict?: boolean;
  /**
   * One line closing a `verdict` table — the "so what" a reader should leave
   * with. Optional, and never invented by this component: a table with no
   * supplied note simply ends on its last row, as it does today.
   */
  verdictNote?: string;
}

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
 * Decorative row markers, cycled positionally. Deliberately generic shapes
 * rather than the custom-AI page's topic-specific set: this component does not
 * know what it is comparing, and a wrong-but-confident icon reads worse than a
 * neutral one. They are `aria-hidden` — the row's own heading names the area.
 */
const ROW_MARKS = [
  <g key="a">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v8M8 12h8" />
  </g>,
  <g key="b">
    <path d="M4 16.5l5-5 4 4 6.5-7.5" />
    <path d="M15.5 7.5h4v4" />
  </g>,
  <g key="c">
    <path d="M12 3.5l6.5 2.8v5.4c0 4-2.7 6.8-6.5 8.3-3.8-1.5-6.5-4.3-6.5-8.3V6.3z" />
    <path d="M9 12.2l2 2 4-4.4" />
  </g>,
  <g key="d">
    <rect x="4" y="4" width="7" height="7" rx="1.2" />
    <rect x="13" y="4" width="7" height="7" rx="1.2" />
    <rect x="4" y="13" width="7" height="7" rx="1.2" />
    <rect x="13" y="13" width="7" height="7" rx="1.2" />
  </g>,
  <g key="e">
    <circle cx="12" cy="12" r="8" />
    <path d="M12 7.5v5l3 2" />
  </g>,
  <g key="f">
    <path d="M9.5 14.5l5-5" />
    <path d="M13 5.5l1-1a3 3 0 114.2 4.2l-1 1" />
    <path d="M11 18.5l-1 1a3 3 0 11-4.2-4.2l1-1" />
  </g>,
] as const;

/**
 * Whether the lead cell in this row is actually better than the alternatives,
 * for the purpose of drawing a tick on it.
 *
 * "Better" is approximated as "different from all of them", which sounds crude
 * and is exactly right for what it guards against. The partner table on the 20
 * hire pages (`hire-comparison.ts`) has two rows where Soft Suave and in-house
 * give the SAME answer — "Dedicated resources: Yes / Yes / No" and
 * "Communications: Seamless / Seamless / Uncertain". A tick against "Yes" when
 * the column beside it also says "Yes" is a claim the row's own content
 * contradicts, and a reader notices that immediately.
 *
 * So a row that ties is simply left unmarked: the wash still says which column
 * the page recommends overall, and the tick is reserved for the rows that earn
 * it. Nothing has to be hand-maintained, and a copy edit that turns a win into
 * a tie drops the tick on its own.
 */
function leadWinsRow(values: readonly string[]): boolean {
  const lead = values[0];
  if (lead === undefined || values.length < 2) return false;
  return values.slice(1).every((v) => v !== lead);
}

export default function Comparison({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  /** Four destination columns want to scroll sideways before they want to shrink. */
  const wide = content.columns.length > 2;
  const verdict = content.verdict === true;

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.cmpTr}`, root.current);
      if (!rows.length) return;

      const head = root.current.querySelector<HTMLElement>(`.${styles.cmpHeadRow}`);
      const areas = rows
        .map((row) => row.querySelector<HTMLElement>(`.${styles.cmpArea}`))
        .filter((el): el is HTMLElement => el !== null);
      const cells = rows.flatMap((row) =>
        gsap.utils.toArray<HTMLElement>(`.${styles.cmpTd}`, row),
      );

      if (head) gsap.set(head, { opacity: 0, y: -8 });
      gsap.set(areas, { opacity: 0, x: -18 });
      gsap.set(cells, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
      });
      if (head) tl.to(head, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }, 0);
      tl.to(
        areas,
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out", stagger: 0.09 },
        0.12,
      ).to(
        cells,
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", stagger: 0.05 },
        0.18,
      );
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div
        ref={root}
        className={[
          styles.cmpTableWrap,
          wide ? styles.cmpTableWrapWide : "",
          verdict ? styles.cmpTableWrapVerdict : "",
        ]
          .filter(Boolean)
          .join(" ")}
        /* Drives the sideways-scroll floor below. The IT-outsourcing table runs
           five destination columns; a single fixed min-width wide enough for
           those would force a scrollbar onto every three-column table too. */
        style={{ "--cmp-cols": content.columns.length } as React.CSSProperties}
      >
        <table className={styles.cmpTable} role="table">
          <thead role="rowgroup">
            <tr className={styles.cmpHeadRow} role="row">
              <th scope="col" role="columnheader" className={styles.cmpHeadArea}>
                <span className={styles.srOnly}>Comparison area</span>
              </th>
              {content.columns.map((column, c) => (
                <th
                  key={column}
                  scope="col"
                  role="columnheader"
                  className={
                    c === 0
                      ? `${styles.cmpHeadCell} ${styles.cmpHeadCellLead}`
                      : styles.cmpHeadCell
                  }
                >
                  <span className={styles.cmpHeadLabel}>
                    <svg {...iconProps} className={styles.cmpHeadIcon}>
                      {c === 0 ? <path d="M5 12.5l4 4 10-10" /> : <circle cx="12" cy="12" r="8" />}
                    </svg>
                    {column}
                  </span>
                </th>
              ))}
            </tr>
          </thead>

          <tbody role="rowgroup">
            {content.rows.map((row, i) => (
              <tr key={row.area} className={styles.cmpTr} role="row">
                <th scope="row" role="rowheader" className={styles.cmpArea}>
                  {/* The flex lives on this wrapper, not the <th>: a display
                      other than table-cell would drop the header out of the
                      table's column layout and misalign every row. */}
                  <span className={styles.cmpAreaInner}>
                    <svg {...iconProps} className={styles.cmpAreaIcon}>
                      {content.icons?.[i] ?? ROW_MARKS[i % ROW_MARKS.length]}
                    </svg>
                    <span className={styles.cmpAreaName}>{row.area}</span>
                  </span>
                </th>

                {content.columns.map((column, c) => (
                  <td
                    key={column}
                    role="cell"
                    className={c === 0 ? `${styles.cmpTd} ${styles.cmpTdLead}` : styles.cmpTd}
                  >
                    {/* Restates the column heading once the table reflows to cards
                        below 760px, where the <thead> is off-screen. Hidden from
                        assistive tech at every width: the scope="col" header
                        already names this cell, so exposing it would say it twice. */}
                    <span className={styles.cmpTdLabel} aria-hidden="true">
                      {column}
                    </span>
                    {/* The tick marks the lead cell only where it genuinely
                        differs from every alternative — see `leadWinsRow`. */}
                    {verdict && c === 0 && leadWinsRow(row.values) && (
                      <svg {...iconProps} className={styles.cmpTdTick}>
                        <path d="M5 12.5l4 4 10-10" />
                      </svg>
                    )}
                    <span className={styles.cmpTdText}>{row.values[c] ?? "—"}</span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* The "so what", where the page supplies one. Outside the scroll wrapper
          on purpose: on a wide table the wrapper scrolls sideways, and a line
          of prose that slides out of view with the columns is a line nobody
          reads. */}
      {content.verdictNote && <p className={styles.cmpVerdictNote}>{content.verdictNote}</p>}
    </section>
  );
}
