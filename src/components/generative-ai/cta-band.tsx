"use client";

import { midCta as generativeAiMidCta } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import styles from "./gen-ai.module.css";

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
}: {
  content?: CtaBandContent;
} = {}) {
  return (
    <section className={styles.ctaBand}>
      <FadeUp className={styles.ctaInner}>
        <div>
          {content.eyebrow && <span className={styles.kicker}>{content.eyebrow}</span>}
          <h2 className={styles.ctaTitle}>{content.title}</h2>
          <p className={styles.ctaBody}>{content.body}</p>
        </div>

        <div className={styles.ctaActions}>
          <a href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
            {content.cta.label}
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
