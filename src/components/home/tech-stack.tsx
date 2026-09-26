"use client";

import { techStack as homeTechStack } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import TechLogo from "./tech-logo";
import CardIconBadge from "@/components/common/card-icon-badge";
import styles from "./home.module.css";

/** The shape `content.ts`'s `techStack` has; landing pages supply their own. */
export interface TechStackContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly groups: readonly {
    /**
     * Empty for a band that is one flat list: the QA page's "Types of QA
     * Testing", "Domains" and "Approach" sections each print their labels under
     * the section heading with no group name above them, so the row drops its
     * label cell and runs the chips full width rather than inventing one.
     */
    readonly name: string;
    /**
     * One line on what this group is for, shown under its name. Optional: the
     * homepage's own band names its groups and nothing more, while the hire
     * pages' live versions caption each one.
     */
    readonly body?: string;
    readonly items: readonly string[];
  }[];
}

/**
 * TechStack: Alternating auto-running marquee rows that stop on hover,
 * with chips that transition from their SVG logo to their text name on hover.
 *
 * `content` lets a page state its own stack while keeping this treatment —
 * which is what a role page needs: "the technologies a backend developer works
 * with" is that page's own content, but it should look like the homepage's
 * technology band, not a second design for the same idea. Omitting the prop
 * renders the homepage's stack exactly as before (wrap it in `home.techCompact`
 * there to drop the homepage's full-viewport min-height).
 */
export default function TechStack({
  content = homeTechStack,
  id = "tech",
}: {
  content?: TechStackContent;
  /**
   * Section anchor. Defaults to `tech`, which is what the nav's Tech Stack link
   * points at and what every caller rendering an actual technology band wants.
   *
   * It is a prop because this same band also renders a page's label-only lists
   * (the QA role page runs three of them beside its real tech stack), and four
   * sections sharing one id is invalid HTML — it also sent the nav's Tech Stack
   * link to the first of them rather than to the technology section.
   */
  id?: string;
} = {}) {
  return (
    <section className={`${styles.section} ${styles.techSection}`} id={id}>
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {content.title}
        </SplitReveal>
        <p className={styles.lead}>{content.body}</p>
      </div>

      <div className={styles.techGroups} data-skew>
        {content.groups.map((g, i) => (
          <div
            key={g.name || i}
            className={`${styles.techGroup}${g.name ? "" : ` ${styles.techGroupFull}`}`}
          >
            {/* Name and caption are one grid cell: `.techGroup` is a two-column
                grid (label | marquee), so a caption added as a third child
                would take the marquee's cell and push the chips onto a second
                row at label width. */}
            {g.name && (
              <div className={styles.techGroupHead}>
                <span className={styles.techGroupName}>
                  {/* An icon picked from the group's own words, not a "01"–"06"
                      ordinal: the Sep corrections review asked for icons in
                      place of numbers across the pages. */}
                  <CardIconBadge
                    title={g.name}
                    body={g.body}
                    size="sm"
                    className={styles.techGroupIndex}
                  />
                  {g.name}
                </span>
                {g.body && <p className={styles.techGroupBody}>{g.body}</p>}
              </div>
            )}
            <div className={styles.techMarqueeHost}>
              <Marquee speed={16 + i * 3} reverse={i % 2 === 1}>
                {g.items.map((it) => (
                  <span key={it} className={styles.techChip}>
                    <span className={styles.chipLogo}>
                      <TechLogo name={it} />
                    </span>
                    <span className={styles.chipName}>{it}</span>
                  </span>
                ))}
              </Marquee>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
