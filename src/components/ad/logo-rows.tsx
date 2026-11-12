import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import Marquee from "@/components/home/marquee";
import styles from "./ad.module.css";

export interface LogoRowsContent {
  readonly title: string;
  /** Each row is one marquee loop; the rows alternate direction. */
  readonly rows: readonly (readonly {
    readonly src: string;
    readonly alt: string;
    readonly width: number;
    readonly height: number;
  }[])[];
}

/**
 * A heading over rows of tool marks with no names beside them — the live
 * "Experts in 100+ technologies and languages." band, whose marks carry their
 * own wordmarks. Each row scrolls as a loop, alternating direction, and holds
 * still under the pointer (the site's `Marquee`).
 */
export default function LogoRows({ content, id = "tech" }: { content: LogoRowsContent; id?: string }) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead title={content.title} />
      <div className={styles.logoRows}>
        {content.rows.map((row, r) => (
          <Marquee key={r} speed={16 + r * 3} reverse={r % 2 === 1} separator={<span />} fill>
            {row.map((m) => (
              <span key={m.src} className={styles.logoChip}>
                <Image
                  src={publicMediaUrl(m.src)}
                  alt={m.alt}
                  width={m.width}
                  height={m.height}
                  unoptimized
                  style={{ height: 32, width: "auto", maxWidth: "none", flex: "none" }}
                />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  );
}
