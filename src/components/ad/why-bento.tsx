import { Handshake, MessagesSquare, SlidersHorizontal, Zap } from "lucide-react";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import type { CardGridContent } from "@/components/generative-ai/industries";
import CwPhoto from "./cw-photo";
import type { CwPhoto as Photo } from "@/lib/home/ad-coffee-with-us-images";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./coffee.module.css";

/** One drawn mark per difference, in card order. */
const ICONS = [MessagesSquare, SlidersHorizontal, Zap, Handshake];

/**
 * "The Soft Suave Difference" on /ad/coffee-with-us, as a bento: a tall
 * photograph tile carrying the section's CTA, beside the four difference cards
 * in a two-by-two grid. Stacks to photo-then-cards below 900px. Same masthead
 * as the other card sections on the page.
 */
export default function WhyBento({ content, photo, id = "why" }: { content: CardGridContent; photo: Photo; id?: string }) {
  return (
    <section className={gen.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <FadeUp>
        <div className={styles.bento}>
          <figure className={styles.bentoPhoto}>
            <CwPhoto photo={photo} sizes="(max-width: 899px) 92vw, 40vw" className={styles.photoCover} />
            {content.cta && (
              <figcaption className={styles.bentoPhotoVeil}>
                <a href={content.cta.href} className={styles.pillCta}>
                  {content.cta.label}
                  <span aria-hidden>→</span>
                </a>
              </figcaption>
            )}
          </figure>
          <ul className={styles.bentoCards}>
            {content.items.map((item, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <li key={item.name} className={styles.bentoCard}>
                  <span className={styles.bentoIcon} aria-hidden>
                    <Icon size={22} strokeWidth={1.6} />
                  </span>
                  <span className={styles.bentoNum} aria-hidden>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className={styles.bentoName}>{item.name}</h3>
                  <p className={styles.bentoBody}>{item.body}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
