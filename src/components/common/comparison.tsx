import SectionHead from "@/components/landing/section-head";
import SimpleTable from "@/components/common/simple-table";
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
     * Which option this factor favours. Kept for content that already
     * states it; the simple table does not render it (the RAG page's
     * decision board that read it was retired for the one table design).
     */
    readonly favors?: "lead" | "other";
  }[];
  notes?: readonly string[];
}

/**
 * Side-by-side comparison — rendered as the shared `SimpleTable`.
 *
 * This had two layouts: `cards` (the default — bordered row cards with a pair
 * of values and a decorative icon each, plus a converging GSAP entrance) and
 * `table`. The landing-page review asked for one simple table design on all
 * pages, so both now render the same three-column table: the factor as a row
 * header, then the lead and the other option. `layout` is still accepted so
 * the pages that pass it need no edit; it no longer changes anything.
 *
 * `tone="verdict"` (the default) tints the lead column as the option the page
 * recommends; `neutral` leaves both columns plain, for a definitional table
 * that distinguishes two things without preferring either. `favors` on a row
 * is accepted and ignored.
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
  /** Ignored — kept for call-site compatibility. See the note above. */
  layout?: "cards" | "table";
}) {
  const { columns, rows, notes } = content;

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead
        kicker={content.eyebrow}
        title={content.title}
        intro={content.body}
        level={level}
      />

      <SimpleTable
        caption={content.title}
        columns={[columns.area, columns.lead, columns.other]}
        rows={rows.map((r) => ({ head: r.area, cells: [r.lead, r.other] }))}
        lead={tone === "neutral" ? undefined : 0}
      />

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
