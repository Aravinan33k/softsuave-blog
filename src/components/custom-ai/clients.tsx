"use client";

import { caClients } from "@/lib/home/custom-ai-content";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * "Our Clients" proof band — the closed-grid trust panel from the shared
 * landing language, filled with this page's credibility numbers, followed by a
 * logo rail.
 *
 * The rail holds `logoSlots` cells open at the final 16:6 ratio rather than
 * shipping invented logos. Dropping the real art in later is one line per cell:
 * put an <Image>/<BrandImage fill> inside the `.logoSlot` and remove its
 * `opacity`. The grid, gaps and reflow are already final, so nothing moves.
 */
export default function Clients() {
  return (
    <section className={styles.trustBar} id="clients">
      <SectionHead kicker={caClients.eyebrow} title={caClients.title} intro={caClients.body} />

      <FadeUp>
        <div className={styles.trustPanel}>
          <div className={styles.trustStats}>
            {caClients.proof.map((stat) => (
              <div key={stat.label} className={styles.trustStat}>
                <span className={styles.trustFigure}>{stat.value}</span>
                <span className={styles.trustLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reserved logo rail — real client logos drop straight into these cells. */}
        <ul className={styles.logoRail} aria-label="Client logos">
          {Array.from({ length: caClients.logoSlots }, (_, i) => (
            <li key={i} className={styles.logoSlot} aria-hidden />
          ))}
        </ul>
        <span className={styles.srOnly}>
          Client logos are added as they are approved for publication.
        </span>
      </FadeUp>
    </section>
  );
}
