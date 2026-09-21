"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import Image from "next/image";
import BrandImage from "./brand-image";
import { caseStudies } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./home.module.css";

/**
 * One card in the lane.
 *
 * Only `title` and `body` are required. Everything else is optional and is
 * simply not drawn when absent, which is what lets this lane carry a list that
 * is not case studies: a services list has a tag but no metric and no year, a
 * process has neither. The original hardcoded all three, so anything without a
 * year rendered an empty badge.
 */
export interface WorkCarouselItem {
  readonly title: string;
  readonly body: string;
  /** Short category label above the title. */
  readonly tag?: string;
  /** Right-aligned figure on the title row — "95%+ detection accuracy". */
  readonly metric?: string;
  /** Badge over the media's top-right corner. */
  readonly year?: string;
  /**
   * Pexels manifest slot (page "four"). Set this ONLY once the slot exists in
   * `content/images.manifest.json` and `npm run images:home` has generated it —
   * `getImage` throws on a missing slot, which takes the whole page down.
   */
  readonly imageId?: string;
  /**
   * Hand-placed artwork — the alternative to `imageId` for a page whose art is
   * committed beside it rather than generated into the manifest. `src` is
   * root-relative and resolved through `publicMediaUrl`, because the app can be
   * served under a `basePath` and next/image rejects an unprefixed local
   * source. `imageId` wins if both are set: the manifest slot carries a
   * generated blurDataURL a loose file has no equivalent for.
   */
  readonly image?: { readonly src: string; readonly alt?: string };
}

/** Everything the lane renders. See `WorkCarouselItem` for the cards. */
export interface WorkCarouselContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Pill under the intro copy. Omitted renders no pill rather than a dead one. */
  cta?: { readonly label: string; readonly href: string };
  /**
   * The closing card after the last tile. This used to be hardcoded ("The next
   * one is yours" / "Let's build your AI success story" / `#contact`), which is
   * fine for case studies and wrong for anything else — hence a prop, and
   * omitting it ends the lane on the last real card.
   */
  outro?: {
    readonly eyebrow: string;
    readonly line: string;
    readonly cta: { readonly label: string; readonly href: string };
  };
  items: readonly WorkCarouselItem[];
}

/**
 * The homepage's own case studies in this shape — the default, so the 19 pages
 * that already render `<CaseStudies />` with no props keep the section they
 * have. `metricValue`/`metricLabel` are joined here rather than in the content
 * module because the join is this template's presentation, not the data.
 */
const HOMEPAGE_WORK: WorkCarouselContent = {
  eyebrow: caseStudies.eyebrow,
  title: caseStudies.title,
  body: caseStudies.body,
  cta: caseStudies.cta,
  outro: {
    eyebrow: "The next one is yours",
    line: "Let's build your AI success story.",
    cta: { label: "Start a project", href: "#contact" },
  },
  items: caseStudies.items.map((c) => ({
    title: c.title,
    body: c.body,
    tag: c.tag,
    imageId: c.img,
    metric: `${c.metricValue} ${c.metricLabel}`,
    year: c.year,
  })),
};

/**
 * Selected work — a horizontal scroll-snap gallery. On desktop the lane is a
 * native `overflow-x` scroller (drag/swipe/trackpad/shift-wheel all just
 * work) with a snap point per tile, plus explicit arrow buttons and a thin
 * progress tick — no page-scroll hijacking, so the section is a fixed one
 * screen tall no matter how many tiles it holds. Below 1000px it falls back
 * to a plain vertical stack. Reduced motion renders everything static.
 */
export default function WorkGrid({
  content = HOMEPAGE_WORK,
  id = "work",
  countLabel = "projects",
  autoplayMs = 0,
}: {
  content?: WorkCarouselContent;
  /** Section anchor. Defaults to the homepage's `#work`. */
  id?: string;
  /** Noun after the tile count — "projects", "capabilities", "services". */
  countLabel?: string;
  /**
   * Auto-advance interval in ms; 0 (the default) leaves the lane manual, which
   * is what the homepage wants for case studies a reader chooses to browse.
   *
   * When set, it only runs while the section is on screen and never while the
   * pointer is over the lane or focus is inside it, so it cannot steal a card
   * out from under someone mid-read. It stops for good at the last tile rather
   * than looping — this is a lane with a start and an end, and snapping back to
   * the first card reads as a glitch. Reduced motion disables it outright.
   */
  autoplayMs?: number;
} = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const inViewRef = useRef(false);
  /** True while the pointer is over the lane or focus is inside it. */
  const heldRef = useRef(false);

  const tiles = content.items;
  /* Whether the lane has any artwork at all, which decides both the media
     block per tile and the section's reserved height. Read across the whole
     list rather than per tile, so a list is either an image lane or a text
     lane and never a ragged mix. */
  const hasArt = tiles.some((t) => t.imageId || t.image);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    let active = true;
    const mql = window.matchMedia("(min-width: 1000px)");
    requestAnimationFrame(() => {
      if (active) setIsDesktop(mql.matches);
    });
    const onChange = (e: MediaQueryListEvent) => {
      if (active) setIsDesktop(e.matches);
    };
    mql.addEventListener("change", onChange);
    return () => {
      active = false;
      mql.removeEventListener("change", onChange);
    };
  }, []);

  const scrollByTiles = (dir: 1 | -1) => {
    const lane = laneRef.current;
    if (!lane) return;

    const snapChildren = lane.querySelectorAll<HTMLElement>(
      `.${styles.hTile}, .${styles.hOutro}`,
    );
    const laneRect = lane.getBoundingClientRect();
    let closestIndex = 0;
    let minDist = Infinity;

    snapChildren.forEach((el, index) => {
      const elRect = el.getBoundingClientRect();
      const elScrollLeft = elRect.left - laneRect.left + lane.scrollLeft;
      const dist = Math.abs(lane.scrollLeft - elScrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closestIndex = index;
      }
    });

    let targetIndex = closestIndex + dir;
    if (targetIndex < 0) targetIndex = 0;
    if (targetIndex >= snapChildren.length) targetIndex = snapChildren.length - 1;

    const targetEl = snapChildren[targetIndex] as HTMLElement;
    const targetElRect = targetEl.getBoundingClientRect();
    const targetScrollLeft = targetElRect.left - laneRect.left + lane.scrollLeft;

    const maxScroll = lane.scrollWidth - lane.clientWidth;
    const finalScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScroll));

    lane.style.scrollSnapType = "none";
    gsap.killTweensOf(lane);
    gsap.to(lane, {
      scrollLeft: finalScrollLeft,
      duration: 0.65,
      ease: "power3.out",
      onComplete: () => {
        lane.style.scrollSnapType = "";
      },
    });
  };

  // ---- drag-to-scroll with snap -----------------------------------------
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  const hasMoved = useRef(false);
  const DRAG_THRESHOLD = 5;

  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocityX = useRef(0);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    const lane = laneRef.current;
    if (!lane) return;
    // Only intercept primary button / touch
    if (e.pointerType === "mouse" && e.button !== 0) return;

    gsap.killTweensOf(lane);

    isDragging.current = true;
    hasMoved.current = false;
    dragStartX.current = e.clientX;
    dragStartScrollLeft.current = lane.scrollLeft;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocityX.current = 0;

    lane.style.scrollBehavior = "auto";
    lane.style.scrollSnapType = "none";
    lane.setPointerCapture(e.pointerId);

    lane.classList.add(styles.hLaneDragging);
  }, []);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) < DRAG_THRESHOLD && !hasMoved.current) return;
    hasMoved.current = true;

    const lane = laneRef.current;
    if (!lane) return;

    const now = performance.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocityX.current = (e.clientX - lastX.current) / dt;
    }
    lastX.current = e.clientX;
    lastTime.current = now;

    // Direct scroll update for zero-latency dragging
    lane.scrollLeft = dragStartScrollLeft.current - dx;
  }, []);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const lane = laneRef.current;
    if (!lane) return;

    lane.releasePointerCapture(e.pointerId);
    lane.style.scrollBehavior = "";
    lane.classList.remove(styles.hLaneDragging);

    if (hasMoved.current) {
      // Calculate target scrollLeft incorporating flick velocity (momentum)
      const scrollSpeed = velocityX.current * -160;
      const targetScrollLeft = lane.scrollLeft + scrollSpeed;

      const snapChildren = lane.querySelectorAll<HTMLElement>(
        `.${styles.hTile}, .${styles.hOutro}`,
      );
      const laneRect = lane.getBoundingClientRect();
      let closestLeft = 0;
      let minDist = Infinity;

      snapChildren.forEach((el) => {
        const elRect = el.getBoundingClientRect();
        const elScrollLeft = elRect.left - laneRect.left + lane.scrollLeft;
        const dist = Math.abs(targetScrollLeft - elScrollLeft);
        if (dist < minDist) {
          minDist = dist;
          closestLeft = elScrollLeft;
        }
      });

      const maxScroll = lane.scrollWidth - lane.clientWidth;
      closestLeft = Math.max(0, Math.min(closestLeft, maxScroll));

      lane.style.scrollSnapType = "none";
      gsap.killTweensOf(lane);
      gsap.to(lane, {
        scrollLeft: closestLeft,
        duration: 0.65,
        ease: "power3.out",
        onComplete: () => {
          lane.style.scrollSnapType = "";
        },
      });
    } else {
      lane.style.scrollSnapType = "";
    }
  }, []);

  /** Prevent native image/text drag from the browser during pointer drag. */
  const onDragStart = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current || !track.current) return;

      const mm = gsap.matchMedia();

      // ---- Desktop: scroll-snap lane — entrance reveal + progress tick ----
      mm.add("(min-width: 1000px)", () => {
        const lane = laneRef.current;

        // One-shot clip-path reveal for every tile's media as the section
        // scrolls into view (replaces the old per-tile scrub reveal, which
        // only made sense while the lane's position was scrub-driven by the
        // pin — now the lane moves on native scroll, not a GSAP tween).
        // Guarded on length: a text-only lane renders no `.hMedia` at all (see
        // `hasArt`), and `gsap.from([])` logs "GSAP target not found" on every
        // mount rather than quietly doing nothing.
        const mediaEls = gsap.utils.toArray<HTMLElement>(`.${styles.hMedia}`, track.current);
        if (mediaEls.length) {
          gsap.from(mediaEls, {
            clipPath: "inset(0% 0% 100% 0%)",
            scale: 1.08,
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
          });
        }

        // Track in-view state (for the keyboard shortcut below) and drive
        // the progress tick off the lane's own native scroll position.
        const st = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 25%",
          onEnter: () => (inViewRef.current = true),
          onEnterBack: () => (inViewRef.current = true),
          onLeave: () => (inViewRef.current = false),
          onLeaveBack: () => (inViewRef.current = false),
        });

        let raf = 0;
        const updateProgress = () => {
          raf = 0;
          if (!lane || !progressRef.current) return;
          const max = lane.scrollWidth - lane.clientWidth;
          const p = max > 0 ? lane.scrollLeft / max : 0;
          progressRef.current.style.setProperty("--p", String(p));
        };
        const onScroll = () => {
          if (!raf) raf = requestAnimationFrame(updateProgress);
        };
        updateProgress();
        lane?.addEventListener("scroll", onScroll, { passive: true });

        return () => {
          st.kill();
          lane?.removeEventListener("scroll", onScroll);
          if (raf) cancelAnimationFrame(raf);
        };
      });

      // ---- Mobile: vertical stack reveal -----------------------------
      mm.add("(max-width: 999px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(`.${styles.hTile}`, track.current);
        cards.forEach((card) => {
          const media = card.querySelector<HTMLElement>(`.${styles.hMedia}`);
          const img = card.querySelector<HTMLElement>(`.${styles.hImg}`);
          if (media) {
            gsap.from(media, {
              clipPath: "inset(0% 0% 100% 0%)",
              duration: 1.1,
              ease: "expo.out",
              scrollTrigger: { trigger: card, start: "top 90%", once: true },
            });
          }
          if (img) {
            gsap.fromTo(
              img,
              { yPercent: -10 },
              {
                yPercent: 10,
                ease: "none",
                scrollTrigger: { trigger: card, start: "top bottom", end: "bottom top", scrub: true },
              },
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  // Left/Right arrow keys step through the lane while the section is on screen.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!inViewRef.current) return;
      if (e.key === "ArrowRight") {
        e.preventDefault();
        scrollByTiles(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        scrollByTiles(-1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /**
   * Timed auto-advance, opt-in via `autoplayMs`.
   *
   * Deliberately not a GSAP timeline: the lane's position is native
   * `scrollLeft`, so stepping it through the same `scrollByTiles` the arrows
   * use keeps one code path for "move one card" and means a manual nudge
   * mid-cycle leaves the lane somewhere the next tick still reasons about
   * correctly.
   */
  useEffect(() => {
    if (!autoplayMs || prefersReducedMotion()) return;

    const timer = setInterval(() => {
      const lane = laneRef.current;
      if (!lane || !inViewRef.current || heldRef.current) return;
      // Stop at the end rather than wrapping — see the prop's docs.
      if (lane.scrollLeft >= lane.scrollWidth - lane.clientWidth - 2) return;
      scrollByTiles(1);
    }, autoplayMs);

    return () => clearInterval(timer);
    // `scrollByTiles` is not a dep: it closes over refs only, so it never goes
    // stale, and listing it would re-arm the interval on every render.
  }, [autoplayMs]);

  return (
    <section ref={sectionRef} className={styles.workH} id={id}>
      <div
        ref={root}
        className={hasArt ? styles.hInner : `${styles.hInner} ${styles.hInnerFlat}`}
      >
        <div className={styles.hIntro}>
          <span className={styles.eyebrow}>{content.eyebrow}</span>
          <SplitReveal as="h2" className={styles.h2} type="words">
            {content.title}
          </SplitReveal>
          <p className={styles.lead}>{content.body}</p>

          {content.cta ? (
            <div className={styles.hIntroCta}>
              <SiteLink
                href={content.cta.href}
                className={styles.pill}
                data-cursor="View"
              >
                {content.cta.label}
              </SiteLink>
            </div>
          ) : null}

          <div className={styles.hControls}>
            <span className={styles.carCounter}>
              {String(tiles.length).padStart(2, "0")} {countLabel}
            </span>
            <div className={styles.carArrows}>
              <button
                type="button"
                className={styles.carArrowBtn}
                onClick={() => scrollByTiles(-1)}
                aria-label="Previous project"
                data-cursor="Prev"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className={styles.carArrowBtn}
                onClick={() => scrollByTiles(1)}
                aria-label="Next project"
                data-cursor="Next"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block" }}>
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
          <div className={styles.hProgressTrack} aria-hidden>
            <span ref={progressRef} className={styles.hProgressFill} />
          </div>
        </div>

        <div
          ref={laneRef}
          className={styles.hLane}
          onPointerDown={isDesktop ? onPointerDown : undefined}
          onPointerMove={isDesktop ? onPointerMove : undefined}
          onPointerUp={isDesktop ? onPointerUp : undefined}
          onDragStart={isDesktop ? onDragStart : undefined}
          /* Autoplay pauses while the lane is hovered or focused, so it never
             pulls a card away from someone reading or tabbing through it. */
          onMouseEnter={() => (heldRef.current = true)}
          onMouseLeave={() => (heldRef.current = false)}
          onFocusCapture={() => (heldRef.current = true)}
          onBlurCapture={(e) => {
            if (e.currentTarget.contains(e.relatedTarget as Node | null)) return;
            heldRef.current = false;
          }}
        >
          <div ref={track} className={styles.hTrack}>
            {tiles.map((t, i) => {
              const index = `/${String(i + 1).padStart(2, "0")}`;
              const art = t.imageId ? (
                <BrandImage
                  page="four"
                  id={t.imageId}
                  fill
                  sizes="(max-width: 1000px) 100vw, 46vw"
                  className="object-cover"
                />
              ) : t.image ? (
                <Image
                  src={publicMediaUrl(t.image.src)}
                  alt={t.image.alt ?? ""}
                  fill
                  sizes="(max-width: 1000px) 100vw, 46vw"
                  className="object-cover"
                />
              ) : null;

              return (
                <article key={t.title} className={styles.hTile} data-cursor="View">
                  {/* Gated on the whole list, not this tile: a list with art
                      keeps the frame on every tile so the lane stays even, and
                      a list with none drops it everywhere. `.hMedia` is a
                      340px-tall `--surface` block, so leaving it in for a
                      text-only list opened each tile on a grey slab. The index
                      moves to the tag slot in that case, so a text-only tile is
                      still numbered. */}
                  {hasArt ? (
                    <div className={styles.hMedia}>
                      {art ? (
                        <div className={styles.hImg} draggable={false}>
                          {art}
                        </div>
                      ) : null}
                      {t.year ? <span className={styles.tileYear}>{t.year}</span> : null}
                      <span className={styles.tileNum}>{index}</span>
                    </div>
                  ) : null}
                  <div className={styles.tileFoot}>
                    <div>
                      {t.tag ? (
                        <span className={styles.tileTag}>{t.tag}</span>
                      ) : hasArt ? null : (
                        <span className={styles.tileTag}>{index}</span>
                      )}
                      <h3 className={styles.tileTitle}>{t.title}</h3>
                    </div>
                    {t.metric ? <span className={styles.tileMetric}>{t.metric}</span> : null}
                  </div>
                  <p className={styles.tileBody}>{t.body}</p>
                </article>
              );
            })}

            {content.outro ? (
              <div className={styles.hOutro}>
                <span className={styles.eyebrow}>{content.outro.eyebrow}</span>
                <p className={styles.hOutroLine}>{content.outro.line}</p>
                <SiteLink href={content.outro.cta.href} className={styles.pill} data-cursor="Start">
                  {content.outro.cta.label}
                </SiteLink>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
