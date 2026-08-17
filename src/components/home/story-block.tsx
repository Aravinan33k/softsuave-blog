"use client";

import { useRef } from "react";
import BrandImage from "./brand-image";
import { valueProps, why } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import styles from "./home.module.css";

/**
 * Cream inversion block — the light-on-dark contrast moment, staged as a
 * cinematic entrance: the whole cream panel wipes in left→right via a scrubbed
 * clip-path, the `story` image settles from scale 1.15→1 with a vertical drift,
 * and a large pull-quote reveals word-by-word. Reduced motion renders it static
 * (fully visible, no clip, no scrub).
 */
export default function StoryBlock() {
  const section = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !section.current || !root.current) return;

      // Cream panel wipes in as the section scrolls up into view (scrubbed).
      gsap.fromTo(
        section.current,
        { clipPath: "inset(0% 100% 0% 0%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          ease: "none",
          scrollTrigger: {
            trigger: section.current,
            start: "top 88%",
            end: "top 32%",
            scrub: true,
          },
        },
      );

      // Image scales down + drifts as the block passes (scrubbed).
      gsap.fromTo(
        `.${styles.storyMedia} img`,
        { scale: 1.15, yPercent: -7 },
        {
          scale: 1,
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: section },
  );

  return (
    <section ref={section} className={styles.cream} id="story">
      <div ref={root} className={styles.creamInner}>
        <div className={styles.storyText} data-skew>
          <span className={styles.eyebrowDark}>{why.eyebrow}</span>
          <SplitReveal as="h2" className={styles.storyH} type="words" stagger={0.045}>
            {valueProps[0].title}
          </SplitReveal>
          <p className={styles.storyBody}>{valueProps[0].body}</p>
          <div className={styles.storyProps}>
            {valueProps.map((v, i) => (
              <div key={v.title} className={styles.storyProp}>
                <span className={styles.storyPropNum}>0{i + 1}</span>
                <div>
                  <h3 className={styles.storyPropTitle}>{v.title}</h3>
                  <p className={styles.storyPropBody}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.storyMediaWrap}>
          <div className={styles.storyMedia}>
            <BrandImage
              page="four"
              id="story"
              fill
              sizes="(max-width: 1000px) 100vw, 42vw"
              className="object-cover"
            />
          </div>
          <span className={styles.storyCaption}>Est. 2012 · A KiwiTech Affiliate Company</span>
        </div>
      </div>

      <div className={styles.storyQuoteWrap}>
        <span className={styles.storyQuoteMark} aria-hidden>
          &ldquo;
        </span>
        <SplitReveal as="blockquote" className={styles.storyQuote} type="words" stagger={0.05}>
          {why.title}
        </SplitReveal>
      </div>
    </section>
  );
}
