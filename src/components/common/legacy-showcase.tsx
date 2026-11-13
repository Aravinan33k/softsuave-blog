import Image from "next/image";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import { linkify, type InlineLink } from "@/components/common/linkify";
import { publicMediaUrl } from "@/lib/media-url";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./legacy-showcase.module.css";

/** Line icons for the service rows, in the theme's 24×24 / currentColor style. */
const ICONS = {
  /** Modernisation — the same thing, renewed. */
  refresh: (
    <>
      <path d="M21 12a9 9 0 0 1-15.5 6.2M3 12A9 9 0 0 1 18.5 5.8" />
      <path d="M18.5 2v4h-4M5.5 22v-4h4" />
    </>
  ),
  /** Migration — moved across. */
  swap: <path d="M4 8h13l-3-3M20 16H7l3 3" />,
  /** Maintenance & support — around the clock. */
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  /** Strategy consulting — direction. */
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </>
  ),
} as const;

export type LegacyShowcaseIcon = keyof typeof ICONS;

/** The order an item without its own `icon` takes them in. */
const ICON_ORDER: readonly LegacyShowcaseIcon[] = ["refresh", "swap", "clock", "compass"];

export interface LegacyShowcaseContent {
  /** Kicker above the heading. Empty or omitted renders none. */
  eyebrow?: string;
  title: string;
  body: string;
  /** Phrases in `body` to link — see `common/linkify`. */
  bodyLinks?: readonly InlineLink[];
  items: readonly { readonly name: string; readonly body: string; readonly icon?: LegacyShowcaseIcon }[];
  /** The section's illustration, shown whole in the framed stage. */
  figure?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
}

/**
 * A service list beside a framed illustration — "Enrich Legacy Upgrade" on the
 * software location pages, and any short list of services with one picture.
 *
 * The masthead is the shared `SectionHead` (heading left, intro right of a
 * hairline from 900px, as every section on these pages). Below it, two
 * columns from 1000px: the illustration, and the services as rows — icon
 * tile, H3 name and description — that slide right and light an accent edge
 * on hover or keyboard focus. Stacked below 1000px.
 *
 * The illustration fills its container's full width at its own aspect ratio
 * (never cropped), still and unframed, in a container with the overview
 * image's corners (14px) on a faint dot grid.
 *
 * Colours are the band tokens, so it reads on a dark band (where it sits on
 * these pages) or a `.light` one. The row motion is CSS only and stops under
 * `prefers-reduced-motion`.
 */
export default function LegacyShowcase({
  content,
  id = "legacy",
}: {
  content: LegacyShowcaseContent;
  id?: string;
}) {
  return (
    <section className={`${gen.sectionShell} ${styles.section}`} id={id}>
      <SectionHead
        kicker={content.eyebrow || undefined}
        title={content.title}
        intro={content.bodyLinks ? linkify(content.body, content.bodyLinks, new Set(), gen.proseLink) : content.body}
      />

      <FadeUp>
        <div className={styles.body}>
          {content.figure ? (
            <div className={styles.stage}>
              <Image
                src={publicMediaUrl(content.figure.src)}
                alt={content.figure.alt}
                width={content.figure.width}
                height={content.figure.height}
                sizes="(max-width: 999px) 92vw, 42vw"
                className={styles.stageImg}
              />
            </div>
          ) : null}

          <ol className={styles.list}>
            {content.items.map((item, i) => {
              const icon = item.icon ?? ICON_ORDER[i % ICON_ORDER.length];
              return (
                <li key={item.name} className={styles.item}>
                  <span className={styles.icon} aria-hidden>
                    <svg viewBox="0 0 24 24">{ICONS[icon]}</svg>
                  </span>
                  <div>
                    <h3 className={styles.name}>{item.name}</h3>
                    <p className={styles.text}>{item.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </FadeUp>
    </section>
  );
}
