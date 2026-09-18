"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { why } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import FadeUp from "./fade-up";
import styles from "./home.module.css";

/**
 * "Why Soft Suave" intro — an editorial header that sits directly above the
 * stacking proof cards. A one-shot masked word reveal (no pin, so the cards are
 * only a short scroll away), then the supporting paragraph rises in. The years
 * figure lives in the stat cards below, so it isn't repeated here.
 * Reduced motion leaves the text static.
 */
export default function Manifesto() {
  const section = useRef<HTMLElement | null>(null);
  const stmt = useRef<HTMLHeadingElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !stmt.current) return;

      const split = new SplitType(stmt.current, { types: "lines,words" });
      gsap.set(split.lines, {
        overflow: "hidden",
        clipPath: "inset(-12% 0% -40% 0%)",
        paddingBottom: "0.28em",
        marginBottom: "-0.28em",
      });
      gsap.set(split.words ?? [], { yPercent: 112, opacity: 0 });
      gsap.to(split.words ?? [], {
        yPercent: 0,
        opacity: 1,
        ease: "expo.out",
        stagger: 0.045,
        duration: 0.7,
        scrollTrigger: { trigger: stmt.current, start: "top 84%", once: true },
      });

      return () => split.revert();
    },
    { scope: section },
  );

  return (
    <section ref={section} className={styles.whyIntro}>
      <div className={styles.whyIntroInner}>
        <div className={styles.whyIntroMain}>
          {/* light-band variant: the section sits in the page's `.light` wrapper */}
          <span className={styles.eyebrowDark}>{why.eyebrow}</span>
          <h2 ref={stmt} className={styles.whyStatement}>
            {why.title}
          </h2>
        </div>
        <div className={styles.whyIntroFoot}>
          <FadeUp className={styles.whyIntroBody}>
            <p>{why.body}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
