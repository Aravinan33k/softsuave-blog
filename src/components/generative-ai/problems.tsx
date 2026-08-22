"use client";

import { problems } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * Problems & solutions.
 *
 * Rendered twice, with CSS deciding which copy is visible: a real two-column
 * `<table>` from 800px up, and accent-ruled stacked cards below it. A
 * two-column table of long prose cannot stay legible on a phone, and a
 * horizontal scroller would put half of every row off-screen. Both renderings
 * carry identical text, and only one is in the layout at a time, so assistive
 * tech never reads it twice.
 */
export default function Problems() {
  return (
    <section className={styles.sectionShell} id="problems">
      <SectionHead kicker={problems.eyebrow} title={problems.title} intro={problems.body} />

      <FadeUp>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <caption className={styles.srOnly}>{problems.title}</caption>
            <thead>
              <tr>
                <th scope="col">{problems.columns[0]}</th>
                <th scope="col">{problems.columns[1]}</th>
              </tr>
            </thead>
            <tbody>
              {problems.rows.map((row) => (
                <tr key={row.problem}>
                  <th scope="row">{row.problem}</th>
                  <td>{row.solution}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ul className={styles.problemCards}>
          {problems.rows.map((row) => (
            <li key={row.problem} className={styles.problemCard}>
              <span className={styles.problemCardLabel}>{problems.columns[0]}</span>
              <p className={styles.problemCardTitle}>{row.problem}</p>
              <p className={styles.problemCardBody}>{row.solution}</p>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
