"use client";

import FadeUp from "@/components/home/fade-up";
import { capabilities } from "@/lib/home/industries-content";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * The capability ledger, on the page's light band.
 *
 * Deliberately a ruled four-column ledger rather than another card grid: after
 * the sector bento the reader needs a different reading shape, and the point of
 * this section is that the same six systems sit underneath every sector — which
 * an index communicates and a set of tiles does not.
 *
 * The right-hand column names the sectors that lean on each capability, so the
 * two sections cross-reference each other without repeating any copy.
 */
export default function Capabilities() {
  return (
    <section className={styles.shell} id="capabilities">
      <SectionHead
        kicker={capabilities.eyebrow}
        title={capabilities.title}
        intro={capabilities.body}
        tone="light"
      />

      <div className={styles.ledger}>
        {capabilities.items.map((item) => (
          <FadeUp key={item.n} y={20}>
            <div className={styles.ledgerRow}>
              <span className={styles.ledgerN} aria-hidden>
                {item.n}
              </span>
              <h3 className={styles.ledgerName}>{item.name}</h3>
              <p className={styles.ledgerText}>{item.body}</p>
              <ul className={styles.ledgerTags} aria-label={`Sectors using ${item.name}`}>
                {item.sectors.map((sector) => (
                  <li key={sector} className={styles.ledgerTag}>
                    {sector}
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
