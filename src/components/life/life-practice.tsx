import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import { publicMediaUrl } from "@/lib/media-url";
import landing from "@/components/landing/landing.module.css";
import styles from "./life.module.css";

export interface LifePracticeContent {
  eyebrow: string;
  title: string;
  image: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
  items: readonly { readonly name: string; readonly body: string }[];
}

/**
 * "Imagination at Work…" in live's arrangement: the heading and a photograph
 * of the office floor in one column, the five cards stacked in the other.
 * Stacks to one column below 1000px.
 */
export default function LifePractice({
  content,
  id = "practice",
}: {
  content: LifePracticeContent;
  id?: string;
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <div className={styles.practiceGrid}>
        <div className={styles.practiceLead}>
          <SectionHead kicker={content.eyebrow} title={content.title} />
          <div className={styles.practiceMedia}>
            <Image
              src={publicMediaUrl(content.image.src)}
              alt={content.image.alt}
              width={content.image.width}
              height={content.image.height}
              sizes="(max-width: 999px) 100vw, 40vw"
              className={styles.practiceImg}
            />
          </div>
        </div>

        <FadeUp>
          <ul className={styles.practiceList}>
            {content.items.map((item) => (
              <li key={item.name} className={`${landing.featCard} ${styles.practiceCard}`}>
                <h3 className={landing.featName}>{item.name}</h3>
                <span className={landing.featRule} aria-hidden />
                <p className={landing.featText}>{item.body}</p>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
