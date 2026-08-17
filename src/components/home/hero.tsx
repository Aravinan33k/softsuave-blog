"use client";

import { useEffect, useRef, useState } from "react";
import { hero } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import Magnetic from "./magnetic";
import styles from "./home.module.css";

/**
 * Hero: a full-bleed looping intro video that CONTRACTS into a centered rounded
 * frame as you scroll (RADIAN-style), while the ultralight-serif headline (with a
 * cycled rotating word) and CTAs hold on top. Load motion is delayed to hand off
 * from the preloader; reduced motion renders it static with no pin/scrub.
 */
export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);
  const veil = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mount the 6 MB background video only after hydration so it never competes
  // with the document/critical assets for initial-load bandwidth (keeps LCP/FCP
  // low). The frame + veil render immediately as the poster.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    let active = true;
    requestAnimationFrame(() => {
      if (active) setMounted(true);
    });
    return () => {
      active = false;
    };
  }, []);

  useGSAP(
    () => {
      const reduce = prefersReducedMotion();
      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.heroLineInner}`);
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.rotWord}`);
      const startDelay = reduce ? 0 : 0.2;

      if (reduce) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(words[0], { yPercent: 0, opacity: 1 });
        return;
      }

      // Load reveal (hands off from preloader).
      const tl = gsap.timeline({ delay: startDelay });
      tl.from(frame.current, { opacity: 0, duration: 1.4, ease: "power2.out" })
        .from(`.${styles.heroEyebrow}`, { opacity: 0, y: 16, duration: 0.7, ease: "power2.out" }, 0.2)
        .from(
          lines,
          { yPercent: 118, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
          0.3,
        )
        .from(`.${styles.heroSub}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.4")
        .from(`.${styles.heroCtaRow}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.5")
        .from(`.${styles.heroScroll}`, { opacity: 0, duration: 0.6 }, "-=0.3");

      // Rotating word cycle.
      gsap.set(words, { yPercent: 110, opacity: 0 });
      const rot = gsap.timeline({ repeat: -1, delay: startDelay + 1.2 });
      words.forEach((w) => {
        rot
          .to(w, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
          .to(w, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power2.in" }, "+=1.5");
      });

      // Scroll: subtle parallax as the hero scrolls out naturally (no pin)
      const exit = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
      exit
        .to(veil.current, { opacity: 0, ease: "none" }, 0)
        .to(content.current, { yPercent: 8, ease: "none" }, 0);

    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} id="top">
      <div ref={frame} className={styles.videoHeroFrame}>
        {mounted && (
          <video
            ref={videoRef}
            className={styles.videoHeroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            onLoadedData={() => ScrollTrigger.refresh()}
          >
            <source src="/videos/intro.webm" type="video/webm" />
            <source src="/videos/intro.mp4" type="video/mp4" />
          </video>
        )}
        <div ref={veil} className={styles.videoHeroVeil} />
      </div>

      <div ref={content} className={styles.heroContent}>
        <span className={styles.heroEyebrow}>✦ From idea to outcome.</span>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>Empowering businesses</span>
          </span>
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              with{" "}
              <span className={styles.rotWrap} aria-hidden>
                {hero.rotatingWords.map((w) => (
                  <span key={w} className={styles.rotWord}>
                    {w}
                  </span>
                ))}
              </span>
              <span className={styles.srOnly}>{hero.rotatingWords.join(", ")}</span>
            </span>
          </span>
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              <em className={styles.heroItalic}>AI</em>, Automation &amp; Integrations
            </span>
          </span>
        </h1>

        <p className={styles.heroSub}>{hero.subtitle}</p>

        <div className={styles.heroCtaRow}>
          <Magnetic>
            <a href={hero.primaryCta.href} className={styles.pillFilled} data-cursor="Book">
              {hero.primaryCta.label}
            </a>
          </Magnetic>
          <Magnetic>
            <a href={hero.secondaryCta.href} className={styles.pill} data-cursor="Explore">
              {hero.secondaryCta.label}
            </a>
          </Magnetic>
        </div>
      </div>

      <div className={styles.heroScroll} aria-hidden>
        <span>Scroll</span>
        <span className={styles.heroScrollLine} />
      </div>
    </section>
  );
}
