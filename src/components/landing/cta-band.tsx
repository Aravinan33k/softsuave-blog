"use client";

import FadeUp from "@/components/home/fade-up";
import SplitReveal from "@/components/home/split-reveal";
import styles from "./landing.module.css";
import LightFieldBackdrop from "@/components/home/light-field-backdrop";
import { SiteLink } from "@/themes/softsuave/site-link";

export interface CtaBandContent {
  /** Optional — omitted on pages whose CTA heading stands on its own. */
  eyebrow?: string;
  title: string;
  body: string;
  cta: { readonly label: string; readonly href: string };
  /**
   * Optional counters under the band, for a CTA the page backs with numbers.
   * Figures are strings, not numbers: they arrive already written ("1250+",
   * "13+") and are not ours to reformat.
   */
  stats?: readonly { readonly figure: string; readonly label: string }[];
}

/**
 * Mid-page conversion band. One action only — the band's own CTA, which
 * either scrolls to the hero enquiry form (Lenis picks up the in-page anchor
 * from ScrollProvider) or goes to /contact. The mailto that used to sit beside
 * it was removed on review: a raw address next to the button split the
 * conversion path and exposed the sales inbox to scrapers.
 *
 * Uses this surface's squared buttons rather than the homepage's capsule
 * pills.
 */
export default function CtaBand({
  content,
  backdrop = true,
}: {
  content: CtaBandContent;
  /**
   * The coral light-field loop behind the band. `false` drops it, leaving the
   * band on the page's own near-black ground — the Sep 23 review read the lit
   * version on /data-engineering-services as "the CTA section is in a separate
   * colour". Kept as a prop rather than removed outright because the same
   * treatment ties the band to the closing enquiry section on every other page.
   */
  backdrop?: boolean;
}) {
  return (
    <section className={styles.ctaBand}>
      {backdrop && <LightFieldBackdrop />}

      <FadeUp className={styles.ctaInner}>
        <div>
          {content.eyebrow && <span className={styles.kicker}>{content.eyebrow}</span>}
          <SplitReveal as="h2" className={styles.ctaTitle} type="words">
            {content.title}
          </SplitReveal>
          <p className={styles.ctaBody}>{content.body}</p>
        </div>

        <div className={styles.ctaActions}>
          {/* An in-page target stays a plain <a> so ScrollProvider's Lenis
              handler intercepts it. A site path goes through SiteLink, which
              decides between <Link> and an anchor depending on whether this app
              serves that route yet — without it, a CTA naming a page we do not
              serve (Xamarin hiring, say) would 404 here instead of resolving to
              softsuave.com. */}
          {content.cta.href.startsWith("#") ? (
            <a href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
              {content.cta.label}
            </a>
          ) : (
            <SiteLink href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
              {content.cta.label}
            </SiteLink>
          )}
        </div>
      </FadeUp>

      {content.stats && content.stats.length > 0 && (
        <FadeUp>
          <dl className={styles.ctaStats}>
            {content.stats.map((stat) => (
              <div key={stat.label} className={styles.ctaStat}>
                <dt className={styles.ctaStatFigure}>{stat.figure}</dt>
                <dd className={styles.ctaStatLabel}>{stat.label}</dd>
              </div>
            ))}
          </dl>
        </FadeUp>
      )}
    </section>
  );
}
