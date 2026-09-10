"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import FadeUp from "../fade-up";
import ReviewStory from "./review-story";
import { pad } from "./review-shared";
import type { NumberedReview } from "./review-shared";
import styles from "../home.module.css";

/** How long each story holds before the next takes the slot, ms. A quote has
 *  to be read, not glanced at, so this is well over the badge strip's dwell. */
const DWELL = 7000;

/**
 * The client stories, shown one at a time in a single slot.
 *
 * The slot is the opening story's layout — photograph left, tall frame, quote
 * unclamped — and every story takes that same template in turn, so the section
 * keeps the first story's footprint instead of running six rows down the page.
 * Nothing about a story's own typography or grid changes here; only WHICH story
 * is showing does.
 *
 * Every story is rendered and stacked on one grid cell, with all but the active
 * one hidden. That is what gives the slot a fixed height: it is as tall as the
 * longest quote, so the section never jumps when a shorter one takes over.
 *
 * The slot advances on a dwell, and stops whenever the reader is engaged with
 * it — pointer over it, focus inside it, a video review playing — or has
 * scrolled it out of view, or has pressed pause. Reduced motion turns the
 * auto-advance off altogether; the arrows and dots still work, and the swap is
 * then a plain cut.
 */
export default function ReviewArchive({ reviews }: { reviews: NumberedReview[] }) {
  const root = useRef<HTMLDivElement | null>(null);
  const slot = useRef<HTMLDivElement | null>(null);
  const count = reviews.length;

  const [index, setIndex] = useState(0);
  /** The story the reader (or the clock) asked for, while the current one is
   *  still fading out. `null` when the slot is at rest. */
  const [pending, setPending] = useState<number | null>(null);
  /** Pointer over the slot, or focus inside it. */
  const [engaged, setEngaged] = useState(false);
  /** A hosted video review is playing in the slot. */
  const [videoPlaying, setVideoPlaying] = useState(false);
  /** The slot is on screen; nothing advances while it is not. */
  const [inView, setInView] = useState(false);
  /** The reader pressed pause. Sticks until they press play. */
  const [stopped, setStopped] = useState(false);

  const autoplaying = count > 1 && inView && !engaged && !videoPlaying && !stopped;

  const itemAt = (i: number) =>
    slot.current?.querySelector<HTMLElement>(`[data-slot-index="${i}"]`) ?? null;

  const goTo = (next: number) => {
    const target = ((next % count) + count) % count;
    if (target === index || pending !== null) return;
    setPending(target);
  };

  // Leaving: the active story fades and lifts away, then the index moves. With
  // reduced motion there is nothing to fade — the index just moves.
  useGSAP(
    () => {
      if (pending === null) return;
      const outgoing = itemAt(index);
      if (prefersReducedMotion() || !outgoing) {
        setIndex(pending);
        setPending(null);
        return;
      }
      gsap.to(outgoing, {
        opacity: 0,
        y: -12,
        duration: 0.35,
        ease: "power2.in",
        onComplete: () => {
          setIndex(pending);
          setPending(null);
        },
      });
    },
    { scope: root, dependencies: [pending] },
  );

  // Arriving: the new story settles in from just below. Skipped on first mount
  // — the section's own `FadeUp` brings the opening story in with the rest of
  // the page. Also the moment to silence any video the reader left running in
  // a story that has just been hidden: it is still mounted, so it would keep
  // playing unseen.
  const mounted = useRef(false);
  useGSAP(
    () => {
      slot.current?.querySelectorAll<HTMLVideoElement>("video").forEach((video) => {
        if (!video.closest(`[data-slot-index="${index}"]`)) video.pause();
      });

      if (!mounted.current) {
        mounted.current = true;
        return;
      }
      const incoming = itemAt(index);
      if (prefersReducedMotion() || !incoming) return;
      gsap.fromTo(
        incoming,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
      );
    },
    { scope: root, dependencies: [index] },
  );

  // The clock. One timeout per story rather than an interval, so any change of
  // story — the clock's own or the reader's — starts a full dwell on the new
  // one instead of whatever was left of the old.
  useEffect(() => {
    if (!autoplaying || prefersReducedMotion()) return;
    const id = window.setTimeout(() => setPending((p) => p ?? (index + 1) % count), DWELL);
    return () => window.clearTimeout(id);
  }, [autoplaying, index, count]);

  // Whether the slot is on screen at all.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Media events don't bubble, so they are caught in the capture phase on the
  // slot — the player itself stays a self-contained component that knows
  // nothing about the rotation around it.
  useEffect(() => {
    const el = slot.current;
    if (!el) return;
    const on = () => setVideoPlaying(true);
    const off = () => setVideoPlaying(false);
    el.addEventListener("play", on, true);
    el.addEventListener("pause", off, true);
    el.addEventListener("ended", off, true);
    return () => {
      el.removeEventListener("play", on, true);
      el.removeEventListener("pause", off, true);
      el.removeEventListener("ended", off, true);
    };
  }, []);

  if (count === 0) return null;

  return (
    <FadeUp className={styles.rArchive} y={40} start="top 86%">
      <div
        ref={root}
        className={styles.rRotor}
        role="group"
        aria-roledescription="carousel"
        aria-label="Client stories"
        onMouseEnter={() => setEngaged(true)}
        onMouseLeave={() => setEngaged(false)}
        onFocus={() => setEngaged(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setEngaged(false);
        }}
      >
        {/* Announcements are off while the slot rotates on its own — a screen
            reader should not be interrupted every seven seconds — and on once
            the reader is driving it. */}
        <div ref={slot} className={styles.rSlot} aria-live={autoplaying ? "off" : "polite"}>
          {reviews.map((review, i) => (
            <div
              key={review.name}
              className={styles.rSlotItem}
              data-slot-index={i}
              data-active={i === index || undefined}
              role="group"
              aria-roledescription="slide"
              aria-label={`Client story ${pad(review.ordinal)} of ${pad(count)}`}
            >
              <ReviewStory
                review={review}
                side="left"
                frame="tall"
                expandable={false}
                reveal={false}
              />
            </div>
          ))}
        </div>

        {count > 1 ? (
          <div className={styles.rControls}>
            <div className={styles.rControlsGroup}>
              <span className={styles.rCount}>
                <span className={styles.rCountOn}>{pad(index + 1)}</span>
                {" / "}
                {pad(count)}
              </span>

              <button
                type="button"
                className={styles.rPlayToggle}
                onClick={() => setStopped((v) => !v)}
                aria-pressed={stopped}
                aria-label={stopped ? "Resume rotating client stories" : "Stop rotating client stories"}
                data-cursor={stopped ? "Play" : "Pause"}
              >
                {stopped ? "Play" : "Pause"}
              </button>
            </div>

            <div className={styles.rControlsGroup}>
              <div className={styles.rDots}>
                {reviews.map((review, i) => (
                  <button
                    key={review.name}
                    type="button"
                    className={`${styles.rDot} ${i === index ? styles.rDotOn : ""}`}
                    onClick={() => goTo(i)}
                    aria-label={`Show client story ${pad(review.ordinal)}, ${review.name}`}
                    aria-current={i === index || undefined}
                    data-cursor="Show"
                  />
                ))}
              </div>

              <div className={styles.rArrows}>
                <button
                  type="button"
                  className={styles.rArrowBtn}
                  onClick={() => goTo(index - 1)}
                  aria-label="Previous client story"
                  data-cursor="Prev"
                >
                  <svg viewBox="0 0 34 8" aria-hidden focusable="false" className={styles.rArrow}>
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
                  className={styles.rArrowBtn}
                  onClick={() => goTo(index + 1)}
                  aria-label="Next client story"
                  data-cursor="Next"
                >
                  <svg viewBox="0 0 34 8" aria-hidden focusable="false" className={styles.rArrow}>
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
        ) : null}
      </div>
    </FadeUp>
  );
}
