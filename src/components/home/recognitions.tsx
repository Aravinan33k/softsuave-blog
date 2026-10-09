"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { recognitions } from "@/lib/home/content";
import { prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import styles from "./home.module.css";

/**
 * Industry Recognitions — the awards band in softsuave.com's own arrangement:
 * the section's copy in a left column, and the directory badges running as a
 * paged strip on the right with a dot per position beneath them.
 *
 * The strip STEPS ONE BADGE at a time rather than a page at a time, which is
 * what the dot count follows: twelve badges four-up gives nine positions, not
 * three. Every dot is a real control, so the strip is reachable without a drag.
 *
 * The strip ADVANCES ITSELF, one badge every `DWELL` ms, wrapping back to the
 * start at the end — twelve recognitions are worth more than the four a
 * viewport shows, and the reader should not have to drag to see them. It is a
 * nudge, never a takeover: pointer over the strip or keyboard focus inside it
 * pauses, touching or clicking a dot restarts the dwell so the strip never
 * moves out from under a deliberate choice, and reduced motion switches it off
 * entirely (the dots remain the full control).
 *
 * It is a genuine horizontal scroller rather than a transform, so a swipe or a
 * trackpad gesture moves it too and every badge stays reachable with JavaScript
 * idle. The resting positions are measured from the DOM rather than assumed, so
 * the dots stay truthful at any width.
 *
 * The full wall used to live here, collapsed to `height: 0` behind a "View All"
 * toggle. It has its own page now (`/awards-recognition`), so "View All" is a
 * link to it and the collapse — with the GSAP timeline that drove it — is gone.
 *
 * Each badge is real directory artwork (bundled under /public/brand/awards) with
 * a white ground baked in, so it sits on a light plaque rather than being
 * recoloured. On this section's warm-white band `.light .recogBadge` gives that
 * plaque a hairline so it still separates from the surface. An item
 * with no `src` falls back to the coral seal, so a new recognition can land
 * before its artwork does.
 */
/** Dwell on each badge before advancing, ms. */
const DWELL = 3200;

export default function Recognitions() {
  const viewport = useRef<HTMLUListElement | null>(null);
  const [index, setIndex] = useState(0);
  /** One dot per resting position — measured, never assumed. */
  const [positions, setPositions] = useState(1);
  /** Pointer over the strip, or focus inside it. */
  const [paused, setPaused] = useState(false);
  /** Bumped by a deliberate interaction to restart the dwell from now. */
  const [restart, setRestart] = useState(0);

  /** Distance between two badge starts, read from the DOM so the gap and the
   *  clamped badge width can change without touching this. */
  const stepWidth = () => {
    const el = viewport.current;
    const cells = el?.querySelectorAll<HTMLElement>(`.${styles.recogStripItem}`);
    if (!el || !cells || cells.length === 0) return 0;
    if (cells.length > 1) return cells[1].offsetLeft - cells[0].offsetLeft;
    return cells[0].offsetWidth;
  };

  const goTo = useCallback((i: number) => {
    const el = viewport.current;
    if (!el) return;
    const step = stepWidth();
    if (step <= 0) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    el.scrollTo({ left: Math.min(i * step, max), behavior: "smooth" });
  }, []);

  /**
   * One step right, wrapping at the end.
   *
   * The current position is measured from `scrollLeft` at the moment the timer
   * fires rather than read from `index`, for the same reason the dot count is
   * measured: it cannot then disagree with where the strip actually is, so a
   * manual scroll mid-dwell is picked up instead of fought.
   */
  const advance = useCallback(() => {
    const el = viewport.current;
    if (!el) return;
    const step = stepWidth();
    if (step <= 0) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const atEnd = max - el.scrollLeft < 2;
    const next = atEnd ? 0 : Math.round(el.scrollLeft / step) + 1;
    el.scrollTo({ left: Math.min(next * step, max), behavior: "smooth" });
  }, []);

  // The auto-advance. `restart` is a dependency so a dot click or a touch
  // rebuilds the interval, giving the reader a full dwell on what they chose
  // instead of whatever was left of the previous tick.
  useEffect(() => {
    if (positions <= 1 || paused || prefersReducedMotion()) return;
    const id = window.setInterval(advance, DWELL);
    return () => window.clearInterval(id);
  }, [positions, paused, advance, restart]);

  // How many resting positions there are, and which one the strip is on after a
  // manual scroll or a resize — so the dots never offer a position that is not
  // reachable, or light the wrong one.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;

    const measure = () => {
      const step = stepWidth();
      const max = Math.max(0, el.scrollWidth - el.clientWidth);
      setPositions(step > 0 && max > 1 ? Math.ceil(max / step) + 1 : 1);
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const step = stepWidth();
        if (step <= 0) return;
        const max = Math.max(0, el.scrollWidth - el.clientWidth);
        // The last step is a short one, so "within a pixel of the end" is the
        // final position — rounding by step width would light the dot before it.
        setIndex(
          max - el.scrollLeft < 2
            ? Math.max(0, Math.ceil(max / step))
            : Math.round(el.scrollLeft / step),
        );
      });
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={`${styles.section} ${styles.recog}`} id="awards">
      <div className={styles.recogLayout}>
        <div className={styles.recogIntro}>
          {/* light-band variant: the section sits in a `.light` wrapper */}
          <span className={styles.eyebrowDark}>{recognitions.eyebrow}</span>
          <SplitReveal as="h2" className={styles.h2} type="words">
            {recognitions.title}
          </SplitReveal>
          <p className={styles.lead}>{recognitions.body}</p>
          <Link className={styles.recogViewAll} href={recognitions.cta.href} data-cursor="Open">
            {recognitions.cta.label}
            <svg viewBox="0 0 34 8" aria-hidden className={styles.recogArrow}>
              <path
                d="M0 4h31M27 1l4 3-4 3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <FadeUp className={styles.recogShowcase}>
          <ul
            ref={viewport}
            className={styles.recogStrip}
            tabIndex={0}
            role="group"
            aria-label="Industry recognitions"
            /* Which edges are clipped, so the fade mask only covers an edge
               that actually has more badges behind it. */
            data-at-start={index === 0 || undefined}
            data-at-end={index >= positions - 1 || undefined}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            onPointerDown={() => setRestart((n) => n + 1)}
          >
            {recognitions.items.map((item) => (
              <li key={item.key} className={styles.recogStripItem}>
                {item.src ? (
                  <span className={styles.recogBadge}>
                    {/* the wording and issuer are spoken by the text beside it,
                        so the artwork itself adds nothing for a screen reader */}
                    <Image
                      src={publicMediaUrl(item.src)}
                      alt=""
                      fill
                      sizes="150px"
                      className={styles.recogBadgeImg}
                    />
                  </span>
                ) : (
                  <span className={styles.recogSeal} aria-hidden>
                    <svg viewBox="0 0 44 44">
                      <circle className={styles.recogRing} cx="22" cy="19" r="13" />
                      <path
                        d="M22 12.4l2 4.1 4.5.7-3.2 3.2.7 4.5-4-2.1-4 2.1.7-4.5-3.2-3.2 4.5-.7z"
                        fill="var(--accent)"
                      />
                      <path
                        d="M16.5 31.5l2.8-5M27.5 31.5l-2.8-5"
                        fill="none"
                        stroke="var(--accent)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                )}
                {/* The badge is decorative artwork, so what it stands for is
                    carried here instead — otherwise the strip is twelve
                    unlabelled images to anything that cannot see them. */}
                <span className={styles.srOnly}>
                  {item.title} &mdash; {item.org}
                  {item.year ? `, ${item.year}` : ""}
                </span>
              </li>
            ))}
          </ul>

          {positions > 1 ? (
            <div className={styles.recogDots}>
              {Array.from({ length: positions }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={`${styles.recogDot} ${i === index ? styles.recogDotOn : ""}`}
                  onClick={() => {
                    setRestart((n) => n + 1);
                    goTo(i);
                  }}
                  aria-label={`Show recognitions from ${i + 1}`}
                  aria-current={i === index || undefined}
                />
              ))}
            </div>
          ) : null}
        </FadeUp>
      </div>
    </section>
  );
}
