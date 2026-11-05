import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { heroBadgeSizes, type HeroBadge } from "@/lib/home/hero-badges";
import styles from "./ad.module.css";

export interface HeroTestimonialContent {
  readonly quote: string;
  readonly name: string;
  readonly role: string;
  readonly photo: { readonly src: string; readonly alt: string };
  readonly badges: readonly HeroBadge[];
}

/**
 * The right-hand column of the AI-developer ad hero: one client's words over
 * their portrait, with the three credential seals beneath, drawn bare because
 * the artwork is made for a dark ground. Passed to the
 * shared `Hero` as its `slot`, so the column sits where the enquiry card does
 * on the other ad page — same grid, same breakpoints.
 */
export default function HeroTestimonial({ content }: { content: HeroTestimonialContent }) {
  return (
    <div className={styles.heroSide}>
      <figure className={styles.quoteCard} style={{ margin: 0 }}>
        <Image
          src={publicMediaUrl(content.photo.src)}
          alt={content.photo.alt}
          width={76}
          height={76}
          className={styles.quotePhoto}
        />
        <blockquote className={styles.quoteText} style={{ margin: 0 }}>
          {content.quote}
        </blockquote>
        <figcaption>
          <p className={styles.quoteName}>{content.name}</p>
          <span className={styles.quoteRole}>{content.role}</span>
        </figcaption>
      </figure>
      <ul className={styles.heroBadges}>
        {content.badges.map((b) => (
          <li key={b.src} className={styles.heroBadge}>
            <Image
              src={publicMediaUrl(b.src)}
              alt={b.alt}
              width={b.width}
              height={b.height}
              sizes={heroBadgeSizes(b, 96)}
              className={styles.heroBadgeImg}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}
