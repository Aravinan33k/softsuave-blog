"use client";

import { whyUs as generativeAiWhyUs } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";
import type { CardGridContent } from "./industries";

/**
 * Why Soft Suave — the differentiators as hairline-separated proof points, each
 * led by an icon badge picked from the point's own words (`CardIconBadge`).
 * These were large serif "01"–"06" figures until the review asked for icons
 * in place of numbers.
 *
 * Given a different form from the card grid above it on purpose: two bordered
 * grids back to back would make the page repeat itself.
 */
export default function WhyUs({
  content = generativeAiWhyUs,
  id = "why",
}: {
  content?: CardGridContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <ul className={styles.proofGrid}>
          {content.items.map((item) => (
            <li key={item.name} className={styles.proofItem}>
              <CardIconBadge title={item.name} body={item.body} />
              <h3 className={styles.proofName}>{item.name}</h3>
              <p className={styles.proofBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
