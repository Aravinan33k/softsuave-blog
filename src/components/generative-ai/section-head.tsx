"use client";

import SplitReveal from "@/components/home/split-reveal";
import styles from "./gen-ai.module.css";

/**
 * Section masthead for the AI landing pages.
 *
 * A rule-topped stacked block: the mono kicker, the section title, then the
 * intro paragraph beneath them at every width. This is the surface's own
 * alternative to the homepage's `.sectionHead` (eyebrow / giant ultralight
 * serif h2 / lead) — the single biggest reason the landing pages no longer
 * read as the homepage.
 *
 * `SplitReveal` is kept because it is a motion primitive, not a look: the
 * masked word reveal is shared across the whole marketing surface.
 */
export default function SectionHead({
  kicker,
  title,
  intro,
}: {
  kicker?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className={styles.head}>
      <div>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <SplitReveal as="h2" className={styles.title} type="words">
          {title}
        </SplitReveal>
      </div>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
