import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface EngagementModelsContent {
  readonly title: string;
  readonly body: string;
  readonly models: readonly {
    readonly name: string;
    readonly image: { readonly src: string; readonly alt: string };
    readonly facts: readonly { readonly label: string; readonly value: string }[];
  }[];
  readonly cta: { readonly label: string; readonly href: string };
}

/**
 * Hiring models as three boxes — an icon, the model's name, and its
 * Duration / Billing / Timeline lines — then one button. The same card (and the
 * same top-line hover) as the engagement cards on the other ad pages.
 */
export default function EngagementModels({
  content,
  id = "models",
}: {
  content: EngagementModelsContent;
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead title={content.title} intro={content.body} />
      <div className={styles.models}>
        {content.models.map((m, i) => (
          <FadeUp key={m.name} delay={i * 0.08}>
            <article className={`${styles.model} ${styles.modelCentered}`}>
              <Image
                src={publicMediaUrl(m.image.src)}
                alt={m.image.alt}
                width={65}
                height={65}
                unoptimized
                className={styles.modelImg}
              />
              <h3 className={styles.modelName}>{m.name}</h3>
              <dl className={styles.modelFacts}>
                {m.facts.map((f) => (
                  <div key={f.label} className={styles.modelFact}>
                    <dt>{f.label}:</dt> <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </article>
          </FadeUp>
        ))}
      </div>
      <div className={styles.cta}>
        <a className={`${styles.btn} ${styles.btnWipe}`} href={content.cta.href}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
