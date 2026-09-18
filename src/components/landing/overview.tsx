"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { ScrollTrigger } from "@/lib/home/gsap";
import FadeUp from "@/components/home/fade-up";
import CountUp from "@/components/home/count-up";
import SectionHead from "./section-head";
import Flow, { type FlowContent } from "@/components/common/flow";
import styles from "./landing.module.css";

export interface OverviewContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
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
   */
  pointsVariant?: "list" | "cards";
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
   * masthead scale, tighter prose leading, the illustration capped at a
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
          <p key={`${i}-${p.length}`}>{p}</p>
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

  return (
    <section
      className={compact ? `${styles.sectionShell} ${styles.overviewCompact}` : styles.sectionShell}
      id={id}
    >
      {/* With an image, the heading moves inside the left grid column so both
          columns start at the same top edge — the image can then be stretched
          (see `.overviewMedia` at 1000px in landing.module.css) to match the
          full heading+prose block's height, top to bottom, instead of just
          the prose. Without an image this is unchanged: the heading sits above
          as this surface's normal full-width masthead. */}
      {!image && <SectionHead kicker={content.eyebrow} title={content.title} />}

      <FadeUp>
        <div className={image ? styles.overviewGrid : undefined}>
          <div>
            {image && <SectionHead kicker={content.eyebrow} title={content.title} />}

            {prose}
          </div>

          {image && (
            <figure className={styles.overviewMedia}>
              <Image
                src={publicMediaUrl(image.src)}
                alt={image.alt}
                fill
                sizes={compact ? "(max-width: 999px) 92vw, 34vw" : "(max-width: 999px) 92vw, 46vw"}
                {...(image.blurDataURL
                  ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL }
                  : {})}
              />
            </figure>
          )}
        </div>

        {content.points && content.points.length > 0 && (
          content.pointsVariant === "cards" ? (
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
        )}
        {content.cta && (
          <a href={content.cta.href} className={`${styles.btn} ${styles.btnPrimary} ${styles.overviewCta}`}>
            {content.cta.label}
          </a>
        )}
        {content.stats && content.stats.length > 0 && (
          <div className={styles.overviewStats}>
            <div className={styles.trustPanel}>
              <dl className={styles.trustStats}>
                {content.stats.map((stat) => (
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
          </div>
        )}
        {content.pullQuote && <p className={styles.pullQuote}>{content.pullQuote}</p>}
        {content.flow && <Flow content={content.flow} />}
      </FadeUp>
    </section>
  );
}
