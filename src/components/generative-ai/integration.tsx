"use client";

import { integration as generativeAiIntegration } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * Shape of the copy this section renders. The Generative AI page's is the
 * default, so existing usage (`<Integration />`) is unchanged; the hire-by-role
 * pages pass their engagement models through the same two-to-three panel block.
 */
export interface IntegrationContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly blocks: readonly { readonly label: string; readonly body: string }[];
}

/**
 * A short block of bordered panels — two or three statements that each need a
 * label and a paragraph and nothing else.
 *
 * On the Generative AI page these are the deployment and connectivity options
 * (the platform targets themselves aren't repeated here; the technology-stack
 * section further down that page is where those names live). On a hire-by-role
 * page they are the engagement models.
 */
export default function Integration({
  content = generativeAiIntegration,
  id = "integrations",
}: {
  content?: IntegrationContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        {/* Three panels get an even three-column row from 1000px up; two keep
            the default two-column grid. Without the modifier a third panel
            sits alone beside a gap. */}
        <div
          className={`${styles.integrationGrid}${
            content.blocks.length === 3 ? ` ${styles.integrationGridTrio}` : ""
          }`}
        >
          {content.blocks.map((b) => (
            <article key={b.label} className={styles.integrationCard}>
              <span className={styles.integrationLabel}>{b.label}</span>
              <p className={styles.integrationBody}>{b.body}</p>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
