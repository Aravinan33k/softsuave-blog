import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import CwPhoto from "./cw-photo";
import type { CwPhoto as Photo } from "@/lib/home/ad-coffee-with-us-images";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./coffee.module.css";

export type CapabilityCardsContent = {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly items: readonly { readonly name: string; readonly body: string; readonly points: readonly string[] }[];
};

/**
 * Three capability cards, each led by a photograph inset in the card (its
 * number floating on the picture), then a name, a line and a ticked list, with
 * no button inside (`/ad/coffee-with-us`, "Technology Capabilities"). Three
 * across from 900px, stacked below. `photos` pairs with `items` by position.
 */
export default function CapabilityCards({
  content,
  photos,
  id = "capabilities",
}: {
  content: CapabilityCardsContent;
  photos: readonly Photo[];
  id?: string;
}) {
  return (
    <section className={gen.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <ul className={styles.capGrid}>
        {content.items.map((item, i) => (
          <li key={item.name} className={styles.capItem}>
            <FadeUp delay={i * 0.08}>
              <article className={styles.capCard}>
                {photos[i] && (
                  <div className={styles.capMedia}>
                    <CwPhoto photo={photos[i]} sizes="(max-width: 899px) 92vw, 30vw" className={styles.photoCover} />
                    <span className={styles.capIndex} aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                )}
                <div className={styles.capText}>
                  <h3 className={styles.capName}>{item.name}</h3>
                  <p className={styles.capBody}>{item.body}</p>
                  <ul className={styles.capPoints}>
                    {item.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </article>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
