"use client";

import { Fragment, useRef, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import { CalendarDays, Globe, Mail, SquareTerminal, Star, Users } from "lucide-react";
import { publicMediaUrl } from "@/lib/media-url";
import { heroBadgeSizes, isHeroBadge, type HeroBadge } from "@/lib/home/hero-badges";
import { SiteLink } from "@/themes/softsuave/site-link";
import Logo from "@/components/home/logo";
import styles from "./landing.module.css";
import cta from "@/components/common/cta-row.module.css";
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
  /** Set the whole headline in the one colour — no accent on its last line (the live staff-augmentation ad headline). */
  noAccent?: boolean;
  /** `"home"` sets the H1 at the homepage hero's size (70px desktop, 40px phone). */
  titleScale?: "home";
  /** Per-page wording for a breadcrumb crumb, by its path. */
  breadcrumbLabels?: Readonly<Record<string, string>>;
  /** Paint the accent words in the brand orange-to-rose gradient (the Forward Deployed Engineers page's headline) instead of flat orange. */
  accentGradient?: boolean;
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
  /**
   * Sets the last of `titleLines` as a smaller subline under the headline
   * (25px on desktop, scaling down on smaller screens) — for a long
   * descriptive tail such as the Vehicle Intelligence case study's "for
   * Real-Time Axle Counting & Traffic Monitoring".
   */
  titleSubLast?: boolean;
  body: readonly string[];
  /**
   * What is set in bold in `body`: a number is the position of a whole paragraph (the live page's
   * emphasised line), a string is a phrase inside any paragraph (the cross-platform hero bolds two).
   */
  boldBody?: readonly (number | string)[];
  /** Positions in `body` of paragraphs kept on one line wherever the column is wide enough (the live cross-platform hero's second line). */
  bodyOneLine?: readonly number[];
  /** Phrases inside the body paragraphs that are links, by the words they wrap. */
  bodyLinks?: readonly { readonly text: string; readonly href: string }[];
  /** A "Scroll Down" cue under the copy (the live page's), carrying the reader to the element with this id. */
  scrollCue?: { readonly label: string; readonly targetId: string };
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
   * Draw the `HeroBadge` marks bare, with no white plaque — for artwork made for
   * a dark ground (white lettering), which would vanish on white. The files should
   * be exported at about 3x their shown height (180px is plenty for the 42px marks): they are
   * served unoptimized, and the browser scales them down. `"large"` draws round seals and
   * other square marks up to 96px high instead of 42px.
   */
  badgesBare?: boolean | "large";
  /**
   * Optional icon stat cards under the body ("150+ CLIENTS" + a line), the
   * live trial page's two-up grid. Rendered in place of nothing: a page can
   * pass these with an empty `points` list, or both.
   */
  stats?: readonly HeroStat[];
  /**
   * Set each stat card's title as an H3 rather than bold text — for a page
   * whose live counterpart makes them headings (the free-demo-app page's
   * "150+ CLIENTS" are H3s). Styling is identical either way.
   */
  statTitleAs?: "h3";
  /**
   * Copy for the enquiry card; the card itself is `common/enquiry-form`.
   * Omitted only on a hero whose `aside` image takes the card's column.
   */
  form?: EnquiryFormContent;
  /**
   * An image in the enquiry card's column instead of the card — for a page
   * whose hero is an introduction rather than a lead form (About review, 13
   * Oct: "remove the form instead use the image"). Shown whole (`contain`),
   * so transparent cut-out artwork keeps its own shape; beside the copy from
   * 1000px, under it below that.
   */
  aside?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    blurDataURL?: string;
  };
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
  /** Text set between the CTAs ("OR") — the ad landing page's pair reads "Start … OR Book a Meeting". */
  ctaSeparator?: string;
  /** A line set under the points list and above the CTAs (the live CMS page's "*Satisfaction Guaranteed – Get 40-hour Free Trial"). */
  afterPoints?: string;
  /**
   * A button at the top right of the logo row (`noNav` pages), from 768px up — the
   * live /ad/remote-developers masthead's own "Start 40 Hours Free Trial →".
   */
  logoCta?: { readonly label: string; readonly href: string };
  /** A seal at the top right of the logo row (`noNav` pages) — the live ad hero's anniversary badge. */
  logoBadge?: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
  /** An email address: adds an icon button beside `logoCta` that opens a message to it. */
  logoMail?: string;
  /**
   * Review scores under the body, each a gold star and its score over the review
   * site's own mark, on a light card with a laurel wreath behind it — the live
   * android ad hero's four "4.9/5" lockups.
   */
  ratings?: {
    readonly items: readonly {
      readonly score: string;
      readonly logo: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
    }[];
    /** The wreath drawn faintly behind each card. Root-relative under /public. */
    readonly laurel?: string;
  };
  /**
   * A small note beside the CTAs with a hover/focus tip — the live Java page's
   * "No Payment Required ?" whose popover explains the free trial. The tip is a
   * title and a paragraph, shown on hover and on keyboard focus (and so on tap).
   */
  ctaNote?: { readonly label: string; readonly tipTitle: string; readonly tipBody: string };
  /**
   * Optional label/value pairs under the body copy — a case study's
   * "Industry: Transportation" and "Platform: Web" (the live case-study
   * hero's tag and platform line). Rendered as a definition list of chips.
   * A fact with `icons` shows them in place of its `value` text (each icon's
   * alt names it) — the case-study platform line's Android / iOS / Web marks.
   */
  facts?: readonly {
    readonly label: string;
    readonly value: string;
    readonly icons?: readonly { readonly src: string; readonly alt: string }[];
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
    veil?: "strong" | "dark";
    /** Hold the photo still — no slow drift/zoom (the live ad hero's banner does not move). */
    still?: boolean;
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

/** A body paragraph with its bold phrases and link phrases picked out (each at its first position). */
function richBody(
  text: string,
  bold: readonly string[] | undefined,
  links: readonly { readonly text: string; readonly href: string }[] | undefined,
) {
  if (!bold?.length && !links?.length) return text;
  const marks: { at: number; len: number; node: ReactNode }[] = [];
  for (const phrase of bold ?? []) {
    const at = text.indexOf(phrase);
    if (at !== -1) marks.push({ at, len: phrase.length, node: <strong key={`b${at}`}>{phrase}</strong> });
  }
  for (const link of links ?? []) {
    const at = text.indexOf(link.text);
    if (at !== -1)
      marks.push({
        at,
        len: link.text.length,
        node: (
          <SiteLink key={`l${at}`} href={link.href} className={styles.heroBodyLink}>
            <strong>{link.text}</strong>
          </SiteLink>
        ),
      });
  }
  if (!marks.length) return text;
  marks.sort((a, b) => a.at - b.at);
  const out: ReactNode[] = [];
  let cursor = 0;
  for (const m of marks) {
    if (m.at < cursor) continue;
    if (m.at > cursor) out.push(text.slice(cursor, m.at));
    out.push(m.node);
    cursor = m.at + m.len;
  }
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
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
  slot,
  noNav = false,
}: {
  /** The page has no top navigation: the hero drops the space reserved for it and opens on the logo instead. */
  noNav?: boolean;
  content: HeroContent;
  /**
   * Anything to put in the form's column when the hero has neither a `form` nor
   * an `aside` image — the ad landing page's testimonial card. Ignored when
   * either is set.
   */
  slot?: ReactNode;
  idPrefix?: string;
  variant?: HeroVariant;
  /** `false` drops the "Home › <page>" trail for a page that shows none. */
  breadcrumb?: boolean;
}) {
  const root = useRef<HTMLElement | null>(null);
  const compact = variant === "compact";

  // The entrance plays in CSS (`.hero` intro block in landing.module.css), from
  // the first paint. It used to be a GSAP timeline that ran at hydration and
  // re-hid the already-painted H1 and body copy to fade them back in — so
  // Chrome counted the page's main content (LCP) as appearing only after all
  // the JavaScript had loaded: ~7 s on PageSpeed's mobile run (15 Oct).

  const lastLine = content.titleLines.length - 1;
  const accents = accentSlices(content.titleLines, content.accent);

  // What sits above the H1. Beside a form it gets a row of its own above the
  // grid, so the copy column opens on the H1 and the form's top edge lines up
  // with the H1's (15 Oct review: "Hero H1 name & forms horizontally aligned in
  // the same line") — inside the column, a breadcrumb or kicker pushed the H1
  // 25-45px below the card. The `aside` variant keeps it in the column, centred
  // against its image as before.
  const head = (
    <>
      {/* "Home › <page>", named from the route — see common/breadcrumb. */}
      {breadcrumb && <Breadcrumb labels={content.breadcrumbLabels} />}
      {content.eyebrow && <span className={`${styles.kicker} ${styles.heroEyebrow}`}>{content.eyebrow}</span>}
    </>
  );

  return (
    <section
      ref={root}
      className={[
        styles.hero,
        content.image ? styles.heroWithBg : "",
        compact ? styles.heroCompact : "",
        noNav ? styles.heroNoNav : "",
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
            className={content.image.still ? `${styles.heroBg} ${styles.heroBgStill}` : styles.heroBg}
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

      {noNav && (
        <div className={styles.heroLogo}>
          <a href="#top" aria-label="Soft Suave logo">
            <Logo tone="light" size={48} />
          </a>
          {content.logoBadge && (
            <Image
              src={publicMediaUrl(content.logoBadge.src)}
              alt={content.logoBadge.alt}
              width={content.logoBadge.width}
              height={content.logoBadge.height}
              className={styles.heroLogoBadge}
              priority
            />
          )}
          {content.logoCta && (
            <div className={styles.heroLogoActions}>
              {content.logoMail && (
                <a
                  href={`mailto:${content.logoMail}`}
                  className={`${styles.btn} ${styles.btnPrimary} ${styles.heroLogoMail}`}
                  aria-label={content.logoMail}
                  title={content.logoMail}
                >
                  <Mail size={18} aria-hidden />
                </a>
              )}
              <a href={content.logoCta.href} className={`${styles.btn} ${styles.btnPrimary} ${styles.heroLogoCta}`}>
                {content.logoCta.label}
              </a>
            </div>
          )}
        </div>
      )}

      {!content.aside && <div className={styles.heroHead}>{head}</div>}

      <div className={content.aside ? `${styles.heroGrid} ${styles.heroGridAside}` : styles.heroGrid}>
        <div className={content.titleFit || content.titleOneLine ? styles.heroCopyFit : undefined}>
          {content.aside && head}
          {/* `suppressHydrationWarning`: the root layout's paint-nudge script
              (lib/paint-nudge.ts) flips a transparent text-shadow on this H1 while
              the page waits for its first paint; hydration can land mid-flip. */}
          <h1
            suppressHydrationWarning
            className={`${styles.heroTitle}${content.titleFit ? ` ${styles.heroTitleFit}` : ""}${
              content.titleOneLine ? ` ${styles.heroTitleOneLine}` : ""
            }${content.titleScale === "home" ? ` ${styles.heroTitleHome}` : ""}${
              content.accentGradient ? ` ${styles.heroTitleGradient}` : ""
            }`}
            style={
              content.titleFit
                ? // A `titleSubLast` subline has its own size, so only the
                  // headline lines above it set the fit.
                  titleFitStyle(content.titleSubLast ? content.titleLines.slice(0, -1) : content.titleLines)
                : undefined
            }
          >
            {/* The spans are display:block, so the spaces between them only
                matter to the text content crawlers and screen readers see. */}
            {content.titleLines.map((line, i) => (
              <Fragment key={line}>
                {i > 0 ? " " : null}
                <span
                  style={{ ["--i" as string]: i } as CSSProperties}
                  className={`${styles.heroTitleLine}${
                    !content.accent && !content.noAccent && i === lastLine ? ` ${styles.heroTitleAccent}` : ""
                  }${content.titleSubLast && i === lastLine ? ` ${styles.heroTitleSub}` : ""}`}
                >
                  {accentWithin(line, accents[i])}
                </span>
              </Fragment>
            ))}
          </h1>

          {content.body.map((p, i) => (
            <p
              key={p.slice(0, 24)}
              className={`${styles.heroBody}${p.startsWith("*") ? ` ${styles.heroBodyNote}` : ""}${
                content.bodyOneLine?.includes(i) ? ` ${styles.heroBodyOneLine}` : ""
              }`}
              style={{ ["--i" as string]: i } as CSSProperties}>
              {content.boldBody?.includes(i) ? (
                <strong className={styles.heroBodyStrong}>{p}</strong>
              ) : (
                richBody(
                  p,
                  content.boldBody?.filter((b): b is string => typeof b === "string"),
                  content.bodyLinks,
                )
              )}
            </p>
          ))}

          {content.facts && content.facts.length > 0 && (
            <dl className={styles.heroFacts}>
              {content.facts.map((fact) => (
                <div key={fact.label} className={styles.heroFact}>
                  <dt>{fact.label}</dt>
                  {fact.icons && fact.icons.length > 0 ? (
                    <dd className={styles.heroFactIcons}>
                      {fact.icons.map((icon) => (
                        <Image
                          key={icon.src}
                          src={publicMediaUrl(icon.src)}
                          alt={icon.alt}
                          title={icon.alt}
                          width={96}
                          height={96}
                          sizes="22px"
                          className={styles.heroFactIcon}
                        />
                      ))}
                    </dd>
                  ) : (
                    <dd>{fact.value}</dd>
                  )}
                </div>
              ))}
            </dl>
          )}

          {/* The wrapper is a size container, so the cards lay out by the
              copy column's own width — it narrows sharply once the form
              sits beside it, which a viewport breakpoint can't see. */}
          {content.stats && content.stats.length > 0 && (
            <div className={styles.heroStatsWrap}>
            <ul className={styles.heroStats}>
              {content.stats.map((stat, i) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.title} className={styles.heroStat} style={{ ["--i" as string]: i } as CSSProperties}>
                    <span className={styles.heroStatIcon} aria-hidden>
                      <Icon strokeWidth={1.6} />
                    </span>
                    <span>
                      {content.statTitleAs === "h3" ? (
                        <h3 className={styles.heroStatTitle}>{stat.title}</h3>
                      ) : (
                        <strong className={styles.heroStatTitle}>{stat.title}</strong>
                      )}
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
            {content.points.map((point, i) => (
              <li key={point} className={styles.heroPoint} style={{ ["--i" as string]: i } as CSSProperties}>
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

          {content.afterPoints && <p className={styles.heroAfterPoints}>{content.afterPoints}</p>}

          {content.ratings && (
            <ul className={styles.heroRatings}>
              {content.ratings.items.map((r) => (
                <li
                  key={r.logo.src}
                  className={styles.heroRating}
                  style={
                    content.ratings?.laurel
                      ? ({ ["--laurel" as string]: `url(${publicMediaUrl(content.ratings.laurel)})` } as CSSProperties)
                      : undefined
                  }
                >
                  <span className={styles.heroRatingScore}>
                    <Star size={18} fill="currentColor" aria-hidden />
                    {r.score}
                  </span>
                  <Image
                    src={publicMediaUrl(r.logo.src)}
                    alt={r.logo.alt}
                    width={r.logo.width}
                    height={r.logo.height}
                    unoptimized
                    className={styles.heroRatingLogo}
                  />
                </li>
              ))}
            </ul>
          )}

          {content.ctas && content.ctas.length > 0 && (
            <div className={`${styles.heroCtas} ${cta.ctaPair}`}>
              {content.ctas.map((cta, i) => {
                const className = i === 0 ? `${styles.btn} ${styles.btnPrimary}` : styles.btn;
                // An in-page target stays a plain <a> so ScrollProvider's
                // Lenis handler intercepts it; anything else goes through
                // SiteLink, which resolves a live-only path (like the trial
                // page) to softsuave.com instead of 404ing.
                const button = cta.external ? (
                  <a
                    href={cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={className}
                    // The live booking button leads with a calendar icon.
                    style={
                      cta.href.includes("calendly.com")
                        ? { display: "inline-flex", alignItems: "center", gap: 10 }
                        : undefined
                    }>
                    {cta.href.includes("calendly.com") && <CalendarDays size={18} aria-hidden />}
                    {cta.label}
                  </a>
                ) : cta.href.startsWith("#") ? (
                  <a href={cta.href} className={className}>
                    {cta.label}
                  </a>
                ) : (
                  <SiteLink href={cta.href} className={className}>
                    {cta.label}
                  </SiteLink>
                );
                return (
                  <Fragment key={cta.label}>
                    {i > 0 && content.ctaSeparator && (
                      <span className={styles.heroCtaOr}>{content.ctaSeparator}</span>
                    )}
                    {button}
                  </Fragment>
                );
              })}
              {content.ctaNote && (
                <span className={styles.heroTip}>
                  <button
                    type="button"
                    className={styles.heroTipBtn}
                    aria-describedby={`${idPrefix}-cta-tip`}
                  >
                    {content.ctaNote.label}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M9.6 9.4a2.5 2.5 0 1 1 3.4 2.3c-.7.3-1 .8-1 1.5M12 16.6h.01" />
                    </svg>
                  </button>
                  <span role="tooltip" id={`${idPrefix}-cta-tip`} className={styles.heroTipBubble}>
                    <strong>{content.ctaNote.tipTitle}</strong>
                    <span>{content.ctaNote.tipBody}</span>
                  </span>
                </span>
              )}
            </div>
          )}

          {content.badgesLabel && content.badges && content.badges.length > 0 && (
            <span className={`${styles.kicker} ${styles.heroBadgesLabel}`}>{content.badgesLabel}</span>
          )}
          {content.badges && content.badges.length > 0 && (
            <ul className={styles.badges} aria-label={content.badgesLabel ?? "Credentials"}>
              {content.badges.map((b, i) =>
                isHeroBadge(b) ? (
                  <li key={b.src} className={`${styles.badge} ${content.badgesBare ? styles.badgeBare : styles.badgeLogo}`} style={{ ["--i" as string]: i } as CSSProperties}>
                    {/* The mark is the whole point here, so unlike the awards
                        strip it carries its own name — nothing else in the
                        hero says "Clutch". */}
                    <Image
                      src={publicMediaUrl(b.src)}
                      alt={b.alt}
                      width={b.width}
                      height={b.height}
                      // A bare mark is drawn up to 42px high (`.badgeBareImg`), a plaque one 24px.
                      // Bare marks are small, pre-sized files (see `badgesBare`), so they are served
                      // as they are: the optimizer handed back a ~80px thumbnail that the browser then
                      // stretched, which is what made them blurry.
                      sizes={heroBadgeSizes(b, content.badgesBare === "large" ? 96 : content.badgesBare ? 42 : 24)}
                      unoptimized={Boolean(content.badgesBare)}
                      className={
                        content.badgesBare === "large"
                          ? `${styles.badgeBareImg} ${styles.badgeBareImgLg}`
                          : content.badgesBare
                            ? styles.badgeBareImg
                            : styles.badgeLogoImg
                      }
                    />
                  </li>
                ) : (
                  <li key={b} className={styles.badge} style={{ ["--i" as string]: i } as CSSProperties}>
                    <span className={styles.badgeDot} aria-hidden />
                    {b}
                  </li>
                ),
              )}
            </ul>
          )}

          {content.scrollCue && (
            <a className={styles.heroScrollCue} href={`#${content.scrollCue.targetId}`}>
              <span className={styles.heroScrollArrow} aria-hidden />
              {content.scrollCue.label}
            </a>
          )}
        </div>

        {content.aside ? (
          <figure className={styles.heroAside}>
            <Image
              src={publicMediaUrl(content.aside.src)}
              alt={content.aside.alt}
              width={content.aside.width}
              height={content.aside.height}
              sizes="(max-width: 999px) 92vw, 46vw"
              priority
              className={styles.heroAsideImg}
              {...(content.aside.blurDataURL
                ? { placeholder: "blur" as const, blurDataURL: content.aside.blurDataURL }
                : {})}
            />
          </figure>
        ) : content.form ? (
          <EnquiryForm content={content.form} idPrefix={idPrefix} />
        ) : (
          (slot ?? null)
        )}
      </div>
    </section>
  );
}
