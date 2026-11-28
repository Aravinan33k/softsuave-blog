import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface StatsStoryContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  readonly stats: readonly { readonly figure: string; readonly name: string; readonly body: string }[];
}

/**
 * The live "Analysis" block: a heading, a line and an illustration on one side, and on
 * the other a stack of figures — a big percentage with its name and a sentence beneath.
 */
export default function StatsStory({ content, id = "analysis" }: { content: StatsStoryContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.storyGrid}>
        <Image
          src={publicMediaUrl(content.image.src)}
          alt={content.image.alt}
          width={content.image.width}
          height={content.image.height}
          sizes="(max-width: 999px) 90vw, 40vw"
          className={styles.storyImage}
        />
        <ul className={styles.storyStats}>
          {content.stats.map((s, i) => (
            <li key={s.figure} className={styles.storyStat}>
              <FadeUp delay={Math.min(i, 3) * 0.06}>
                <p className={styles.storyHead}>
                  <span className={styles.storyFigure}>{s.figure}</span> {s.name}
                </p>
                <p className={styles.storyBody}>{s.body}</p>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
