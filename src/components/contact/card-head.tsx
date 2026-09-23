import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "./contact.module.css";

/** The icon + title + subtitle masthead shared by the /contact channel cards. */
export default function CardHead({ icon, title, subtitle, level = 2 }: { icon: string; title: string; subtitle: string; level?: 2 | 3 }) {
  const H = level === 2 ? "h2" : "h3";
  return (
    <div className={styles.cardHead}>
      <span className={styles.cardIcon}>
        <Image src={publicMediaUrl(icon)} alt="" width={45} height={45} unoptimized={icon.endsWith(".svg")} />
      </span>
      <div>
        <H className={styles.cardTitle}>{title}</H>
        <p className={styles.cardSub}>{subtitle}</p>
      </div>
    </div>
  );
}
