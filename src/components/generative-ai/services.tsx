"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { services as generativeAiServices } from "@/lib/home/generative-ai";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/** Horizontal travel a pointer drag needs before it counts as a swipe, in px. */
const SWIPE_PX = 44;

/** How long each card holds before the carousel advances, in ms. */
const DWELL_MS = 4600;

export interface ServicesContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /** Decorative backdrop for this card; items without one show none. */
    readonly image?: string;
  }[];
}

/**
 * The services, as a centre-focused carousel.
 *
 * Three cards are on screen at once: the active one sits high and full-size, its
 * two neighbours drop slightly and scale back. Advancing moves content
 * right-to-left — the next card enters from the right — which is the direction
 * reading already runs in, so "forward" needs no explanation.
 *
 * Why not the grid it replaced: ten panels of unequal length made a tall,
 * uniform wall that gave no card any priority. A carousel presents one service
 * at a time with its neighbours as context, and the section stops growing with
 * the number of services.
 *
 * Position is computed as a *circular* offset, so the list wraps: from the first
 * card the last one sits to its left rather than nine slots away. Cards are
 * placed purely by `transform` inside a fixed-height stage, so travel runs on
 * the compositor and the stage never changes height between slides.
 *
 * Each card's artwork covers the whole card, with the copy over its lower part.
 * The images are decorative — the card already names the service in text — so
 * they carry an empty `alt` and stay out of the accessibility tree. All of them
 * are mounted rather than swapped per slide: `sizes` keeps each optimised file
 * small, and mounting once means advancing never waits on a fetch or flashes an
 * empty card.
 *
 * Accessibility:
 *  - the stage is a labelled carousel (`aria-roledescription="carousel"`) and
 *    each card is a slide labelled "n of m", which is what a screen reader needs
 *    to make sense of a partial view.
 *  - off-screen cards are `aria-hidden`, so only the three on screen are
 *    reachable; the two neighbours are pointer affordances, and every action
 *    they offer is also on the arrows and dots.
 *  - Arrow keys move the carousel, and the dots are real buttons carrying
 *    `aria-current`, so it is fully operable without a pointer.
 *  - it advances on its own, but only while the section is on screen, and it
 *    pauses whenever the pointer is over it or focus is inside it — so it never
 *    moves under someone reading or operating it. Interacting does not cancel
 *    autoplay, it restarts the dwell, so a click behaves exactly as it did
 *    before and the rotation carries on from there.
 *  - `prefers-reduced-motion` disables autoplay outright; the carousel is then
 *    entirely manual.
 */
export default function Services({
  content = generativeAiServices,
  id = "services",
}: {
  content?: ServicesContent;
  id?: string;
} = {}) {
  const root = useRef<HTMLElement | null>(null);
  const items = content.items;
  const total = items.length;

  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const dragX = useRef<number | null>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  /** True while the section is on screen; autoplay may only run then. */
  const inView = useRef(false);
  /** True while the pointer is over the carousel or focus is inside it. */
  const held = useRef(false);

  const go = useCallback(
    (i: number) => {
      const next = ((i % total) + total) % total;
      activeRef.current = next;
      setActive(next);
    },
    [total],
  );

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const play = useCallback(() => {
    stop();
    if (!inView.current || held.current || prefersReducedMotion()) return;
    timer.current = setInterval(() => go(activeRef.current + 1), DWELL_MS);
  }, [go, stop]);

  /**
   * A manual move. Restarts the dwell rather than cancelling autoplay, so the
   * card the visitor picked gets a full turn on screen and the rotation
   * continues from there afterwards.
   */
  const pick = useCallback(
    (i: number) => {
      go(i);
      play();
    },
    [go, play],
  );

  // Autoplay is tied to visibility: a carousel rotating far below the fold is
  // wasted work, and it would leave the section mid-cycle when finally reached.
  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
        end: "bottom 15%",
        onEnter: () => {
          inView.current = true;
          play();
        },
        onEnterBack: () => {
          inView.current = true;
          play();
        },
        onLeave: () => {
          inView.current = false;
          stop();
        },
        onLeaveBack: () => {
          inView.current = false;
          stop();
        },
      });
      return () => {
        st.kill();
        stop();
      };
    },
    { scope: root },
  );

  useEffect(() => stop, [stop]);

  /**
   * Shortest signed distance from the active card, so the track wraps instead of
   * unspooling: with ten cards, index 9 is one step *left* of index 0.
   */
  const offsetOf = (i: number) => {
    let off = i - active;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  /**
   * Which slot a card occupies. The transforms themselves live in the
   * stylesheet, keyed off this attribute, so the offsets can differ per
   * breakpoint without the component knowing about breakpoints.
   */
  const slotOf = (off: number) => {
    if (off === 0) return "active";
    if (off === -1) return "prev";
    if (off === 1) return "next";
    return off < 0 ? "far-prev" : "far-next";
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      pick(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      pick(active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      pick(0);
    } else if (e.key === "End") {
      e.preventDefault();
      pick(total - 1);
    }
  };

  return (
    <section ref={root} className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div
        className={styles.svcStage}
        role="group"
        aria-roledescription="carousel"
        aria-label={content.title}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseEnter={() => {
          held.current = true;
          stop();
        }}
        onMouseLeave={() => {
          held.current = false;
          play();
        }}
        onFocusCapture={() => {
          held.current = true;
          stop();
        }}
        onBlurCapture={(e) => {
          // Focus moving between controls inside the carousel is not a release.
          if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
          held.current = false;
          play();
        }}
        onPointerDown={(e) => {
          dragX.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (dragX.current === null) return;
          const dx = e.clientX - dragX.current;
          dragX.current = null;
          // Dragging left pulls the next card in from the right.
          if (dx <= -SWIPE_PX) pick(active + 1);
          else if (dx >= SWIPE_PX) pick(active - 1);
        }}
        onPointerCancel={() => {
          dragX.current = null;
        }}
      >
        {items.map((s, i) => {
          const off = offsetOf(i);
          const onScreen = Math.abs(off) <= 1;
          const isNear = Math.abs(off) === 1;
          return (
            <article
              key={s.name}
              className={`${styles.svcSlide}${off === 0 ? ` ${styles.svcSlideActive}` : ""}${
                isNear ? ` ${styles.svcSlideNear}` : ""
              }`}
              data-pos={slotOf(off)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={!onScreen}
              onClick={isNear ? () => pick(i) : undefined}
            >
              {s.image && (
                <span className={styles.svcSlideFigure} aria-hidden>
                  <Image
                    src={publicMediaUrl(s.image)}
                    alt=""
                    fill
                    sizes="(max-width: 699px) 82vw, (max-width: 999px) 52vw, 30vw"
                  />
                </span>
              )}
              <div className={styles.svcSlideMain} data-plain={!s.image}>
                <h3 className={styles.svcTitle}>{s.name}</h3>
                <p className={styles.svcText}>{s.body}</p>
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.svcNav}>
        <ul className={styles.svcDots}>
          {items.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                className={styles.svcDot}
                aria-current={active === i}
                aria-label={`${s.name} — ${i + 1} of ${total}`}
                onClick={() => pick(i)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
