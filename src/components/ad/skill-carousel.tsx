"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { SiteLink } from "@/themes/softsuave/site-link";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import gen from "@/components/generative-ai/gen-ai.module.css";
import home from "@/components/home/home.module.css";
import styles from "./skill-carousel.module.css";

/** How long each position holds before the row moves on by one card. */
const DWELL_MS = 3000;

export interface SkillCarouselContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly blocks: readonly {
    readonly label: string;
    readonly image?: { readonly src: string; readonly alt: string };
  }[];
  /** The button on every card ("Hire Now"). An `#id` opens the page's popup. */
  readonly cta: { readonly label: string; readonly href: string };
}

/**
 * The skills row of an /ad page as a running carousel: the section's standard
 * head, then one row of cards — an icon tile, the skill (an H3) and the card's
 * button. Five cards in view on a wide screen, four, three and two as it
 * narrows, and on a phone one card with the next peeking in.
 *
 * It moves ONE card at a time: on its own every few seconds, and per click of
 * the arrow pair under the row (the client stories' boxed arrows, same
 * classes). Both wrap — past the last card it returns to the first, and back
 * from the first it goes to the end.
 *
 * The auto-advance pauses while the pointer is over the row, while anything in
 * it has focus, while it is off screen and while the tab is hidden; under
 * reduced motion it never starts and every move is a jump, not a glide.
 *
 * Native horizontal scroll with snap underneath, so swipe and trackpad work
 * too. Head, card title type and button are the shared ones (`SectionHead`,
 * `gen.indBoldName`, `gen.btn` + `gen.btnPrimary`).
 */
export default function SkillCarousel({ content, id }: { content: SkillCarouselContent; id: string }) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  /** One card's stride: its width plus the gap. */
  const stride = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return 0;
    return first.offsetWidth + (parseFloat(getComputedStyle(el).columnGap) || 0);
  }, []);

  /** Move one card either way, wrapping at the ends. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const el = track.current;
      const s = stride();
      if (!el || !s) return;
      const max = el.scrollWidth - el.clientWidth;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      if (dir === 1 && el.scrollLeft >= max - 2) {
        el.scrollTo({ left: 0, behavior });
      } else if (dir === -1 && el.scrollLeft <= 2) {
        el.scrollTo({ left: max, behavior });
      } else {
        // Snap to the card boundary, so a half-swiped row lands whole.
        const at = Math.round(el.scrollLeft / s);
        el.scrollTo({ left: Math.min(max, Math.max(0, (at + dir) * s)), behavior });
      }
    },
    [stride, reduced],
  );

  // Reduced motion, read live.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Only run while the row is on screen.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // The auto-advance itself.
  const running = visible && !hovered && !focused && !reduced;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [running, step]);

  const { cta } = content;

  return (
    <section className={gen.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div
          ref={root}
          className={styles.carousel}
          role="region"
          aria-roledescription="carousel"
          aria-label={content.title}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocus={() => setFocused(true)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
          }}
        >
          <ul ref={track} className={styles.track}>
            {content.blocks.map((b) => (
              <li key={b.label} className={styles.slide}>
                <article className={styles.card}>
                  {b.image ? (
                    <span className={styles.icon} aria-hidden>
                      <Image
                        src={publicMediaUrl(b.image.src)}
                        alt=""
                        width={40}
                        height={40}
                        unoptimized
                        className={styles.iconImg}
                      />
                    </span>
                  ) : null}
                  <h3 className={`${gen.indBoldName} ${styles.name}`}>{b.label}</h3>
                  {cta.href.startsWith("#") ? (
                    // An in-page target stays a plain <a>: the ad pages' popup
                    // (and Lenis) listen for those; SiteLink would treat "#trial"
                    // as a site path.
                    <a
                      href={cta.href}
                      className={`${gen.btn} ${gen.btnPrimary} ${styles.cta}`}
                      aria-label={`${cta.label}: ${b.label}`}
                    >
                      {cta.label}
                    </a>
                  ) : (
                    <SiteLink
                      href={cta.href}
                      className={`${gen.btn} ${gen.btnPrimary} ${styles.cta}`}
                      aria-label={`${cta.label}: ${b.label}`}
                    >
                      {cta.label}
                    </SiteLink>
                  )}
                </article>
              </li>
            ))}
          </ul>

          {/* The client stories' arrow pair, as they draw it. */}
          <div className={styles.controls}>
            <div className={home.rArrows}>
              <button
                type="button"
                className={home.rArrowBtn}
                onClick={() => step(-1)}
                aria-label="Previous skill"
              >
                <svg viewBox="0 0 34 8" aria-hidden focusable="false" className={home.rArrow}>
                  <path
                    d="M34 4H3M7 1L3 4l4 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                type="button"
                className={home.rArrowBtn}
                onClick={() => step(1)}
                aria-label="Next skill"
              >
                <svg viewBox="0 0 34 8" aria-hidden focusable="false" className={home.rArrow}>
                  <path
                    d="M0 4h31M27 1l4 3-4 3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
