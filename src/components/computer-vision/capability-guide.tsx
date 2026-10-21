import SimpleTable from "@/components/common/simple-table";
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

/**
 * Capability guide — now the shared `SimpleTable`.
 *
 * It used to be one animated card per business problem, on the argument that
 * five prose columns cannot stay legible. The Sep 23 review asked for a simple
 * table here, so it renders the same plain bordered table as every other
 * comparison on the surface: the problem is the row header, the four
 * attributes are its cells, and the table scrolls sideways inside its own
 * wrapper on a narrow screen rather than reflowing into cards.
 */
export default function CapabilityGuide({
  content,
  id = "capabilities",
}: {
  content: CapabilityGuideContent;
  id?: string;
}) {
  const { columns, rows, notes } = content;

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <SimpleTable
        caption={content.title}
        columns={[columns.problem, columns.input, columns.capability, columns.validation, columns.outcome]}
        rows={rows.map((r) => ({ head: r.problem, cells: [r.input, r.capability, r.validation, r.outcome] }))}
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
