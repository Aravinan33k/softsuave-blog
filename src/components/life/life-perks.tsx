import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import CardIconBadge from "@/components/common/card-icon-badge";
import type { IconKey } from "@/lib/home/icon-for";
import landing from "@/components/landing/landing.module.css";
import badgeStyles from "@/components/common/card-icon-badge.module.css";
import styles from "./life.module.css";

export interface LifePerksContent {
  eyebrow: string;
  title: string;
  /** Bare labels, as live has them — each with its glyph chosen by hand. */
  items: readonly { readonly name: string; readonly icon: IconKey }[];
}

/**
 * "Perks of being a Soft Suave" — the landing card grid, with each card's
 * glyph named in the content rather than guessed.
 *
 * `CardGrid`'s `cards` variant picks a glyph from the card's words, which
 * works for a card with a body; these perks are two- and three-word labels
 * with none, and the guess put a puzzle piece on "5 Days a Week" and a plug
 * on "Fun Connect". Same card and badge, so the grid reads the same;
 * two-up rather than one on a phone, where eight single-line cards stacked
 * singly ran two screens long.
 */
export default function LifePerks({
  content,
  id = "perks",
}: {
  content: LifePerksContent;
  id?: string;
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} />

      <FadeUp>
        <ul className={styles.perkGrid}>
          {content.items.map((item) => (
            <li key={item.name} className={landing.card}>
              <CardIconBadge
                title={item.name}
                iconKey={item.icon}
                size="sm"
                className={badgeStyles.stack}
              />
              <h3 className={landing.cardName}>{item.name}</h3>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
