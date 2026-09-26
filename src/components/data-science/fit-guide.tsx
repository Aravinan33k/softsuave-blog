import SimpleTable from "@/components/common/simple-table";
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

/**
 * Business fit — now the shared `SimpleTable`.
 *
 * It used to be an animated "routing track": one card per problem, with the
 * four attributes strung along a lit line and a forked fallback branch. The
 * Sep 23 review asked for a simple table here, so it renders the same plain
 * bordered table as every other comparison on the surface — the problem as the
 * row header, its three answers as cells, scrolling sideways inside its own
 * wrapper on a narrow screen.
 */
export default function FitGuide({
  content,
  id = "fit",
}: {
  content: FitGuideContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <SimpleTable
        caption={content.title}
        columns={[columns.problem, columns.data, columns.start, columns.next]}
        rows={rows.map((r) => ({ head: r.problem, cells: [r.data, r.start, r.next] }))}
      />

      {/* The caveat a lookup table always needs, outside the scroll wrapper so
          it cannot slide out of view with the columns. */}
      {notes?.map((n) => (
        <p key={n} className={styles.cmpVerdictNote}>
          {n}
        </p>
      ))}
    </section>
  );
}
