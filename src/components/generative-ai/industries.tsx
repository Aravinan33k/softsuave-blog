"use client";

import Image from "next/image";
import Link from "next/link";
import { industries as generativeAiIndustries } from "@/lib/home/generative-ai";
import { publicMediaUrl } from "@/lib/media-url";
import { gridSpansFor } from "@/components/landing/card-spans";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import { useServiceHref } from "@/components/common/service-link";
import CardIcon, { isBrandIcon } from "./card-icon";
import styles from "./gen-ai.module.css";

// `CardIcon` holds the glyph vocabulary; see that file for why it is not here.
// The "01"-style ordinals these cards used to carry are gone (review: icons
// instead of numbers) — every variant already leads with a `CardIcon`, and a
// card with no icon key now gets one picked from its own words.

/** Shared by every card-grid section on the AI landing pages. */
export interface CardGridContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly key?: string;
    readonly name: string;
    readonly body: string;
    /** Decorative backdrop shown at rest with the icon and name. */
    readonly image?: string;
    /**
     * Where the card's "Know More" goes. Defaults to `#enquiry`, the hero form
     * — right for a card that describes something we would scope with you.
     * Cards that name a page we actually publish give that page's path instead,
     * which is what turns the hire-by-role specialisation grids into real
     * navigation between the nine role pages rather than nine dead ends.
     */
    readonly href?: string;
  }[];
}


/**
 * The card's "Know More".
 *
 * An in-page `#anchor` has to stay a plain `<a>` so the Lenis handler in
 * `ScrollProvider` intercepts it; a real route goes through `next/link` for
 * client-side navigation. The accessible name carries the card's own title,
 * because a grid of nine identically-labelled "Know More" links tells a screen
 * reader nothing about where any of them lead.
 */
function CardLink({
  href,
  label,
  className = styles.indCardLink,
}: {
  href: string;
  label: string;
  /** The card variant's own link class. Defaults to the picture card's. */
  className?: string;
}) {
  const inner = (
    <>
      Know More
      <span className={styles.srOnly}> about {label}</span>
      <svg viewBox="0 0 24 24" width="15" height="15" aria-hidden>
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );

  return href.startsWith("/") ? (
    <Link className={className} href={href}>
      {inner}
    </Link>
  ) : (
    <a className={className} href={href}>
      {inner}
    </a>
  );
}

/**
 * A reveal-on-hover image grid — the sectors this page builds for.
 *
 * Matches the production softsuave.com Industries section: each card shows
 * only its photographic backdrop, an icon, and the industry name at rest.
 * Hovering or focusing cross-fades in `.indCardOverlay`, an inverted
 * (dark-on-photo) rectangle sized to the card's own bounds carrying the name
 * again, the description, and a "Know More" link — not a strip that grows
 * from the bottom edge, which could out-grow a short 4-up card and overflow
 * it. `:focus-within` drives the same reveal as `:hover` so the link is
 * reachable without a pointer, and both the rest face and the overlay stay
 * mounted throughout so the transition is a plain opacity/transform tween.
 */
export default function Industries({
  content = generativeAiIndustries,
  id = "industries",
  variant = "photo",
  links = true,
}: {
  content?: CardGridContent;
  id?: string;
  /**
   * `photo` (default) is the reveal-on-hover picture card above. `compact` is
   * the text card: content-height, bordered, everything legible at rest. Use it
   * when the items have no artwork — in the picture card an imageless item
   * leaves two-thirds of a square empty and hides its description behind a
   * hover the reader has no cue to try.
   *
   * `bold` is the same text card composed the way the Global Capability Center
   * page's "Who It Fits" band composes its own: an asymmetric 12-column grid
   * off `gridSpansFor()` and a per-card accent rule along the top edge. It is
   * what every hire page uses, so the two families read as one design system.
   * See the CARD GRID — BOLD VARIANT block in gen-ai.module.css.
   */
  variant?: "photo" | "compact" | "bold";
  /**
   * `false` drops every card's "Know More", `href`s included. The AI service
   * pages' industry grids run without it: the sectors are context for the
   * service, not destinations of their own.
   */
  links?: boolean;
} = {}) {
  /* Links: a card's own `href` wins; a grid of services or sectors also links
     cards whose name matches one of our pages (`lib/home/service-href.ts`).
     Never to the page the card is on. */
  const resolveHref = useServiceHref();
  const autoLink = /service|industr|sector|offering|solution/i.test(id);
  const hrefOf = (item: CardGridContent["items"][number]) =>
    links && (item.href || autoLink) ? resolveHref(item.name, item.href) : undefined;
  const textOf = (item: CardGridContent["items"][number]) => `${item.name}. ${item.body}`;

  if (variant === "bold") {
    /* Derived from the item count alone, so a section that gains or loses a
       card re-composes itself with no layout prop to keep in sync. */
    const spans = gridSpansFor(content.items.length);

    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridBold}>
            {content.items.map((item, i) => {
              const href = hrefOf(item);
              return (
              <article
                key={item.name}
                className={styles.indBoldCard}
                /* A data attribute rather than an inline style: the span values
                   are a small fixed set, so CSS can hold them and the markup
                   stays free of style attributes. */
                data-span={spans[i]}
              >
                {/* `data-brand` drops the accent tint behind a full-colour
                    brand mark, which has its own palette and is fought by the
                    ring's accent wash. A drawn glyph is `currentColor` and
                    wants that tint, so it keeps it. */}
                <span
                  className={styles.indBoldIcon}
                  data-brand={isBrandIcon(item.key) ? "true" : undefined}
                  aria-hidden
                >
                  <CardIcon iconKey={item.key} text={textOf(item)} />
                </span>
                <h3 className={styles.indBoldName}>{item.name}</h3>
                <p className={styles.indBoldBody}>{item.body}</p>
                {/* Only where the card names a page of ours — same rule as the
                    compact card. This is what keeps the hire-by-role
                    specialisation grids working as navigation between the nine
                    role pages. */}
                {href && (
                  <CardLink
                    href={href}
                    label={item.name}
                    className={`${styles.textCardLink} ${styles.indBoldLink}`}
                  />
                )}
              </article>
              );
            })}
          </div>
        </FadeUp>
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridCompact}>
            {content.items.map((item) => {
              const href = hrefOf(item);
              return (
              <article key={item.name} className={styles.compactCard}>
                <span className={styles.compactIcon} aria-hidden>
                  <CardIcon iconKey={item.key} text={textOf(item)} />
                </span>
                <h3 className={styles.compactName}>{item.name}</h3>
                <p className={styles.compactBody}>{item.body}</p>
                {/* Only where the card names a page of ours. On a text card
                    that already says everything, a link back to the enquiry
                    form is noise — the section's own CTAs cover that. */}
                {href && (
                  <CardLink href={href} label={item.name} className={styles.textCardLink} />
                )}
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

      <FadeUp>
        <div className={styles.indGrid}>
          {content.items.map((item) => {
            const href = hrefOf(item);
            return (
            <article key={item.name} className={styles.indCard}>
              {item.image && (
                <Image
                  src={publicMediaUrl(item.image)}
                  alt=""
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 999px) 46vw, 23vw"
                  className={styles.indCardImg}
                />
              )}
              <div className={styles.indCardScrim} aria-hidden />

              <div className={styles.indCardFace}>
                <span className={styles.indCardIcon} aria-hidden>
                  <CardIcon iconKey={item.key} text={textOf(item)} />
                </span>
                <h3 className={styles.indCardName}>{item.name}</h3>
              </div>

              {/* The hover/focus reveal: a full inverted rectangle over the photo
                  (not a strip growing from the bottom), so it's bounded by the
                  card's own box at every grid size instead of risking overflow
                  when the description runs long on a short 4-up card. */}
              <div className={styles.indCardOverlay}>
                <span className={styles.indCardIcon} aria-hidden>
                  <CardIcon iconKey={item.key} text={textOf(item)} />
                </span>
                <span className={styles.indCardName} aria-hidden>
                  {item.name}
                </span>
                <p className={styles.indCardBody}>{item.body}</p>
                {href && <CardLink href={href} label={item.name} />}
              </div>
            </article>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
