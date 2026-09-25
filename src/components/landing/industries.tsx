"use client";

import Image from "next/image";
import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import { SiteLink } from "@/themes/softsuave/site-link";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import CardIconBadge from "@/components/common/card-icon-badge";
import { useServiceHref } from "@/components/common/service-link";
import { linkify, type InlineLink } from "@/components/common/linkify";
import badgeStyles from "@/components/common/card-icon-badge.module.css";
import { gridSpansFor } from "./card-spans";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

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

  /* ----------------------------------------------------------------
     The six above were the whole set while this variant only served
     benefit grids, where a glyph is decoration and a warm generic shape
     will do. It now also carries the services sections on the AI pages,
     where the glyph has to say what the service IS — a card headed
     "Optical Character Recognition" wants a document, not a globe.
     Everything below is drawn for that: one shape per recurring service
     concept in `lib/home/*-content.ts`, in the same 24x24 / 1.6-stroke
     geometry as the originals so the set still reads as one hand.
     Nothing here is an icon-font or a package — these are paths, so they
     cost no request and inherit `currentColor` from the badge.
     ---------------------------------------------------------------- */

  /** Consulting, strategy, discovery, readiness assessment. */
  compass: (
    <>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M15.2 8.8l-1.8 4.6-4.6 1.8 1.8-4.6z" />
    </>
  ),
  /** Proof of concept, experimentation, statistical testing. */
  flask: (
    <>
      <path d="M9.6 3.4h4.8" />
      <path d="M10.6 3.4v5.4L6 17.1a1.9 1.9 0 001.7 2.9h8.6a1.9 1.9 0 001.7-2.9l-4.6-8.3V3.4" />
      <path d="M8.3 14.6h7.4" />
    </>
  ),
  /** Application development, custom builds. */
  code: (
    <>
      <path d="M8.6 8.4L4.8 12l3.8 3.6" />
      <path d="M15.4 8.4L19.2 12l-3.8 3.6" />
      <path d="M13.4 5.4l-2.8 13.2" />
    </>
  ),
  /** Summarisation — long source reduced to a short read. */
  list: (
    <>
      <path d="M4.6 6.2h14.8" />
      <path d="M4.6 10.4h14.8" />
      <path d="M4.6 14.6h9.6" />
      <path d="M4.6 18.8h6.2" />
    </>
  ),
  /** Model development, training, selection — the model itself. */
  cpu: (
    <>
      <rect x="7.4" y="7.4" width="9.2" height="9.2" rx="1.6" />
      <path d="M10.4 3.6v3.8M13.6 3.6v3.8M10.4 16.6v3.8M13.6 16.6v3.8" />
      <path d="M3.6 10.4h3.8M3.6 13.6h3.8M16.6 10.4h3.8M16.6 13.6h3.8" />
    </>
  ),
  /** Detection — finding a thing in a visual feed. */
  eye: (
    <>
      <path d="M2.8 12S6.3 5.9 12 5.9 21.2 12 21.2 12 17.7 18.1 12 18.1 2.8 12 2.8 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  /** Inspection — checking an item against criteria. */
  scan: (
    <>
      <path d="M3.8 8.4V5.6a1.8 1.8 0 011.8-1.8h2.8" />
      <path d="M15.6 3.8h2.8a1.8 1.8 0 011.8 1.8v2.8" />
      <path d="M20.2 15.6v2.8a1.8 1.8 0 01-1.8 1.8h-2.8" />
      <path d="M8.4 20.2H5.6a1.8 1.8 0 01-1.8-1.8v-2.8" />
      <path d="M7.4 12h9.2" />
    </>
  ),
  /** Video analytics — a continuous feed rather than a still. */
  video: (
    <>
      <rect x="3.6" y="5.6" width="11.2" height="12.8" rx="2" />
      <path d="M14.8 10.6l5.6-3.2v9.2l-5.6-3.2z" />
    </>
  ),
  /** Anomaly detection — the spike that does not belong. */
  pulse: <path d="M2.8 12.6h4.1l2.2-6.2 3.4 11.4 2.4-7.6 1.6 2.4h4.7" />,
  /** Recommendation — ranking the one that fits. */
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.3" />
      <circle cx="12" cy="12" r="1.1" />
    </>
  ),
  /** Multi-agent orchestration — work split across coordinated nodes. */
  network: (
    <>
      <circle cx="12" cy="4.9" r="2.2" />
      <circle cx="5.4" cy="18" r="2.2" />
      <circle cx="18.6" cy="18" r="2.2" />
      <path d="M10.7 6.5L6.6 15.9M13.3 6.5l4.1 9.4M7.6 18h8.8" />
    </>
  ),
  /** Lifecycle, ongoing optimisation, MLOps — work that repeats. */
  cycle: (
    <>
      <path d="M19.8 11.2A8 8 0 006.3 6.6L3.5 9.2" />
      <path d="M3.4 5.1v4.3h4.3" />
      <path d="M4.2 12.8a8 8 0 0013.5 4.6l2.8-2.6" />
      <path d="M20.6 18.9v-4.3h-4.3" />
    </>
  ),
  /** Modernisation — an existing product carried up a level. */
  upgrade: (
    <>
      <path d="M12 20.4V7" />
      <path d="M6.8 12.2L12 7l5.2 5.2" />
      <path d="M5 3.8h14" />
    </>
  ),
  /** Deployment, launch, going to production. */
  rocket: (
    <>
      <path d="M12 3.2c2.7 2 4.3 5.2 4.3 8.6 0 1.4-.3 2.7-.8 4H8.5a11 11 0 01-.8-4c0-3.4 1.6-6.6 4.3-8.6z" />
      <circle cx="12" cy="9.8" r="1.7" />
      <path d="M8.5 15.8L6.2 18.3l2.9-.4M15.5 15.8l2.3 2.5-2.9-.4" />
      <path d="M10.7 19.2l1.3 1.8 1.3-1.8" />
    </>
  ),
  /** Data pipeline — information routed from source to destination. */
  flow: (
    <>
      <circle cx="4.6" cy="6" r="1.8" />
      <path d="M6.4 6h4a3 3 0 013 3v3a3 3 0 003 3h2.6" />
      <path d="M16.6 12l3 3-3 3" />
    </>
  ),
  /** A store: a database, or an agent's retained memory. */
  database: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.8" />
      <path d="M5 6v12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8V6" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </>
  ),
  /** Cloud data engineering. */
  cloud: <path d="M7 18.4h9.6a4 4 0 00.6-7.9 5.6 5.6 0 00-10.8-1.3A3.9 3.9 0 007 18.4z" />,

  /* Added with the first pass of this work, before the per-service map
     below existed. They still carry their own concepts. */
  spark: (
    <>
      <path d="M11 3.4l1.7 4.5 4.5 1.7-4.5 1.7-1.7 4.5-1.7-4.5L4.8 9.6l4.5-1.7z" />
      <path d="M17.8 15.2l.8 2.1 2.1.8-2.1.8-.8 2.1-.8-2.1-2.1-.8 2.1-.8z" />
    </>
  ),
  layers: (
    <>
      <path d="M12 3.6l8 4.2-8 4.2-8-4.2z" />
      <path d="M4 12l8 4.2 8-4.2" />
      <path d="M4 16.2l8 4.2 8-4.2" />
    </>
  ),
  search: (
    <>
      <circle cx="10.8" cy="10.8" r="6.2" />
      <path d="M15.4 15.4l4.8 4.8" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7.5 20v-6.4M12 20V7.6M16.5 20v-9.6" />
    </>
  ),
  plug: (
    <>
      <path d="M10.2 13.8a3.4 3.4 0 010-4.8l2.6-2.6a3.4 3.4 0 014.8 4.8l-1.1 1.1" />
      <path d="M13.8 10.2a3.4 3.4 0 010 4.8l-2.6 2.6a3.4 3.4 0 01-4.8-4.8l1.1-1.1" />
    </>
  ),
  doc: (
    <>
      <path d="M6.6 3.6h6.8l4 4v12.8H6.6z" />
      <path d="M13.4 3.6v4h4" />
      <path d="M9.2 12.4h5.6M9.2 15.8h3.8" />
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
   * Optional button under the grid, for a section whose cards make a case the
   * reader should be able to act on — the Angular page's "Why Choose Soft
   * Suave" closes on six reasons and then offered no way forward (review:
   * "CTA button missing"). Rendered by `landing/why-us`; the card grids that
   * are pure statements simply omit it.
   */
  cta?: { readonly label: string; readonly href: string };
  /**
   * Optional bullets between the intro and the grid, for a section whose copy
   * carries a short claim list of its own before the cards start.
   */
  points?: readonly string[];
  /**
   * Internal links to weave into each card's `body`, matched on their own
   * words — see `OverviewContent.links`, the same mechanism. A card's body
   * stays a plain string extracted verbatim from the live page, so a link is
   * declared by the phrase it wraps rather than by rewriting the copy into
   * JSX. Threaded across every card in the grid, so a repeated phrase links
   * once. `cards`/`watermark`/`bold` only — `feature` and `list` cards use
   * `href` for a whole-card link instead, and linking a phrase inside their
   * shorter body would double up with that.
   */
  links?: readonly InlineLink[];
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
      /**
       * Intrinsic size, optional. The thumbnail renders through next/image's
       * `fill` inside a slot that already reserves its own aspect ratio, so
       * neither dimension reaches the DOM. They stay on the type because most
       * callers have them to hand — but the services lists ported over from the
       * carousel only ever carried `src` and `alt`, and must not have to
       * invent a size to use this grid.
       */
      readonly width?: number;
      readonly height?: number;
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
 * - `list` — a stacked row per item: the thumbnail (or icon badge, if no
 *   image) on one side, the name and body on the other, alternating sides
 *   down the list on desktop. For a card set the source page shows as a
 *   plain description list rather than a card grid — `feature`'s cropped
 *   corner thumbnail was a poor match for six roughly-square illustrations
 *   meant to be seen whole. Ignores `columns`.
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
  autoLink: autoLinkProp,
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
   * `bold`, `feature` and `list` are documented on the component itself, above.
   */
  variant?: "cards" | "watermark" | "bold" | "feature" | "list";
  /**
   * Force card auto-linking on or off, overriding the guess made from `id`.
   *
   * The default reads the section id for "service"/"industry"/"solution" and
   * so on, which covers most grids but misses one whose anchor is named for
   * its subject rather than its kind — the web-app page's `#core-tech` lists
   * eight technologies we publish a page for each, and `#engagement` four
   * delivery models likewise, and neither word is in that pattern (review:
   * "services are missing links", "some cards are missing links").
   *
   * A card still only links where `lib/home/service-href.ts` finds a confident
   * match, and never to the page it is on, so turning this on cannot invent a
   * destination.
   */
  autoLink?: boolean;
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
  const list = variant === "list";
  /* Derived from the item count alone, so a section that gains or loses a card
     re-composes itself with no layout prop to keep in sync. */
  const spans = bold ? gridSpansFor(content.items.length) : [];
  /* One set for the whole grid: a phrase in `content.links` is linked in
     whichever card's body it appears in first. */
  const usedLinks = new Set<string>();

  /* Links. A card's own `href` wins; failing that, a grid that lists services
     or sectors links each card to the page its name matches in the route
     registry (see `lib/home/service-href.ts`) — the review found almost none
     of these cards led anywhere. Other grids (benefits, "why us", engagement
     models) are statements, not gateways, so they are never auto-linked.
     Either way a card never links to the page it is on. */
  const resolveHref = useServiceHref();
  const autoLink = autoLinkProp ?? /service|industr|sector|offering|solution/i.test(id);
  const hrefOf = (item: CardGridContent["items"][number]) =>
    (item.href || autoLink) ? resolveHref(item.name, item.href) : undefined;

  if (list) {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.techListWrap}>
            {content.items.map((item, i) => {
              const glyph = item.icon ? ICONS[item.icon] : null;
              return (
                <article key={item.name} className={styles.techRow} data-side={i % 2 === 0 ? "left" : "right"}>
                  <div className={styles.techMedia}>
                    {item.imageId ? (
                      <BrandImage
                        page="four"
                        id={item.imageId}
                        fill
                        sizes="(max-width: 999px) 100vw, 40vw"
                        className={styles.techImg}
                      />
                    ) : item.image ? (
                      <Image
                        src={publicMediaUrl(item.image.src)}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 999px) 100vw, 40vw"
                        className={styles.techImg}
                      />
                    ) : glyph ? (
                      <span className={styles.featBadge} aria-hidden>
                        <svg {...iconProps} className={styles.featBadgeIcon}>
                          {glyph}
                        </svg>
                      </span>
                    ) : null}
                  </div>
                  <div className={styles.techCopy}>
                    <h3 className={styles.techName}>{item.name}</h3>
                    {item.body ? <p className={styles.techText}>{item.body}</p> : null}
                  </div>
                </article>
              );
            })}
          </div>
        </FadeUp>
      </section>
    );
  }

  if (feature) {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.featGrid}>
            {content.items.map((item) => {
              /* Resolved before the badge is drawn, not inside it. The disc used
                 to render whether or not a glyph came back, so an item with no
                 `icon` — `javaTechniques`, among others — got a hollow circle
                 above its title, and an `icon` naming a glyph this build does
                 not have (a stale module after a hot reload, say) produced the
                 same thing. No glyph now means no badge, and the card simply
                 opens on its title. */
              const glyph = item.icon ? ICONS[item.icon] : null;
              const href = hrefOf(item);

              return (
              <article key={item.name} className={styles.featCard}>
                <div className={styles.featBody}>
                  {glyph ? (
                    <div className={styles.featTop}>
                      <span className={styles.featBadge} aria-hidden>
                        <svg {...iconProps} className={styles.featBadgeIcon}>
                          {glyph}
                        </svg>
                      </span>
                    </div>
                  ) : null}

                  <h3 className={styles.featName}>{item.name}</h3>
                  <span className={styles.featRule} aria-hidden />
                  {item.body ? <p className={styles.featText}>{item.body}</p> : null}

                  {href ? (
                    <Link href={href} className={styles.featLink}>
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
              );
            })}
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

          {content.items.map((item, i) => {
            const href = hrefOf(item);
            return (
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
                /* An icon picked from the card's own words, where the "01"
                   ordinal used to be (review: icons instead of numbers). */
                <CardIconBadge
                  title={item.name}
                  body={item.body}
                  size="sm"
                  className={badgeStyles.stack}
                />
              )}
              {/* `href` is honoured here, not only in the `feature` variant.
                  The "Explore More <Web|Mobile> Technologies" band on the 20
                  hire-by-skill pages is this variant, and every one of its
                  items carries a link to a sibling hire route — 270 of them
                  across the set, all of which rendered as dead boxes while
                  this path ignored the field.

                  A stretched link (`.cardLink::after`, inset over the card)
                  rather than an anchor wrapping the whole article: the card
                  stays one click target, but the link's accessible name is the
                  technology alone instead of the name and the body read as one
                  run-on label.

                  `SiteLink`, not a bare `next/link` — these paths are release
                  gated. Until `NEXT_PUBLIC_HOMEPAGE_ENABLED` is set they are
                  not routes in this app, and `navHref` sends them to the live
                  marketing site rather than to a local 404. */}
              <h3 className={styles.cardName}>
                {href ? (
                  <SiteLink href={href} className={styles.cardLink}>
                    {item.name}
                  </SiteLink>
                ) : (
                  item.name
                )}
              </h3>
              {item.body ? (
                <p className={styles.cardBody}>
                  {linkify(item.body, content.links, usedLinks, styles.proseLink)}
                </p>
              ) : null}
            </article>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
