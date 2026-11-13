"use client";

import { midCta as generativeAiMidCta } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./gen-ai.module.css";
import LightFieldBackdrop from "@/components/home/light-field-backdrop";

export interface CtaBandContent {
  /** Optional — omitted on pages whose CTA heading stands on its own. */
  eyebrow?: string;
  title: string;
  body: string;
  cta: { readonly label: string; readonly href: string };
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
  content = generativeAiMidCta,
  titleAs: Title = "h2",
}: {
  content?: CtaBandContent;
  /**
   * Heading level of the band's title. H2 by default; a page ported from the
   * live site passes its source's level (the Poland page's band is an H3),
   * so the outline stays the same. Styling is identical.
   */
  titleAs?: "h2" | "h3";
} = {}) {
  return (
    <section className={styles.ctaBand}>
      <LightFieldBackdrop />

      <FadeUp className={styles.ctaInner}>
        <div>
          {content.eyebrow && <span className={styles.kicker}>{content.eyebrow}</span>}
          <Title className={styles.ctaTitle}>{content.title}</Title>
          <p className={styles.ctaBody}>{content.body}</p>
        </div>

        <div className={styles.ctaActions}>
          {/* In-page anchors stay plain for ScrollProvider's Lenis handler;
              a page goes through SiteLink, which keeps a served route local
              and sends a live-only one to softsuave.com. */}
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
    </section>
  );
}
