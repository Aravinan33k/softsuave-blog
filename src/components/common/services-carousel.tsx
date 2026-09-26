"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import CardIconBadge from "@/components/common/card-icon-badge";
import ServiceLink, { useServiceHref } from "@/components/common/service-link";
import styles from "@/components/landing/landing.module.css";

/** Horizontal travel a pointer drag needs before it counts as a swipe, in px. */
const SWIPE_PX = 44;

/** How long each card holds before the carousel advances, in ms. */
const DWELL_MS = 4600;

export interface ServicesCarouselContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * Artwork covering the whole card, with the copy over its lower part.
     * Root-relative `src` (hand-placed under public/images/landing/), resolved
     * with `publicMediaUrl`. `alt` may be empty when the image is purely
     * decorative — the card already names the service in text.
     */
    readonly image?: { readonly src: string; readonly alt: string };
    /**
     * Optional destination page. Omitted, the card links to the page its name
     * matches (see `lib/home/service-href.ts`), never the page it is on.
     */
    readonly href?: string;
  }[];
}

/**
 * Services as a centre-focused carousel — the generative-AI page's section,
 * ported into the shared landing set with a `content` prop.
 *
 * Three cards are on screen at once: the active one sits high and full-size,
 * its two neighbours drop slightly and scale back. Advancing moves content
 * right-to-left (the next card enters from the right), the direction reading
 * already runs in. Position is a *circular* offset, so the list wraps. Cards
 * are placed purely by `transform` inside a fixed-height stage, so travel runs
 * on the compositor and the section never changes height between slides.
 *
 * Each card's artwork covers the whole card with the copy over its lower part,
 * under a gradient confined to the text band. All images are mounted rather
 * than swapped per slide, so advancing never waits on a fetch.
 *
 * Each slide leads with an icon badge picked from the service's own words (it
 * used to be a "01" ordinal) and ends in a "Learn more" link when the service
 * has a page of its own. The link is out of the tab order while its slide is
 * off screen, like everything else in an `aria-hidden` slide.
 *
 * Accessibility: a labelled carousel (`aria-roledescription="carousel"`) of
 * slides labelled "n of m"; off-screen cards are `aria-hidden`; arrow keys and
 * Home/End move it; the dots are real buttons carrying `aria-current`. It
 * autoplays only while on screen and never while hovered or focused; a manual
 * move restarts the dwell rather than cancelling autoplay. Reduced motion
 * disables autoplay outright and cuts between positions without travel.
 */
export default function ServicesCarousel({
  content,
  id = "services",
}: {
  content: ServicesCarouselContent;
  id?: string;
}) {
  const root = useRef<HTMLElement | null>(null);
  const items = content.items;
  const total = items.length;

  const hrefFor = useServiceHref();

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

  const pick = useCallback(
    (i: number) => {
      go(i);
      play();
    },
    [go, play],
  );

  // Autoplay is tied to visibility: a carousel rotating below the fold is
  // wasted work, and it would be mid-cycle when finally reached.
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

  /** Shortest signed distance from the active card, so the track wraps. */
  const offsetOf = (i: number) => {
    let off = i - active;
    if (off > total / 2) off -= total;
    if (off < -total / 2) off += total;
    return off;
  };

  /** Which slot a card occupies; the transforms live in the stylesheet. */
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
        className={styles.carouselStage}
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
          const href = hrefFor(s.name, s.href);
          return (
            <article
              key={s.name}
              className={`${styles.carouselSlide}${off === 0 ? ` ${styles.carouselSlideActive}` : ""}${
                isNear ? ` ${styles.carouselSlideNear}` : ""
              }`}
              data-pos={slotOf(off)}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${total}`}
              aria-hidden={!onScreen}
              onClick={isNear ? () => pick(i) : undefined}
            >
              {s.image && (
                <span className={styles.carouselFigure} aria-hidden={s.image.alt === ""}>
                  <Image
                    src={publicMediaUrl(s.image.src)}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 699px) 82vw, (max-width: 999px) 52vw, 30vw"
                  />
                </span>
              )}
              <div className={styles.carouselMain} data-plain={!s.image}>
                <CardIconBadge title={s.name} body={s.body} size="sm" />
                <h3 className={styles.carouselTitle}>{s.name}</h3>
                <p className={styles.carouselText}>{s.body}</p>
                {href && (
                  <ServiceLink href={href} label={s.name} tabIndex={onScreen ? undefined : -1} />
                )}
              </div>
            </article>
          );
        })}
      </div>

      <div className={styles.carouselNav}>
        <button
          type="button"
          className={styles.carouselArrow}
          aria-label="Previous service"
          onClick={() => pick(active - 1)}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M12.5 4.5L7 10l5.5 5.5" />
          </svg>
        </button>

        <ul className={styles.carouselDots}>
          {items.map((s, i) => (
            <li key={s.name}>
              <button
                type="button"
                className={styles.carouselDot}
                aria-current={active === i}
                aria-label={`${s.name} — ${i + 1} of ${total}`}
                onClick={() => pick(i)}
              />
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={styles.carouselArrow}
          aria-label="Next service"
          onClick={() => pick(active + 1)}
        >
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7.5 4.5L13 10l-5.5 5.5" />
          </svg>
        </button>
      </div>
    </section>
  );
}
