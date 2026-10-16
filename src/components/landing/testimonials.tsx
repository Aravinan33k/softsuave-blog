"use client";

import BrandImage from "@/components/home/brand-image";
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
    /** Optional — id into the page-"four" Pexels avatar slots (avatar-1…3). */
    readonly avatarId?: string;
  }[];
}

/**
 * Client testimonials for the landing surface.
 *
 * The homepage has its own testimonials block, built from the homepage's
 * language, but shares its avatar imagery (`BrandImage page="four"`) — real
 * faces on a proof section read better than none, so this uses the same
 * `avatar-1…3` slots when an item supplies an `avatarId`. Otherwise this
 * keeps the shared landing vocabulary: the same bordered `.card` grid as the
 * industries and why-us sections, so it sits in a landing page without
 * importing the homepage's whole card treatment.
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
        {/* `.testimonialGrid` overrides `.cardGrid`'s 4-up breakpoint (tuned for
            the 8-item industries/services grids) down to 3, so three items
            split the row evenly instead of sizing themselves for a missing
            fourth column. */}
        <div className={`${styles.cardGrid} ${styles.testimonialGrid}`}>
          {content.items.map((t) => (
            <figure key={t.name} className={styles.card}>
              {t.rating && (
                <span className={styles.cardIndex} aria-label={`Rated ${t.rating} out of 5`}>
                  ★ {t.rating}
                </span>
              )}
              <blockquote className={styles.quoteText}>{t.quote}</blockquote>
              <figcaption className={styles.quoteAttribution}>
                {t.avatarId && (
                  <span className={styles.cardAvatar} aria-hidden>
                    <BrandImage page="four" id={t.avatarId} className={styles.cardAvatarImg} sizes="44px" />
                  </span>
                )}
                <span className={styles.quoteNameGroup}>
                  <span className={styles.quoteName}>{t.name}</span>
                  <span className={styles.quoteRole}>{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
