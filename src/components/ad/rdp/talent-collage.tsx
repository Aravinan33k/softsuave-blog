import Image from "next/image";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/landing/section-head";
import landing from "@/components/landing/landing.module.css";
import type { TopTalentContent } from "@/components/ad/top-talent";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../rdp.module.css";

/**
 * "Top Talent", collage layout (/ad/remote-developers-page, by request): the
 * section head, then two columns — on the left the team photo with a second,
 * smaller photo over its lower corner and a round "40 hrs / Risk-Free Trial"
 * badge whose ring text turns slowly; on the right the five points as an
 * editorial numbered list (large outlined numbers, thin rules) and the trial
 * button. Stacked, collage first, below 1000px. The ring stands still under
 * `prefers-reduced-motion`.
 */
export default function TalentCollage({
  content,
  second,
  id = "talent",
}: {
  content: TopTalentContent;
  /** The smaller photo over the main one's corner. Root-relative. */
  second: { readonly src: string; readonly alt: string };
  id?: string;
}) {
  const image = content.image;
  const badge = image?.badge;
  const ring = badge ? `${badge.label} • ${badge.label} • ` : "";
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div className={styles.tcGrid}>
        <FadeUp className={styles.tcArt}>
          {image && (
            <div className={styles.tcMain}>
              <Image
                src={publicMediaUrl(image.src)}
                alt={image.alt}
                fill
                sizes="(min-width: 1000px) 40vw, 90vw"
                className={styles.cover}
                {...(image.blurDataURL ? { placeholder: "blur" as const, blurDataURL: image.blurDataURL } : {})}
              />
            </div>
          )}
          <div className={styles.tcSecond}>
            <Image src={publicMediaUrl(second.src)} alt={second.alt} fill sizes="(min-width: 1000px) 18vw, 45vw" className={styles.cover} />
          </div>
          {badge && (
            <div className={styles.tcBadge}>
              <svg className={styles.tcRing} viewBox="0 0 120 120" aria-hidden focusable="false">
                <defs>
                  <path id={`${id}-ring`} d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
                </defs>
                <text>
                  <textPath href={`#${id}-ring`} textLength="289" lengthAdjust="spacing">
                    {ring.toUpperCase()}
                  </textPath>
                </text>
              </svg>
              <p className={styles.tcBadgeCore}>
                <strong>{badge.figure}</strong>
                <span className={styles.srOnly}> {badge.label}</span>
              </p>
            </div>
          )}
        </FadeUp>

        <div className={styles.tcList}>
          <ol>
            {content.models.map((m, i) => (
              <li key={m.name} className={styles.tcItem}>
                <span className={styles.tcNum} aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={styles.tcText}>{m.name}</span>
              </li>
            ))}
          </ol>
          <a className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg} ${styles.tcCta}`} href={content.cta.href}>
            {content.cta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
