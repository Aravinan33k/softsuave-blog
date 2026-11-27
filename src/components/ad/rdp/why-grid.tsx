import Image from "next/image";
import { Award, Eye, Globe2, Rocket, SlidersHorizontal, type LucideIcon } from "lucide-react";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../rdp.module.css";

/** One line icon per point, in card order. */
const ICONS: readonly LucideIcon[] = [Award, SlidersHorizontal, Globe2, Rocket, Eye];

/**
 * "Why Choose Soft Suave" as a bento (/ad/remote-developers-page): one tall
 * coding photo beside the five numbered icon cards, every point visible (it
 * replaces the accordion), with the closing line under the grid. Photo above
 * the cards below 900px.
 */
export default function WhyGrid({
  content,
  id = "why",
}: {
  content: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly items: readonly { readonly name: string; readonly body: string }[];
    /** A line under the grid; omitted, the grid stands alone. */
    readonly closing?: string;
    readonly photo: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
  };
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.whyGrid}>
        <FadeUp className={styles.whyPhoto}>
          <Image
            src={publicMediaUrl(content.photo.src)}
            alt={content.photo.alt}
            fill
            sizes="(min-width: 900px) 38vw, 92vw"
            className={styles.cover}
          />
        </FadeUp>
        <ul className={styles.whyCards}>
          {content.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <li key={item.name} className={styles.whyCard}>
                <span className={styles.iconTile} aria-hidden>
                  <Icon size={22} strokeWidth={1.6} />
                </span>
                <span className={styles.cardNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className={styles.cardName}>{item.name}</h3>
                <p className={styles.cardBody}>{item.body}</p>
              </li>
            );
          })}
        </ul>
      </div>
      {content.closing && <p className={styles.whyClosing}>{content.closing}</p>}
    </section>
  );
}
