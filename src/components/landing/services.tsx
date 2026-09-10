"use client";

import { useRef } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface ServicesContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /** Optional — hand-placed asset, shown as the card's header image. */
    readonly image?: {
      readonly src: string;
      readonly width: number;
      readonly height: number;
      readonly alt: string;
    };
  }[];
}

/**
 * The custom AI development services, as numbered bordered panels: 1-up on a
 * phone, 2-up on a tablet, and all five side by side (no scroll) from 1000px
 * — see `.svcGrid`'s breakpoints in landing.module.css.
 *
 * With an `image`, each panel gets a header illustration above the usual
 * index/title/body — index and title sit side by side, same as the Process
 * cards, and the body is justified. Entrance is a staggered fade/lift on
 * scroll-in (one ScrollTrigger for the whole grid, not a `FadeUp` per card,
 * so the stagger reads as one sequence).
 *
 * (No click-to-pop on the image any more — it read as a flicker rather than
 * a deliberate flourish, so it's gone from here and from the Process cards.)
 */
export default function Services({
  content,
  id = "services",
}: {
  content: ServicesContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const panels = gsap.utils.toArray<HTMLElement>(`.${styles.svcPanel}`, root.current);
      gsap.from(panels, {
        opacity: 0,
        y: 28,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.svcGrid}>
        {content.items.map((s, i) => (
          <article key={s.name} className={styles.svcPanel}>
            {s.image && (
              <div className={styles.svcImageFrame}>
                <Image
                  src={publicMediaUrl(s.image.src)}
                  alt={s.image.alt}
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 999px) 46vw, 19vw"
                  className={styles.svcImage}
                />
              </div>
            )}

            <div className={styles.svcBody}>
              <div className={styles.svcCardHead}>
                <span className={styles.svcIndex} aria-hidden>
                  {pad(i + 1)}
                </span>
                <h3 className={styles.svcTitle}>{s.name}</h3>
              </div>
              <p className={styles.svcText}>{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
