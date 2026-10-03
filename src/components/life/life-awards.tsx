import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import { recognitions } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import home from "@/components/home/home.module.css";
import landing from "@/components/landing/landing.module.css";
import styles from "./life.module.css";

export interface LifeAwardsContent {
  eyebrow: string;
  title: string;
}

/**
 * The badge row under live's "Awards & Certifications" heading.
 *
 * The badges are `recognitions.items` from `content.ts` — the one list of
 * accolades the site renders — on the shared `.recogBadge` plaque, so this
 * row can never disagree with the homepage band about what we have won. Only
 * the heading is this page's: the shared `Recognitions` band carries the
 * homepage's "Industry Recognitions" copy, which is not what live says here.
 */
export default function LifeAwards({
  content,
  id = "awards",
}: {
  content: LifeAwardsContent;
  id?: string;
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} />

      <FadeUp>
        <ul className={styles.awardGrid}>
          {recognitions.items.map((item) => (
            <li key={item.key}>
              <span className={`${home.recogBadge} ${styles.awardBadge}`}>
                <Image
                  src={publicMediaUrl(item.src)}
                  alt={`${item.title} — ${item.org}${item.year ? `, ${item.year}` : ""}`}
                  fill
                  sizes="160px"
                  className={home.recogBadgeImg}
                />
              </span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
