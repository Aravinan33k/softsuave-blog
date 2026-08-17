"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { industries } from "@/lib/home/content";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import BrandImage from "./brand-image";
import styles from "./home.module.css";

/**
 * Industries — premium responsive fan carousel.
 *
 * - Desktop/laptop/tablet: absolute fan layout with dynamic spread/arc/rotation
 *   based on the carousel container width.
 * - Small viewports: clean CSS grid wrap.
 * - Hover lifts a single card without disturbing the rest.
 *   Click interaction is intentionally disabled; only hover reveals detail.
 */
const CARD_COLOR = "#ff5436";
const pad = (n: number) => String(n + 1).padStart(2, "0");

type LayoutTarget = {
  x: number;
  y: number;
  rot: number;
  zIndex: number;
};

type LayoutResult =
  | {
      mode: "fan";
      cardW: number;
      cardH: number;
      spread: number;
      stageHeight: number;
      targets: LayoutTarget[];
    }
  | {
      mode: "grid";
      targets: LayoutTarget[];
    };

/**
 * Compute the fan layout for a given container width.
 * Matches the established /four fan formula:
 *   x = off * spread
 *   y = 120 + off² * 6
 *   rotation = off * 8
 *   spread = Math.min(270, containerWidth * 0.155)
 */
function computeLayout(
  width: number,
  height: number,
  N: number,
  center: number,
): LayoutResult {
  const minCardW = 170;
  const maxCardW = 440;
  const safetyX = 40;

  // Calculate dynamic size factor based on container width (from 0.65 at 768px width up to 1.0 at 1400px width)
  const pct = Math.max(0, Math.min(1, (width - 768) / 632));
  const sizeFactor = 0.65 + pct * 0.35;

  // Calculate dynamic size factor based on available height (from 0.50 at height = 500px up to 1.0 at height >= 800px)
  const hScale = Math.max(0.5, Math.min(1, 0.5 + ((height - 500) / 300) * 0.5));

  // 1. Calculate optimal card width based on width and height constraints
  const cardW_widthBased = (width - safetyX * 2) / 4.3;
  const safetyY = height < 700 ? 180 : 280;
  const cardW_heightBased = (height - safetyY) / 1.35;

  let cardW = Math.min(cardW_widthBased, cardW_heightBased);
  cardW = Math.max(minCardW, Math.min(maxCardW, cardW)); // removed double scaling!
  const cardH = cardW * 1.3;

  // 2. Horizontal fanning spread based on progressive spread factor
  const spreadFactor = 0.58 + pct * 0.24; // 0.58 (at 768px) to 0.82 (at 1400px)
  const idealSpread = cardW * spreadFactor;
  const minSpread = 50;

  // 3. Spacing & Translation dynamics based on progressive pct and hScale (flattening curve on short screen height)
  const rotationStep = (3.0 + pct * 6.0) * hScale; // 3.0 degrees (at 768px) to 9.0 degrees (at 1400px), scaled by hScale
  const translateYStep = (3.0 + pct * 4.5) * hScale; // 3.0px to 7.5px vertical translation step, scaled by hScale

  // 4. Bounding Box calculations
  const maxAngleRad = (rotationStep * center * Math.PI) / 180;
  const cornerDrop = (cardW / 2) * Math.sin(maxAngleRad) + (cardH / 2) * (1 - Math.cos(maxAngleRad));
  const maxTranslateY = 20 + center * center * translateYStep;
  const fanHeight = cardH + maxTranslateY + cornerDrop;

  const totalHeightNeeded = safetyY + fanHeight; // header + safety buffer
  const totalWidthNeeded = 4 * idealSpread + cardW + safetyX * 2;

  // Fit verification (enable fan above 768px width, and switch to grid only when cannot fit)
  const canFan = width >= 768 && width >= totalWidthNeeded && height >= 520 && idealSpread >= minSpread;

  if (!canFan) {
    return { mode: "grid", targets: [] };
  }

  // The container height automatically matches the active fanned layout height
  const stageHeight = fanHeight + 100;

  // Center fanned cards vertically inside the stage by subtracting average translation y
  const avgTranslateY = 20 + (center * center * translateYStep) / 2;

  const targets = Array.from({ length: N }, (_, i) => {
    const off = i - center;
    return {
      x: off * idealSpread,
      y: 20 + off * off * translateYStep - avgTranslateY, // centered vertically!
      rot: off * rotationStep,
      zIndex: 10 + i * 10, // stack left-to-right to ensure all titles are fully visible!
    };
  });

  return {
    mode: "fan",
    cardW,
    cardH,
    spread: idealSpread,
    stageHeight,
    targets,
  };
}

export default function Industries() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);

  const items = industries.items;
  const N = items.length;
  const center = Math.floor(N / 2);

  const cardEls = useRef<(HTMLElement | null)[]>([]);
  const baseTargets = useRef<LayoutTarget[]>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const gridTweenRef = useRef<gsap.core.Tween | null>(null);
  const enteredRef = useRef(false);
  const gridAnimatedRef = useRef(false);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  // Derive fan mode directly from the measured container width.
  const currentLayout =
    containerWidth > 0 && viewportHeight > 0
      ? computeLayout(containerWidth, viewportHeight, N, center)
      : { mode: "grid" as const, targets: [] };
  const isFan = currentLayout.mode === "fan";

  /** Hover: lift and straighten the hovered card, leave the rest untouched. */
  const handleMouseEnter = useCallback(
    (i: number) => {
      if (!isFan) return;
      const card = cardEls.current[i];
      if (!card) return;
      gsap.set(card, { zIndex: 1000 });
      gsap.to(card, {
        scale: 1.04,
        rotation: 0,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
      });
    },
    [isFan],
  );

  /** Hover out: restore the card's base fan pose. */
  const handleMouseLeave = useCallback(
    (i: number) => {
      if (!isFan) return;
      const card = cardEls.current[i];
      if (!card) return;
      const base = baseTargets.current[i] ?? { rot: 0, zIndex: 1 };
      gsap.to(card, {
        scale: 1,
        rotation: base.rot,
        duration: 0.25,
        ease: "power2.out",
        overwrite: "auto",
        onComplete: () => {
          gsap.set(card, { zIndex: base.zIndex });
        },
      });
    },
    [isFan],
  );

  /**
   * ResizeObserver keeps layout in sync with the actual container width. Its
   * first callback fires as soon as the stage is observed, so it also seeds the
   * initial width/height — a separate mount effect calling setState
   * synchronously would only add a cascading render.
   */
  useEffect(() => {
    if (!stageRef.current) return;
    const stage = stageRef.current;
    let raf = 0;

    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setContainerWidth(cr.width);
        setViewportHeight(window.innerHeight);
      });
    });

    ro.observe(stage);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  /** Apply layout whenever the container width changes. */
  useEffect(() => {
    if (containerWidth <= 0 || viewportHeight <= 0) return;

    const cards = cardEls.current.filter(Boolean) as HTMLElement[];
    if (cards.length !== N) return;

    const layout = computeLayout(containerWidth, viewportHeight, N, center);

    if (prefersReducedMotion() || layout.mode !== "fan") {
      // Grid mode (or reduced motion): let CSS layout take over.
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
      timelineRef.current = null;
      enteredRef.current = false;

      gsap.set(cards, { clearProps: "transform,zIndex", opacity: 1 });
      stageRef.current?.style.removeProperty("--ind-card-w");
      stageRef.current?.style.removeProperty("--ind-card-h");
      stageRef.current?.style.removeProperty("--ind-stage-h");

      if (
        !prefersReducedMotion() &&
        layout.mode !== "fan" &&
        !gridAnimatedRef.current
      ) {
        gridTweenRef.current = gsap.from(cards, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });
        gridAnimatedRef.current = true;
      }
      return;
    }

    // Switching back to fan — ensure any lingering grid entrance is killed.
    gridTweenRef.current?.scrollTrigger?.kill();
    gridTweenRef.current?.kill();
    gridTweenRef.current = null;

    baseTargets.current = layout.targets;

    // Fan dimensions are exposed as CSS vars so the stylesheet stays dynamic.
    stageRef.current?.style.setProperty("--ind-card-w", `${layout.cardW}px`);
    stageRef.current?.style.setProperty("--ind-card-h", `${layout.cardH}px`);
    stageRef.current?.style.setProperty("--ind-stage-h", `${layout.stageHeight}px`);

    if (enteredRef.current) {
      // Already entered — smoothly reposition to the new fan state.
      cards.forEach((card, i) => {
        const t = layout.targets[i];
        gsap.to(card, {
          x: t.x,
          y: t.y,
          rotation: t.rot,
          scale: 1,
          zIndex: t.zIndex,
          duration: 0.45,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
      return;
    }

    // Initial stacked state, waiting for scroll-in.
    gsap.set(cards, {
      xPercent: -50,
      yPercent: -50,
      x: 0,
      y: 420,
      rotation: 0,
      opacity: 0,
      scale: 0.9,
      zIndex: 1,
      transformOrigin: "50% 50%",
    });

    if (!timelineRef.current) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 62%",
          once: true,
          invalidateOnRefresh: true,
        },
        onComplete: () => {
          enteredRef.current = true;
        },
      });

      cards.forEach((card, i) => {
        tl.to(
          card,
          {
            x: () => baseTargets.current[i]?.x ?? 0,
            y: () => baseTargets.current[i]?.y ?? 0,
            rotation: () => baseTargets.current[i]?.rot ?? 0,
            zIndex: () => baseTargets.current[i]?.zIndex ?? 1,
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: "power3.out",
          },
          0.09 * i,
        );
      });

      timelineRef.current = tl;
    } else {
      ScrollTrigger.refresh();
    }
  }, [containerWidth, viewportHeight, N, center]);

  /** Cleanup GSAP on unmount. */
  useEffect(
    () => () => {
      timelineRef.current?.scrollTrigger?.kill();
      timelineRef.current?.kill();
      gridTweenRef.current?.scrollTrigger?.kill();
      gridTweenRef.current?.kill();
      ScrollTrigger.getAll()
        .filter((st) => st.trigger === sectionRef.current)
        .forEach((st) => st.kill());
    },
    [],
  );

  return (
    <section
      ref={sectionRef}
      className={`${styles.section} ${styles.industriesFan} ${!isFan ? styles.gridMode : ""}`}
      id="industries"
    >
      <div className={styles.indFanHead}>
        <span className={styles.eyebrow}>{industries.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {industries.title}
        </SplitReveal>
        <p className={styles.lead}>{industries.body}</p>
      </div>

      <div
        ref={stageRef}
        className={`${styles.indFanStage} ${isFan ? styles.fanLayout : ""}`}
      >
        {items.map((it, i) => (
          <article
            key={it.key}
            ref={(el) => {
              cardEls.current[i] = el;
            }}
            className={styles.indFanCard}
            style={{ ["--card" as string]: CARD_COLOR } as React.CSSProperties}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
          >
            <div className={styles.indFanCardImg}>
              <BrandImage
                page="four"
                id={`ind-${it.key}`}
                fill
                sizes="260px"
                className="object-cover"
              />
            </div>
            <div className={styles.indFanCardOverlay}>
              <span className={styles.indFanCardNum}>/{pad(i)}</span>
              <p className={styles.indFanCardBody}>{it.body}</p>
            </div>
            <span className={styles.indFanCardTitle}>{it.name}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
