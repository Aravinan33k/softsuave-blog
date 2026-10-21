import SimpleTable from "@/components/common/simple-table";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * A "which one fits?" decision table: one row per situation, read across its
 * columns. The live hire pages publish these as three-column tables (situation
 * → developer → why), which the two-column problem/solution selector could
 * only show by gluing the last two columns into one sentence (hire-by-role
 * review: "it is a table with 3 columns, and it's not clear in the current
 * design"). So it renders the surface's one comparison table, `SimpleTable`.
 */
export interface FitTableContent {
  eyebrow: string;
  title: string;
  body: string;
  /** `[row-header column, ...value columns]`. */
  columns: readonly string[];
  rows: readonly { readonly head: string; readonly cells: readonly string[] }[];
  /** Paragraphs the live page runs after the table. */
  after?: readonly string[];
}

export default function FitTable({ content, id = "fit" }: { content: FitTableContent; id?: string }) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <FadeUp>
        <SimpleTable caption={content.title} columns={content.columns} rows={content.rows} />
      </FadeUp>
      {content.after && content.after.length > 0 && (
        <div className={`${styles.prose} ${styles.fitTableAfter}`}>
          {content.after.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      )}
    </section>
  );
}
