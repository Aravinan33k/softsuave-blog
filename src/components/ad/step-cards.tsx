import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface StepCardsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly steps: readonly {
    /** "Step 01". */
    readonly label: string;
    readonly name: string;
    readonly body: string;
    readonly image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  }[];
}

/** The live "Roadmap" cards: a coloured picture in the corner, "Step 01", a name and a paragraph. */
export default function StepCards({ content, id = "roadmap" }: { content: StepCardsContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <ul className={styles.stepGrid}>
        {content.steps.map((s, i) => (
          <li key={s.label} className={styles.stepCard}>
            <FadeUp delay={(i % 3) * 0.06}>
              <Image
                src={publicMediaUrl(s.image.src)}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                unoptimized
                className={styles.stepCardImg}
              />
              <p className={styles.stepCardLabel}>{s.label}</p>
              <h3 className={styles.stepCardName}>{s.name}</h3>
              <p className={styles.stepCardBody}>{s.body}</p>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
