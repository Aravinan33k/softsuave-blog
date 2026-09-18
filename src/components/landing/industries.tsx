"use client";

import Image from "next/image";
import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import { gridSpansFor } from "./card-spans";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

/**
 * Badge glyphs for the `feature` variant, chosen per card by the content
 * module. Named for what they depict, not for what a given page means by them,
 * so one set serves every section — `shield` is control on the GCC page and
 * governance on the offshore one.
 */
const ICONS = {
  coins: (
    <>
      <ellipse cx="12" cy="6.5" rx="7" ry="3" />
      <path d="M5 6.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
      <path d="M5 11.5v5c0 1.7 3.1 3 7 3s7-1.3 7-3v-5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 19a5.5 5.5 0 0111 0" />
      <path d="M16 5.2a3.2 3.2 0 010 5.6" />
      <path d="M17.5 13.6A5.5 5.5 0 0120.5 19" />
    </>
  ),
  gauge: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 12l4-3.2" />
      <path d="M12 3.8v1.6M20.2 12h-1.6M12 20.2v-1.6M3.8 12h1.6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M3.8 12h16.4" />
      <path d="M12 3.8c2.2 2.3 3.4 5.2 3.4 8.2S14.2 17.9 12 20.2c-2.2-2.3-3.4-5.2-3.4-8.2S9.8 6.1 12 3.8z" />
    </>
  ),
  book: (
    <>
      <path d="M4.5 5.2A2 2 0 016.5 3.4H19v14.2H6.5a2 2 0 00-2 2z" />
      <path d="M4.5 19.6a2 2 0 012-2H19v3H6.5a2 2 0 01-2-1z" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.4l6.6 2.8v5.4c0 4-2.7 6.9-6.6 8.4-3.9-1.5-6.6-4.4-6.6-8.4V6.2z" />
      <path d="M9 12.1l2 2 4-4.4" />
    </>
  ),
} as const;

export type CardIcon = keyof typeof ICONS;

/** Shared by every card-grid section on the landing pages. */
export interface CardGridContent {
  eyebrow: string;
  title: string;
  body: string;
  /**
   * Optional bullets between the intro and the grid, for a section whose copy
   * carries a short claim list of its own before the cards start.
   */
  points?: readonly string[];
  items: readonly {
    readonly name: string;
    /**
     * Optional: a link-only card carries no prose. The hire pages' "Explore
     * More Technologies" band is a grid of sibling-page links whose live cards
     * are a logo and a label with no description, and a sentence written to
     * fill this field would be copy those pages do not have.
     */
    readonly body?: string;
    /**
     * Optional short category label, shown above the name in the `bold`
     * variant only. A grouping word for the card's own subject — not a claim.
     */
    readonly tag?: string;
    /** Badge glyph, `feature` variant only. Falls back to the ordinal alone. */
    readonly icon?: CardIcon;
    /**
     * Destination for the card's "Learn more" link, `feature` variant only.
     * Omitted renders no link at all rather than a dead one — most cards are
     * statements, not gateways, and a link that goes nowhere is worse than none.
     */
    readonly href?: string;
    /**
     * Pexels slot id for the card thumbnail, `feature` variant only. Set this
     * ONLY once `content/images.manifest.json` holds the slot and
     * `npm run images:home` has generated it — `getImage` throws on a missing
     * slot by design, so a speculative id takes the whole page down.
     */
    readonly imageId?: string;
    /**
     * Hand-placed card thumbnail, `feature` variant only — the alternative to
     * `imageId` for a page whose art is committed beside it rather than
     * generated into the Pexels manifest. That is the case for any page ported
     * from the live site, whose own illustrations live under
     * `public/images/landing/<page>/`; the Next.js page established the same
     * convention for its hero and service cards.
     *
     * `src` is root-relative and resolved through `publicMediaUrl`, exactly as
     * `overview.tsx`'s `image` is, because the app can be served under a
     * `basePath` and next/image rejects an unprefixed local source.
     *
     * `imageId` wins if both are set — the manifest slot carries a generated
     * blurDataURL that a hand-placed file has no equivalent for.
     */
    readonly image?: {
      readonly src: string;
      readonly width: number;
      readonly height: number;
      readonly alt: string;
    };
  }[];
}

/**
 * A bordered card grid — the sectors a page builds for, and any other list of
 * short named blocks (engagement models, benefits, roles, governance).
 *
 * Four layouts over the same content:
 *
 * - `cards` — an even grid (2-up on tablet, 3/4/5-up on desktop via
 *   `columns`) with an accent rule along the card's top edge and an inline
 *   mono index. The original look, used by the custom-AI page among others.
 * - `watermark` — `cards`, with the small mono index swapped for a large
 *   translucent serif numeral behind the card's text. Use it when a page
 *   carries two of these grids, so the second does not read as a repeat of
 *   the first.
 * - `bold` — the editorial treatment shared with the services grid: an
 *   asymmetric 12-column composition (see `gridSpansFor`), an accent rule
 *   across the top, an oversized serif ordinal watermarked into the corner,
 *   and a per-card accent from the five-step warm brand ramp. See the BOLD
 *   CARD LAYOUT block in landing.module.css. Ignores `columns`.
 * - `feature` — light cards lifted off the dark band: a tinted icon badge, a
 *   ghosted ordinal, a short accent rule under the name, and optional
 *   thumbnail and "Learn more" link. Both of those are per-item and optional,
 *   so the layout is correct before any art or link targets exist. Ignores
 *   `columns`.
 *
 * Deliberately NOT the homepage's image fan carousel: that needs one generated
 * Pexels frame per card and the manifest only holds five industry slots
 * (`lib/home/images.generated.json`), so most cards would have no art.
 */
export default function Industries({
  content,
  id = "industries",

  columns = 4,
  variant = "cards",
}: {
  content: CardGridContent;
  id?: string;
  /**
   * Desktop column count, chosen to fill the rows the list actually has.
   * Four is the default (eight cards read as two rows of four); three suits
   * a multiple of three; five puts an awkward five-item list in one row
   * instead of four plus a lone card. Ignored by `bold` and `feature`, which
   * set their own composition.
   */
  columns?: 3 | 4 | 5;
  /**
   * `watermark` swaps the small mono index for a large translucent serif
   * numeral behind the card's text. Use it when a page carries two of these
   * grids, so the second does not read as a repeat of the first.
   *
   * `bold` and `feature` are documented on the component itself, above.
   */
  variant?: "cards" | "watermark" | "bold" | "feature";

}) {
  const grid = [
    styles.cardGrid,
    columns === 3 ? styles.cardGrid3 : "",
    columns === 5 ? styles.cardGrid5 : "",
    variant === "watermark" ? styles.cardGridMark : "",
  ]
    .filter(Boolean)
    .join(" ");
  const bold = variant === "bold";
  const feature = variant === "feature";
  /* Derived from the item count alone, so a section that gains or loses a card
     re-composes itself with no layout prop to keep in sync. */
  const spans = bold ? gridSpansFor(content.items.length) : [];

  if (feature) {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.featGrid}>
            {content.items.map((item) => (
              <article key={item.name} className={styles.featCard}>
                <div className={styles.featBody}>
                  <div className={styles.featTop}>
                    <span className={styles.featBadge} aria-hidden>
                      {item.icon ? (
                        <svg {...iconProps} className={styles.featBadgeIcon}>
                          {ICONS[item.icon]}
                        </svg>
                      ) : null}
                    </span>
                  </div>

                  <h3 className={styles.featName}>{item.name}</h3>
                  <span className={styles.featRule} aria-hidden />
                  {item.body ? <p className={styles.featText}>{item.body}</p> : null}

                  {item.href ? (
                    <Link href={item.href} className={styles.featLink}>
                      Learn more
                      <svg {...iconProps} className={styles.featLinkIcon}>
                        <path d="M4 12h15M13 6l6 6-6 6" />
                      </svg>
                    </Link>
                  ) : null}
                </div>

                {/* Pexels slot first, then hand-placed art — see `imageId` and
                    `image` on the item type for why a card may carry either. */}
                {item.imageId ? (
                  <div className={styles.featMedia}>
                    <BrandImage
                      page="four"
                      id={item.imageId}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 30vw"
                      className={styles.featImg}
                    />
                  </div>
                ) : item.image ? (
                  <div className={styles.featMedia}>
                    <Image
                      src={publicMediaUrl(item.image.src)}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 700px) 100vw, (max-width: 1100px) 45vw, 30vw"
                      className={styles.featImg}
                    />
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </FadeUp>
      </section>
    );
  }

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      {content.points && content.points.length > 0 && (
        <ul className={styles.gridPoints}>
          {content.points.map((point) => (
            <li key={point} className={styles.gridPoint}>
              {point}
            </li>
          ))}
        </ul>
      )}

      <FadeUp>

        <div className={bold ? styles.boldGrid : grid}>

          {content.items.map((item, i) => (
            <article
              key={item.name}
              className={bold ? `${styles.boldCard} ${styles.cardBold}` : styles.card}
              /* A data attribute rather than an inline style: the span values
                 are a small fixed set, so CSS can hold them and the markup
                 stays free of style attributes. */
              data-span={bold ? spans[i] : undefined}
            >
              {bold ? (
                item.tag && <span className={styles.boldTag}>{item.tag}</span>
              ) : (
                <span className={styles.cardIndex} aria-hidden>
                  {pad(i + 1)}
                </span>
              )}
              <h3 className={styles.cardName}>{item.name}</h3>
              {item.body ? <p className={styles.cardBody}>{item.body}</p> : null}
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
