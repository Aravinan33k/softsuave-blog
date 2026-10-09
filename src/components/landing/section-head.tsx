"use client";

import SplitReveal from "@/components/home/split-reveal";
import Breadcrumb from "@/components/common/breadcrumb";
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
   *
   * `1` is the masthead of an index page (/clients, /case-studies), which has
   * no hero above it to carry the H1 the way a landing page's does. It also
   * takes a larger type size, because on those pages this *is* the headline
   * rather than a section label partway down.
   */
  level?: 1 | 2 | 3;
}>) {
  const tag = level === 1 ? "h1" : level === 3 ? "h3" : "h2";
  const className = [styles.head, level === 3 && styles.headSub, level === 1 && styles.headPage]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={className}>
      <div>
        {/* An index page's masthead is its hero, so it carries the trail too. */}
        {level === 1 && <Breadcrumb tone="band" />}
        {/* No kicker above an H1: the Sep review dropped the eyebrow over every
            page's headline, and on an index page this masthead is the hero. */}
        {kicker && level !== 1 && <span className={styles.kicker}>{kicker}</span>}
        <SplitReveal as={tag} className={styles.title} type="words">
          {title}
        </SplitReveal>
      </div>
      {intro && <p className={styles.intro}>{intro}</p>}
    </div>
  );
}
