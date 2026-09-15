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
/**
 * Column spans for the mosaic variant, as a 12-column composition.
 *
 * Steps are walked in pairs, and the pair alternates 7+5 / 5+7 so consecutive
 * rows do not mirror each other — that alternation is the whole reason the
 * layout reads as a composition rather than a table. A leftover odd step takes
 * the full 12 instead of sitting at 7 beside a gap, which is exactly the
 * stranded-card problem the even grid had at five steps.
 */
function mosaicSpansFor(n: number): number[] {
  const out: number[] = [];
  for (let i = 0; i + 1 < n; i += 2) {
    if ((i / 2) % 2 === 0) out.push(7, 5);
    else out.push(5, 7);
  }
  if (n % 2 === 1) out.push(12);
  return out;
}

export default function Process({
  content,
  id = "journey",
  variant = "grid",
}: {
  content: ProcessContent;
  id?: string;
  /**
   * "grid" is the even bordered-card row every other landing page uses.
   * "mosaic" is the editorial composition: alternating wide/tall cards, a step
   * pill, and a full-bleed image per card — wide cards set the image beside the
   * copy, tall ones above it.
   */
  variant?: "grid" | "mosaic";
}) {
  const root = useRef<HTMLOListElement | null>(null);
  const mosaic = variant === "mosaic";
  const spans = mosaic ? mosaicSpansFor(content.steps.length) : [];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const cards = gsap.utils.toArray<HTMLElement>(
        `.${styles.processCard}, .${styles.pmCard}`,
        root.current,
      );
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

      {mosaic ? (
        <ol ref={root} className={styles.pmGrid}>
          {content.steps.map((step, i) => (
            <li
              key={step.n}
              className={`${styles.pmCard} ${
                spans[i] >= 7 ? styles.pmCardWide : styles.pmCardTall
              }`}
              data-span={spans[i]}
            >
              {step.image && (
                <div className={styles.pmMedia}>
                  <Image
                    src={publicMediaUrl(step.image.src)}
                    alt={step.image.alt}
                    fill
                    sizes={
                      spans[i] >= 7
                        ? "(max-width: 999px) 92vw, 34vw"
                        : "(max-width: 999px) 92vw, 42vw"
                    }
                    className={styles.pmImg}
                  />
                </div>
              )}

              <div className={styles.pmBody}>
                <span className={styles.pmPill}>Step {step.n}</span>
                <h3 className={styles.pmName}>{step.name}</h3>
                <p className={styles.pmText}>{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
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
      )}
    </section>
  );
}
