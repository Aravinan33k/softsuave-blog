"use client";

import { useState } from "react";
import { faq as generativeAiFaq } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import { linkify, type InlineLink } from "@/components/common/linkify";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface FaqContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly q: string;
    /** The answer as plain text — what schema helpers read. */
    readonly a: string;
    /**
     * Optional structured answer, rendered in place of `a`: paragraphs and
     * bullet lists in the live answer's own order, for an answer that is more
     * than one paragraph ("The best frameworks to consider" + a list + …).
     */
    readonly blocks?: readonly FaqAnswerBlock[];
  }[];
  /**
   * Internal links woven into the answers, matched on their own words — see
   * `components/common/linkify`. Each phrase links once across the whole
   * accordion (review: "several internal links are missing in the FAQs").
   */
  links?: readonly InlineLink[];
}

/** One block of a structured answer: a paragraph, or a bullet list. */
export type FaqAnswerBlock = string | { readonly list: readonly string[] };

/**
 * FAQ accordion.
 *
 * Open/close animates a wrapper's `grid-template-rows: 0fr → 1fr`, which needs
 * no height measurement. The control is this surface's own squared +/− box at
 * question-appropriate sans type, not the homepage industry list's giant serif
 * row with a bare glyph.
 *
 * Accessibility: each question is a real `<button>` inside its heading, with
 * `aria-expanded` and `aria-controls`, so it is reachable and operable by
 * keyboard (Enter/Space) for free. A collapsed panel is taken out of the
 * accessibility tree with `visibility: hidden` rather than `display: none`,
 * which keeps it hidden from screen readers while still allowing the transition
 * to animate. The first item starts open so the section never reads as an empty
 * list.
 *
 * `idPrefix` namespaces the trigger/panel ids so two accordions could coexist.
 */
export default function Faq({
  content = generativeAiFaq,
  idPrefix = "faq",
  questionAs: Question = "h3",
}: {
  content?: FaqContent;
  idPrefix?: string;
  /**
   * Heading level wrapping each question's button. H3 by default; a page
   * ported from the live site passes its source's level (the Germany page's
   * questions are H4s), so the outline stays the same. Styling is identical.
   */
  questionAs?: "h3" | "h4";
} = {}) {
  const [open, setOpen] = useState<number | null>(0);
  // One set per render, threaded through every answer, so a phrase that
  // recurs links only its first occurrence.
  const usedLinks = new Set<string>();

  return (
    <section className={styles.sectionShell} id="faq">
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.faqList}>
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={styles.faqItem}>
                <Question>
                  <button
                    type="button"
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={`${idPrefix}-panel-${i}`}
                    id={`${idPrefix}-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.faqQuestion}>{item.q}</span>
                    <span className={styles.faqIcon} aria-hidden />
                  </button>
                </Question>

                <div className={styles.faqPanelWrap} data-open={isOpen}>
                  <div
                    className={styles.faqPanel}
                    id={`${idPrefix}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${idPrefix}-trigger-${i}`}
                  >
                    {item.blocks ? (
                      <div className={`${styles.faqAnswer} ${styles.faqAnswerBlocks}`}>
                        {item.blocks.map((block, b) =>
                          typeof block === "string" ? (
                            <p key={b}>{linkify(block, content.links, usedLinks, styles.proseLink)}</p>
                          ) : (
                            <ul key={b}>
                              {block.list.map((li) => (
                                <li key={li}>{linkify(li, content.links, usedLinks, styles.proseLink)}</li>
                              ))}
                            </ul>
                          ),
                        )}
                      </div>
                    ) : (
                      <p className={styles.faqAnswer}>
                        {linkify(item.a, content.links, usedLinks, styles.proseLink)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
