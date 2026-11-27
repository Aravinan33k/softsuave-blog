import Image from "next/image";
import SectionHead from "@/components/landing/section-head";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "../rdp.module.css";

/**
 * "We Have The Skills You're Looking For" as twenty compact tiles
 * (/ad/remote-developers-page): each tile's existing mark, its "Hire ___
 * Developer" name and its "Hire Now" to the trial flow. Five across from
 * 1200px, four from 900px, three from 640px, two below.
 */
export default function ExpertTiles({
  content,
  id = "experts",
}: {
  content: {
    readonly eyebrow: string;
    readonly title: string;
    readonly body: string;
    readonly items: readonly { readonly label: string; readonly image: string }[];
    readonly cta: { readonly label: string; readonly href: string };
  };
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <ul className={styles.expertGrid}>
        {content.items.map((item) => (
          <li key={item.label} className={styles.expertTile}>
            <span className={styles.expertMark}>
              <Image src={publicMediaUrl(item.image)} alt="" width={40} height={40} unoptimized />
            </span>
            <h3 className={styles.expertName}>{item.label}</h3>
            <a className={styles.expertLink} href={content.cta.href}>
              {content.cta.label}
              <span className={styles.srOnly}> — {item.label}</span>
              <span aria-hidden> →</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
