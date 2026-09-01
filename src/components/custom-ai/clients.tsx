"use client";

import { caClients } from "@/lib/home/custom-ai-content";
import FadeUp from "@/components/home/fade-up";
import CountUp from "@/components/home/count-up";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

/**
 * "Our Clients" proof band — the closed-grid trust panel from the shared
 * landing language, filled with this page's credibility numbers.
 *
 * A logo rail used to follow as empty reserved slots (`.logoRail`/`.logoSlot`
 * in `landing.module.css`, sized via `caClients.logoSlots`) waiting for real
 * client logos. Blank bordered boxes read as a broken/unfinished page rather
 * than "coming soon", so it's dropped until there's real logo art to put in
 * it — at that point, reintroduce a `<ul className={styles.logoRail}>` of
 * `<li className={styles.logoSlot}>` cells, each holding an <Image>/
 * <BrandImage fill>; the CSS and slot count are still there, untouched.
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
                <CountUp value={stat.value} className={styles.trustFigure} />
                <span className={styles.trustLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
