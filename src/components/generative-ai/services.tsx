"use client";

import { services as generativeAiServices } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface ServicesContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly { readonly name: string; readonly body: string }[];
}

/**
 * The custom AI development services, as numbered bordered panels two-up.
 *
 * Deliberately NOT the homepage's `.svcRow` list — full-bleed rows with 3rem
 * giant-serif names and a hover indent. Ten services in that form is a very long
 * scroll of oversized type; as panels the whole offer is scannable, and the page
 * stops borrowing a layout the homepage already owns.
 */
export default function Services({
  content = generativeAiServices,
  id = "services",
}: {
  content?: ServicesContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div className={styles.svcGrid}>
        {content.items.map((s, i) => (
          <FadeUp key={s.name} y={18} duration={0.55}>
            <article className={styles.svcPanel}>
              <span className={styles.svcIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <div>
                <h3 className={styles.svcTitle}>{s.name}</h3>
                <p className={styles.svcText}>{s.body}</p>
              </div>
            </article>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
