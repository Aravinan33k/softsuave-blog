"use client";

import { testimonials } from "@/lib/home/content";
import ReviewsHero from "./reviews/reviews-hero";
import ReviewArchive from "./reviews/review-archive";
import type { NumberedReview } from "./reviews/review-shared";
import styles from "./home.module.css";

/**
 * Client stories — the reviews section as an editorial archive rather than a
 * row of cards. Two movements, in order:
 *
 *   masthead   `ReviewsHero`      the page's standard eyebrow / heading / lead
 *   stories    `ReviewArchive`    one story slot, the stories taking it in turn
 *
 * The stories share a single slot rather than running down the page: the slot
 * is the opening story's layout, and the rest rotate through it on a dwell,
 * with a counter, dots and arrows beneath for the reader who wants to drive.
 * Every story takes the same template and shows its quote whole, so nothing
 * about a story's type or grid changes as they swap — only which one is up.
 *
 * The data contract is unchanged — `testimonials.items` from
 * `@/lib/home/content`. Nothing here assumes a count: with one review the
 * slot is a single story and the controls do not render; with fifty the
 * rotation just continues.
 *
 * The section sits in the homepage's warm-white `.light` band (the wrapper is
 * in `app/(marketing)/page.tsx`). Nothing here or in the archive hard-codes a
 * colour, so the band is the whole of the switch; the one exception is each
 * photograph's hover veil, which stays near-black on purpose because it sits
 * on the picture rather than the page — see `.rImageVeilLabel`.
 */
export default function Testimonials() {
  /** The ordinal is part of a story's identity here: it is printed in each
   *  story's kicker ("Client story 01"). */
  const stories: NumberedReview[] = testimonials.items.map((review, i) => ({
    ...review,
    ordinal: i + 1,
  }));

  return (
    <section className={`${styles.section} ${styles.reviewsSection}`} id="testimonials">
      {/* The archive is a page in a publication, so it sits in a centred
          measure with real margins either side rather than running to the
          gutters — that is what makes the surrounding dark read as space. */}
      <div className={styles.reviewsInner}>
        <ReviewsHero
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          body={testimonials.body}
        />

        <div className={styles.reviewsBody}>
          <ReviewArchive reviews={stories} />
        </div>
      </div>
    </section>
  );
}
