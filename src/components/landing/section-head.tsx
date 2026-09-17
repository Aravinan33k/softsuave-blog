"use client";

import SplitReveal from "@/components/home/split-reveal";
import styles from "./landing.module.css";

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
  level = 2,
}: Readonly<{
  kicker?: string;
  title: string;
  intro?: string;
  /**
   * Heading level. `3` is for a sub-section that belongs under the section
   * above it — a comparison table introduced by its own H3 inside a wider
   * Overview, say — so the document outline stays correct instead of
   * emitting a second H2 for something the copy marks as a sub-heading.
   */
  level?: 2 | 3;
}>) {
  return (
    <div className={level === 3 ? `${styles.head} ${styles.headSub}` : styles.head}>
      <div>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <SplitReveal as={level === 3 ? "h3" : "h2"} className={styles.title} type="words">
          {title}
        </SplitReveal>
      </div>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
