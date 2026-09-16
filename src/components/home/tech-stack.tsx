"use client";

import { techStack as homeTechStack } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import TechLogo from "./tech-logo";
import styles from "./home.module.css";

/** The copy this section renders. The homepage's own stack is the default. */
export interface TechStackContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly groups: readonly { readonly name: string; readonly items: readonly string[] }[];
}

/**
 * TechStack: Alternating auto-running marquee rows that stop on hover,
 * with chips that transition from their SVG logo to their text name on hover.
 *
 * `content` lets a page state its own stack while keeping this treatment —
 * which is what a role page needs: "the technologies a backend developer works
 * with" is that page's own content, but it should look like the homepage's
 * technology band, not a second design for the same idea. Omitting the prop
 * renders the homepage's stack exactly as before.
 */
export default function TechStack({
  content = homeTechStack,
}: {
  content?: TechStackContent;
} = {}) {
  return (
    <section className={`${styles.section} ${styles.techSection}`} id="tech">
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{content.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {content.title}
        </SplitReveal>
        <p className={styles.lead}>{content.body}</p>
      </div>

      <div className={styles.techGroups} data-skew>
        {content.groups.map((g, i) => (
          <div key={g.name} className={styles.techGroup}>
            <span className={styles.techGroupName}>
              <span className={styles.techGroupIndex}>0{i + 1}</span> {g.name}
            </span>
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
