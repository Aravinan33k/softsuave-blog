"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { hero as generativeAiHero } from "@/lib/home/generative-ai";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import { isHeroBadge, type HeroBadge } from "@/lib/home/hero-badges";
import styles from "./gen-ai.module.css";
import fx from "@/components/common/enquiry-form.module.css";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import Breadcrumb from "@/components/common/breadcrumb";

/**
 * Shape of the copy this hero renders. Every AI landing page supplies its own
 * object of this shape; the Generative AI page's is the default, so existing
 * usage (`<Hero />`) is unchanged.
 */
export interface HeroContent {
  /** The H1, split into lines. The last line takes the accent. */
  titleLines: readonly string[];
  body: readonly string[];
  points: readonly string[];
  /**
   * Credential strip closing the hero copy column. Omitted renders nothing.
   * A string renders as a dot-and-label tag; a `HeroBadge` renders the
   * issuer's own lockup on a white plaque.
   */
  badges?: readonly (string | HeroBadge)[];
  /**
   * Optional full-bleed backdrop photograph, the landing-page counterpart to
   * the homepage hero's intro video: rendered with `fill` behind the content,
   * held at low opacity under a dark gradient veil so the headline keeps its
   * contrast. Purely atmospheric, so it is rendered `alt=""` inside an
   * `aria-hidden` frame. Pages without one keep the plain gradient hero.
   */
  background?: {
    src: string;
    blurDataURL?: string;
  };
  /** Copy for the enquiry card; the card itself is `common/enquiry-form`. */
  form: EnquiryFormContent;
}

/**
 * Page hero: the H1 + positioning copy and supporting points on the left, the
 * consultation enquiry form on the right.
 *
 * Typographically this is the landing-page voice, not the homepage's: a tight
 * semibold Inter headline instead of the ultralight Fraunces display, squared
 * tags and buttons instead of capsules, and hairline-ruled supporting points
 * instead of a bulleted list.
 *
 * The enquiry card is `common/enquiry-form`; `idPrefix` namespaces its field
 * ids and doubles as the lead's `sourceKey`.
 */
export default function Hero({
  content = generativeAiHero,
  idPrefix = "genai",
}: {
  content?: HeroContent;
  idPrefix?: string;
} = {}) {
  const root = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(`.${styles.heroTitleLine}`, {
        yPercent: 40,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.09,
      }, 0.1)
        .from(`.${styles.heroBody}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", stagger: 0.08 }, "-=0.5")
        .from(`.${styles.heroPoint}`, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.05 }, "-=0.4")
        .from(`.${styles.badge}`, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out", stagger: 0.04 }, "-=0.3")
        .from(`.${styles.badge}`, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out", stagger: 0.04 }, "-=0.3")
        .from(`.${fx.card}`, { opacity: 0, y: 28, duration: 0.8, ease: "power2.out" }, 0.25);

      // Backdrop lifts out of black underneath all of that — the same hand-off
      // the homepage hero gives its video frame. Added last, at an absolute
      // position, so the relative offsets above keep their original timing;
      // a no-op on pages that supply no background.
      tl.from(`.${styles.heroMedia}`, { opacity: 0, duration: 1.3, ease: "power2.out" }, 0);
    },
    { scope: root },
  );

  const lastLine = content.titleLines.length - 1;

  return (
    <section ref={root} className={styles.hero} id="top">
      {content.background && (
        <div className={styles.heroMedia} aria-hidden>
          <Image
            src={publicMediaUrl(content.background.src)}
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroMediaImg}
            {...(content.background.blurDataURL
              ? { placeholder: "blur" as const, blurDataURL: content.background.blurDataURL }
              : {})}
          />
          <div className={styles.heroMediaVeil} />
        </div>
      )}

      <div className={styles.heroGlow} aria-hidden />

      <div className={styles.heroGrid}>
        <div>
          {/* "Home › <page>", named from the route — see common/breadcrumb. */}
          <Breadcrumb />
          <h1 className={styles.heroTitle}>
            {/* The spans are display:block, so the spaces between them only
                matter to the text content crawlers and screen readers see. */}
            {content.titleLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? " " : null}
                <span
                  className={`${styles.heroTitleLine}${
                    i === lastLine ? ` ${styles.heroTitleAccent}` : ""
                  }`}
                >
                  {line}
                </span>
              </Fragment>
            ))}
          </h1>

          {content.body.map((p) => (
            <p key={p.slice(0, 24)} className={styles.heroBody}>
              {p}
            </p>
          ))}

          <ul className={styles.heroPoints}>
            {content.points.map((point) => (
              <li key={point} className={styles.heroPoint}>
                <svg
                  className={styles.heroPointMark}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M4 10.6l4 3.8 8-8.8" />
                </svg>
                <span>{point}</span>
              </li>
            ))}
          </ul>

          {content.badges && content.badges.length > 0 && (
            <ul className={styles.badges} aria-label="Credentials">
              {content.badges.map((b) =>
                isHeroBadge(b) ? (
                  <li key={b.src} className={`${styles.badge} ${styles.badgeLogo}`}>
                    <Image
                      src={publicMediaUrl(b.src)}
                      alt={b.alt}
                      width={b.width}
                      height={b.height}
                      className={styles.badgeLogoImg}
                    />
                  </li>
                ) : (
                  <li key={b} className={styles.badge}>
                    <span className={styles.badgeDot} aria-hidden />
                    {b}
                  </li>
                ),
              )}
            </ul>
          )}
        </div>

        <EnquiryForm content={content.form} idPrefix={idPrefix} />
      </div>
    </section>
  );
}
