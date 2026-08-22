"use client";

import { useState } from "react";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface FaqAnswerLink {
  readonly label: string;
  readonly href: string;
  /** Trailing prose after the link, when the sentence continues past it. */
  readonly tail?: string;
}

export interface FaqItem {
  readonly q: string;
  /** One string, or several for a multi-paragraph answer. */
  readonly a: string | readonly string[];
  /** Closes the last paragraph with a link, for answers that point somewhere. */
  readonly link?: FaqAnswerLink;
}

export interface FaqContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly FaqItem[];
}

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
  content,
  idPrefix = "faq",
}: {
  content: FaqContent;
  idPrefix?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className={styles.sectionShell} id="faq">
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.faqList}>
          {content.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={styles.faqItem}>
                <h3>
                  <button
                    type="button"
                    className={styles.faqTrigger}
                    aria-expanded={isOpen}
                    aria-controls={`${idPrefix}-panel-${i}`}
                    id={`${idPrefix}-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    <span className={styles.faqNum} aria-hidden>
                      {pad(i + 1)}
                    </span>
                    <span className={styles.faqQuestion}>{item.q}</span>
                    <span className={styles.faqIcon} aria-hidden />
                  </button>
                </h3>

                <div className={styles.faqPanelWrap} data-open={isOpen}>
                  <div
                    className={styles.faqPanel}
                    id={`${idPrefix}-panel-${i}`}
                    role="region"
                    aria-labelledby={`${idPrefix}-trigger-${i}`}
                  >
                    {(typeof item.a === "string" ? [item.a] : item.a).map((para, pi, all) => (
                      <p key={pi} className={styles.faqAnswer}>
                        {para}
                        {pi === all.length - 1 && item.link ? (
                          <>
                            {" "}
                            <a
                              className={styles.faqAnswerLink}
                              href={item.link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {item.link.label}
                            </a>
                            {item.link.tail ? ` ${item.link.tail}` : "."}
                          </>
                        ) : null}
                      </p>
                    ))}
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
