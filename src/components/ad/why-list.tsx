import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

/** A heading over a plain list of reasons — the live "Why Hire…" block, which has no card copy. */
export default function WhyList({
  title,
  items,
  id = "why",
  image,
}: {
  title: string;
  items: readonly string[];
  id?: string;
  /** Shown beside the list from 1000px up, under it below that — the live block's side photo. */
  image?: { src: string; width: number; height: number; alt: string };
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead title={title} />
      <div className={image ? styles.whyWithImage : undefined}>
        <ul className={styles.whyList} data-narrow={image ? "true" : undefined}>
          {items.map((item, i) => (
            <li key={item} className={styles.whyItem}>
              <FadeUp delay={Math.min(i % 3, 2) * 0.06}>{item}</FadeUp>
            </li>
          ))}
        </ul>
        {image && (
          <Image
            src={publicMediaUrl(image.src)}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(max-width: 999px) 90vw, 40vw"
            className={styles.whyImage}
          />
        )}
      </div>
    </section>
  );
}
