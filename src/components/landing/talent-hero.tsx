import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./talent-hero.module.css";

export interface TalentStat {
  /** The stat's icon, with the source page's alt text. */
  readonly icon: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  /** Small label above the figure ("Network"). */
  readonly label: string;
  /** The figure — an H2 ("400+"). */
  readonly value: string;
  /** The word with it — an H4 ("Talents"). */
  readonly unit: string;
  /** Put the unit before the figure ("Upto" / "60%"), as the source does. */
  readonly unitFirst?: boolean;
}

export interface TalentHeroContent {
  /** The H1. */
  title: string;
  body: string;
  /** The in-page button down to the profiles (a plain `#id` anchor, so Lenis takes the jump). */
  cta: { readonly label: string; readonly href: string };
  /** The bouncing arrow under the button, with its alt text. */
  arrow?: { readonly src: string; readonly alt: string };
  stats: readonly TalentStat[];
}

/**
 * A centred, form-free hero with a stat strip — the developer profile page's
 * opening: the H1, a paragraph, an in-page button to the profiles and a
 * gently bouncing arrow, then the five stats, each an icon, a small label and
 * a figure (an H2) with its unit (an H4), in the order the source sets them.
 *
 * Dark, on the page's tokens, with the landing heroes' soft glow. Clears the
 * fixed nav with `--hero-top`. The stats wrap five / three / two / one across
 * as the width allows. The arrow's bounce stops under reduced motion.
 *
 * A server component: nothing here is interactive beyond a link.
 */
export default function TalentHero({ content }: { content: TalentHeroContent }) {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.body}>{content.body}</p>
        <a href={content.cta.href} className={styles.cta}>
          {content.cta.label}
        </a>
        {content.arrow ? (
          <span className={styles.arrow}>
            <Image src={publicMediaUrl(content.arrow.src)} alt={content.arrow.alt} width={30} height={30} />
          </span>
        ) : null}
      </div>

      <ul className={styles.stats}>
        {content.stats.map((stat) => (
          <li key={stat.label} className={styles.stat}>
            <span className={styles.statIcon}>
              <Image
                src={publicMediaUrl(stat.icon.src)}
                alt={stat.icon.alt}
                width={stat.icon.width}
                height={stat.icon.height}
                sizes="28px"
              />
            </span>
            <span className={styles.statLabel}>{stat.label}</span>
            <div className={styles.statFigure}>
              {stat.unitFirst ? <h4 className={styles.statUnit}>{stat.unit}</h4> : null}
              <h2 className={styles.statValue}>{stat.value}</h2>
              {stat.unitFirst ? null : <h4 className={styles.statUnit}>{stat.unit}</h4>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
