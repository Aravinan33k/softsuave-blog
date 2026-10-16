"use client";

import SplitReveal from "../split-reveal";
import styles from "../home.module.css";

/**
 * The archive's masthead, in the page's standard section-head arrangement:
 *
 *   CLIENT STORIES
 *   What Our Clients Say About Us
 *   We've empowered hundreds of clients globally…
 *
 * It is deliberately the SAME structure as every other section head on the page
 * — Technology Stack, Industries, Services — and uses the same three primitives
 * to guarantee it: `.eyebrow`, `.h2` and `.lead` inside `.sectionHead`. Nothing
 * here sets its own type sizes, so the masthead cannot drift from the rest of
 * the page when those tokens change.
 *
 * An earlier pass laid the labels out in the left margin, with the heading
 * beside the eyebrow and the abstract set in two columns under a second
 * "SUMMARY" label. It read as a different section from its neighbours, so it
 * went. Both the heading and the abstract now use the FLAT `title`/`body`
 * strings — the content model keeps those alongside the pre-split
 * `titleLines`/`bodyLines` precisely so a layout like this one can wrap the copy
 * naturally instead of at hard-coded break points.
 */
export default function ReviewsHero({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div className={styles.sectionHead}>
      {/* `eyebrowDark` is the light-band variant of `.eyebrow` — the section
          sits in a `.light` wrapper on the homepage. Flip it back if the
          section ever returns to the dark canvas. */}
      <span className={styles.eyebrowDark}>{eyebrow}</span>
      <SplitReveal as="h2" className={styles.h2} type="words">
        {title}
      </SplitReveal>
      <p className={styles.lead}>{body}</p>
    </div>
  );
}
