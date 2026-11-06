import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface AudienceCardsContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly cards: readonly {
    readonly name: string;
    readonly lead: string;
    readonly points: readonly string[];
    readonly image: { readonly src: string; readonly width: number; readonly height: number };
  }[];
}

/** Cards for who the work is for: an icon, a name, a line, then a short list of what you get. */
export default function AudienceCards({ content, id = "audience" }: { content: AudienceCardsContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <ul className={styles.audGrid}>
        {content.cards.map((c, i) => (
          <li key={c.name} className={styles.audCard}>
            <FadeUp delay={i * 0.06}>
              <Image
                src={publicMediaUrl(c.image.src)}
                alt=""
                width={c.image.width}
                height={c.image.height}
                unoptimized
                className={styles.audIcon}
              />
              <h3 className={styles.audName}>{c.name}</h3>
              <p className={styles.audLead}>{c.lead}</p>
              <ul className={styles.audPoints}>
                {c.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
