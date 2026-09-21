"use client";

import { Fragment, useRef } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { isHeroBadge, type HeroBadge } from "@/lib/home/hero-badges";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./landing.module.css";
import fx from "@/components/common/enquiry-form.module.css";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";

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
   * Trust badges under the points. Optional — omit for a badge-less hero.
   * A string renders as a dot-and-label tag; a `HeroBadge` renders the
   * issuer's own lockup on a white plaque. Mixing the two in one list is
   * allowed, and reads fine — the plaques simply sit taller than the tags.
   */
  badges?: readonly (string | HeroBadge)[];
  /** Copy for the enquiry card; the card itself is `common/enquiry-form`. */
  form: EnquiryFormContent;
  /**
   * Optional full-bleed background image behind the *whole* hero section —
   * veiled for contrast, the same "image behind the text" treatment as the
   * homepage hero (`components/home/hero.tsx`'s `.videoHeroFrame`/
   * `.videoHeroVeil`). The copy column sits directly on it, no card/border
   * around the text (matching the marketing site's older AI pages); the
   * enquiry form stays its own bordered, opaque card floating on top, same as
   * always. Omitted on pages whose hero stands on a flat surface (the
   * default) — that keeps the decorative `.heroGlow` blob instead.
   *
   * `src` is stored root-relative and resolved through `publicMediaUrl` (see
   * `overview.tsx`'s `image` for the same convention) — this is a hand-placed
   * asset, not a Pexels-pipeline slot, so it is not routed through
   * `BrandImage`/the image manifest.
   */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    /** 16px placeholder of the same frame, as the overview illustration has. */
    blurDataURL?: string;
  };
}

/**
 * Two looks over the same markup and tokens:
 *
 *   display   the default — oversized serif headline, generous section
 *             padding, slow drift on the backdrop, icon-labelled form fields.
 *   compact   the generative-AI page's hero, verbatim: a tighter headline
 *             clamp, hairline-ruled points, the backdrop held near-full
 *             opacity under a two-pass veil with the coral glow over it, and
 *             plain mono field labels. Pick it when a page should sit
 *             alongside `/generative-ai-development-company`.
 */
export type HeroVariant = "display" | "compact";

/**
 * Page hero: the H1 + positioning copy and supporting points on the left, the
 * consultation enquiry form on the right, with the trust badges bridging the
 * two on narrow viewports.
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
  content,
  idPrefix = "landing",
  variant = "display",
}: {
  content: HeroContent;
  idPrefix?: string;
  variant?: HeroVariant;
}) {
  const root = useRef<HTMLElement | null>(null);
  const compact = variant === "compact";

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
      })
        .from(`.${styles.heroBody}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", stagger: 0.08 }, "-=0.5")
        .from(`.${styles.heroPoint}`, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.05 }, "-=0.4");
      if (content.badges?.length) {
        tl.from(`.${styles.badge}`, { opacity: 0, y: 12, duration: 0.45, ease: "power2.out", stagger: 0.04 }, "-=0.3");
      }
      tl.from(`.${fx.card}`, { opacity: 0, y: 28, duration: 0.8, ease: "power2.out" }, 0.25);

      // Backdrop lifts out of black underneath all of that — the same hand-off
      // the homepage hero gives its video frame. Added last, at an absolute
      // position, so the relative offsets above keep their original timing.
      if (content.image) {
        tl.from(`.${styles.heroBg}`, { opacity: 0, duration: 1.3, ease: "power2.out" }, 0);
      }
    },
    { scope: root },
  );

  const lastLine = content.titleLines.length - 1;

  return (
    <section
      ref={root}
      className={[
        styles.hero,
        content.image ? styles.heroWithBg : "",
        compact ? styles.heroCompact : "",
      ]
        .filter(Boolean)
        .join(" ")}
      id="top"
    >
      {content.image ? (
        <>
          <Image
            src={publicMediaUrl(content.image.src)}
            alt={content.image.alt}
            fill
            sizes="100vw"
            className={styles.heroBg}
            priority
            {...(content.image.blurDataURL
              ? { placeholder: "blur" as const, blurDataURL: content.image.blurDataURL }
              : {})}
          />
          <div className={styles.heroBgVeil} aria-hidden />
          {/* The compact look layers the coral glow over the photo as well,
              the way the generative-AI hero does; the display look drops it
              (the photo is the accent there). */}
          {compact && <div className={styles.heroGlow} aria-hidden />}
        </>
      ) : (
        <div className={styles.heroGlow} aria-hidden />
      )}

      <div className={styles.heroGrid}>
        <div>
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
                    {/* The mark is the whole point here, so unlike the awards
                        strip it carries its own name — nothing else in the
                        hero says "Clutch". */}
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
