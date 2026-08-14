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
const DECOR_COLORS = ["var(--line)", "var(--line)", "var(--brand-coral)", "#22d3ee", "var(--line)"];

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
  const decor = Array.from({ length: 18 }, (_, i) => {
    const t = i / 17;
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
            {/* sparse brighter star field for depth/density */}
            <pattern id="j-stars" width="150" height="150" patternUnits="userSpaceOnUse">
              <circle cx="24" cy="36" r="1.3" fill="#ffffff" opacity="0.55" />
              <circle cx="108" cy="96" r="1" fill="var(--brand-coral)" opacity="0.5" />
              <circle cx="70" cy="18" r="0.8" fill="#ffffff" opacity="0.35" />
              <circle cx="132" cy="132" r="0.9" fill="#22d3ee" opacity="0.4" />
              <circle cx="12" cy="120" r="0.8" fill="#ffffff" opacity="0.3" />
            </pattern>
            {/* ambient nebula blobs to fill the space between phases */}
            <radialGradient id="j-neb-coral" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--brand-coral)" stopOpacity="0.18" />
              <stop offset="55%" stopColor="var(--brand-red)" stopOpacity="0.06" />
              <stop offset="100%" stopColor="var(--brand-coral)" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="j-neb-cyan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </radialGradient>
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
            {/* sparse star field over the grid for depth */}
            <rect
              className={styles.journeyStars}
              x={-600}
              y={-600}
              width={spanX + 1800}
              height={VIEW_H + 1200}
              fill="url(#j-stars)"
            />
            {/* ambient nebula blobs filling the gaps between phases */}
            {hubs.map((h, i) => {
              const next = hubs[i + 1];
              if (!next) return null;
              const bx = (h.x + next.x) / 2;
              const by = (h.y + next.y) / 2 + (i % 2 ? 150 : -150);
              return (
                <circle
                  key={`neb-${i}`}
                  className={styles.journeyNeb}
                  cx={bx}
                  cy={by}
                  r={400}
                  fill={`url(#${i % 2 ? "j-neb-cyan" : "j-neb-coral"})`}
                />
              );
            })}

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
function stepGlyph(num: string) {
  switch (num) {
    case "01":
      return (
        <>
          <defs>
            <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.25" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow1)" />
          <circle cx="100" cy="100" r="75" stroke="var(--line)" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="100" r="45" stroke="var(--line)" strokeWidth="1" />
          <line x1="20" y1="100" x2="180" y2="100" stroke="var(--line)" strokeWidth="1" />
          <line x1="100" y1="20" x2="100" y2="180" stroke="var(--line)" strokeWidth="1" />
          <circle cx="100" cy="100" r="8" fill="var(--accent)" className={styles.pulseDot} />
        </>
      );
    case "02":
      return (
        <>
          <defs>
            <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow2)" />
          <circle cx="100" cy="100" r="70" stroke="var(--line)" strokeWidth="1" />
          <path d="M100 30 A 70 70 0 0 1 170 100" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="100" r="30" stroke="var(--line)" strokeWidth="1" />
          <circle cx="170" cy="100" r="5" fill="var(--accent)" />
        </>
      );
    case "03":
      return (
        <>
          <defs>
            <radialGradient id="glow3" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow3)" />
          <rect x="50" y="50" width="80" height="80" stroke="var(--line)" strokeWidth="1.5" />
          <rect x="70" y="70" width="80" height="80" stroke="var(--accent)" strokeWidth="1.5" strokeDasharray="3 3" />
          <line x1="50" y1="50" x2="70" y2="70" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="130" y1="50" x2="150" y2="70" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="50" y1="130" x2="70" y2="150" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="130" y1="130" x2="150" y2="150" stroke="var(--line)" strokeWidth="1.5" />
        </>
      );
    case "04":
      return (
        <>
          <defs>
            <radialGradient id="glow4" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow4)" />
          <circle cx="50" cy="100" r="10" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <circle cx="100" cy="50" r="10" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <circle cx="100" cy="150" r="10" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <circle cx="150" cy="100" r="10" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2" />
          <line x1="60" y1="100" x2="90" y2="55" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="60" y1="100" x2="90" y2="145" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="110" y1="55" x2="140" y2="95" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="110" y1="145" x2="140" y2="95" stroke="var(--line)" strokeWidth="1.5" />
        </>
      );
    case "05":
      return (
        <>
          <defs>
            <radialGradient id="glow5" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow5)" />
          <path d="M100 40 L160 70 L100 100 L40 70 Z" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <path d="M100 90 L160 120 L100 150 L40 120 Z" fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <path d="M100 140 L160 170 L100 200 L40 170 Z" fill="var(--surface)" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="100" y1="70" x2="100" y2="120" stroke="var(--accent)" strokeWidth="2" strokeDasharray="3 3" />
        </>
      );
    case "06":
    default:
      return (
        <>
          <defs>
            <radialGradient id="glow6" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="100" cy="100" r="85" fill="url(#glow6)" />
          <path d="M30 150 L60 120 L90 130 L120 80 L150 90 L180 30" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="180" cy="30" r="6" fill="var(--accent)" />
          <line x1="30" y1="160" x2="180" y2="160" stroke="var(--line)" strokeWidth="1.5" />
          <line x1="30" y1="30" x2="30" y2="160" stroke="var(--line)" strokeWidth="1.5" />
        </>
      );
  }
}
