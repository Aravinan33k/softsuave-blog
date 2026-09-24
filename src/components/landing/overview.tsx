"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { ScrollTrigger } from "@/lib/home/gsap";
import FadeUp from "@/components/home/fade-up";
import CountUp from "@/components/home/count-up";
import SectionHead from "./section-head";
import CardIconBadge from "@/components/common/card-icon-badge";
import type { IconKey } from "@/lib/home/icon-for";
import Flow, { type FlowContent } from "@/components/common/flow";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./landing.module.css";

/**
 * Replace the first unplaced link phrase found in `text` with an anchor.
 *
 * Deliberately a plain string search rather than a regex: the phrases come
 * from page copy and can contain characters a regex would read as syntax.
 * Returns the paragraph untouched when nothing matches, so copy and links can
 * drift without breaking the render — the link simply does not appear.
 */
function linkify(
  text: string,
  links: readonly { readonly text: string; readonly href: string }[] | undefined,
  used: Set<string>,
) {
  if (!links?.length) return text;
  for (const link of links) {
    if (used.has(link.text)) continue;
    const at = text.indexOf(link.text);
    if (at === -1) continue;
    used.add(link.text);
    return (
      <>
        {text.slice(0, at)}
        <SiteLink href={link.href} className={styles.proseLink}>
          {link.text}
        </SiteLink>
        {text.slice(at + link.text.length)}
      </>
    );
  }
  return text;
}

export interface OverviewContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  /**
   * Internal links to weave into the prose, matched on their own words.
   *
   * The copy stays plain strings — `paragraphs` is extracted verbatim from the
   * live page and is not ours to re-author into JSX — so a link is declared by
   * the phrase it wraps. The first occurrence across the paragraphs is replaced
   * with an anchor and the rest of the copy is untouched; a phrase that does
   * not appear simply renders nothing, so a copy edit can never break a build,
   * only drop the link.
   *
   * Exists because the live Xamarin page links "dedicated mobile app
   * developers" to /hire-mobile-app-developers in its second paragraph, and
   * that link was missing here (review: "internal link is missing in the 2nd
   * paragraph"). Routed through `SiteLink`, so a path this app does not serve
   * still resolves to softsuave.com rather than 404ing.
   */
  links?: readonly { readonly text: string; readonly href: string }[];
  /**
   * Optional short claim list under the prose, for an overview whose copy
   * names its reasons rather than describing them. Each entry is a phrase,
   * not a sentence — anything longer belongs in a card grid with a body.
   */
  points?: readonly string[];
  /**
   * How `points` renders. `"list"` (the default) is the tick-marked list
   * every other consumer of this field already uses. `"cards"` renders
   * the same strings instead as a row of bordered cards — for copy naming a
   * short set of concrete things (audiences, industries) rather than
   * abstract claims, where a flat list under-sells the distinction between
   * them. Does not touch `styles.tickList`/`tickItem`, which the FAQ accordion's
   * own bullet points also render through — this is a separate class pair.
   *
   * `"icons"` is `"cards"` with an icon badge above each label, picked from
   * the phrase's own words by `iconFor` — the treatment the Sep 23 review
   * asked for on a "Why Choose Us" block, where six bare claims under a
   * single illustration read as a plain list rather than as reasons.
   */
  pointsVariant?: "list" | "cards" | "icons";
  /**
   * Glyph per entry of `points`, `"icons"` only, positionally matched — an
   * override for the pick `iconFor` makes from the phrase itself. Short claims
   * collide easily ("400+ expert programmers" and "quick team setup" both read
   * as people; "40-hour free trial" and "time-zone flexibility" both as time),
   * and a six-card row showing the same glyph twice reads as a mistake. Give
   * as many as the row needs; entries past the end, and an `undefined` in the
   * middle, fall back to the automatic pick.
   */
  pointIcons?: readonly (IconKey | undefined)[];
  /**
   * Optional button under the points — for an overview whose copy closes on
   * its own call to action rather than leading into the next section. `href`
   * is a plain URL: some of these point at a page this app does not serve
   * itself (a live-site-only path), so it renders as an ordinary anchor
   * rather than routing through `SiteLink`, which only knows about this
   * app's own registered routes.
   */
  cta?: { readonly label: string; readonly href: string };
  /**
   * Optional proof counters under the copy — the credibility numbers a
   * "why choose us" overview closes on. Figures are strings, not numbers:
   * they arrive already written ("400+", "13+") and are not ours to
   * reformat. Rendered in the same bordered panel the Custom AI page's
   * clients band uses, so one proof band exists across the surface.
   */
  stats?: readonly { readonly figure: string; readonly label: string }[];
  /**
   * Put `stats` in the grid's right-hand column instead of running them full
   * width underneath, and drop `image` — the counters become the block's
   * companion to the prose rather than a footer under it.
   *
   * Opt-in, so the pages that already pair prose with an illustration are
   * untouched. The Flutter page asked for it on review ("keep the bottom
   * section (stats boxes) on the right side instead of the image"), where the
   * illustration was a flat line-art icon stretched across a 4:3 frame and the
   * four counters were the stronger thing to show beside the copy.
   *
   * With no `stats` it does nothing, so it can never blank the column.
   */
  statsAside?: boolean;
  /** Optional — only pages whose copy ends on a pull quote supply one. */
  pullQuote?: string;
  /**
   * Optional pipeline diagram under the prose (and the pull quote, if both
   * are set) — for an overview whose copy describes a sequence of stages.
   * Rendered by `landing/flow.tsx`.
   */
  flow?: FlowContent;
  /**
   * Optional section illustration, shown beside the prose from 1000px up and
   * below it on narrower viewports.
   *
   * Rendered with `fill` into an `aspect-ratio` frame, so the box tracks its
   * column width at every viewport size and the ratio reserves the height —
   * no layout shift, and no fixed pixel size to go stale. `width`/`height` are
   * kept on the content object as the asset's intrinsic size, for reference and
   * for any consumer that wants them.
   *
   * `src` is stored root-relative and gets the mount subpath applied at render
   * time via `publicMediaUrl` — the app is served under `basePath: '/blog'`, and
   * next/image resolves local sources against the app's own served paths, so an
   * unprefixed src is rejected by the optimizer with a 400.
   */
  image?: {
    src: string;
    width: number;
    height: number;
    alt: string;
    blurDataURL?: string;
    /**
     * How the asset fills its frame. `"cover"` (the default) crops to fill,
     * which is right for a photograph — the frame stretches to the prose height
     * at desktop, and a photo can lose its edges without losing its subject.
     *
     * `"contain"` fits the whole asset inside the frame instead, centred and
     * inset. For a drawn diagram or illustration, cropping removes content:
     * the Ionic page's own one was losing the figure on its right and the top
     * and bottom of its phone mockup (review: "need to resize the image").
     */
    fit?: "cover" | "contain";
  };
}

/**
 * Overview: an editorial prose block defining the service category.
 *
 * With an `image`, the prose and the illustration sit side by side from 1000px
 * up — both inside the section's normal gutters, so the copy stays flush with
 * every other band on the page. The pull quote then spans the full width
 * underneath, as a bordered accent-ruled panel rather than the homepage's bare
 * oversized blockquote.
 */
export default function Overview({
  content,
  id = "overview",
  variant = "display",
  clampLines,
}: Readonly<{
  content: OverviewContent;
  id?: string;
  /**
   * `compact` is the generative-AI page's overview, verbatim: a smaller
   * masthead scale, tighter prose leading, the illustration in a
   * bordered 4:3 frame that bottom-aligns with the prose beside it, and a
   * more compact pull quote. Pair it with the hero's `compact` variant.
   */
  variant?: "display" | "compact";
  /**
   * Clip the prose to this many lines (with an ellipsis) behind a
   * "View more" toggle. Omit to show the whole prose. The count is total
   * lines across all paragraphs, so it is a viewport-independent measure of
   * how much of the copy shows before the fold.
   */
  clampLines?: number;
}>) {
  const { image } = content;
  const compact = variant === "compact";

  const clamp = clampLines !== undefined && clampLines > 0;
  const [expanded, setExpanded] = useState(false);
  const clamped = clamp && !expanded;
  const proseId = `${id}-prose`;

  /**
   * Which link phrases have already been placed. Shared across the paragraph
   * map so a phrase that recurs — "dedicated mobile app developers" appears
   * more than once in some copy — is linked on its first appearance only.
   * Linking every occurrence would put the same href on the page three times,
   * which reads as keyword stuffing rather than a reference.
   */
  const used = new Set<string>();

  const toggle = () => {
    setExpanded((v) => !v);
    // The section's height changes underneath every ScrollTrigger below it,
    // so their start/end positions are recomputed once the DOM has updated.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  const prose = (
    <>
      <div
        id={proseId}
        className={clamped ? `${styles.prose} ${styles.proseClamped}` : styles.prose}
        style={clamped ? ({ WebkitLineClamp: clampLines } as CSSProperties) : undefined}
      >
        {content.paragraphs.map((p, i) => (
          <p key={`${i}-${p.length}`}>{linkify(p, content.links, used)}</p>
        ))}
      </div>

      {clamp && (
        <button
          type="button"
          className={styles.proseMore}
          aria-expanded={expanded}
          aria-controls={proseId}
          onClick={toggle}
        >
          {expanded ? "View less" : "View more"}
          <svg
            className={styles.proseMoreIcon}
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M5 7.5l5 5 5-5" />
          </svg>
        </button>
      )}
    </>
  );

  /*
   * `statsAside` moves the counters into the right-hand column and drops the
   * illustration, so the two are mutually exclusive — `hasStats` guards it,
   * which is what stops the flag emptying the column on a page with no stats.
   */
  const hasStats = Boolean(content.stats && content.stats.length > 0);
  const asideStats = Boolean(content.statsAside) && hasStats;
  const showImage = Boolean(image) && !asideStats;
  /** Whether the heading/prose share a row with something to their right. */
  const twoColumn = showImage || asideStats;

  /** The claim list, rendered either inside the left column or below the grid. */
  const pointsList =
    content.points && content.points.length > 0 ? (
      content.pointsVariant === "icons" ? (
        <ul className={`${styles.pointCards} ${styles.pointIconCards}`}>
          {content.points.map((point, i) => (
            <li key={point} className={`${styles.pointCard} ${styles.pointIconCard}`}>
              <CardIconBadge title={point} size="sm" iconKey={content.pointIcons?.[i]} />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      ) : content.pointsVariant === "cards" ? (
        <ul className={styles.pointCards}>
          {content.points.map((point) => (
            <li key={point} className={styles.pointCard}>
              {point}
            </li>
          ))}
        </ul>
      ) : (
        <ul className={styles.tickList}>
          {content.points.map((point) => (
            <li key={point} className={styles.tickItem}>
              {point}
            </li>
          ))}
        </ul>
      )
    ) : null;

  const statsPanel = hasStats ? (
    <div className={styles.trustPanel}>
      <dl className={styles.trustStats}>
        {content.stats!.map((stat) => (
          <div key={stat.label} className={styles.trustStat}>
            <dt className={styles.srOnly}>{stat.label}</dt>
            <dd className={styles.trustStatValue}>
              <CountUp value={stat.figure} className={styles.trustFigure} />
              <span className={styles.trustLabel} aria-hidden>
                {stat.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  ) : null;

  return (
    <section
      className={compact ? `${styles.sectionShell} ${styles.overviewCompact}` : styles.sectionShell}
      id={id}
    >
      {/* In a two-column layout the heading moves inside the left column so
          both columns start at the same top edge — the image (or the stats
          panel) can then be stretched (see `.overviewMedia` at 1000px in
          landing.module.css) to match the full heading+prose block's height,
          top to bottom, instead of just the prose. In one column this is
          unchanged: the heading sits above as this surface's normal
          full-width masthead. */}
      {!twoColumn && <SectionHead kicker={content.eyebrow} title={content.title} />}

      <FadeUp>
        <div className={twoColumn ? styles.overviewGrid : undefined}>
          <div>
            {twoColumn && <SectionHead kicker={content.eyebrow} title={content.title} />}

            {prose}

            {asideStats && pointsList}
          </div>

          {showImage && image && (
            <figure
              className={
                image.fit === "contain"
                  ? `${styles.overviewMedia} ${styles.overviewMediaContain}`
                  : styles.overviewMedia
              }
            >
              <Image
                src={publicMediaUrl(image.src)}
                alt={image.alt}
                fill
                sizes={compact ? "(max-width: 999px) 92vw, 44vw" : "(max-width: 999px) 92vw, 46vw"}
                {...(image.blurDataURL
                  ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL }
                  : {})}
              />
            </figure>
          )}

          {asideStats && <div className={styles.overviewStatsAside}>{statsPanel}</div>}
        </div>

        {/* With the counters beside the copy the points move up into the left
            column (see above), so the row is the whole block and the panel
            centres against all of it rather than leaving the column empty
            under itself. Everywhere else they stay here, below the grid. */}
        {!asideStats && pointsList}
        {content.cta && (
          <a href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary} ${styles.overviewCta}`}>
            {content.cta.label}
          </a>
        )}
        {/* Full-width footer position — skipped when the counters have already
            been rendered in the column beside the prose. */}
        {hasStats && !asideStats && <div className={styles.overviewStats}>{statsPanel}</div>}
        {content.pullQuote && <p className={styles.pullQuote}>{content.pullQuote}</p>}
        {content.flow && <Flow content={content.flow} />}
      </FadeUp>
    </section>
  );
}
