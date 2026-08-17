"use client";

import { enterprise } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import styles from "./home.module.css";

// Tasteful, clearly-generic placeholders (not copied from the inspiration).
const recognitions = [
  "Clutch Top B2B",
  "GoodFirms Leader",
  "ISO 27001",
  "Great Place to Work",
  "CMMI Level 3",
  "SOC 2 Type II",
  "Google Cloud Partner",
  "Microsoft Azure Partner",
];

/**
 * Featured & Awards strip: enterprise recognitions rendered as dual infinite
 * marquees. Copy comes from the enterprise block.
 */
export default function Awards() {
  return (
    <section className={styles.awards} id="integrations">
      <div className={styles.awardsHead} data-skew>
        <span className={styles.eyebrow}>{enterprise.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {enterprise.title}
        </SplitReveal>
        <FadeUp className={styles.leadWrap}>
          <p className={styles.lead}>{enterprise.body}</p>
        </FadeUp>
      </div>

      <div className={styles.awardsMarquees}>
        <Marquee speed={26}>
          {recognitions.map((r) => (
            <span key={r} className={styles.awardChip}>
              {r}
            </span>
          ))}
        </Marquee>
        <Marquee speed={22} reverse>
          {[...recognitions].reverse().map((r) => (
            <span key={r} className={styles.awardChipGhost}>
              {r}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
