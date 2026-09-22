import SimpleTable from "@/components/common/simple-table";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface ComparisonContent {
  eyebrow: string;
  title: string;
  body: string;
  /** `[row-header column, ...option columns]`. */
  columns: readonly string[];
  /** One row per decision criterion; `values` aligns with `columns` minus its first entry. */
  rows: readonly { readonly criterion: string; readonly values: readonly string[] }[];
}

/**
 * Multi-column comparison table — now the shared `SimpleTable`.
 *
 * It used to render twice, a four-column `<table>` from 900px up and a
 * stacked definition-list card per criterion below it, with CSS choosing one.
 * The landing-page review asked for one simple table design on all pages, so
 * it is a single bordered table that scrolls sideways on a phone instead.
 *
 * On a three-way vs. table (in-house / freelancer / us) the last option column
 * keeps the accent it always had — the option the page recommends. A two-value
 * lookup (the rates table: tier / rate / experience) is not an argument, so it
 * gets no tint. Presentation only; the text is unchanged.
 */
export default function Comparison({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  const optionCount = Math.max(0, content.columns.length - 1);

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <SimpleTable
        caption={content.title}
        columns={content.columns}
        rows={content.rows.map((r) => ({ head: r.criterion, cells: r.values }))}
        lead={optionCount >= 3 ? optionCount - 1 : undefined}
      />
    </section>
  );
}
