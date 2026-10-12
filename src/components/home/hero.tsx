"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { hero } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import styles from "./home.module.css";

/**
 * The intro video's first frame at 40px wide (~600 bytes), inlined so it paints
 * with the page — blurred under the veil it is the hero's backdrop until the
 * video (4.7 MB, mounted after hydration) has frames to show. Without it the
 * hero sat on flat black for seconds and then changed completely when the
 * video arrived, which PageSpeed scores as a slow Speed Index (BUG-026).
 */
const POSTER = "data:image/webp;base64,UklGRrwBAABXRUJQVlA4ILABAADwCACdASooABYAPtFaoU2oJKKiKqoBABoJQBOmeYeEIZ890eAMr3gBxV9+FgsPIEM20mHSOaMoKV8pynCx21/EvXtQTLoyfBMg+nwVrarHAAD+0jxEzg/NtBI8F2peSXye+1suaxvdNScVshNoSfbo6jjwIYECYTQjMWTOu3I1m9cSaROiM2hehuHbtvVv/XuSb6KRgXBf19EafIG74h747umcffXK/SbQgJMCI7SvsMJbTRU2V3rR2Hax/iDS+vD5g3xgkiAJGhn2mi34PxBkmajRbUNZqaR3U6Oz/oYjhGKpiS3Bevtr2hP5vqZ6spuUUvzpwEry23ANHdWcjuXQSsVY3FX3mwt4741gYUxdIC1bcAsLsm2J6yVj+A8S8T+7UqjZWCezzfqab3/jp/JHriejmlxr97Cj/jONMplBMyJc0GNyqtS7hlS0PWTjjy9HoaA2/xFWVheS+BSSEz3E2TwK8sFYs9Sq1/rI71MJ0c1AXq+x6M6iVnsdNdVCGYaz/azM07aq6TrgEjMX0vlgiKmFUhmWpn5YKLqZnech4qrKced9h3pDd9X1qYICgAA=";

/**
 * How much of the CSS intro overlay (`preloader.tsx`) is still to play, in ms —
 * 0 once it has cleared, or if it never ran (reduced motion, already
 * unmounted).
 */
function introRemainingMs(): number {
  const overlay = document.querySelector<HTMLElement>(`.${styles.preloader}`);
  const fade = overlay?.getAnimations()[0];
  if (!fade || fade.playState === "finished") return 0;
  const end = Number(fade.effect?.getComputedTiming().endTime ?? 0);
  return Math.max(0, end - Number(fade.currentTime ?? 0));
}

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

      if (reduce) {
        gsap.set(lines, { yPercent: 0 });
        gsap.set(words[0], { yPercent: 0, opacity: 1 });
        return;
      }

      // Load reveal — only while the intro still covers the hero (BUG-026).
      // The intro now clears itself at ~1s in CSS, so on a slow phone this
      // script runs AFTER the hero copy is already on screen; replaying the
      // reveal then would hide visible text and fade it back in (PageSpeed
      // counted the hero as painted only once that finished). Late, the copy
      // simply stays put; early, the reveal starts as the intro fades out.
      const covered = introRemainingMs();
      const reveal = covered > 150;
      const startDelay = reveal ? Math.max(0, covered / 1000 - 0.25) : 0;
      if (reveal) {
        const tl = gsap.timeline({ delay: startDelay });
        tl.from(frame.current, { opacity: 0, duration: 1.4, ease: "power2.out" })
          .from(
            lines,
            { yPercent: 118, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.08 },
            0.3,
          )
          .from(`.${styles.heroSub}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.4")
          .from(`.${styles.heroCtaRow}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.5")
          .from(`.${styles.heroScroll}`, { opacity: 0, duration: 0.6 }, "-=0.3");
      }

      // Rotating word cycle. After a reveal it starts from an empty slot, as
      // before; without one, the first word is already showing (CSS), so the
      // cycle picks up with it fully in rather than blinking it out and back.
      gsap.set(words, { yPercent: 110, opacity: 0 });
      const rot = gsap.timeline({ repeat: -1, delay: reveal ? startDelay + 1.2 : 0 });
      words.forEach((w) => {
        rot
          .to(w, { yPercent: 0, opacity: 1, duration: 0.6, ease: "power3.out" })
          .to(w, { yPercent: -110, opacity: 0, duration: 0.55, ease: "power2.in" }, "+=1.5");
      });
      if (!reveal) rot.time(0.6);

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
        <div className={styles.videoHeroPoster} style={{ backgroundImage: `url(${POSTER})` }} aria-hidden />
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
            <source src={publicMediaUrl("/videos/intro.webm")} type="video/webm" />
            <source src={publicMediaUrl("/videos/intro.mp4")} type="video/mp4" />
          </video>
        )}
        <div ref={veil} className={styles.videoHeroVeil} />
      </div>

      <div ref={content} className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>Empowering businesses</span>
          </span>{" "}
          {/* The spaces between lines are for anything reading the text rather
              than the layout — crawlers, SEO audits — which otherwise got
              "businesseswith". Each line is a block, so they render as nothing. */}
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              with{" "}
              {/* The visible words are drawn from `data-word` by CSS, so they are
                  not document text: aria-hidden hides them from screen readers
                  but not from textContent, and crawlers read the H1 as
                  "ScalableIntelligentScalable, Intelligent". The sr-only line
                  below is now the H1's one copy of them. */}
              <span className={styles.rotWrap} aria-hidden>
                {hero.rotatingWords.map((w) => (
                  <span key={w} className={styles.rotWord} data-word={w} />
                ))}
              </span>
              <span className={styles.srOnly}>{hero.rotatingWords.join(", ")}</span>
            </span>
          </span>{" "}
          <span className={styles.heroLine}>
            <span className={styles.heroLineInner}>
              <em className={styles.heroItalic}>AI</em>, Automation &amp; Integrations
            </span>
          </span>
        </h1>

        <p className={styles.heroSub}>{hero.subtitle}</p>

        <div className={styles.heroCtaRow}>
          <Link href={hero.primaryCta.href} className={styles.pillFilled} data-cursor="Book">
            {hero.primaryCta.label}
          </Link>
          {/* A real route now (see `hero.secondaryCta`), so it goes through
              next/link and picks up `basePath` — a plain <a> would resolve
              outside the /blog mount in production. */}
          <Link href={hero.secondaryCta.href} className={styles.pill} data-cursor="Explore">
            {hero.secondaryCta.label}
          </Link>
        </div>
      </div>

      <div className={styles.heroScroll} aria-hidden>
        <span>Scroll</span>
        <span className={styles.heroScrollLine} />
      </div>
    </section>
  );
}
