"use client";

import { useRef, useState } from "react";
import { journey } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import styles from "./home.module.css";

/**
 * Journey — a scroll-pinned "travel through a world" scene rebuilt for the dark
 * /four theme (no 3D render asset). A camera drifts diagonally across an abstract
 * tactical iso-dot field while a coral→red beam draws itself between glowing hubs.
 * Each hub ignites as the beam head (comet) reaches it, and a numbered rail on the
 * left syncs the active step. Mobile falls back to a readable vertical list.
 */

// --- world layout (SVG user space; viewBox is 1440 x 900) --------------------
const VIEW_W = 1440;
const VIEW_H = 900;
const HUB_X0 = 480; // x of first hub
const HUB_GAP = 720; // horizontal distance between hubs
const SCREEN_CX = 900; // where the active hub should sit on screen (x)
const SCREEN_CY = 430; // where the active hub should sit on screen (y)
// vertical wander so the route reads as a diagonal/meandering path, not a filmstrip
const WANDER = [-90, 120, -50, 110, -80, 70];

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

/** Deterministic pseudo-random in [0,1) — stable across SSR/client (no Math.random). */
const rand = (i: number, s: number) => {
  const v = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
  return v - Math.floor(v);
};
/* The theme has ONE accent. The cyan that used to sit in here was off-palette
   and made the scene read as two competing colour systems. */
const DECOR_COLORS = ["var(--line)", "var(--line)", "var(--brand-coral)", "var(--line)", "var(--line)"];

/** Faint tech artifact (circuit / hexagon / node-net / chip / code) scattered in the world. */
function techDecorGlyph(type: number, color: string) {
  switch (type) {
    case 0: // circuit trace
      return (
        <g stroke={color} strokeWidth={1.5} fill="none">
          <path d="M-34 0 H-6 V-20 H22" />
          <rect x={-6} y={-4} width={9} height={9} rx={1.5} />
          <circle cx={-34} cy={0} r={2.6} fill={color} stroke="none" />
          <circle cx={22} cy={-20} r={2.6} fill={color} stroke="none" />
        </g>
      );
    case 1: // hexagon
      return (
        <g stroke={color} strokeWidth={1.5} fill="none">
          <polygon points="18,0 9,15 -9,15 -18,0 -9,-15 9,-15" />
          <circle cx={0} cy={0} r={2.4} fill={color} stroke="none" />
        </g>
      );
    case 2: // node cluster (mini network)
      return (
        <g stroke={color} strokeWidth={1} fill="none">
          <line x1={-20} y1={-12} x2={0} y2={0} />
          <line x1={0} y1={0} x2={22} y2={-8} />
          <line x1={0} y1={0} x2={6} y2={20} />
          <circle cx={-20} cy={-12} r={2.6} fill={color} stroke="none" />
          <circle cx={22} cy={-8} r={2.2} fill={color} stroke="none" />
          <circle cx={6} cy={20} r={2.2} fill={color} stroke="none" />
          <circle cx={0} cy={0} r={3.2} fill={color} stroke="none" />
        </g>
      );
    case 3: // chip / IC
      return (
        <g stroke={color} strokeWidth={1.5} fill="none">
          <rect x={-13} y={-13} width={26} height={26} rx={2} />
          <line x1={-18} y1={-7} x2={-13} y2={-7} />
          <line x1={-18} y1={0} x2={-13} y2={0} />
          <line x1={-18} y1={7} x2={-13} y2={7} />
          <line x1={13} y1={-7} x2={18} y2={-7} />
          <line x1={13} y1={0} x2={18} y2={0} />
          <line x1={13} y1={7} x2={18} y2={7} />
          <rect x={-5} y={-5} width={10} height={10} rx={1} />
        </g>
      );
    default: // code glyph
      return (
        <text
          fontFamily="var(--font-eyebrow)"
          fontSize={22}
          fontWeight={600}
          fill={color}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {"</>"}
        </text>
      );
  }
}

/** Smooth cubic path through points (Catmull-Rom → Bezier). */
function buildPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function Journey() {
  const containerRef = useRef<HTMLElement | null>(null);
  const cameraRef = useRef<SVGGElement | null>(null);
  const beamCoreRef = useRef<SVGPathElement | null>(null);
  const beamGlowRef = useRef<SVGPathElement | null>(null);
  const cometRef = useRef<SVGCircleElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const cometGlowRef = useRef<SVGCircleElement | null>(null);
  const beamLenRef = useRef(0);
  const lastIdxRef = useRef(0);

  const [active, setActive] = useState(0);

  const steps = journey.steps;
  const N = steps.length;

  // hub anchor points + the winding beam route (with a swooping midpoint per gap)
  const hubs = steps.map((_, i) => ({
    x: HUB_X0 + i * HUB_GAP,
    y: VIEW_H / 2 + (WANDER[i % WANDER.length] ?? 0) - 40,
  }));
  const pathPts: { x: number; y: number }[] = [];
  hubs.forEach((h, i) => {
    pathPts.push(h);
    const n = hubs[i + 1];
    if (n) {
      pathPts.push({
        x: (h.x + n.x) / 2,
        y: (h.y + n.y) / 2 + (i % 2 ? 170 : -170),
      });
    }
  });
  const beamD = buildPath(pathPts);
  const first = hubs[0];
  const last = hubs[N - 1];
  const spanX = last.x - first.x;

  // scattered tech artifacts filling the world (top + bottom bands, off the beam)
  // Values are rounded to 4 decimal places so SSR (Node) and client (browser)
  // produce identical transform strings — Math.sin minor differences at high
  // precision otherwise cause hydration mismatches.
  /* Six, down from eighteen. The scattered artifacts were the bulk of the
     clutter the phases were competing with; enough remain to populate the world
     without reading as content. */
  const decor = Array.from({ length: 6 }, (_, i) => {
    const t = i / 5;
    const x = +(160 + t * (spanX + 500) + (rand(i, 5) - 0.5) * 320).toFixed(4);
    const y = +(rand(i, 1) < 0.5 ? 90 + rand(i, 4) * 200 : 620 + rand(i, 4) * 230).toFixed(4);
    return {
      key: `dec-${i}`,
      x,
      y,
      type: i % 5,
      scale: +(0.75 + rand(i, 2) * 0.9).toFixed(6),
      rot: Math.round(rand(i, 3) * 3) * 90,
      color: DECOR_COLORS[i % DECOR_COLORS.length],
    };
  });

  useGSAP(
    () => {
      if (!containerRef.current || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();

      mm.add("(min-width: 1000px)", () => {
        const camera = cameraRef.current;
        const core = beamCoreRef.current;
        const glow = beamGlowRef.current;
        if (!camera || !core) return;

        const measure = () => {
          beamLenRef.current = core.getTotalLength();
        };
        measure();

        // starting state: beam hidden, comet parked at the first hub
        gsap.set([core, glow], { strokeDashoffset: 1 });
        const start = core.getPointAtLength(0);
        gsap.set([cometRef.current, cometGlowRef.current], {
          attr: { cx: start.x, cy: start.y },
        });
        gsap.set(camera, { x: SCREEN_CX - first.x, y: SCREEN_CY - first.y });

        const st = ScrollTrigger.create({
          id: "journeyPin",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(N - 1) * 62}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: measure,
          onUpdate: (self) => {
            const p = self.progress;

            // scroll hint: visible as the scene pins, fades out the moment the
            // user starts advancing it
            if (hintRef.current) {
              gsap.set(hintRef.current, { autoAlpha: 1 - Math.min(1, p / 0.07) });
            }

            // camera: pan so the active hub stays centred, drifting diagonally
            const t = p * (N - 1);
            const i0 = Math.floor(t);
            const i1 = Math.min(N - 1, i0 + 1);
            const f = t - i0;
            const curX = first.x + p * spanX;
            const curY = hubs[i0].y + (hubs[i1].y - hubs[i0].y) * f;
            gsap.set(camera, { x: SCREEN_CX - curX, y: SCREEN_CY - curY });

            // beam draws itself + comet rides the tip
            gsap.set([core, glow], { strokeDashoffset: 1 - p });
            const L = beamLenRef.current;
            if (L) {
              const pt = core.getPointAtLength(p * L);
              gsap.set([cometRef.current, cometGlowRef.current], {
                attr: { cx: pt.x, cy: pt.y },
              });
            }

            // discrete active step → drives the rail + hub ignition (React state,
            // only fires on step change so there is no per-frame re-render)
            const idx = Math.round(t);
            if (idx !== lastIdxRef.current) {
              lastIdxRef.current = idx;
              setActive(idx);
            }
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className={`${styles.section} ${styles.journeySection}`}
      id="journey"
      data-stages={N}
    >
      {/* ---------- Desktop: pinned cinematic scene ---------- */}
      <div className={styles.journeyDesktopContainer}>
        <svg
          className={styles.journeyCanvas}
          viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="j-beam"
              gradientUnits="userSpaceOnUse"
              x1={first.x}
              y1={first.y}
              x2={last.x}
              y2={last.y}
            >
              <stop offset="0" stopColor="var(--brand-coral)" />
              <stop offset="1" stopColor="var(--brand-red)" />
            </linearGradient>
            <radialGradient id="j-comet" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="35%" stopColor="var(--brand-coral)" />
              <stop offset="100%" stopColor="var(--brand-coral)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="j-aura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
            <filter id="j-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
            <pattern
              id="j-dots"
              width="46"
              height="46"
              patternUnits="userSpaceOnUse"
              patternTransform="skewX(-24)"
            >
              <circle cx="2" cy="2" r="1.5" fill="var(--line)" />
            </pattern>
            </defs>

          <g ref={cameraRef} className={styles.journeyCamera}>
            {/* abstract tactical iso field */}
            <rect
              className={styles.journeyField}
              x={-600}
              y={-600}
              width={spanX + 1800}
              height={VIEW_H + 1200}
              fill="url(#j-dots)"
            />

            {/* scattered tech artifacts along the world */}
            {decor.map((d) => (
              <g
                key={d.key}
                className={styles.journeyDecor}
                transform={`translate(${d.x} ${d.y}) scale(${d.scale}) rotate(${d.rot})`}
              >
                {techDecorGlyph(d.type, d.color)}
              </g>
            ))}

            {/* beam: faint track + blurred glow + crisp core */}
            <path d={beamD} className={styles.beamTrack} pathLength={1} />
            <path ref={beamGlowRef} d={beamD} className={styles.beamGlow} pathLength={1} filter="url(#j-glow)" />
            <path ref={beamCoreRef} d={beamD} className={styles.beamCore} pathLength={1} />

            {/* hubs */}
            {hubs.map((h, i) => (
              <g
                key={steps[i].name}
                className={cx(
                  styles.hub,
                  i < active && styles.hubVisited,
                  i === active && styles.hubActive
                )}
                transform={`translate(${h.x} ${h.y})`}
              >
                <circle className={styles.hubAura} r={150} fill="url(#j-aura)" />
                <svg x={-100} y={-118} width={200} height={200} viewBox="0 0 200 200">
                  {stepGlyph(steps[i].n)}
                </svg>
                <text className={styles.hubIndex} textAnchor="middle" y={112}>
                  PHASE {steps[i].n}
                </text>
                <text className={styles.hubTitle} textAnchor="middle" y={142}>
                  {steps[i].name}
                </text>
              </g>
            ))}

            {/* comet head riding the beam tip */}
            <circle ref={cometGlowRef} className={styles.cometGlow} r={26} fill="url(#j-comet)" />
            <circle ref={cometRef} className={styles.cometCore} r={5} />
          </g>
        </svg>

        {/* scrim: dims the world/beam behind the text rail + adds vignette depth */}
        <div className={styles.journeyScrim} aria-hidden />

        {/* left rail */}
        <div className={styles.journeyRail}>
          <span className={styles.eyebrow}>{journey.eyebrow}</span>
          <SplitReveal as="h2" className={styles.journeyTitle} type="words">
            {journey.title}
          </SplitReveal>
          <p className={styles.journeyLead}>{journey.body}</p>
          <ol className={styles.railList}>
            {steps.map((s, i) => (
              <li
                key={s.name}
                className={cx(
                  styles.railRow,
                  i === active && styles.railRowActive,
                  i < active && styles.railRowDone
                )}
              >
                <span className={styles.railBadge}>{s.n}</span>
                <div className={styles.railText}>
                  <h3 className={styles.railName}>{s.name}</h3>
                  <div className={styles.railBodyWrap}>
                    <p className={styles.railBody}>{s.body}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* scroll hint — intimates that the pinned scene advances on scroll */}
        <div ref={hintRef} className={styles.journeyScrollHint} aria-hidden>
          <span>Scroll</span>
          <span className={styles.journeyScrollLine} />
        </div>
      </div>

      {/* ---------- Mobile: readable vertical list ---------- */}
      <div className={styles.journeyMobileContainer}>
        <div className={styles.sectionHead}>
          <span className={styles.eyebrow}>{journey.eyebrow}</span>
          <SplitReveal as="h2" className={styles.h2} type="words">
            {journey.title}
          </SplitReveal>
          <p className={styles.lead}>{journey.body}</p>
        </div>

        <div className={styles.mobileJourneyList}>
          {steps.map((s) => (
            <div key={s.name} className={styles.mobileJourneyRow}>
              <div className={styles.mobileJourneyNum}>/{s.n}</div>
              <div className={styles.mobileJourneyContent}>
                <h3 className={styles.mobileJourneyName}>{s.name}</h3>
                <p className={styles.mobileJourneyBody}>{s.body}</p>
                <div className={styles.mobileJourneyVisual}>
                  <svg viewBox="0 0 200 200" fill="none" className={styles.stepSvg}>
                    {stepGlyph(s.n)}
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Inner shapes for each phase glyph (wrapped by a <svg> at the call site). */
/**
 * The six phase icons.
 *
 * One system, not six drawings. Every icon obeys the same spec so the set reads
 * as a family rather than as clip art gathered from different places:
 *
 *   box            200x200, with all geometry inside 45-155 so nothing can clip
 *   stroke         2.5, round caps and joins, no fills
 *   colour         `currentColor` throughout, so the HUB decides it — a muted
 *                  line when the phase is idle, coral when it is active. That is
 *                  what makes the active phase read as active; the icons carry
 *                  no colour of their own.
 *   accent         exactly one `.glyphAccent` mark per icon, the focal point
 *
 * Each is a literal reading of its phase rather than an abstract pattern:
 *
 *   01 Challenge    a target with the marker off centre — the problem to hit
 *   02 Assessment   a magnifier over data bars — examining what is there
 *   03 Prototype    a dashed draft frame around a solid core — a first build
 *   04 Integration  two brackets interlocking — joining to what exists
 *   05 Deployment   a stack shipping upward — into production
 *   06 Optimization a cycle around a rising trend — measure, tune, repeat
 *
 * NO `<defs>` in here, deliberately. Each icon used to carry its own
 * `<radialGradient id="glowN">`, and `stepGlyph` is called once per hub in the
 * desktop scene AND once per row in the mobile list — so every one of those ids
 * appeared twice in the document. Duplicate ids are invalid, and `url(#glowN)`
 * resolves to whichever came first, which is why the icons rendered
 * inconsistently between the two layouts.
 */
function stepGlyph(num: string) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (num) {
    // 01 — Business Challenge: a target whose marker sits off centre.
    case "01":
      return (
        <g {...common}>
          <circle cx="100" cy="100" r="52" />
          <circle cx="100" cy="100" r="30" />
          <path d="M100 34v14M100 152v14M34 100h14M152 100h14" />
          <circle className={styles.glyphAccent} cx="116" cy="86" r="7" fill="currentColor" stroke="none" />
        </g>
      );

    // 02 — AI Assessment: a magnifier reading a set of bars.
    case "02":
      return (
        <g {...common}>
          <circle cx="92" cy="92" r="42" />
          <path d="M122 122l30 30" />
          <path d="M76 104V88M92 104V76M108 104V94" />
          <circle className={styles.glyphAccent} cx="92" cy="66" r="6" fill="currentColor" stroke="none" />
        </g>
      );

    // 03 — Prototype: a dashed draft frame around a solid core.
    case "03":
      return (
        <g {...common}>
          <rect x="48" y="48" width="104" height="104" rx="8" strokeDasharray="10 9" />
          <rect x="78" y="78" width="44" height="44" rx="4" />
          <path d="M48 70h104" strokeDasharray="10 9" />
          <circle className={styles.glyphAccent} cx="62" cy="59" r="5" fill="currentColor" stroke="none" />
        </g>
      );

    // 04 — Integration: two brackets interlocking.
    case "04":
      return (
        <g {...common}>
          <path d="M92 54H68a14 14 0 00-14 14v64a14 14 0 0014 14h24" />
          <path d="M108 54h24a14 14 0 0114 14v64a14 14 0 01-14 14h-24" />
          <path d="M74 100h22M104 100h22" />
          <circle className={styles.glyphAccent} cx="100" cy="100" r="7" fill="currentColor" stroke="none" />
        </g>
      );

    // 05 — Deployment: a stack shipping upward.
    case "05":
      return (
        <g {...common}>
          <rect x="52" y="112" width="96" height="30" rx="6" />
          <rect x="52" y="70" width="96" height="30" rx="6" />
          <path d="M100 58V26M86 40l14-14 14 14" />
          <circle className={styles.glyphAccent} cx="68" cy="127" r="5" fill="currentColor" stroke="none" />
        </g>
      );

    // 06 — Optimization: a cycle around a rising trend.
    case "06":
    default:
      return (
        <g {...common}>
          <path d="M150 100a50 50 0 11-16-37" />
          <path d="M136 32v32h-32" />
          <path d="M74 118l18-20 16 13 22-27" />
          <circle className={styles.glyphAccent} cx="130" cy="84" r="6" fill="currentColor" stroke="none" />
        </g>
      );
  }
}
