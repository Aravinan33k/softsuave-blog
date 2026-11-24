"use client";

import Image from "next/image";
import { overview as generativeAiOverview } from "@/lib/home/generative-ai";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import { linkify, type InlineLink } from "@/components/common/linkify";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface OverviewContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
  /** Phrases in `paragraphs` to link, as the live page links them. */
  links?: readonly InlineLink[];
  /** Optional — only pages whose copy ends on a pull quote supply one. */
  pullQuote?: string;
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
     * `column` stretches the frame to the full height of the prose beside it
     * (from 1000px up), instead of a capped 4:3 box anchored to the column's
     * foot — for a section whose copy runs much longer than the box is tall
     * (review: "resize the image to fit the section height").
     */
    fit?: "column";
    /**
     * From 1000px, centre the frame against the masthead + prose beside it
     * instead of the default bottom alignment — for copy that runs well past
     * the frame's height cap, where the bottom edge left a tall empty band
     * above the picture (iOS review, 13 Oct: "center align the image").
     */
    /**
     * `"middle"`: the copy is centred too — for a picture taller than the
     * copy beside it, where the copy's default bottom alignment left an empty
     * band above the kicker (generative AI page review).
     */
    /**
     * `"top"`: picture and copy both start at the row's top edge, from 1000px
     * (Hire Software Developers review: "update the overview section to top
     * alignment").
     */
    /**
     * `"both"`: picture and copy centred on each other at every width from
     * 1000px — `"middle"` without its top alignment from 1600px, so the shorter
     * of the two always sits on the other's centre line (Hire Software
     * Developers review: "fix the center alignment").
     */
    align?: "center" | "middle" | "top" | "both";
    /**
     * Load the picture eagerly — for a page where the overview sits right
     * under a short hero, so its image is in the first viewport and is the
     * page's Largest Contentful Paint (next/image otherwise lazy-loads it and
     * warns). Default lazy.
     */
    eager?: boolean;
  };
}

/**
 * Overview: an editorial prose block defining the service category.
 *
 * With an `image`, the masthead and prose share ONE left column with the
 * illustration in a right column beside them, both starting from the same top
 * edge — not the masthead sitting full-width above a prose/image row. That
 * second arrangement left the image stranded a title's-height below where the
 * grid actually starts (dead space beside the title), because the row it
 * shares with the image begins only at the first paragraph, not at the kicker.
 * The pull quote still spans the full width underneath, outside this grid, as
 * a bordered accent-ruled panel rather than the homepage's bare oversized
 * blockquote.
 */
function Paragraphs({ content }: { content: OverviewContent }) {
  const used = new Set<string>();
  return (
    <div className={styles.prose}>
      {content.paragraphs.map((p) => (
        <p key={p.slice(0, 24)}>{linkify(p, content.links, used, styles.proseLink)}</p>
      ))}
    </div>
  );
}

export default function Overview({
  content = generativeAiOverview,
  id = "overview",
}: {
  content?: OverviewContent;
  id?: string;
} = {}) {
  const { image } = content;

  return (
    <section className={styles.sectionShell} id={id}>
      {image ? (
        <FadeUp>
          <div className={styles.overviewGrid}>
            <div>
              <SectionHead kicker={content.eyebrow} title={content.title} />

              <Paragraphs content={content} />
            </div>

            <figure
              className={[
                styles.overviewMedia,
                image.fit === "column" ? styles.overviewMediaColumn : "",
                image.align === "center" ? styles.overviewMediaCenter : "",
                image.align === "middle" ? styles.overviewMediaMiddle : "",
                image.align === "top" ? styles.overviewMediaTop : "",
                image.align === "both" ? styles.overviewMediaBoth : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={publicMediaUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(max-width: 999px) 92vw, 44vw"
                {...(image.eager ? { loading: "eager" as const } : {})}
                {...(image.blurDataURL
                  ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL }
                  : {})}
              />
            </figure>
          </div>

          {content.pullQuote && <p className={styles.pullQuote}>{content.pullQuote}</p>}
        </FadeUp>
      ) : (
        <>
          <SectionHead kicker={content.eyebrow} title={content.title} />

          <FadeUp>
            <Paragraphs content={content} />

            {content.pullQuote && <p className={styles.pullQuote}>{content.pullQuote}</p>}
          </FadeUp>
        </>
      )}
    </section>
  );
}
