"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { hero } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import { useAfterLoad } from "@/components/home/use-deferred-media";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import home from "@/components/home/home.module.css";
import styles from "./home-v2.module.css";

/**
 * The hero video's first frame at 48px wide (~450 bytes), inlined so it paints
 * with the page — blurred, it is the hero's backdrop until the video has
 * frames to show (the same trick as the homepage's hero; BUG-026).
 */
const POSTER = "data:image/webp;base64,UklGRkQBAABXRUJQVlA4IDgBAACQBwCdASowABsAPrVOn0unJCKhqqoA4BaJYgCnR6UBdscHRP8mUz1YkQxSnV7AFkSsQEhRy3BaiLoAoIg936/LcU2Cm6AA/v3ay80reahOrunnTu0jkPFYzBmQg4G4jvQPBUH18a2TlbQGzE2yDsMeqtsvaGfrai6dQB1sqeH03+PReiqc4CknCp61k/T2ZAbm4cJ+e+FAEKwfiiN59SOTUgiUqheKS9zUIy9PnhFLqw7DI8x4KnPO7mdSPFJEzKbwZG8apLoqaLFQxXyd8wW08CLmfdgNbc6bPLt9/FeDG0rz/1UfxDgzqG4dCdIYbG4UDoAy8xBnm9TIffk7JpkyHRUCEwtVv5uY8IoFtqkDUZ0q8zlAfwJ3deS/atjND7+0HMV2LW5O+R4cV5pEE64IG9Nvql6i8AA=";

/**
 * The hero's footage: warm, glowing particles drifting slowly through the dark
 * — the brand's own coral and amber, calm enough to sit behind the headline.
 * Pexels video 8551791 by TP Motion (Pexels licence: free to use, no
 * attribution required), re-encoded for the web with its last second
 * dissolved into its first, so the loop has no seam. WebM first, MP4 for
 * Safari. A new file name whenever the footage changes: browsers cache it by
 * URL.
 */
const VIDEO = { webm: "/videos/hero-particles.webm", mp4: "/videos/hero-particles.mp4" } as const;

/** Slowed a touch: a backdrop should drift, not race. */
const PLAYBACK_RATE = 0.8;

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
 * - Its own single, seamless video (see VIDEO), dimmed under a veil weighted
 *   to the copy's side, so the headline reads first.
 * - A kicker pill, the headline with the rotating word in the brand gradient
 *   (clipped to its own slot, so a word in transit never draws over the lines
 *   around it), and larger CTAs.
 */
export default function Hero() {
  const root = useRef<HTMLElement | null>(null);
  const frame = useRef<HTMLDivElement | null>(null);
  const content = useRef<HTMLDivElement | null>(null);

  // Mount the video once the page has loaded and gone idle: its 2.2 MB must
  // never compete with the hero's CSS, fonts and copy (PageSpeed, 15 Oct). The
  // poster underneath is its first frame, so the swap is invisible.
  const mounted = useAfterLoad();

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
      // The frame, kicker, lines, subtitle and CTAs reveal in CSS from the first
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
        <div className={styles.heroPoster} style={{ backgroundImage: `url(${POSTER})` }} aria-hidden />
        {mounted && (
          <video
            className={styles.heroVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden
            onLoadedMetadata={(e) => {
              e.currentTarget.defaultPlaybackRate = PLAYBACK_RATE;
              e.currentTarget.playbackRate = PLAYBACK_RATE;
            }}
            onLoadedData={() => ScrollTrigger.refresh()}
          >
            <source src={publicMediaUrl(VIDEO.webm)} type="video/webm" />
            <source src={publicMediaUrl(VIDEO.mp4)} type="video/mp4" />
          </video>
        )}
        <div className={styles.heroVeil} aria-hidden />
      </div>

      <div ref={content} className={styles.heroInner}>
        <p className={styles.heroKicker}>
          <span className={styles.heroKickerDot} aria-hidden />
          {hero.eyebrow}
        </p>

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

        <div className={styles.heroCtas}>
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
