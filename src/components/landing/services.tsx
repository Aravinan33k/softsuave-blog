"use client";

import { useRef } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { spansFor } from "./card-spans";
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
    /**
     * Optional short category label, shown above the title in the `bold`
     * variant only. A grouping word for the card's own subject — not a claim.
     */
    readonly tag?: string;
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
 * Service / offering cards.
 *
 * Two layouts over the same content:
 *
 * - `default` — numbered bordered panels on an equal grid, optionally led by a
 *   header illustration. This is what the custom-AI page uses, where each card
 *   carries its own image, so it is left exactly as it was.
 * - `bold` — the editorial treatment: an asymmetric 12-column grid (see
 *   `spansFor`), an accent rule across the top of each card, an oversized
 *   serif ordinal watermarked into the corner, and a per-card accent drawn
 *   from a five-step warm ramp built on the brand tokens (see `.svcBold` in
 *   landing.module.css). Body text is left-aligned here rather than justified.
 *
 * Entrance is a staggered fade/lift on scroll-in — one ScrollTrigger for the
 * whole grid, not a `FadeUp` per card, so the stagger reads as one sequence.
 */
export default function Services({
  content,
  id = "services",
  variant = "default",
}: {
  content: ServicesContent;
  id?: string;
  variant?: "default" | "bold";
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const bold = variant === "bold";
  const spans = bold ? spansFor(content.items.length) : [];

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      // The bold layout's cards carry `.boldCard`, not `.svcPanel`, so the
      // selector has to follow the variant — otherwise the entrance animation
      // silently matches nothing and the cards just appear.
      const panels = gsap.utils.toArray<HTMLElement>(
        `.${bold ? styles.boldCard : styles.svcPanel}`,
        root.current,
      );
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

      <div
        ref={root}
        className={bold ? styles.boldGrid : styles.svcGrid}
      >
        {content.items.map((s, i) => (
          <article
            key={s.name}
            className={bold ? `${styles.boldCard} ${styles.svcBold}` : styles.svcPanel}
            /* A data attribute rather than an inline style: the span values are
               a small fixed set, so CSS can hold them and the markup stays free
               of style attributes. */
            data-span={bold ? spans[i] : undefined}
          >
            {bold && (
              <span className={styles.boldWatermark} aria-hidden>
                {pad(i + 1)}
              </span>
            )}

            {s.image && !bold && (
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
              {bold ? (
                <>
                  {s.tag && <span className={styles.boldTag}>{s.tag}</span>}
                  <h3 className={styles.svcTitle}>{s.name}</h3>
                </>
              ) : (
                <div className={styles.svcCardHead}>
                  <span className={styles.svcIndex} aria-hidden>
                    {pad(i + 1)}
                  </span>
                  <h3 className={styles.svcTitle}>{s.name}</h3>
                </div>
              )}
              <p className={styles.svcText}>{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
