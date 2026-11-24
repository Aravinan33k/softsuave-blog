"use client";

import Image from "next/image";
import Link from "next/link";
import { publicMediaUrl } from "@/lib/media-url";
import { gridSpansFor } from "@/components/landing/card-spans";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import { useServiceHref } from "@/components/common/service-link";
import { SiteLink } from "@/themes/softsuave/site-link";
import { linkify } from "@/components/common/linkify";
import SectionCta from "./section-cta";
import { cloneElement, useCallback, useEffect, useRef, useState, type ReactElement, type ReactNode } from "react";
import type { CardGridContent } from "./industries";
import styles from "./gen-ai.module.css";

function Arrow({ dir }: { dir: "prev" | "next" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden>
      <path
        d={dir === "prev" ? "M19 12H5M5 12L11 6M5 12L11 18" : "M5 12H19M19 12L13 6M19 12L13 18"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Marquee drift speed, px per second (the reference section moves ~53px/s). */
const DRIFT_PX_PER_S = 50;
/** How long an arrow press takes to glide the row by one card. */
const NUDGE_MS = 650;

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/**
 * The `carousel` layout of the bold cards.
 *
 * Below 700px it is a native scroll-snap row (touch scrolling), with arrows that
 * step one card and disable at either end. From 700px with `autoplay`, it is a
 * marquee: the row drifts right to left at a constant speed and loops without a
 * seam (the cards are rendered twice; the copy is `aria-hidden` and `inert`),
 * pausing on hover/focus, off screen and in a hidden tab, and not drifting at
 * all under `prefers-reduced-motion`. The arrows then glide the row by one card
 * either way. How many cards are in view is CSS (`.indCarousel`), not script.
 */
function CardCarousel({
  label,
  autoplay = false,
  cards,
}: {
  label: string;
  autoplay?: boolean;
  cards: readonly ReactElement<{ className?: string }>[];
}) {
  const track = useRef<HTMLDivElement>(null);
  const row = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [marquee, setMarquee] = useState(false);
  // Why the drift is held: pointer over / focus inside the carousel, section off screen.
  const hold = useRef({ hover: false, focus: false, offscreen: true });
  const offset = useRef(0);
  const nudge = useRef<{ from: number; to: number; t0: number } | null>(null);

  // Marquee only from 700px, and only with `autoplay`.
  useEffect(() => {
    if (!autoplay) return;
    const mq = window.matchMedia("(min-width: 700px)");
    const sync = () => setMarquee(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [autoplay]);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setEdges({
      start: el.scrollLeft <= 2,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2,
    });
  }, []);

  // Scroll mode: keep the arrows' end states current.
  useEffect(() => {
    const el = track.current;
    if (!el || marquee) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [marquee, measure]);

  /** One card plus the gap, in px. */
  const cardStep = useCallback(() => {
    const host = marquee ? row.current : track.current;
    const card = host?.firstElementChild as HTMLElement | null;
    if (!host || !card) return 0;
    return card.offsetWidth + (parseFloat(getComputedStyle(host).columnGap) || 0);
  }, [marquee]);

  // Marquee mode: the drift loop.
  useEffect(() => {
    const el = track.current;
    const strip = row.current;
    if (!marquee || !el || !strip) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const io = new IntersectionObserver(([entry]) => {
      hold.current.offscreen = !entry.isIntersecting;
    });
    io.observe(el);

    /** The width of one full set of cards: where the copy begins. */
    const setWidth = () => {
      const copy = strip.children[cards.length] as HTMLElement | undefined;
      return copy ? copy.offsetLeft - (strip.firstElementChild as HTMLElement).offsetLeft : 0;
    };

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(now - last, 64);
      last = now;
      const w = setWidth();
      const n = nudge.current;
      if (n) {
        const t = Math.min((now - n.t0) / NUDGE_MS, 1);
        offset.current = n.from + (n.to - n.from) * easeInOut(t);
        if (t === 1) nudge.current = null;
      } else {
        const h = hold.current;
        if (!reduced && !h.hover && !h.focus && !h.offscreen && !document.hidden) {
          offset.current += (DRIFT_PX_PER_S * dt) / 1000;
        }
      }
      // Wrap within one set, so the copy takes over without a visible jump.
      if (w > 0 && !nudge.current) {
        offset.current = ((offset.current % w) + w) % w;
      }
      const shown = w > 0 ? ((offset.current % w) + w) % w : offset.current;
      strip.style.transform = `translate3d(${-shown}px, 0, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      strip.style.transform = "";
      offset.current = 0;
      nudge.current = null;
    };
  }, [marquee, cards.length]);

  const step = (dir: 1 | -1) => {
    const d = cardStep();
    if (!d) return;
    if (marquee) {
      const from = offset.current;
      nudge.current = { from, to: from + dir * d, t0: performance.now() };
    } else {
      track.current?.scrollBy({ left: dir * d, behavior: "smooth" });
    }
  };

  return (
    <div
      onPointerEnter={() => (hold.current.hover = true)}
      onPointerLeave={() => (hold.current.hover = false)}
      // Keyboard focus only: a mouse click on an arrow focuses it too, and must
      // not stop the drift until something else is clicked.
      onFocus={(e) => (hold.current.focus = e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) hold.current.focus = false;
      }}
    >
      <div
        ref={track}
        className={`${styles.indGridBold} ${styles.indCarousel}`}
        data-marquee={marquee ? "true" : undefined}
        role="region"
        aria-label={label}
        tabIndex={marquee ? undefined : 0}
      >
        {marquee ? (
          <div ref={row} className={styles.indMarqueeRow}>
            {cards}
            {cards.map((card, i) =>
              cloneElement(card, {
                key: `copy-${i}`,
                "aria-hidden": true,
                inert: true,
              } as Record<string, unknown>),
            )}
          </div>
        ) : (
          cards
        )}
      </div>
      <div className={styles.svcNav}>
        <button
          type="button"
          className={styles.svcArrow}
          aria-label="Previous cards"
          disabled={!marquee && edges.start}
          onClick={() => step(-1)}
        >
          <Arrow dir="prev" />
        </button>
        <button
          type="button"
          className={styles.svcArrow}
          aria-label="Next cards"
          disabled={!marquee && edges.end}
          onClick={() => step(1)}
        >
          <Arrow dir="next" />
        </button>
      </div>
    </div>
  );
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
  nameAs: TileName = "h3",
  icons,
  brand,
  multi,
  noIcons,
  span,
}: {
  content: CardGridContent;
  id: string;
  variant: "photo" | "compact" | "bold" | "tiles";
  links: boolean;
  cardLinks: boolean;
  /** `tiles` only: the tile name's heading level. */
  nameAs?: "h3" | "h4";
  icons: readonly ReactNode[];
  brand: readonly boolean[];
  /** Cards whose icon slot holds a row of images rather than one badge. */
  multi?: readonly boolean[];
  /** Draw no icon on the `bold` cards. */
  noIcons?: boolean;
  /** `bold` only: one desktop span for every card (3 = four across). */
  span?: 3 | 4 | 6 | 12;
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
    const spans = span ? content.items.map(() => span) : gridSpansFor(content.items.length);

    const cards = content.items.map((item, i) => {
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
                /* The carousel renders the set twice; a fixed accent per card
                   keeps the copy's colours matching the originals. */
                data-accent={content.carousel ? (i % 5) + 1 : undefined}
              >
                {/* `data-brand` drops the accent tint behind a full-colour
                    brand mark, which has its own palette and is fought by the
                    ring's accent wash. A drawn glyph is `currentColor` and
                    wants that tint, so it keeps it. */}
                {!noIcons && (
                  <span
                    className={styles.indBoldIcon}
                    data-brand={brand[i] ? "true" : undefined}
                    data-multi={multi?.[i] ? "true" : undefined}
                    aria-hidden
                  >
                    {icons[i]}
                  </span>
                )}
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
            });

    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} wide={content.wideHead} />

        <FadeUp>
          {content.carousel ? (
            <CardCarousel label={content.title} autoplay={content.autoplay} cards={cards} />
          ) : (
            <div className={styles.indGridBold}>{cards}</div>
          )}
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
        <SectionHead
          kicker={content.eyebrow}
          title={content.title}
          wide={content.wideHead}
          intro={
            content.bodyLinks ? linkify(content.body, content.bodyLinks, new Set(), styles.proseLink) : content.body
          }
        />

        <FadeUp>
          {/* With a `figure`, the grid and the picture share a row from
              1000px (`.indTilesWithFigure`); without one, the grid is as
              before. */}
          <div className={content.figure ? styles.indTilesWithFigure : undefined}>
          <div className={styles.indGridTiles} data-cols={content.figure ? (n % 2 === 1 ? 1 : 2) : cols}>
            {content.items.map((item, i) => {
              // A tile links only where its item names a destination — no
              // name-matching here, so a label grid stays labels unless the
              // content says otherwise.
              const href = links && item.href && item.link !== false ? item.href : undefined;
              return (
              <article
                key={item.name}
                className={`${styles.indBoldCard} ${styles.indTile}`}
                data-linked={href ? "true" : undefined}
              >
                <span
                  className={styles.indBoldIcon}
                  data-brand={brand[i] ? "true" : undefined}
                  aria-hidden
                >
                  {icons[i]}
                </span>
                <TileName className={styles.indBoldName}>
                  {href ? (
                    <SiteLink href={href} className={styles.indBoldStretch}>
                      {item.name}
                    </SiteLink>
                  ) : (
                    item.name
                  )}
                </TileName>
                {item.body && <p className={styles.indBoldBody}>{item.body}</p>}
              </article>
              );
            })}
          </div>
          {content.figure ? (
            <figure className={styles.indTilesFigure}>
              <Image
                src={publicMediaUrl(content.figure.src)}
                alt={content.figure.alt}
                width={content.figure.width}
                height={content.figure.height}
                sizes="(max-width: 999px) 92vw, 40vw"
              />
            </figure>
          ) : null}
          </div>
        </FadeUp>
        <SectionCta cta={content.cta} />
      </section>
    );
  }

  if (variant === "compact") {
    return (
      <section className={styles.sectionShell} id={id}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} wide={content.wideHead} />

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
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} wide={content.wideHead} />

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
