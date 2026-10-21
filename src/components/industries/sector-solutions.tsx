"use client";

import FadeUp from "@/components/home/fade-up";
import type { SectorPageContent } from "@/lib/home/sectors/types";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

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
        {solutions.items.map((item) => (
          <FadeUp key={item.name} y={20}>
            <div className={`${styles.ledgerRow} ${styles.ledgerRowWide}`}>
              {/* An icon picked from the solution's own words, not a "01"
                  ordinal: the Sep corrections review asked for icons in place
                  of numbers. */}
              <CardIconBadge
                title={item.name}
                body={item.body}
                size="sm"
                className={styles.ledgerN}
              />
              <h3 className={styles.ledgerName}>{item.name}</h3>
              <p className={styles.ledgerText}>{item.body}</p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
