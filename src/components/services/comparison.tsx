import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface ComparisonProps {
  eyebrow: string;
  title: string;
  body: string;
  columns: readonly string[];
  /** One row per comparison area: [label, custom, off-the-shelf]. */
  rows: readonly (readonly string[])[];
}

/**
 * Custom vs off-the-shelf comparison.
 *
 * A real <table> with a <th> per row as well as per column, so the relationship
 * survives a screen reader and the row label is announced with each cell. It
 * scrolls inside its own container below ~640px rather than shrinking the type or
 * letting the page scroll sideways.
 */
export default function Comparison({ eyebrow, title, body, columns, rows }: ComparisonProps) {
  return (
    <section className={home.section} id="comparison">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.tableWrap} delay={0.06}>
        <table className={styles.table}>
          <caption className={home.srOnly}>{title}</caption>
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c} scope="col">
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(([area, custom, offShelf]) => (
              <tr key={area}>
                <th scope="row">{area}</th>
                <td className={styles.tableLead}>{custom}</td>
                <td className={styles.tableAlt}>{offShelf}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </FadeUp>
    </section>
  );
}
