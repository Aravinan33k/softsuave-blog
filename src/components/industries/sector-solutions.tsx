"use client";

import FadeUp from "@/components/home/fade-up";
import type { SectorPageContent } from "@/lib/home/sectors/types";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * What we build for this sector: the sector page's named solutions, as a ruled
 * ledger.
 *
 * Reuses the index's capability-ledger rows (minus their tag column) rather
 * than introducing a third list style to the surface — same reading shape, one
 * set of rules. The names and descriptions are the live sector page's own.
 */
export default function SectorSolutions({ content }: { content: SectorPageContent }) {
  const { solutions } = content;

  return (
    <section className={styles.shell} id="solutions">
      <SectionHead
        kicker={solutions.eyebrow}
        title={solutions.title}
        intro={solutions.body}
        tone="light"
      />

      <div className={styles.ledger}>
        {solutions.items.map((item, i) => (
          <FadeUp key={item.name} y={20}>
            <div className={`${styles.ledgerRow} ${styles.ledgerRowWide}`}>
              <span className={styles.ledgerN} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={styles.ledgerName}>{item.name}</h3>
              <p className={styles.ledgerText}>{item.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
