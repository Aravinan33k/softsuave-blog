"use client";

import { caComparison } from "@/lib/home/custom-ai-content";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * Custom vs. off-the-shelf comparison.
 *
 * Uses the shared landing language's `cmp*` classes, which were written for
 * exactly this pattern but had no consumer yet. Two renderings of one dataset:
 *
 *   - a real <table> from 900px up, where three columns have room to stay
 *     legible, with the "Custom AI Solutions" column tinted as the lead option;
 *   - stacked per-row cards below that, as a <dl> per comparison area.
 *
 * The CSS swaps them at 900px (`.cmpWrap` / `.cmpCards`), so neither ever needs
 * to scroll sideways — the page body never scrolls horizontally on a phone.
 */
export default function Comparison() {
  const { columns, rows } = caComparison;

  return (
    <section className={styles.sectionShell} id="comparison">
      <SectionHead
        kicker={caComparison.eyebrow}
        title={caComparison.title}
        intro={caComparison.body}
      />

      <FadeUp>
        {/* Desktop: one table. */}
        <div className={styles.cmpWrap}>
          <table className={styles.cmpTable}>
            <caption className={styles.srOnly}>{caComparison.title}</caption>
            <thead>
              <tr>
                <th scope="col">{columns.area}</th>
                <th scope="col" className={styles.cmpLead}>
                  {columns.custom}
                </th>
                <th scope="col">{columns.offTheShelf}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.area}>
                  <th scope="row">{r.area}</th>
                  <td className={styles.cmpLead}>{r.custom}</td>
                  <td>{r.offTheShelf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile: one card per comparison area. */}
        <ul className={styles.cmpCards}>
          {rows.map((r) => (
            <li key={r.area} className={styles.cmpCard}>
              <span className={styles.cmpCardLabel}>{columns.area}</span>
              <h3 className={styles.cmpCardTitle}>{r.area}</h3>
              <dl className={styles.cmpDl}>
                <div className={styles.cmpDlRow}>
                  <dt className={styles.cmpDt}>{columns.custom}</dt>
                  <dd className={styles.cmpDd}>{r.custom}</dd>
                </div>
                <div className={styles.cmpDlRow}>
                  <dt className={styles.cmpDt}>{columns.offTheShelf}</dt>
                  <dd className={styles.cmpDd}>{r.offTheShelf}</dd>
                </div>
              </dl>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
