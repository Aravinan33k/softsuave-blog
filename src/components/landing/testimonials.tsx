"use client";

import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface TestimonialsContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly quote: string;
    readonly name: string;
    readonly role: string;
    readonly rating?: string;
  }[];
}

/**
 * Client testimonials for the landing surface.
 *
 * The homepage has its own testimonials block, but it is built from the
 * homepage's language (avatar imagery, its own card treatment). This one uses
 * the shared landing vocabulary — the same bordered `.card` grid as the
 * industries and why-us sections — so it sits in a landing page without
 * importing a homepage set piece.
 *
 * The quote is a real <blockquote> with its attribution in a <figcaption>, so
 * the citation is programmatically tied to the quotation rather than being
 * loose text underneath it.
 */
export default function Testimonials({
  content,
  id = "testimonials",
}: {
  content: TestimonialsContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.cardGrid}>
          {content.items.map((t) => (
            <figure key={t.name} className={styles.card}>
              {t.rating && (
                <span className={styles.cardIndex} aria-label={`Rated ${t.rating} out of 5`}>
                  ★ {t.rating}
                </span>
              )}
              <blockquote className={styles.quoteText}>{t.quote}</blockquote>
              <figcaption className={styles.quoteAttribution}>
                <span className={styles.quoteName}>{t.name}</span>
                <span className={styles.quoteRole}>{t.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
