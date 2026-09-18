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
    item: CardGridContent["items"][number],
    className: string,
  ) =>
    item.href ? (
      <SiteLink key={item.name} href={item.href} className={className}>
        {item.name}
      </SiteLink>
    ) : (
      <span key={item.name} className={className}>
        {item.name}
      </span>
    );

  return (
    <section className={styles.exploreBand} id={id}>
      <div className={styles.exploreHead}>
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      </div>

      <FadeUp className={styles.exploreRows}>
        <Marquee speed={26}>{top.map((item) => chip(item, styles.exploreChip))}</Marquee>
        {bottom.length > 0 && (
          <Marquee speed={22} reverse>
            {bottom.map((item) => chip(item, styles.exploreChipGhost))}
          </Marquee>
        )}
      </FadeUp>
    </section>
  );
}
