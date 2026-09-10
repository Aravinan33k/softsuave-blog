"use client";

import { brand } from "@/lib/home/content";
import FadeUp from "@/components/home/fade-up";
import SplitReveal from "@/components/home/split-reveal";
import styles from "./landing.module.css";

export interface FinalCtaContent {
  title: string;
  body: string;
  cta: { readonly label: string };
}

/**
 * Assurances shown under the closing CTA. Not in `content.ts` because they are
 * about how an engagement starts, which is a landing-page concern rather than a
 * homepage one.
 */
const ASSURANCES = [
  "30-minute technical consultation, no sales pitch",
  "Covered by NDA before anything is shared",
  "An engineer reviews your use case, not a salesperson",
  "Reply within one business day",
];

/**
 * Closing CTA as a bordered enquiry panel.
 *
 * The homepage's `Contact` says the same thing as a scroll-scrubbed cinematic
 * focus pull: a blurred backdrop and a glossy brand "crystal" resolving into
 * sharpness, a self-drawing underline, and a press-and-hold confirm button. That
 * is the homepage's closing moment and should stay unique to it. Here the same
 * offer is a panel that states the next step plainly and links straight back to
 * the hero form.
 *
 * Copy comes from the same `lib/home/content.ts` block the homepage reads, so
 * the offer stays in one place; only the `href` is local, because on this page
 * the enquiry form is the hero, not this section.
 */
export default function FinalCta({
  content,
}: {
  content: FinalCtaContent;
}) {
  return (
    <section className={styles.finalCta} id="contact">
      <FadeUp>
        <div className={styles.finalPanel}>
          <span className={styles.kicker}>Business Enquiry</span>
          <SplitReveal as="h2" className={styles.finalTitle} type="words">
            {content.title}
          </SplitReveal>
          <p className={styles.finalBody}>{content.body}</p>

          <div className={styles.finalActions}>
            <a href="#enquiry" className={`${styles.btn} ${styles.btnPrimary}`}>
              {content.cta.label}
            </a>
            <a href={`mailto:${brand.email}`} className={styles.btn}>
              {brand.email}
            </a>
          </div>

          <ul className={styles.finalAssurance}>
            {ASSURANCES.map((a) => (
              <li key={a} className={styles.finalAssuranceItem}>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
