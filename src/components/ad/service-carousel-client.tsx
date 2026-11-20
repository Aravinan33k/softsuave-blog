"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { CardGridContent } from "@/components/generative-ai/industries";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import gen from "@/components/generative-ai/gen-ai.module.css";
import home from "@/components/home/home.module.css";
import styles from "./service-carousel.module.css";

/** How long each position holds before the row moves on by one card. */
const DWELL_MS = 3000;

/**
 * Copies of the first cards set after the last, so the loop runs on forward
 * from the last card into the first instead of scrolling back over every
 * card. As many as the widest view shows (`--per` at 1280px and up).
 */
const CLONES = 4;

/** How long the row must be still before a stop inside the copies is swapped for the real cards. */
const SETTLE_MS = 140;

/**
 * The client half of `ServiceCarousel`: the section's standard head, then one
 * row of cards — a tinted icon tile, the name (an H3) and the card's line —
 * with the next card peeking in at the right edge, and the Experts section's
 * arrow pair under it on the right (`SkillCarousel`: the client stories'
 * boxed arrows, same classes). Four cards in view on a wide screen, then
 * three, two and one.
 *
 * It moves ONE card at a time: on its own every few seconds, and per click of
 * an arrow. Both directions loop without running back over the row: past the
 * last card it moves on into copies of the first cards (hidden from assistive
 * tech and focus) and, once still, is swapped without motion for the real
 * ones; back from the first card it is first swapped to those copies, then
 * moves back one onto the last card.
 *
 * The auto-advance pauses while the pointer is over the row, while anything in
 * it has focus, while it is off screen and while the tab is hidden; under
 * reduced motion it never starts and every move is a jump, not a glide.
 *
 * Native horizontal scroll with snap underneath, so swipe and trackpad work
 * too. Name and line keep the card grid's own type (`gen.indBoldName`,
 * `gen.indBoldBody`), and each card keeps its place in the brand's
 * five-colour card ramp, as on the grid.
 */
export default function ServiceCarouselClient({
  content,
  id,
  icons,
}: {
  content: CardGridContent;
  id: string;
  icons: readonly ReactNode[];
}) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const settle = useRef<number | undefined>(undefined);
  const count = content.items.length;
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  /** One card's stride: its width plus the gap, measured unrounded. */
  const stride = useCallback(() => {
    const el = track.current;
    const [a, b] = el ? [el.children[0], el.children[1]] : [];
    if (!a || !b) return 0;
    return b.getBoundingClientRect().left - a.getBoundingClientRect().left;
  }, []);

  // Stopped inside the copies (after an arrow, the autoplay or a swipe):
  // swap to the same place among the real cards.
  useEffect(() => {
    const el = track.current;
    if (!el || count < 2) return;
    const onScroll = () => {
      window.clearTimeout(settle.current);
      settle.current = window.setTimeout(() => {
        const s = stride();
        if (s && el.scrollLeft >= count * s - 2) el.scrollTo({ left: el.scrollLeft - count * s, behavior: "auto" });
      }, SETTLE_MS);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.clearTimeout(settle.current);
    };
  }, [count, stride]);

  /** Move one card either way, looping at both ends. */
  const step = useCallback(
    (dir: 1 | -1) => {
      const el = track.current;
      const s = stride();
      if (!el || !s) return;
      const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
      // Snap to the card boundary, so a half-swiped row lands whole.
      let at = Math.round(el.scrollLeft / s);
      if (dir === -1 && at <= 0) {
        // Back from the first card: jump to its copy (the same view), then
        // move back one onto the last card.
        at = count;
        el.scrollTo({ left: at * s, behavior: "auto" });
      }
      const to = (at + dir) * s;
      requestAnimationFrame(() => el.scrollTo({ left: to, behavior }));
    },
    [stride, reduced, count],
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
  const running = visible && !hovered && !focused && !reduced && count > 1;
  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) step(1);
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [running, step]);

  const card = (i: number) => {
    const item = content.items[i];
    return (
      <article className={styles.card}>
        <span className={styles.icon} aria-hidden>
          {icons[i]}
        </span>
        <h3 className={gen.indBoldName}>{item.name}</h3>
        <p className={gen.indBoldBody}>{item.body}</p>
      </article>
    );
  };

  const clones = count > 1 ? Math.min(CLONES, count) : 0;

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
            {content.items.map((item, i) => (
              <li key={item.name} className={styles.slide} data-tone={(i % 5) + 1}>
                {card(i)}
              </li>
            ))}
            {Array.from({ length: clones }, (_, i) => (
              <li key={`copy-${i}`} className={styles.slide} data-tone={(i % 5) + 1} aria-hidden inert>
                {card(i)}
              </li>
            ))}
          </ul>

          {count > 1 ? (
            // The Experts section's arrow pair (`SkillCarousel`), as it draws it.
            <div className={styles.controls}>
              <div className={home.rArrows}>
                <button type="button" className={home.rArrowBtn} onClick={() => step(-1)} aria-label="Previous service">
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
                <button type="button" className={home.rArrowBtn} onClick={() => step(1)} aria-label="Next service">
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
          ) : null}
        </div>
      </FadeUp>
    </section>
  );
}
