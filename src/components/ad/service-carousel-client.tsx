"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import type { CardGridContent } from "@/components/generative-ai/industries";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "@/components/generative-ai/section-head";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./service-carousel.module.css";

/** How long each position holds before the row moves on by one card. */
const DWELL_MS = 3000;

/**
 * The client half of `ServiceCarousel`: the section's standard head, then one
 * row of cards — a tinted icon tile, the name (an H3) and the card's line —
 * with the next card peeking in at the right edge, and a dot per page under
 * it. Four cards in view on a wide screen, then three, two and one.
 *
 * It runs on its own, one card every few seconds, back to the first after
 * the last. The run pauses while the pointer is over the row, while anything
 * in it has focus, while it is off screen and while the tab is hidden; under
 * reduced motion it never starts.
 *
 * Native horizontal scroll with snap, so swipe, trackpad and keyboard work;
 * a dot jumps to its page. Name and line keep the card grid's own type
 * (`gen.indBoldName`, `gen.indBoldBody`), and each card keeps its place in
 * the brand's five-colour card ramp, as on the grid.
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
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  /** One card's stride (its width plus the gap) and whole cards per page. */
  const geometry = useCallback(() => {
    const el = track.current;
    const first = el?.firstElementChild as HTMLElement | null;
    if (!el || !first) return null;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.columnGap) || 0;
    const stride = first.offsetWidth + gap;
    // The visible row, without the right-hand peek (the track runs into the
    // gutter) or the left inset that keeps the cards' shadows unclipped.
    const view = el.clientWidth - (parseFloat(style.paddingLeft) || 0) - (parseFloat(style.paddingRight) || 0);
    const per = Math.max(1, Math.floor((view + gap + 1) / stride));
    return { el, stride, per };
  }, []);

  const measure = useCallback(() => {
    const g = geometry();
    if (!g) return;
    const { el, stride, per } = g;
    const count = Math.max(1, Math.ceil(content.items.length / per));
    const max = el.scrollWidth - el.clientWidth;
    setPages(count);
    setPage(
      el.scrollLeft >= max - 2 ? count - 1 : Math.min(count - 1, Math.round(el.scrollLeft / (stride * per))),
    );
  }, [geometry, content.items.length]);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    measure();
    el.addEventListener("scroll", measure, { passive: true });
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", measure);
      ro.disconnect();
    };
  }, [measure]);

  const go = (to: number) => {
    const g = geometry();
    if (!g) return;
    g.el.scrollTo({ left: to * g.per * g.stride, behavior: reduced ? "auto" : "smooth" });
  };

  /** On by one card; past the last, back to the first. */
  const advance = useCallback(() => {
    const g = geometry();
    if (!g) return;
    const { el, stride } = g;
    const max = el.scrollWidth - el.clientWidth;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (el.scrollLeft >= max - 2) el.scrollTo({ left: 0, behavior });
    else el.scrollTo({ left: Math.min(max, (Math.round(el.scrollLeft / stride) + 1) * stride), behavior });
  }, [geometry, reduced]);

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
      if (!document.hidden) advance();
    }, DWELL_MS);
    return () => window.clearInterval(timer);
  }, [running, advance]);

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
              <li key={item.name} className={styles.slide}>
                <article className={styles.card}>
                  <span className={styles.icon} aria-hidden>
                    {icons[i]}
                  </span>
                  <h3 className={gen.indBoldName}>{item.name}</h3>
                  <p className={gen.indBoldBody}>{item.body}</p>
                </article>
              </li>
            ))}
          </ul>

          {pages > 1 ? (
            <div className={styles.dots}>
              {Array.from({ length: pages }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  className={styles.dot}
                  aria-label={`Show services page ${i + 1} of ${pages}`}
                  aria-current={i === page ? "true" : undefined}
                  onClick={() => go(i)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </FadeUp>
    </section>
  );
}
