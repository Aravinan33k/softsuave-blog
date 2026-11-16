"use client";

import { useState } from "react";
import Marquee from "@/components/home/marquee";
import { SiteLink } from "@/themes/softsuave/site-link";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import type { CardGridContent } from "./industries";
import styles from "./landing.module.css";

/**
 * "Explore More Technologies" as the homepage's integrations band.
 *
 * Same content as before — `hire-explore`'s roster of sibling-page links, in
 * the same order, with the same heading — rendered as the dual display-type
 * marquee the homepage runs for Enterprise AI Integrations rather than as a
 * four-column grid of near-empty cards. Those cards carried a label and
 * nothing else (the live pages give these links no body copy), so a bordered
 * box around each one was a container with no contents to justify it.
 *
 * What is borrowed is the structure, not the ground: `Marquee` is the shared
 * primitive from `components/home`, and the solid/outlined chip pairing is the
 * homepage's, but this band stays on the hire pages' warm-white `.light`
 * surface. The chips take their colour from that band's tokens, so the
 * outlined row reads as a light rule on white instead of the homepage's
 * near-white stroke on black.
 *
 * The roster is SPLIT across the two rows rather than repeated in both. The
 * homepage shows one list twice because its words are decorative; here every
 * chip is a link to a real page, and a second copy would mean twenty links to
 * ten destinations. Splitting keeps one link per technology and still fills
 * both rows, because a row of display serif is wide enough to loop from seven
 * or eight words.
 */
/**
 * Chips a row needs before `Marquee` will loop it. The marquee only scrolls a
 * row whose single copy is wider than the strip, and the mobile roster splits
 * into rows of five and four, which fit a desktop strip — so those rows sat
 * still while the web rows scrolled (review: "the tech stack section is not
 * scrolling"). A short row is therefore repeated up to this many chips; ten
 * display-serif words overflow even a wide desktop strip.
 */
const MIN_ROW_CHIPS = 10;

/** A set this small is shown whole in both rows rather than split between them. */
const SHORT_SET = 4;

/**
 * `row` repeated until it holds at least `MIN_ROW_CHIPS`, with every repeat
 * flagged so it can be hidden from assistive tech and the tab order — the first
 * pass stays the one real link per technology.
 */
function fillRow<T>(row: readonly T[]): { item: T; repeat: boolean }[] {
  if (row.length === 0) return [];
  const out = row.map((item) => ({ item, repeat: false }));
  while (out.length < MIN_ROW_CHIPS) out.push(...row.map((item) => ({ item, repeat: true })));
  return out;
}

type ExploreItems = CardGridContent["items"];

/** One labelled tab of links — the live CMS page's "Web" and "Quality Assurance". */
export interface ExploreTab {
  readonly label: string;
  readonly items: ExploreItems;
}

/** The two rows for one set of links: the solid chips above, the outlined ones below, running in opposite directions. */
function Rows({ items }: { items: ExploreItems }) {
  // Ceil, so with an odd roster the solid row is the longer one — it is the
  // row the eye lands on first.
  const split = Math.ceil(items.length / 2);
  // A short set (the live "Quality Assurance" tab has three) would leave the lower row with a single mark repeated,
  // so both rows run every link — the lower one starting a place along, its copies hidden from assistive tech
  // so each link is still announced once.
  const short = items.length <= SHORT_SET;
  const top = short ? items : items.slice(0, split);
  const bottom = short ? [...items.slice(1), ...items.slice(0, 1)] : items.slice(split);

  const chip = (
    { item, repeat }: { item: ExploreItems[number]; repeat: boolean },
    className: string,
    i: number,
  ) =>
    item.href ? (
      <SiteLink
        key={`${item.name}-${i}`}
        href={item.href}
        className={className}
        aria-hidden={repeat || undefined}
        tabIndex={repeat ? -1 : undefined}
      >
        {item.name}
      </SiteLink>
    ) : (
      <span key={`${item.name}-${i}`} className={className} aria-hidden={repeat || undefined}>
        {item.name}
      </span>
    );

  return (
    <>
      <Marquee speed={26}>{fillRow(top).map((c, i) => chip(c, styles.exploreChip, i))}</Marquee>
      {bottom.length > 0 && (
        <Marquee speed={22} reverse>
          {fillRow(bottom).map((c, i) => chip(short ? { ...c, repeat: true } : c, styles.exploreChipGhost, i))}
        </Marquee>
      )}
    </>
  );
}

export default function ExploreMarquee({
  content,
  id = "explore",
  tabs,
}: {
  content: CardGridContent;
  id?: string;
  /**
   * Group the links under labelled tabs, as the live CMS page does ("Web" and "Quality Assurance"). Omitted, the
   * band is the single strip every other page runs. Every tab's links stay in the markup — the inactive ones
   * `hidden` — so a crawler still reads them all.
   */
  tabs?: readonly ExploreTab[];
}) {
  const [active, setActive] = useState(0);
  const items = content.items;
  if (items.length === 0 && !(tabs && tabs.length > 0)) return null;

  return (
    <section className={styles.exploreBand} id={id}>
      <div className={styles.exploreHead}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      </div>

      {tabs && tabs.length > 0 ? (
        <>
          <div className={styles.exploreTabs} role="tablist" aria-label={content.title}>
            {tabs.map((t, i) => (
              <button
                key={t.label}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-selected={i === active}
                aria-controls={`${id}-panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={`${styles.exploreTab}${i === active ? ` ${styles.exploreTabActive}` : ""}`}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") setActive((active + 1) % tabs.length);
                  else if (e.key === "ArrowLeft") setActive((active - 1 + tabs.length) % tabs.length);
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
          {tabs.map((t, i) => (
            // A plain div, not `FadeUp`: a scroll-triggered fade started inside a hidden panel may never fire when it is shown.
            <div
              key={t.label}
              className={styles.exploreRows}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              hidden={i !== active}
            >
              <Rows items={t.items} />
            </div>
          ))}
        </>
      ) : (
        <FadeUp className={styles.exploreRows}>
          <Rows items={items} />
        </FadeUp>
      )}
    </section>
  );
}
