"use client";

import { techStack } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import TechLogo from "./tech-logo";
import styles from "./home.module.css";

/** The shape `content.ts`'s `techStack` has; landing pages supply their own. */
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
 * `content` defaults to the homepage's stack; a landing page that wants this
 * same section over its own groups passes its own (wrap it in
 * `home.techCompact` there to drop the homepage's full-viewport min-height).
 */
export default function TechStack({ content = techStack }: { content?: TechStackContent } = {}) {
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
              <span className={styles.techGroupIndex}>{String(i + 1).padStart(2, "0")}</span> {g.name}
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
