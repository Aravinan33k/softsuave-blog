"use client";

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

export default function ExploreMarquee({
  content,
  id = "explore",
}: {
  content: CardGridContent;
  id?: string;
}) {
  const items = content.items;
  if (items.length === 0) return null;

  // Ceil, so with an odd roster the solid row is the longer one — it is the
  // row the eye lands on first.
  const split = Math.ceil(items.length / 2);
  const top = items.slice(0, split);
  const bottom = items.slice(split);

  const chip = (
    { item, repeat }: { item: CardGridContent["items"][number]; repeat: boolean },
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
    <section className={styles.exploreBand} id={id}>
      <div className={styles.exploreHead}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      </div>

      <FadeUp className={styles.exploreRows}>
        <Marquee speed={26}>
          {fillRow(top).map((c, i) => chip(c, styles.exploreChip, i))}
        </Marquee>
        {bottom.length > 0 && (
          <Marquee speed={22} reverse>
            {fillRow(bottom).map((c, i) => chip(c, styles.exploreChipGhost, i))}
          </Marquee>
        )}
      </FadeUp>
    </section>
  );
}
