"use client";

import Image from "next/image";
import Link from "next/link";
import { publicMediaUrl } from "@/lib/media-url";
import { gridSpansFor } from "@/components/landing/card-spans";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import { useServiceHref } from "@/components/common/service-link";
import { SiteLink } from "@/themes/softsuave/site-link";
import SectionCta from "./section-cta";
import type { ReactNode } from "react";
import type { CardGridContent } from "./industries";
import styles from "./gen-ai.module.css";

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
  decorative = false,
}: {
  href: string;
  label: string;
  /** The card variant's own link class. Defaults to the picture card's. */
  className?: string;
  /**
   * Paint the "Know More" without making it a link — for a card that is
   * itself the link (`cardLinks`), where a second link inside it would be a
   * duplicate tab stop to the same page.
   */
  decorative?: boolean;
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

  if (decorative) {
    return (
      <span className={className} aria-hidden>
        {inner}
      </span>
    );
  }

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
 * The interactive half of `./industries` — see there. `icons` and `brand` are
 * per item, in `content.items` order: each card's badge glyph, drawn on the
 * server, and whether it is a full-colour brand mark.
 */
export default function IndustriesClient({
  content,
  id,
  variant,
  links,
  cardLinks,
  icons,
  brand,
}: {
  content: CardGridContent;
  id: string;
  variant: "photo" | "compact" | "bold" | "tiles";
  links: boolean;
  cardLinks: boolean;
  icons: readonly ReactNode[];
  brand: readonly boolean[];
}) {
  /* Links: a card's own `href` wins; a grid of services or sectors also links
     cards whose name matches one of our pages (`lib/home/service-href.ts`).
     Never to the page the card is on. */
  const resolveHref = useServiceHref();
  const autoLink = /service|industr|sector|offering|solution/i.test(id);
  const hrefOf = (item: CardGridContent["items"][number]) =>
    links && item.link !== false && (item.href || autoLink) ? resolveHref(item.name, item.href) : undefined;

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
                data-linked={href && cardLinks ? "true" : undefined}
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
                  data-brand={brand[i] ? "true" : undefined}
                  aria-hidden
                >
                  {icons[i]}
                </span>
                <h3 className={styles.indBoldName}>
                  {href && cardLinks ? (
                    <SiteLink href={href} className={styles.indBoldStretch}>
                      {item.name}
                    </SiteLink>
                  ) : (
                    item.name
                  )}
                </h3>
                <p className={styles.indBoldBody}>{item.body}</p>
                {/* Only where the card names a page of ours — same rule as the
                    compact card. This is what keeps the hire-by-role
                    specialisation grids working as navigation between the nine
                    role pages. */}
                {href && !cardLinks && (
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
        <SectionCta cta={content.cta} />
      </section>
    );
  }

  if (variant === "tiles") {
    const n = content.items.length;
    const cols = n % 3 === 0 && n % 4 !== 0 ? 3 : 4;

    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridTiles} data-cols={cols}>
            {content.items.map((item, i) => (
              <article key={item.name} className={`${styles.indBoldCard} ${styles.indTile}`}>
                <span
                  className={styles.indBoldIcon}
                  data-brand={brand[i] ? "true" : undefined}
                  aria-hidden
                >
                  {icons[i]}
                </span>
                <h3 className={styles.indBoldName}>{item.name}</h3>
                {item.body && <p className={styles.indBoldBody}>{item.body}</p>}
              </article>
            ))}
          </div>
        </FadeUp>
        <SectionCta cta={content.cta} />
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

        <FadeUp>
          <div className={styles.indGridCompact}>
            {content.items.map((item, i) => {
              const href = hrefOf(item);
              return (
              <article key={item.name} className={styles.compactCard}>
                <span className={styles.compactIcon} aria-hidden>
                  {icons[i]}
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
          {content.items.map((item, i) => {
            const href = hrefOf(item);
            return (
            <article
              key={item.name}
              className={styles.indCard}
              data-linked={href && cardLinks ? "true" : undefined}
            >
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
                  {icons[i]}
                </span>
                <h3 className={styles.indCardName}>{item.name}</h3>
              </div>

              {/* The hover/focus reveal: a full inverted rectangle over the photo
                  (not a strip growing from the bottom), so it's bounded by the
                  card's own box at every grid size instead of risking overflow
                  when the description runs long on a short 4-up card. */}
              <div className={styles.indCardOverlay}>
                <span className={styles.indCardIcon} aria-hidden>
                  {icons[i]}
                </span>
                <span className={styles.indCardName} aria-hidden>
                  {item.name}
                </span>
                <p className={styles.indCardBody}>{item.body}</p>
                {href && <CardLink href={href} label={item.name} decorative={cardLinks} />}
              </div>

              {href && cardLinks && (
                <SiteLink href={href} className={styles.indCardHit}>
                  <span className={styles.srOnly}>{item.name}</span>
                </SiteLink>
              )}
            </article>
            );
          })}
        </div>
      </FadeUp>
    </section>
  );
}
