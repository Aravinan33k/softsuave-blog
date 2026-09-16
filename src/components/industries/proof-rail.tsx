"use client";

import CountUp from "@/components/home/count-up";
import FadeUp from "@/components/home/fade-up";
import { why } from "@/lib/home/content";
import styles from "./industries.module.css";

/**
 * The credibility rail directly under the hero.
 *
 * The figures are `why.stats` — the homepage's own four proof points, read from
 * the same content export rather than restated here, so this page cannot quote
 * a number the rest of the site does not. Nothing is added to them: no rating,
 * no project count, no claim the content model does not hold.
 *
 * Presented as a closed-border rail rather than the homepage's odometer cards,
 * which are a set piece that page owns.
 */
export default function ProofRail() {
  return (
    <section className={styles.proof} aria-label="Soft Suave by the numbers">
      <FadeUp>
        <div className={styles.proofRail}>
          {why.stats.map((stat) => (
            <div key={stat.label} className={styles.proofItem}>
              <CountUp value={`${stat.value}${stat.suffix}`} className={styles.proofFigure} />
              <span className={styles.proofLabel}>{stat.label}</span>
              <p className={styles.proofLine}>{stat.line}</p>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
