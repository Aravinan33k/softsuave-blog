import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import landing from "@/components/landing/landing.module.css";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./ad.module.css";

export interface TopTalentContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly stats: readonly { readonly figure: string; readonly label: string }[];
  readonly cta: { readonly label: string; readonly href: string };
  /** Set the figures after the button rather than before the models (the live /ad/remote-developers order). */
  readonly statsLast?: boolean;
  readonly models: readonly {
    readonly name: string;
    readonly points?: readonly string[];
    readonly body?: string;
  }[];
  /**
   * A photo beside the models: the band becomes two columns, the image on the
   * left with an optional badge on it, the models as a ruled checklist on the
   * right with the button under them (/ad/remote-developers, by request).
   * Omitted keeps the models as a card grid with the button centred under it.
   * `src` is root-relative and resolved through `publicMediaUrl`.
   */
  readonly image?: {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
    readonly blurDataURL?: string;
    /** A figure pinned to the photo's corner ("14+" / "Years of delivery"). */
    readonly badge?: { readonly figure: string; readonly label: string };
  };
}

/**
 * "Top Talent" — the live page's masthead, four headline figures, the trial
 * button, then the engagement models. The live page gives the models no heading
 * of their own, so none is invented here: they follow the button directly.
 */
export default function TopTalent({
  content,
  id = "overview",
  whiteHover = false,
  primary = false,
  headingFont = false,
}: {
  content: TopTalentContent;
  id?: string;
  /** Set the engagement-model names in the section headings' face and weight, not the light display serif (see `.modelNameHeading`). */
  headingFont?: boolean;
  /** The white left-to-right hover fill on the button, for a Top Talent band on the dark ground (see `.btnWhite`). */
  whiteHover?: boolean;
  /**
   * The landing pages' large primary button (`landing.btn` + `btnPrimary` +
   * `btnLg`), as `CtaRow`'s `primary` sets under Our Services, so the two trial
   * buttons on /ad/remote-developers match (by request).
   */
  primary?: boolean;
}) {
  // Models that are a single line each (no points, no copy) are set as compact
  // ticked cards rather than the full-size headed ones.
  const plain = content.models.every((m) => !m.points && !m.body);

  const statsBlock = (
      <FadeUp>
        <dl className={styles.stats}>
          {content.stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statFigure}>{s.figure}</dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </FadeUp>
  );

  const button = (
    <a
      className={
        primary
          ? `${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`
          : whiteHover
            ? `${styles.btn} ${styles.btnWhite}`
            : styles.btn
      }
      href={content.cta.href}
    >
      {content.cta.label}
    </a>
  );

  const image = content.image;

  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      {!content.statsLast && statsBlock}

      <div className={plain ? `${styles.models} ${styles.modelsPlain}` : styles.models}>
        {content.models.map((m, i) => (
          <FadeUp key={m.name} delay={i * 0.08}>
            <article className={plain ? `${styles.model} ${styles.modelPlain}` : styles.model}>
              <h3 className={headingFont ? `${styles.modelName} ${styles.modelNameHeading}` : styles.modelName}>{m.name}</h3>
              {m.points && (
                <ul className={styles.modelPoints}>
                  {m.points.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              )}
              {m.body && <p className={styles.modelBody}>{m.body}</p>}
            </article>
          </FadeUp>

          <div className={styles.talentBody}>
            <ul className={styles.talentList}>
              {content.models.map((m, i) => (
                <FadeUp key={m.name} delay={i * 0.06}>
                  <li className={styles.talentItem}>{m.name}</li>
                </FadeUp>
              ))}
            </ul>
            <div className={styles.talentCta}>{button}</div>
          </div>
        </div>
      ) : (
        <>
          <div className={plain ? `${styles.models} ${styles.modelsPlain}` : styles.models}>
            {content.models.map((m, i) => (
              <FadeUp key={m.name} delay={i * 0.08}>
                <article className={plain ? `${styles.model} ${styles.modelPlain}` : styles.model}>
                  <h3 className={styles.modelName}>{m.name}</h3>
                  {m.points && (
                    <ul className={styles.modelPoints}>
                      {m.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  )}
                  {m.body && <p className={styles.modelBody}>{m.body}</p>}
                </article>
              </FadeUp>
            ))}
          </div>

          <div className={styles.cta}>{button}</div>
        </>
      )}

      {content.statsLast && statsBlock}
    </section>
  );
}
