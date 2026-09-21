"use client";

import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import FadeUp from "@/components/home/fade-up";
import SplitReveal from "@/components/home/split-reveal";
import { closing as industriesClosing } from "@/lib/home/industries-content";
import styles from "./industries.module.css";

/** Shape of the copy this panel renders. The sector index's is the default. */
export interface ClosingContent {
  eyebrow: string;
  title: string;
  body: string;
  primaryCta: { readonly label: string; readonly href: string };
  secondaryCta: { readonly label: string; readonly href: string };
}

/**
 * Closing panel: the conversion band, over the generated `contact-bg` frame at
 * low opacity under a dark veil — a supporting ground for the type, never
 * competing with it.
 *
 * Every destination passed in must be a route this app serves itself, so the
 * last thing on a page is never a link out. The sector index sends readers to
 * `/contact` and `/ai-development-service`; a sector page sends them to
 * `/contact` and back to `/industries`.
 */
export default function Closing({
  content: closing = industriesClosing,
}: {
  content?: ClosingContent;
} = {}) {
  return (
    <section className={styles.closing} id="contact">
      <div className={styles.closingBg} aria-hidden>
        <BrandImage page="four" id="contact-bg" alt="" fill sizes="100vw" />
      </div>

      <div className={styles.closingInner}>
        <span className={styles.kicker}>{closing.eyebrow}</span>
        <SplitReveal as="h2" className={styles.closingTitle} type="words">
          {closing.title}
        </SplitReveal>
        <FadeUp>
          <p className={styles.closingText}>{closing.body}</p>
          <div className={styles.closingCtas}>
            <Link
              href={closing.primaryCta.href}
              className={`${styles.pill} ${styles.pillFilled}`}
              data-cursor="Book a call"
            >
              {closing.primaryCta.label}
            </Link>
            <Link href={closing.secondaryCta.href} className={styles.pill} data-cursor="Explore">
              {closing.secondaryCta.label}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
