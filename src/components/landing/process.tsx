"use client";

import { useRef } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface ProcessContent {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly {
    readonly n: string;
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
 * Delivery process as bordered cards, one per step — the same card language
 * as `services.tsx` (image header, numbered badge, title, body), so the two
 * card grids on this page read as one system. Replaces an earlier vertical
 * rail (readable but plain) and, before that, a scroll-pinned galaxy/orbit
 * diagram (motion-heavy, didn't fit this surface's restraint) — this is the
 * third pass at the section.
 *
 * Entrance is a staggered fade/lift on scroll-in, one ScrollTrigger for the
 * whole grid.
 *
 * (No click-to-pop on the image any more — it read as a flicker rather than
 * a deliberate flourish, so it's gone from here and from the Services cards.)
 */
export default function Process({
  content,
  id = "journey",
}: {
  content: ProcessContent;
  id?: string;
}) {
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.processCard}`, root.current);
      gsap.from(cards, {
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

      <ol ref={root} className={styles.processGrid}>
        {content.steps.map((step) => (
          <li key={step.n} className={styles.processCard}>
            {step.image && (
              <div className={styles.processImageFrame}>
                <Image
                  src={publicMediaUrl(step.image.src)}
                  alt={step.image.alt}
                  fill
                  sizes="(max-width: 699px) 92vw, (max-width: 999px) 46vw, 23vw"
                  className={styles.processImage}
                />
              </div>
            )}

            <div className={styles.processCardBody}>
              <div className={styles.processCardHead}>
                <span className={styles.processMarker} aria-hidden>
                  {step.n}
                </span>
                <h3 className={styles.processName}>{step.name}</h3>
              </div>
              <p className={styles.processBody}>{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
