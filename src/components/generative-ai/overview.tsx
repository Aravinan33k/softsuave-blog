"use client";

import Image from "next/image";
import { overview as generativeAiOverview } from "@/lib/home/generative-ai";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface OverviewContent {
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
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

              <div className={styles.prose}>
                {content.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </div>

            <figure className={styles.overviewMedia}>
              <Image
                src={publicMediaUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(max-width: 999px) 92vw, 34vw"
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
            <div className={styles.prose}>
              {content.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            {content.pullQuote && <p className={styles.pullQuote}>{content.pullQuote}</p>}
          </FadeUp>
        </>
      )}
    </section>
  );
}
