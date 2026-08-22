"use client";

import { industries as generativeAiIndustries } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

/** Shared by every card-grid section on the AI landing pages. */
export interface CardGridContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly { readonly name: string; readonly body: string }[];
}

/**
 * A bordered card grid (2-up on tablet, 4-up on desktop) — the sectors this page
 * builds for, and any other list of short named blocks.
 *
 * Chrome is this surface's own: an accent rule along the card's top edge that
 * widens across it on hover, plus an inline mono index. Not the homepage's
 * `.statCard`, which is built around a huge figure in an absolutely-positioned
 * corner.
 *
 * Also deliberately NOT the homepage's image fan carousel: that layout needs one
 * generated Pexels frame per card and the manifest only holds five industry
 * slots (`lib/home/images.generated.json`), so three of eight would have no art.
 */
export default function Industries({
  content = generativeAiIndustries,
  id = "industries",
}: {
  content?: CardGridContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.cardGrid}>
          {content.items.map((item, i) => (
            <article key={item.name} className={styles.card}>
              <span className={styles.cardIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={styles.cardName}>{item.name}</h3>
              <p className={styles.cardBody}>{item.body}</p>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
