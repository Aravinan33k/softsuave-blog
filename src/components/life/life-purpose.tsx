import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import { publicMediaUrl } from "@/lib/media-url";
import landing from "@/components/landing/landing.module.css";
import styles from "./life.module.css";

export interface LifePurposeContent {
  eyebrow: string;
  title: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /** The card's illustration — decorative, the name and body carry it. */
    readonly image: { readonly src: string; readonly width: number; readonly height: number };
  }[];
}

/**
 * "Driven by Purpose" — three value cards, each opening on live's own
 * illustration shown whole on a light plaque.
 *
 * Built on the landing `feature` card classes rather than `CardGrid
 * variant="feature"`: that variant puts its thumbnail beside the copy from
 * 1100px and crops it to 4:3, which suits a photograph but cuts these
 * illustrations down to a sliver in a three-up row.
 */
export default function LifePurpose({
  content,
  id = "purpose",
}: {
  content: LifePurposeContent;
  id?: string;
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} />

      <FadeUp>
        <div className={landing.featGrid}>
          {content.items.map((item) => (
            <article key={item.name} className={`${landing.featCard} ${styles.purposeCard}`}>
              <div className={styles.purposeArt}>
                <Image
                  src={publicMediaUrl(item.image.src)}
                  alt=""
                  width={item.image.width}
                  height={item.image.height}
                  sizes="(max-width: 700px) 70vw, 280px"
                  className={styles.purposeImg}
                />
              </div>
              <div className={landing.featBody}>
                <h3 className={landing.featName}>{item.name}</h3>
                <span className={landing.featRule} aria-hidden />
                <p className={landing.featText}>{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
