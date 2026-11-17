import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import gen from "@/components/generative-ai/gen-ai.module.css";
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
  /**
   * The closing words of `title` to set on their own line in the accent
   * ("Remote Talents"). Must be the end of `title`; the H1's text is
   * unchanged, only styled.
   */
  titleAccent?: string;
  body: string;
  /** The in-page button down to the profiles (a plain `#id` anchor, so Lenis takes the jump). */
  cta: { readonly label: string; readonly href: string };
  /** The illustration on the right. Decorative: `alt` is usually empty. */
  art?: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  stats: readonly TalentStat[];
}

/** Split the H1 so its closing words can take the accent line. */
function splitTitle(title: string, accent?: string): [string, string | null] {
  if (!accent || !title.endsWith(accent)) return [title, null];
  return [title.slice(0, title.length - accent.length).trimEnd(), accent];
}

/**
 * The developer profile page's opening: a left-aligned H1 (its closing words
 * on an accent line), a paragraph and an in-page button to the profiles,
 * with an illustration on the right; then the five stats, each an icon, a
 * small label and a figure (an H2) with its unit (an H4), in the order the
 * source sets them.
 *
 * Dark, on the page's tokens, with a soft glow behind the illustration.
 * Clears the fixed nav with `--hero-top`. Copy and art sit side by side from
 * 1000px and stack below it (art under the button). The stats run five /
 * three / two across as the width allows.
 *
 * The button is the site's primary button (`gen.btn` + `gen.btnPrimary`),
 * the same plate and contrast-wipe hover as the closing band's "Schedule a
 * Call".
 *
 * A server component: nothing here is interactive beyond a link.
 */
export default function TalentHero({ content }: { content: TalentHeroContent }) {
  const [lead, accent] = splitTitle(content.title, content.titleAccent);

  return (
    <section className={styles.hero} id="top">
      <div className={styles.glow} aria-hidden />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <h1 className={styles.title}>
            {lead}
            {accent ? (
              <>
                {" "}
                <span className={styles.titleAccent}>{accent}</span>
              </>
            ) : null}
          </h1>
          <p className={styles.body}>{content.body}</p>
          <a href={content.cta.href} className={`${gen.btn} ${gen.btnPrimary} ${styles.cta}`}>
            {content.cta.label}
          </a>
        </div>

        {content.art ? (
          <div className={styles.art}>
            <Image
              src={publicMediaUrl(content.art.src)}
              alt={content.art.alt}
              width={content.art.width}
              height={content.art.height}
              sizes="(min-width: 1000px) 46vw, 92vw"
              priority
              className={styles.artImg}
            />
          </div>
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
