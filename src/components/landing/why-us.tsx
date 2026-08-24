"use client";

import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";
import type { CardGridContent } from "./industries";

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Why Soft Suave — the differentiators as hairline-separated proof points, each
 * led by a large serif figure.
 *
 * Given a different form from the card grid above it on purpose: two bordered
 * grids back to back would make the page repeat itself, and the numerals here
 * are the one place this surface still uses the brand display serif.
 */
export default function WhyUs({
  content,
  id = "why",
}: {
  content: CardGridContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <ul className={styles.proofGrid}>
          {content.items.map((item, i) => (
            <li key={item.name} className={styles.proofItem}>
              <span className={styles.proofFigure} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={styles.proofName}>{item.name}</h3>
              <p className={styles.proofBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
