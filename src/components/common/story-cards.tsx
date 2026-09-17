"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface StoryCardsContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    /** The sector tag the live page prints above each story. */
    readonly industry: string;
    readonly name: string;
    readonly body: string;
    /** Optional — hand-placed asset, shown as the card's header image. */
    readonly image?: {
      readonly src: string;
      readonly alt: string;
    };
  }[];
}

/**
 * Success stories as tagged cards.
 *
 * These are the page's own three case studies, each labelled with the industry
 * it came from — which is the part a reader scans for, so the tag leads the
 * card rather than sitting as a footnote under it. Not the homepage's case
 * study gallery: that has its own photography and its own projects, and these
 * three are this page's.
 *
 * Entrance is a staggered rise played once by a bare trigger, so a mid-play
 * `ScrollTrigger.refresh()` cannot strand it (see why-us.tsx).
 */
export default function StoryCards({
  content,
  id = "work",
}: {
  content: StoryCardsContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.stcCard}`, root.current);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 28 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            stagger: 0.1,
            // Leave no inline transform behind, so the CSS hover lift works.
            clearProps: "transform,opacity",
          });
        },
      });
      return () => st.kill();
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.stcGrid}>
        {content.items.map((item) => (
          <article key={item.name} className={styles.stcCard}>
            {item.image && (
              <div className={styles.stcImageFrame}>
                <Image
                  src={publicMediaUrl(item.image.src)}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 999px) 46vw, 24vw"
                  className={styles.stcImage}
                />
              </div>
            )}
            <span className={styles.stcTag}>{item.industry}</span>
            <h3 className={styles.stcName}>{item.name}</h3>
            <p className={styles.stcBody}>{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
