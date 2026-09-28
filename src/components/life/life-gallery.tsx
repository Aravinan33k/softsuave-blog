import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import { SiteLink } from "@/themes/softsuave/site-link";
import { publicMediaUrl } from "@/lib/media-url";
import landing from "@/components/landing/landing.module.css";
import styles from "./life.module.css";

export interface LifePhoto {
  readonly src: string;
  readonly alt: string;
}

export interface LifeGalleryContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Each row runs as its own strip; the second scrolls the other way. */
  rows: readonly (readonly LifePhoto[])[];
  cta: { readonly label: string; readonly href: string };
}

/**
 * The culture section: its heading and paragraph, then rows of office and
 * event photographs drifting sideways in opposite directions, then the
 * careers button — the live page's arrangement.
 *
 * The rows are a CSS loop rather than `home/marquee.tsx`: that component's
 * item padding and separator are sized for text chips, and a photo strip has
 * no need for its overflow measuring — every row here is several viewports
 * wide at any width, because each photo is sized in `vw`. The trailing copy of
 * a row is hidden from assistive tech, so each photo's alt is read once.
 * Reduced motion stops the loop and leaves the row as a swipeable scroller.
 */
export default function LifeGallery({
  content,
  id = "people",
}: {
  content: LifeGalleryContent;
  id?: string;
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div className={styles.rows}>
        {content.rows.map((row, r) => (
          <div key={r} className={styles.row} data-dir={r % 2 ? "reverse" : "forward"}>
            <ul className={styles.track}>
              {[0, 1].map((copy) =>
                row.map((p) => (
                  <li
                    key={`${copy}-${p.src}`}
                    className={styles.photo}
                    aria-hidden={copy === 1 || undefined}
                  >
                    <Image
                      src={publicMediaUrl(p.src)}
                      alt={copy === 1 ? "" : p.alt}
                      fill
                      sizes="(max-width: 700px) 62vw, 26vw"
                      className={styles.photoImg}
                    />
                  </li>
                )),
              )}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.ctaRow}>
        <SiteLink href={content.cta.href} className={`${landing.btn} ${landing.btnPrimary}`}>
          {content.cta.label}
        </SiteLink>
      </div>
    </section>
  );
}
