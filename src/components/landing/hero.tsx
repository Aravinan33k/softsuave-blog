"use client";

import { Fragment, useRef, type CSSProperties } from "react";
import Image from "next/image";
import { Globe, SquareTerminal, Users } from "lucide-react";
import { publicMediaUrl } from "@/lib/media-url";
import { isHeroBadge, type HeroBadge } from "@/lib/home/hero-badges";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./landing.module.css";
import fx from "@/components/common/enquiry-form.module.css";
import EnquiryForm, { type EnquiryFormContent } from "@/components/common/enquiry-form";
import Breadcrumb from "@/components/common/breadcrumb";

/**
 * Shape of the copy this hero renders. Every AI landing page supplies its own
 * object of this shape; the Generative AI page's is the default, so existing
 * usage (`<Hero />`) is unchanged.
 */
export interface HeroContent {
  /**
   * Optional kicker above the H1 ("FREE 7-DAY TRIAL"), in the section heads'
   * own accent-ruled mono style. Omitted on every page whose hero has none.
   */
  eyebrow?: string;
  /** The H1, split into lines. The last line takes the accent unless `accent` is set. */
  titleLines: readonly string[];
  /**
   * The phrase in the H1 to colour, wherever it falls — the technology the
   * page hires for ("ReactJS Developers"), rather than whatever words sit on
   * the last line (hire-by-skill review: "the wrong words are being
   * highlighted"). May run across a line break — "Custom Web App" /
   * "Development Services" takes "Web App Development" (Web App review:
   * "highlight 'Web App Development' in the H1"). Omitted keeps the
   * last-line accent.
   */
  accent?: string;
  /**
   * Size the H1 to its column so each of `titleLines` fits on one line — for
   * a headline whose first line is too long for the standard H1 size (the
   * PostgreSQL page: "make sure the h1 comes in 2 lines"). Scales down with
   * the column, never above the standard size, never below 34px.
   */
  titleFit?: boolean;
  /**
   * Sets every title line on ONE line from 1200px up, sized to the copy
   * column (the last line keeps its accent colour inline), and lets it wrap
   * normally below that, where one line cannot fit at a readable size.
   * Computer Vision review, 1 Oct: "make sure the H1 comes in a single line".
   */
  titleOneLine?: boolean;
  body: readonly string[];
  points: readonly string[];
  /**
   * Trust badges under the points. Optional — omit for a badge-less hero.
   * A string renders as a dot-and-label tag; a `HeroBadge` renders the
   * issuer's own lockup on a white plaque. Mixing the two in one list is
   * allowed, and reads fine — the plaques simply sit taller than the tags.
   */
  badges?: readonly (string | HeroBadge)[];
  /**
   * Optional label over the badge row ("Trusted by global brands"), set off
   * from the copy above it by a hairline — the live trial page's arrangement.
   */
  badgesLabel?: string;
  /**
   * Optional icon stat cards under the body ("150+ CLIENTS" + a line), the
   * live trial page's two-up grid. Rendered in place of nothing: a page can
   * pass these with an empty `points` list, or both.
   */
  stats?: readonly HeroStat[];
  /** Copy for the enquiry card; the card itself is `common/enquiry-form`. */
  form: EnquiryFormContent;
  /**
   * Optional button row under the points list, separate from the enquiry
   * form beside it — the live "Start X Trial" / "Book a Meeting" pair
   * (review: "CTA button is missing in the hero section"). The first entry
   * renders filled/primary; the rest render outlined. `external` opens the
   * link in a new tab (a booking page, say) rather than routing through
   * `SiteLink`.
   */
  ctas?: readonly {
    readonly label: string;
    readonly href: string;
    readonly external?: boolean;
  }[];
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
    /**
     * `strong` lays a near-black gradient under the copy column, fading out
     * towards the form — for pages whose photo competes with the text
     * (hire-by-skill review: "add a black gradient to increase visibility in
     * the hero section"). Omitted keeps the default even veil.
     */
    veil?: "strong";
  };
}

/** Glyphs a hero stat card can lead with. */
const STAT_ICONS = { clients: Users, experts: SquareTerminal, countries: Globe } as const;

export interface HeroStat {
  /** "150+ Clients". */
  readonly title: string;
  readonly body: string;
  readonly icon: keyof typeof STAT_ICONS;
}

/**
 * `titleFit` sizes the H1 from its longest line: `--title-chars` is that
 * line's length, and the stylesheet turns it into a font size that fits the
 * line to the copy column. See `.heroTitleFit` in landing.module.css.
 */
export function titleFitStyle(lines: readonly string[]) {
  return { "--title-chars": Math.max(...lines.map((l) => l.length)) } as CSSProperties;
}

/**
 * Where `accent` falls on each title line, as a `[start, end)` slice of that
 * line, or `null` for a line it misses. The phrase is looked up in the lines
 * joined by single spaces — the text the H1 actually reads as — so a phrase
 * that runs across a line break colours its part on each line.
 */
function accentSlices(lines: readonly string[], accent: string | undefined) {
  const at = accent ? lines.join(" ").indexOf(accent) : -1;
  let offset = 0;
  return lines.map((line) => {
    const start = Math.max(at, offset) - offset;
    const end = Math.min(at + (accent?.length ?? 0), offset + line.length) - offset;
    offset += line.length + 1;
    return at >= 0 && end > start ? ([start, end] as const) : null;
  });
}

/** `line` with its `[start, end)` slice wrapped in the accent colour. */
function accentWithin(line: string, slice: readonly [number, number] | null) {
  if (!slice) return line;
  return (
    <>
      {line.slice(0, slice[0])}
      <span className={styles.heroTitleAccent}>{line.slice(slice[0], slice[1])}</span>
      {line.slice(slice[1])}
    </>
  );
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
  breadcrumb = true,
}: {
  content: HeroContent;
  idPrefix?: string;
  variant?: HeroVariant;
  /** `false` drops the "Home › <page>" trail for a page that shows none. */
  breadcrumb?: boolean;
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
      if (content.stats?.length) {
        tl.from(`.${styles.heroStat}`, { opacity: 0, y: 16, duration: 0.5, ease: "power2.out", stagger: 0.06 }, "-=0.3");
      }
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
  const accents = accentSlices(content.titleLines, content.accent);

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
          <div className={styles.heroBgVeil} data-veil={content.image.veil} aria-hidden />
          {/* The compact look layers the coral glow over the photo as well,
              the way the generative-AI hero does; the display look drops it
              (the photo is the accent there). */}
          {compact && <div className={styles.heroGlow} aria-hidden />}
        </>
      ) : (
        <div className={styles.heroGlow} aria-hidden />
      )}

      <div className={styles.heroGrid}>
        <div className={content.titleFit || content.titleOneLine ? styles.heroCopyFit : undefined}>
          {/* "Home › <page>", named from the route — see common/breadcrumb. */}
          {breadcrumb && <Breadcrumb />}
          {content.eyebrow && <span className={`${styles.kicker} ${styles.heroEyebrow}`}>{content.eyebrow}</span>}
          <h1
            className={`${styles.heroTitle}${content.titleFit ? ` ${styles.heroTitleFit}` : ""}${
              content.titleOneLine ? ` ${styles.heroTitleOneLine}` : ""
            }`}
            style={content.titleFit ? titleFitStyle(content.titleLines) : undefined}
          >
            {/* The spans are display:block, so the spaces between them only
                matter to the text content crawlers and screen readers see. */}
            {content.titleLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? " " : null}
                <span
                  className={`${styles.heroTitleLine}${
                    !content.accent && i === lastLine ? ` ${styles.heroTitleAccent}` : ""
                  }`}
                >
                  {accentWithin(line, accents[i])}
                </span>
              </Fragment>
            ))}
          </h1>

          {content.body.map((p) => (
            <p key={p.slice(0, 24)} className={styles.heroBody}>
              {p}
            </p>
          ))}

          {/* The wrapper is a size container, so the cards lay out by the
              copy column's own width — it narrows sharply once the form
              sits beside it, which a viewport breakpoint can't see. */}
          {content.stats && content.stats.length > 0 && (
            <div className={styles.heroStatsWrap}>
            <ul className={styles.heroStats}>
              {content.stats.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.title} className={styles.heroStat}>
                    <span className={styles.heroStatIcon} aria-hidden>
                      <Icon strokeWidth={1.6} />
                    </span>
                    <span>
                      <strong className={styles.heroStatTitle}>{stat.title}</strong>
                      <span className={styles.heroStatBody}>{stat.body}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            </div>
          )}

          {content.points.length > 0 && (
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
          )}

          {content.ctas && content.ctas.length > 0 && (
            <div className={styles.heroCtas}>
              {content.ctas.map((cta, i) => {
                const className = i === 0 ? `${styles.btn} ${styles.btnPrimary}` : styles.btn;
                if (cta.external) {
                  return (
                    <a
                      key={cta.label}
                      href={cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={className}
                    >
                      {cta.label}
                    </a>
                  );
                }
                // An in-page target stays a plain <a> so ScrollProvider's
                // Lenis handler intercepts it; anything else goes through
                // SiteLink, which resolves a live-only path (like the trial
                // page) to softsuave.com instead of 404ing.
                return cta.href.startsWith("#") ? (
                  <a key={cta.label} href={cta.href} className={className}>
                    {cta.label}
                  </a>
                ) : (
                  <SiteLink key={cta.label} href={cta.href} className={className}>
                    {cta.label}
                  </SiteLink>
                );
              })}
            </div>
          )}

          {content.badgesLabel && content.badges && content.badges.length > 0 && (
            <span className={`${styles.kicker} ${styles.heroBadgesLabel}`}>{content.badgesLabel}</span>
          )}
          {content.badges && content.badges.length > 0 && (
            <ul className={styles.badges} aria-label={content.badgesLabel ?? "Credentials"}>
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
