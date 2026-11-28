"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import home from "@/components/home/home.module.css";
import styles from "./home-v2.module.css";
import cta from "@/components/common/cta-row.module.css";

/**
 * The hero's backdrop: a still of a human hand meeting a robot hand, in the
 * brand's navy with a coral spark. It replaced the particle video (28 Oct).
 * 2560x1440, upscaled (Lanczos) from the 1672x941 original with a light local
 * contrast pass and an edge sharpen thresholded to leave flat areas alone.
 * Served at quality 90 (allowed in next.config.ts), since 75 visibly softened
 * it. It is the LCP element, so it preloads; the 24px blur paints until it
 * arrives. A new file name whenever the picture changes: browsers cache it by
 * URL.
 */
const IMAGE = "/images/four/hero-ai-touch-v4.webp";
const IMAGE_BLUR = "data:image/webp;base64,UklGRo4AAABXRUJQVlA4IIIAAACwAwCdASoYAA4ALplotFoiqCgoCACYSyAE6ZQANT+DpqJ28DcQAAD++u0d4paXW4yuPNCrP+Y+0aVScFtvbwDaW4ihBh0bCpTzTi+vr7FsWKFUFI7lP4OnUyMJPQTJHGh9WIPgAJMg3cG/zjxxmPYwovRrS3fubBxdhgsgdlIXqAAA";

/** How much of the CSS intro overlay is still to play, in ms (see home/hero.tsx). */
function introRemainingMs(): number {
  const overlay = document.querySelector<HTMLElement>(`.${home.preloader}`);
  const fade = overlay?.getAnimations()[0];
  if (!fade || fade.playState === "finished") return 0;
  const end = Number(fade.effect?.getComputedTiming().endTime ?? 0);
  return Math.max(0, end - Number(fade.currentTime ?? 0));
}

/**
 * Homepage hero (`/`). The homepage's copy, restaged:
 *
 * - Its own still (see IMAGE) under a veil weighted to the copy's side, so
 *   the headline reads first and the two hands stay clear on the right.
 * - The headline with the rotating word in the brand gradient (clipped to its
 *   own slot, so a word in transit never draws over the lines around it), and
 *   larger CTAs. No kicker pill over the headline since the 21 Oct review (it
 *   read "AI-Enabled Engineering").
 */
export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const words = gsap.utils.toArray<HTMLElement>(`.${styles.rotWord}`);

      if (prefersReducedMotion()) {
        gsap.set(words[0], { yPercent: 0, opacity: 1 });
        return;
      }

      const covered = introRemainingMs();
      const reveal = covered > 150;
      const startDelay = reveal ? Math.max(0, covered / 1000 - 0.25) : 0;
      // The frame, lines, subtitle and CTAs reveal in CSS from the first
      // paint, timed to the preloader's own CSS fade (home-v2.module.css). As
      // this timeline at hydration they kept the page's main content hidden
      // until every script had loaded (PageSpeed LCP, 15 Oct).

      // Rotating word: in from below, hold, out the top — inside its clip.
      gsap.set(words, { yPercent: 105, opacity: 0 });
      const rot = gsap.timeline({ repeat: -1, delay: reveal ? startDelay + 1.2 : 0 });
      words.forEach((w) => {
        rot
          .to(w, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
          .to(w, { yPercent: -105, opacity: 0, duration: 0.5, ease: "power2.in" }, "+=1.8");
      });
      if (!reveal) rot.time(0.6);

      // Gentle parallax on the copy as the hero scrolls away. The veil stays,
      // so the copy keeps its contrast all the way out.
      gsap.to(content.current, {
        yPercent: 6,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 1 },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} id="top">
      <div ref={frame} className={`${home.videoHeroFrame} ${styles.heroFrame}`}>
        <Image
          src={publicMediaUrl(IMAGE)}
          alt=""
          fill
          preload
          sizes="100vw"
          quality={90}
          placeholder="blur"
          blurDataURL={IMAGE_BLUR}
          className={styles.heroImage}
        />
        <div className={styles.heroVeil} aria-hidden />
      </div>

      <div ref={content} className={styles.heroInner}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>Empowering businesses</span>
          </span>{" "}
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              with{" "}
              {/* Drawn from `data-word` by CSS, so the H1's text carries the
                  words once, through the sr-only line (see home/hero.tsx). */}
              <span className={styles.rot} aria-hidden>
                {hero.rotatingWords.map((w) => (
                  <span key={w} className={styles.rotWord} data-word={w} />
                ))}
              </span>
              <span className={home.srOnly}>{hero.rotatingWords.join(", ")}</span>
            </span>
          </span>{" "}
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              <em className={styles.heroItalic}>AI</em>, Automation &amp; Integrations
            </span>
          </span>
        </h1>

        <p className={styles.heroSub}>{hero.subtitle}</p>

        <div className={`${styles.heroCtas} ${cta.ctaPair}`}>
          <Link href={hero.primaryCta.href} className={home.pillFilled}>
            {hero.primaryCta.label}
            <ArrowUpRight className={styles.heroCtaArrow} strokeWidth={2.2} aria-hidden />
          </Link>
          <Link href={hero.secondaryCta.href} className={home.pill}>
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
