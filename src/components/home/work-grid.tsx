"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import BrandImage from "./brand-image";
import { caseStudies } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import Magnetic from "./magnetic";
import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./home.module.css";

type Tile = {
  img: string;
  tag: string;
  title: string;
  body: string;
  metric: string;
  year: string;
};

const tiles: Tile[] = caseStudies.items.map((c) => ({
  img: c.img,
  tag: c.tag,
  title: c.title,
  body: c.body,
  metric: `${c.metricValue} ${c.metricLabel}`,
  year: c.year,
}));

/**
 * Selected work — a horizontal scroll-snap gallery. On desktop the lane is a
 * native `overflow-x` scroller (drag/swipe/trackpad/shift-wheel all just
 * work) with a snap point per tile, plus explicit arrow buttons and a thin
 * progress tick — no page-scroll hijacking, so the section is a fixed one
 * screen tall no matter how many tiles it holds. Below 1000px it falls back
 * to a plain vertical stack. Reduced motion renders everything static.
 */
export default function WorkGrid() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const root = useRef<HTMLDivElement | null>(null);
  const laneRef = useRef<HTMLDivElement | null>(null);
  const track = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const inViewRef = useRef(false);

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
        const mediaEls = gsap.utils.toArray<HTMLElement>(`.${styles.hMedia}`, track.current);
        gsap.from(mediaEls, {
          clipPath: "inset(0% 0% 100% 0%)",
          scale: 1.08,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%", once: true },
        });

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

  return (
    <section ref={sectionRef} className={styles.workH} id="work">
      <div ref={root} className={styles.hInner}>
        <div className={styles.hIntro}>
          <span className={styles.eyebrow}>{caseStudies.eyebrow}</span>
          <SplitReveal as="h2" className={styles.h2} type="words">
            {caseStudies.title}
          </SplitReveal>
          <p className={styles.lead}>{caseStudies.body}</p>

          <div className={styles.hIntroCta}>
            <Magnetic>
              <SiteLink
                href={caseStudies.cta.href}
                className={styles.pill}
                data-cursor="View"
              >
                {caseStudies.cta.label}
              </SiteLink>
            </Magnetic>
          </div>

          <div className={styles.hControls}>
            <span className={styles.carCounter}>{String(tiles.length).padStart(2, "0")} projects</span>
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
        >
          <div ref={track} className={styles.hTrack}>
            {tiles.map((t, i) => (
              <article key={t.img} className={styles.hTile} data-cursor="View">
                <div className={styles.hMedia}>
                  <div className={styles.hImg} draggable={false}>
                    <BrandImage
                      page="four"
                      id={t.img}
                      fill
                      sizes="(max-width: 1000px) 100vw, 46vw"
                      className="object-cover"
                    />
                  </div>
                  <span className={styles.tileYear}>{t.year}</span>
                  <span className={styles.tileNum}>/{String(i + 1).padStart(2, "0")}</span>
                </div>
                <div className={styles.tileFoot}>
                  <div>
                    <span className={styles.tileTag}>{t.tag}</span>
                    <h3 className={styles.tileTitle}>{t.title}</h3>
                  </div>
                  <span className={styles.tileMetric}>{t.metric}</span>
                </div>
                <p className={styles.tileBody}>{t.body}</p>
              </article>
            ))}

            <div className={styles.hOutro}>
              <span className={styles.eyebrow}>The next one is yours</span>
              <p className={styles.hOutroLine}>Let&apos;s build your AI success story.</p>
              <a href="#contact" className={styles.pill} data-cursor="Start">
                Start a project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
