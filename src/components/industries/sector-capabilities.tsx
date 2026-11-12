"use client";

import Link from "next/link";
import FadeUp from "@/components/home/fade-up";
import { capabilities } from "@/lib/home/industries-content";
import type { SectorPageContent } from "@/lib/home/sectors/types";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * The engineering capabilities this sector leans on.
 *
 * Selected from the index's own six by `capabilityTag`, rather than written per
 * sector: the index already states which sectors lean on each capability, and
 * deriving the rows here means the two pages can never contradict each other.
 * "Every sector" always matches, so each page shows that row plus whichever
 * others name it.
 *
 * Rendered in the delivery band's bordered panels — a different shape from the
 * solutions ledger above it, so two lists of named things don't read as one.
 */
export default function SectorCapabilities({ content }: { content: SectorPageContent }) {
  const rows = capabilities.items.filter((item) => {
    // Widened deliberately: each `sectors` array is `as const`, so its element
    // type is a union of literals and `includes` would reject any string that
    // isn't already one of them.
    const tags: readonly string[] = item.sectors;
    return tags.includes(content.capabilityTag) || tags.includes("Every sector");
  });

  if (!rows.length) return null;

  return (
    <section className={styles.shell} id="capabilities">
      <SectionHead
        kicker={capabilities.eyebrow}
        title={`What we build underneath ${content.name}`}
        intro={capabilities.body}
        tone="light"
      />

      <FadeUp>
        <div className={styles.models}>
          {rows.map((row) => (
            <div key={row.n} className={styles.model}>
              <span className={styles.modelFor}>{row.n}</span>
              <h3 className={styles.modelName}>{row.name}</h3>
              <p className={styles.ledgerText}>{row.body}</p>
            </div>
          ))}
        </div>
      </FadeUp>

      <div className={styles.routes}>
        <span className={styles.routesLabel}>Every sector we serve</span>
        <div className={styles.routeList}>
          <Link href="/industries" className={styles.routeLink} data-cursor="Industries">
            Back to all industries
          </Link>
        </div>
      </div>
    </section>
  );
}
