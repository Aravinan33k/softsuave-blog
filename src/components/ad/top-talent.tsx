import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface TopTalentContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly stats: readonly { readonly figure: string; readonly label: string }[];
  readonly cta: { readonly label: string; readonly href: string };
  readonly models: readonly {
    readonly name: string;
    readonly points?: readonly string[];
    readonly body?: string;
  }[];
}

/**
 * "Top Talent" — the live page's masthead, four headline figures, the trial
 * button, then the engagement models. The live page gives the models no heading
 * of their own, so none is invented here: they follow the button directly.
 */
export default function TopTalent({
  content,
  id = "overview",
}: {
  content: TopTalentContent;
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

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

      <div className={styles.models}>
        {content.models.map((m, i) => (
          <FadeUp key={m.name} delay={i * 0.08}>
            <article className={styles.model}>
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

      <div className={styles.cta}>
        <a className={styles.btn} href={content.cta.href}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
