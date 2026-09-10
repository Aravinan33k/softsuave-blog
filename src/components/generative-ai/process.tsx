"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { process as generativeAiProcess } from "@/lib/home/generative-ai";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface ProcessContent {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { readonly n: string; readonly name: string; readonly body: string }[];
}

const STEP_COUNT = 5;
const ANGLE_STEP = 360 / STEP_COUNT;
/** The ellipse's 12-o'clock position — where the active step sits. */
const TOP_ANGLE = -90;
/** How far out each step sits, as a percentage of the ring box. */
const RX = 42;
const RY = 33;
/** How long the ring holds a step before auto-advancing, in ms. */
const DWELL_MS = 4600;

/** Signed shortest distance from `a` to `b` around a 0–360 circle, in steps. */
function shortestSteps(a: number, b: number) {
  const raw = (((b - a) % STEP_COUNT) + STEP_COUNT) % STEP_COUNT;
  return raw > STEP_COUNT / 2 ? raw - STEP_COUNT : raw;
}

/**
 * One glyph per ring position (not per step's wording, which differs between
 * the Generative AI and Agentic AI copies that share this component) — every
 * version of this five-stage process reads as discover → design → build →
 * verify → launch, so the shape holds across both pages.
 */
function StepIcon({ index }: { index: number }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (index % STEP_COUNT) {
    case 0:
      return (
        <svg {...common} aria-hidden>
          <circle cx="10.5" cy="10.5" r="6.5" />
          <path d="M15.5 15.5L20 20" />
        </svg>
      );
    case 1:
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3L21 7.5L12 12L3 7.5L12 3Z" />
          <path d="M3 12.5L12 17L21 12.5" />
          <path d="M3 17L12 21.5L21 17" />
        </svg>
      );
    case 2:
      return (
        <svg {...common} aria-hidden>
          <path d="M9 3H15" />
          <path d="M10 3V8.5L4.8 17.2C4.2 18.3 5 19.7 6.3 19.7H17.7C19 19.7 19.8 18.3 19.2 17.2L14 8.5V3" />
          <path d="M7.5 15H16.5" />
        </svg>
      );
    case 3:
      return (
        <svg {...common} aria-hidden>
          <path d="M12 3L19 6V11C19 15.5 16 18.8 12 20C8 18.8 5 15.5 5 11V6L12 3Z" />
          <path d="M9 11.3L11 13.3L15 9" />
        </svg>
      );
    default:
      return (
        <svg {...common} aria-hidden>
          <path d="M12 15C9 15 7 12.5 7 9.5C7 6 9.5 3 13 3C16 3 18.5 5.5 18.5 8.5C18.5 12 15.5 14 15.5 14" />
          <path d="M9.5 15.5L8 20L11 18.3" />
          <path d="M12.5 16L15 20.5L16.5 17" />
          <circle cx="13.5" cy="8.5" r="1.6" />
        </svg>
      );
  }
}

/**
 * Delivery process as a rotating orbit: five steps sit on an ellipse, the one
 * at 12 o'clock is the active step, and advancing (autoplay, click, hover,
 * arrow keys) spins the whole ring so the next one rotates into that spot.
 * Replaces an earlier static vertical rail with the motion the brief asked
 * for — a literal rotation, not a swapped icon.
 *
 * Deliberately NOT a full black-and-orange panel the way the reference video
 * frames it: the ring sits inside this section's own `.processOrbit`, reading
 * `--surface`/`--line`/`--accent` like every other panel on the page, so it
 * inherits whichever band (dark or light) it's placed in. The one departure
 * is `.orbitGlow`, a soft, contained accent wash behind the ring — not a
 * full-bleed wash — which is as much of the video's look as this surface's
 * banding rhythm can take without a section-sized dark/orange slab.
 *
 * Positioning is trigonometric, not CSS `transform: rotate()` on the nodes:
 * an ellipse (rx ≠ ry) doesn't trace correctly under a single rotated
 * transform, so each node's (x, y) is computed from a per-node angle and
 * written straight to the DOM via refs on every animation frame — cheaper
 * than a state update for a value that changes ~60 times a second, and the
 * same reasoning `gsap` itself is built on.
 *
 * Angles are never wrapped back into 0–360 mid-tween: `rotation` accumulates
 * indefinitely (…, -72, 0, 72, 144, …) so advancing past index 4 back to 0
 * keeps spinning the same direction instead of snapping backward. It's
 * normalized once a tween completes, which changes no node's screen position
 * (cos/sin are period-360) but keeps the accumulator from growing without
 * bound over a long-lived tab.
 *
 * Accessibility is the same ARIA tabs pattern `Problems` uses: `role="tablist"`
 * on the ring, `role="tab"` per node, roving tabindex, arrow/Home/End
 * navigation, and a single `tabpanel` for the active step's copy. Hovering a
 * node previews it (autoplay may still resume on mouse-leave); clicking,
 * focusing, or arrowing takes over for good. Under reduced motion the ring
 * still re-arranges on selection, just without the tween or the autoplay
 * timer — everything remains reachable, nothing spins on its own.
 */
export default function Process({
  content = generativeAiProcess,
  id = "journey",
}: {
  content?: ProcessContent;
  id?: string;
} = {}) {
  const root = useRef<HTMLElement | null>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const tickerRef = useRef<HTMLSpanElement | null>(null);

  const steps = content.steps.slice(0, STEP_COUNT);
  const rotation = useRef({ r: 0 });
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const takenOver = useRef(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const tween = useRef<gsap.core.Tween | null>(null);

  /** Write every node's position/size straight to the DOM for this frame. */
  const applyPositions = useCallback(() => {
    const r = rotation.current.r;
    steps.forEach((_, i) => {
      const el = nodeRefs.current[i];
      if (!el) return;
      const angleDeg = TOP_ANGLE + i * ANGLE_STEP - r;
      const rad = (angleDeg * Math.PI) / 180;
      const x = 50 + RX * Math.cos(rad);
      const y = 50 + RY * Math.sin(rad);

      // Distance from the front (12 o'clock) slot, in degrees, 0–180.
      const dist = Math.abs(((((angleDeg - TOP_ANGLE) % 360) + 540) % 360) - 180);
      const t = 1 - dist / 180; // 1 at front, 0 at the far side
      const scale = 0.62 + t * 0.68;
      const opacity = 0.42 + t * 0.58;

      el.style.left = `${x}%`;
      el.style.top = `${y}%`;
      el.style.setProperty("--s", String(scale));
      el.style.setProperty("--o", String(opacity));
      el.style.zIndex = String(Math.round(t * 100));
    });
  }, [steps]);

  const stop = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
    if (tickerRef.current) gsap.killTweensOf(tickerRef.current);
  }, []);

  /** Spin the ring `deltaSteps` positions (signed) and update the active tab. */
  const spin = useCallback(
    (deltaSteps: number, nextActive: number) => {
      activeRef.current = nextActive;
      setActive(nextActive);
      tween.current?.kill();
      const target = rotation.current.r + deltaSteps * ANGLE_STEP;
      if (prefersReducedMotion()) {
        rotation.current.r = target;
        applyPositions();
        return;
      }
      tween.current = gsap.to(rotation.current, {
        r: target,
        duration: 0.85,
        ease: "power3.inOut",
        onUpdate: applyPositions,
        onComplete: () => {
          // Safe to fold back into 0–360: cos/sin repeat every full turn, so
          // this changes no node's position, only keeps the number bounded.
          rotation.current.r = ((rotation.current.r % 360) + 360) % 360;
        },
      });
    },
    [applyPositions],
  );

  const advance = useCallback(
    (steps_: number) => {
      const next = ((activeRef.current + steps_) % STEP_COUNT + STEP_COUNT) % STEP_COUNT;
      spin(steps_, next);
    },
    [spin],
  );

  const play = useCallback(() => {
    stop();
    if (takenOver.current || prefersReducedMotion()) return;
    timer.current = setInterval(() => advance(1), DWELL_MS);
    if (tickerRef.current) {
      gsap.fromTo(
        tickerRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: DWELL_MS / 1000, ease: "none", repeat: -1 },
      );
    }
  }, [advance, stop]);

  const takeOver = useCallback(
    (i: number) => {
      takenOver.current = true;
      stop();
      spin(shortestSteps(activeRef.current, i), i);
    },
    [spin, stop],
  );

  const preview = useCallback(
    (i: number) => {
      if (i !== activeRef.current) spin(shortestSteps(activeRef.current, i), i);
    },
    [spin],
  );

  // Lay the ring out immediately (no tween) on mount and on resize, and drive
  // autoplay only while the section is on screen.
  useGSAP(
    () => {
      if (!root.current) return;
      applyPositions();
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const st = ScrollTrigger.create({
          trigger: root.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: play,
          onEnterBack: play,
          onLeave: stop,
          onLeaveBack: stop,
        });
        return () => {
          st.kill();
          stop();
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  useEffect(() => {
    if (prefersReducedMotion() || !panelRef.current) return;
    const t = gsap.fromTo(
      panelRef.current.children,
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out", stagger: 0.05, overwrite: "auto" },
    );
    return () => {
      t.kill();
    };
  }, [active]);

  useEffect(() => stop, [stop]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = steps.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    takeOver(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <section ref={root} className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        {/* One card, not two: the ring and its step copy share `.processOrbit`,
            with the copy sitting in the ellipse's own lower half rather than
            in a separate panel below — that second panel used to leave the
            space inside the ring empty and repeat the same rounded-card chrome
            immediately under it. `.orbitStage` gives the ring its own
            coordinate box so the trig in `applyPositions` keeps sizing nodes
            off ITS dimensions, unaffected by how tall the copy underneath is. */}
        <div className={styles.processOrbit}>
          <div
            className={styles.orbitStage}
            role="tablist"
            aria-orientation="horizontal"
            aria-label={content.title}
            onKeyDown={onKeyDown}
            onMouseEnter={stop}
            onMouseLeave={() => {
              if (!takenOver.current) play();
            }}
          >
            <div className={styles.orbitGlow} aria-hidden />
            <div className={styles.orbitRing} aria-hidden />

            {steps.map((step, i) => (
              <button
                key={step.n}
                ref={(el) => {
                  nodeRefs.current[i] = el;
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-controls={`${id}-panel`}
                aria-selected={active === i}
                tabIndex={active === i ? 0 : -1}
                className={`${styles.orbitNode}${active === i ? ` ${styles.orbitNodeActive}` : ""}`}
                onClick={() => takeOver(i)}
                onMouseEnter={() => preview(i)}
                onFocus={() => {
                  takenOver.current = true;
                  stop();
                }}
              >
                {active === i ? (
                  <span className={styles.orbitIcon}>
                    <StepIcon index={i} />
                  </span>
                ) : (
                  <span className={styles.orbitNodeNum} aria-hidden>
                    {step.n}
                  </span>
                )}
                {active === i && <span ref={tickerRef} className={styles.orbitTicker} aria-hidden />}
              </button>
            ))}
          </div>

          <div
            className={styles.orbitPanel}
            id={`${id}-panel`}
            role="tabpanel"
            aria-labelledby={`${id}-tab-${active}`}
            tabIndex={0}
          >
            <div ref={panelRef}>
              <span className={styles.processStepLabel}>Step {steps[active].n}</span>
              <h3 className={styles.processName}>{steps[active].name}</h3>
              <p className={styles.processBody}>{steps[active].body}</p>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
