"use client";

import { integration as generativeAiIntegration } from "@/lib/home/generative-ai";
import { gridSpansFor } from "@/components/landing/card-spans";
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
  variant = "panels",
}: {
  content?: IntegrationContent;
  id?: string;
  /**
   * `panels` (default) is the plain bordered block the AI pages use. `bold` is
   * the hire pages' card — the Global Capability Center "Who It Fits"
   * treatment, shared with the specialisations grid through the CARD GRID —
   * BOLD VARIANT block in gen-ai.module.css — so a hire page's engagement
   * models and its specialisations are the same card rather than two.
   */
  variant?: "panels" | "bold";
} = {}) {
  if (variant === "bold") {
    /* Two blocks compose 6 + 6, three compose 4 + 4 + 4 — the same function the
       reference section and the specialisations grid call, so all three
       compose their rows identically. */
    const spans = gridSpansFor(content.blocks.length);

    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridBold}>
            {content.blocks.map((b, i) => (
              <article key={b.label} className={styles.indBoldCard} data-span={spans[i]}>
                {/* No glyph and no ordinal: an engagement model is a named
                    choice, not one of a numbered set, and the reference band's
                    own cards carry neither. */}
                <h3 className={styles.indBoldName}>{b.label}</h3>
                <p className={styles.indBoldBody}>{b.body}</p>
              </article>
            ))}
          </div>
        </FadeUp>
      </section>
    );
  }

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
