"use client";

import SplitReveal from "@/components/home/split-reveal";
import FadeUp from "@/components/home/fade-up";
import styles from "./industries.module.css";

/**
 * Section masthead for the sector index: a rule-topped block whose title holds
 * the left column while the intro sits in the right one from 860px up.
 *
 * `tone="light"` swaps the kicker for its light-band variant, the contract every
 * component on this surface follows when it can sit inside `.light`.
 *
 * `SplitReveal` is kept because the masked word reveal is a motion primitive
 * shared across the whole marketing surface, not a look this page invents.
 */
export default function SectionHead({
  kicker,
  title,
  intro,
  tone = "dark",
}: {
  kicker: string;
  title: string;
  intro?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div className={styles.head}>
      <div>
        <span className={tone === "light" ? styles.kickerDark : styles.kicker}>{kicker}</span>
        <SplitReveal as="h2" className={styles.title} type="words">
          {title}
        </SplitReveal>
      </div>
      {intro ? (
        <FadeUp>
          <p className={styles.intro}>{intro}</p>
        </FadeUp>
      ) : null}
    </div>
  );
}
