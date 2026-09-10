"use client";

import { brand } from "@/lib/home/content";
import FadeUp from "@/components/home/fade-up";
import SplitReveal from "@/components/home/split-reveal";
import styles from "./landing.module.css";

export interface CtaBandContent {
  /** Optional — omitted on pages whose CTA heading stands on its own. */
  eyebrow?: string;
  title: string;
  body: string;
  cta: { readonly label: string; readonly href: string };
}

/**
 * Mid-page conversion band. Primary action scrolls to the hero enquiry form
 * (Lenis picks up the in-page anchor from ScrollProvider); the secondary action
 * is a mailto. Both use this surface's squared buttons rather than the homepage's
 * capsule pills, and the magnetic hover wrapper is dropped — a button that slides
 * away from the cursor belongs on a showreel, not on a conversion band.
 */
export default function CtaBand({
  content,
}: {
  content: CtaBandContent;
}) {
  return (
    <section className={styles.ctaBand}>
      <FadeUp className={styles.ctaInner}>
        <div>
          {content.eyebrow && <span className={styles.kicker}>{content.eyebrow}</span>}
          <SplitReveal as="h2" className={styles.ctaTitle} type="words">
            {content.title}
          </SplitReveal>
          <p className={styles.ctaBody}>{content.body}</p>
        </div>

        <div className={styles.ctaActions}>
          <a href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
            {content.cta.label}
          </a>
          <a href={`mailto:${brand.email}`} className={styles.btn}>
            {brand.email}
          </a>
        </div>
      </FadeUp>
    </section>
  );
}
