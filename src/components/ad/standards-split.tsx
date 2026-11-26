import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import type { CardGridContent } from "@/components/generative-ai/industries";
import CwPhoto from "./cw-photo";
import type { CwPhoto as Photo } from "@/lib/home/ad-coffee-with-us-images";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./coffee.module.css";

/**
 * "Our Delivery Standards" on /ad/coffee-with-us: a tall office photograph
 * beside the four kept cards of /ad/remote-developer's "Code & Practice", with
 * their icons. Photo on the left from 900px; above the cards below that.
 */
export default function StandardsSplit({
  content,
  photo,
  id = "standards",
}: {
  content: CardGridContent;
  photo: Photo;
  id?: string;
}) {
  return (
    <section className={gen.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.split}>
        <FadeUp>
          <figure className={styles.splitPhoto}>
            <CwPhoto photo={photo} sizes="(max-width: 899px) 92vw, 38vw" className={styles.photoCover} />
          </figure>
        </FadeUp>
        <ul className={styles.splitCards}>
          {content.items.map((item, i) => (
            <li key={item.name}>
              <FadeUp delay={i * 0.06}>
                <article className={styles.splitCard}>
                  {item.images?.[0] && (
                    <span className={styles.splitIcon} aria-hidden>
                      <Image src={publicMediaUrl(item.images[0].src)} alt="" width={40} height={40} loading="lazy" />
                    </span>
                  )}
                  <h3 className={styles.splitName}>{item.name}</h3>
                  <p className={styles.splitBody}>{item.body}</p>
                </article>
              </FadeUp>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
