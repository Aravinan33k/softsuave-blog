import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./ad.module.css";

export interface TrustedStripContent {
  readonly title: string;
  readonly logos: readonly { readonly name: string; readonly src: string }[];
}

/**
 * The ad landing page's "Trusted Partner for Startups and SMBs." card: a white
 * rounded panel with a centred heading over a still row of greyscale client
 * marks, straddling the bottom edge of the hero — how the live page draws it.
 * No marquee, no edge fade: the row is static, and wraps two-up on a phone.
 *
 * Place it first inside a `.light` band: the card's negative top margin pulls it
 * up over the hero, and the band's background starts where the card's middle is
 * (see `.trusted` in ad.module.css).
 */
export default function TrustedStrip({
  content,
  id = "clients",
}: {
  content: TrustedStripContent;
  id?: string;
}) {
  return (
    <section className={styles.trusted} id={id} aria-label={content.title}>
      <div className={styles.trustedCard}>
        <h2 className={styles.trustedTitle}>{content.title}</h2>
        <ul className={styles.trustedRow}>
          {content.logos.map((logo) => (
            <li key={logo.name} className={styles.trustedItem}>
              <span className={styles.trustedLogo}>
                <Image
                  src={publicMediaUrl(logo.src)}
                  alt={logo.name}
                  fill
                  sizes="(max-width: 700px) 40vw, 200px"
                  className="object-contain"
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
