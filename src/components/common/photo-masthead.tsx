import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import { publicMediaUrl } from "@/lib/media-url";
import landing from "@/components/landing/landing.module.css";
import styles from "./photo-masthead.module.css";

export interface PhotoMastheadContent {
  title: string;
  image: {
    readonly src: string;
    readonly alt: string;
    /**
     * CSS `object-position` for the photo — where its subject sits, so a
     * narrow viewport crops around it rather than through it. Default centre.
     */
    readonly position?: string;
  };
  /**
   * `soft` for a photo that is already dark (the /clients handshake): the
   * default veil is sized for a bright photo and buries a dark one.
   */
  veil?: "soft";
}

/**
 * An index page's H1 over a full-bleed photograph — the masthead live runs on
 * its company pages (/life-at-softsuave's event hall, /clients' handshake).
 * The page's `landing.indexHead` shell, SectionHead at `level={1}` for the H1
 * and breadcrumb, with the photo behind a dark veil so the heading keeps its
 * contrast on any image.
 */
export default function PhotoMasthead({ content }: { content: PhotoMastheadContent }) {
  return (
    <section className={`${landing.indexHead} ${styles.hero}`} id="top">
      <div className={styles.bg}>
        <Image
          src={publicMediaUrl(content.image.src)}
          alt={content.image.alt}
          fill
          priority
          sizes="100vw"
          className={styles.img}
          style={content.image.position ? { objectPosition: content.image.position } : undefined}
        />
        <div className={`${styles.veil}${content.veil === "soft" ? ` ${styles.veilSoft}` : ""}`} aria-hidden />
      </div>
      <SectionHead level={1} title={content.title} />
    </section>
  );
}
