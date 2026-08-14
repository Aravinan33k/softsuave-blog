"use client";

import { techStack } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import TechLogo from "./tech-logo";
import styles from "./home.module.css";

/**
 * TechStack: Alternating auto-running marquee rows that stop on hover,
 * with chips that transition from their SVG logo to their text name on hover.
 */
export default function TechStack() {
  return (
    <section className={`${styles.section} ${styles.techSection}`} id="tech">
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{techStack.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {techStack.title}
        </SplitReveal>
        <p className={styles.lead}>{techStack.body}</p>
      </div>

      <div className={styles.techGroups} data-skew>
        {techStack.groups.map((g, i) => (
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
