"use client";

import FadeUp from "@/components/home/fade-up";
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
 * Multi-column comparison table — the wide sibling of `problems.tsx`, which
 * carries the same idea at two columns.
 *
 * Rendered twice, with CSS deciding which copy is visible: a real four-column
 * `<table>` from 900px up, and one stacked definition-list card per criterion
 * below it. Four columns cannot stay legible on a phone, and a horizontal
 * scroller would put most of every row off-screen. Both renderings carry
 * identical text and only one is ever in the layout, so assistive tech never
 * reads it twice.
 *
 * The last option column carries the accent, the same emphasis the rest of this
 * surface uses — presentation only, the text is unchanged.
 */
export default function Comparison({
  content,
  id = "comparison",
}: {
  content: ComparisonContent;
  id?: string;
}) {
  const [rowHeader, ...optionColumns] = content.columns;
  const lastColumn = optionColumns.length - 1;

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.cmpWrap}>
          <table className={styles.cmpTable}>
            <caption className={styles.srOnly}>{content.title}</caption>
            <thead>
              <tr>
                <th scope="col">{rowHeader}</th>
                {optionColumns.map((c, i) => (
                  <th key={c} scope="col" className={i === lastColumn ? styles.cmpLead : undefined}>
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {content.rows.map((row) => (
                <tr key={row.criterion}>
                  <th scope="row">{row.criterion}</th>
                  {row.values.map((value, i) => (
                    <td
                      key={optionColumns[i] ?? i}
                      className={i === lastColumn ? styles.cmpLead : undefined}
                    >
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className={styles.cmpCards}>
          {content.rows.map((row) => (
            <li key={row.criterion} className={styles.cmpCard}>
              <span className={styles.cmpCardLabel}>{rowHeader}</span>
              <p className={styles.cmpCardTitle}>{row.criterion}</p>
              <dl className={styles.cmpDl}>
                {row.values.map((value, i) => (
                  <div key={optionColumns[i] ?? i} className={styles.cmpDlRow}>
                    <dt className={styles.cmpDt}>{optionColumns[i]}</dt>
                    <dd className={styles.cmpDd}>{value}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
