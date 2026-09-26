import type { ReactNode } from "react";
import SimpleTable from "@/components/common/simple-table";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

/**
 * A comparison section: one "area" per row, each holding two or more labelled
 * values side by side — rendered as the shared `SimpleTable`.
 *
 * This used to be its own table with per-row icon markers, a staggered GSAP
 * entrance, a coral "verdict" wash with ticks, and a reflow into one card per
 * row below 760px. The landing-page review asked for one simple table design
 * on all pages, so it is now the plain bordered table every comparison uses,
 * scrolling sideways on a phone rather than reflowing.
 *
 * The content shape is unchanged, so `hire-comparison.ts`, the delivery-model
 * content modules and `custom-ai/comparison.tsx` need no edit. `verdict` still
 * tints the lead column (column one) as the option the page recommends, and
 * `verdictNote` still closes the table; `icons` is accepted and ignored.
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
   * Row markers, positional against `rows`. No longer drawn — the simple
   * table has no row markers — but kept on the type so
   * `custom-ai/comparison.tsx`, which passes topic icons, compiles unchanged.
   */
  icons?: readonly ReactNode[];
  /**
   * Mark the lead column as the option this section RECOMMENDS: a light
   * accent tint down its cells and an accent heading.
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

export default function Comparison({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <SimpleTable
        caption={content.title}
        columns={["", ...content.columns]}
        rows={content.rows.map((r) => ({ head: r.area, cells: r.values }))}
        lead={content.verdict === true ? 0 : undefined}
      />

      {/* The "so what", where the page supplies one. Outside the scroll wrapper
          on purpose: a line of prose that slides out of view with the columns
          is a line nobody reads. */}
      {content.verdictNote && <p className={styles.cmpVerdictNote}>{content.verdictNote}</p>}
    </section>
  );
}
