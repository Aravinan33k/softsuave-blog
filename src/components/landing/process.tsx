"use client";

import { useRef } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface ProcessContent {
  /**
   * Masthead. Optional as a set: omit `title` and the section renders as a
   * bare run of step cards, for a stage list that continues the section
   * above it (the Overview's own H2 already introduces it) rather than
   * opening a new one with a second heading.
   */
  eyebrow?: string;
  title?: string;
  body?: string;
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
  variant = "cards",
  columns = 4,
}: Readonly<{
  content: ProcessContent;
  id?: string;
  /**
   * `cards` is the original look: cards sized to their own content, in up to
   * four columns, with justified body copy.
   *
   * `even` keeps that four-column layout but stretches the cards in a row to
   * a shared height, so the bottoms line up whether or not a heading wraps,
   * and left-aligns the body — justified copy rivers badly in a card column.
   *
   * `stages` is `even` plus one row of five on a wide desktop and a smaller
   * heading to suit it, for a run of short pipeline stages that would
   * otherwise leave a fifth card orphaned on its own row.
   */
  variant?: "cards" | "even" | "stages";
  /**
   * Desktop column count for the `cards` and `even` variants, chosen to fill
   * the rows the list actually has. Four is the base; three suits a run of
   * six steps, which four would leave as a four-then-two remainder.
   * Ignored by `stages`, which sets its own five-across rhythm.
   */
  columns?: 3 | 4;
}>) {
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.processCard}`, root.current);
      if (!cards.length) return;

      // Cards start hidden and a bare trigger fires a free-running tween
      // once. NOT `gsap.from({ scrollTrigger })`: a tween owned by a
      // ScrollTrigger is reverted and restored at its interrupted progress
      // by any `ScrollTrigger.refresh()` that lands mid-play, which strands
      // a staggered entrance part-way through (see why-us.tsx).
      gsap.set(cards, { opacity: 0, y: 28 });
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
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
      {content.title && (
        <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      )}

      <ol
        ref={root}
        className={[
          styles.processGrid,
          variant !== "cards" ? styles.processEven : "",
          variant === "stages" ? styles.processStages : "",
          variant !== "stages" && columns === 3 ? styles.processGrid3 : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
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
