import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../rdp.module.css";

type Service = {
  readonly name: string;
  readonly body: string;
  readonly image?: { readonly src: string; readonly width: number; readonly height: number };
};

/**
 * "Our Services" as an endless row of photo cards drifting right to left
 * (/ad/remote-developers-page, by request): each card a photo of the role on
 * top, its name and line under it.
 *
 * The set is rendered twice and the track slides by exactly one set, so the
 * loop has no seam. The copy is `aria-hidden` and `inert`, so a screen reader
 * or keyboard meets each card once. The row pauses on hover and while a card
 * holds focus. Under `prefers-reduced-motion` it stands still and scrolls
 * sideways by hand instead. Every card's copy is in the HTML.
 */
export default function ServiceGrid({
  content,
  id = "services",
}: {
  content: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly items: readonly Service[];
  };
  id?: string;
}) {
  const cards = (copy: boolean) =>
    content.items.map((item) => (
      <li
        key={`${copy ? "b" : "a"}-${item.name}`}
        className={styles.serviceCard}
        {...(copy ? { "aria-hidden": true, inert: true } : {})}
      >
        <div className={styles.serviceArt}>
          {item.image && (
            <Image
              src={publicMediaUrl(item.image.src)}
              alt=""
              fill
              sizes="(min-width: 900px) 360px, 80vw"
              className={styles.serviceImg}
            />
          )}
        </div>
        <div className={styles.serviceCopy}>
          {copy ? <p className={styles.cardName}>{item.name}</p> : <h3 className={styles.cardName}>{item.name}</h3>}
          <p className={styles.cardBody}>{item.body}</p>
        </div>
      </li>
    ));

  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.serviceViewport}>
        <ul className={styles.serviceTrack} style={{ ["--count" as string]: content.items.length }}>
          {cards(false)}
          {cards(true)}
        </ul>
      </div>
    </section>
  );
}
