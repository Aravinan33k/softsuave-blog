"use client";

import { useEffect, useRef, useState } from "react";
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

// --- world layout (SVG user space) ------------------------------------------
// The viewBox is the WINDOW onto the world, not the world itself, and its
// HEIGHT is what sets the zoom. The stage is tall and narrow next to this
// aspect, so `xMidYMid slice` always fills on height and the on-screen scale is
// `stageHeight / VIEW_H`. Shortening VIEW_H from 900 to 760 is therefore an
// ~18% zoom in — the nodes, the glow and the beam all come up by that much,
// which is what brings the scene back to reading as a major element now that it
// lives in the right-hand column rather than across the whole page.
const VIEW_W = 1440;
const VIEW_H = 760;
const HUB_X0 = 480; // x of first hub
// Horizontal distance between hubs, in user units — ~520px on screen in a
// ~900px stage. The neighbouring phases therefore sit just past the stage
// edges with their auras still bleeding in, so the route reads as continuing
// past what you can see rather than as a filmstrip of six.
const HUB_GAP = 440;
// The active node's horizontal resting place, in user space. VIEW_W / 2 ON
// PURPOSE: with `xMidYMid slice` the viewBox centre is the one x that maps to
// the middle of the stage however much width the crop takes off at a given
// viewport. Anything else drifts toward an edge as the stage narrows.
const SCREEN_CX = VIEW_W / 2;
// The route's vertical midline. Nothing depends on this being the middle of the
// window: the camera's vertical position comes from the RAIL (see `railLevel`),
// not from here. It is only the axis the route wanders about.
const BASE_Y = VIEW_H / 2;

/**
 * The route's vertical offset at `u` — 0 at the first hub, 1 at the last.
 *
 * ONE function, sampled densely, IS the curve. That is what makes it a single
 * wide sweep instead of the five alternating swoops it used to be: a full sine
 * period across the route gives one crest and one trough, and the amplitude
 * itself swells toward the middle of the journey (148 at the ends, 230 at the
 * centre) so the arcs differ in height rather than repeating. The 0.08 phase
 * shift starts the first hub off the midline, so the scene opens on a curve
 * rather than on a flat line.
 *
 * Because every hub sits at a whole `u = i / (N - 1)`, the hubs are ON this
 * curve by construction — they cannot drift off the path they are threaded
 * onto, however the numbers here are retuned.
 */
const routeOffset = (u: number) =>
  -(148 + 82 * Math.sin(Math.PI * u)) * Math.sin(2 * Math.PI * (u + 0.08));

/** Samples used to draw the route. A multiple of N - 1 so every hub lands
 *  exactly on a sample. */
const ROUTE_SAMPLES = 40;

/* A node is not a point, and these are how far its ink reaches from the anchor:
   the glyph's own geometry ~73 above, the PHASE and name labels ~150 below.
   They define the band a WHOLE node can occupy without leaving the stage, which
   is what `railLevel` clamps into. */
const NODE_ABOVE = 95;
const NODE_BELOW = 160;

/* How far a NON-ACTIVE hub's ink reaches from its anchor. Only its glyph
   counts — the PHASE/name labels are opacity-gated to the active hub, so they
   are not there to be clipped. The glyph box sits at y = -118 with its
   geometry confined to 45-155 of a 200-unit viewBox, which puts the ink 73
   above the anchor and 37 below it.

   Only the ACTIVE hub is clamped into the safe band. The others are placed by
   the world, wherever the camera happens to put them — including past an edge
   with half a glyph still on screen, which is what sliced a Deployment glyph
   across the bottom of the frame on the last step. These two numbers are how
   far beyond the band that starts, i.e. where the fade has to reach zero. */
const HUB_INK_ABOVE = 73;
const HUB_INK_BELOW = 37;

/** Emitted SVG coordinates are rounded so the server and the browser produce
 *  byte-identical path strings. `Math.sin` is implementation-defined in its
 *  last bits, and a mismatch here is a hydration error, not a rounding error. */
const r2 = (n: number) => Math.round(n * 100) / 100;

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
  let d = `M ${r2(pts[0].x)} ${r2(pts[0].y)}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${r2(c1x)} ${r2(c1y)}, ${r2(c2x)} ${r2(c2y)}, ${r2(p2.x)} ${r2(p2.y)}`;
  }
  return d;
}

export default function Journey() {
  const containerRef = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const cameraRef = useRef<SVGGElement | null>(null);
  const beamCoreRef = useRef<SVGPathElement | null>(null);
  const beamGlowRef = useRef<SVGPathElement | null>(null);
  const cometRef = useRef<SVGCircleElement | null>(null);
  const hintRef = useRef<HTMLDivElement | null>(null);
  const cometGlowRef = useRef<SVGCircleElement | null>(null);
  const beamLenRef = useRef(0);
  const lastIdxRef = useRef(0);
  /** The rail's step badges — the elements the nodes align themselves to. */
  const badgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
  /** The hub groups. Their opacity is driven per frame — see `render`. */
  const hubRefs = useRef<(SVGGElement | null)[]>([]);
  /** Arc length along the route at each hub. */
  const hubLenRef = useRef<number[]>([]);
  /* The pinned scene's draw function and the progress it was last drawn at,
     lifted out of the matchMedia closure so the settle pass below can drive
     another frame without owning any of the scene's state. */
  const renderRef = useRef<((p: number) => void) | null>(null);
  const progressRef = useRef(0);

  const [active, setActive] = useState(0);

  const steps = journey.steps;
  const N = steps.length;

  const spanX = (N - 1) * HUB_GAP;

  // Hubs and route come off the SAME function, so the six phases are threaded
  // onto one continuous curve instead of being joined by five separate arcs.
  // x is linear in u, which is also what lets `lengthAtX` bisect for a hub.
  const hubs = steps.map((_, i) => {
    const u = N > 1 ? i / (N - 1) : 0;
    return { x: r2(HUB_X0 + u * spanX), y: r2(BASE_Y + routeOffset(u)) };
  });
  const pathPts = Array.from({ length: ROUTE_SAMPLES + 1 }, (_, k) => {
    const u = k / ROUTE_SAMPLES;
    return { x: HUB_X0 + u * spanX, y: BASE_Y + routeOffset(u) };
  });
  const beamD = buildPath(pathPts);
  const first = hubs[0];
  const last = hubs[N - 1];

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
    const y = +(rand(i, 1) < 0.5 ? 76 + rand(i, 4) * 170 : 524 + rand(i, 4) * 194).toFixed(4);
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
        const svg = svgRef.current;
        if (!camera || !core || !svg) return;

        /** Arc length at which the route reaches `x`. x increases monotonically
         *  along it, so a bisection is exact enough in 24 steps, and this only
         *  runs on measure. It is needed because arc length is NOT linear in x
         *  on a curve this deep: driving the head by `progress * totalLength`
         *  would have it reach each phase early or late, which is precisely the
         *  beam-vs-node disagreement this pass is here to fix. */
        const lengthAtX = (x: number, total: number) => {
          let lo = 0;
          let hi = total;
          for (let i = 0; i < 24; i++) {
            const mid = (lo + hi) / 2;
            if (core.getPointAtLength(mid).x < x) lo = mid;
            else hi = mid;
          }
          return (lo + hi) / 2;
        };

        /**
         * The vertical level, in user space, that the node for the interpolated
         * step should sit at: level with the RAIL BADGE of the same phase, so
         * the eye reads the left step and the right node as one thing.
         *
         * Measured live, every frame, on purpose. The rail is not a static list
         * — the active row grows (a bigger name, and the body opening from 0fr
         * to 1fr over 0.55s), which moves every row beneath it. A one-off
         * measurement would be right for one step and wrong for the other five.
         *
         * Reads only. Every write in this scene happens after it, because a rect
         * read that follows a style write in the same frame is what turns this
         * into layout thrash.
         */
        const railLevel = (i0: number, i1: number, f: number) => {
          const a = badgeRefs.current[i0];
          const b = badgeRefs.current[i1];
          const box = svg.getBoundingClientRect();
          const fallback = { y: BASE_Y, top: 0, bottom: VIEW_H };
          if (!a || !b || !box.height || !box.width) return fallback;

          /* px -> user space for `xMidYMid slice`, done by hand rather than via
             getScreenCTM: whether the root svg's CTM includes the viewBox
             transform is a long-standing ambiguity between engines, and this
             has to be right on all of them. */
          const scale = Math.max(box.width / VIEW_W, box.height / VIEW_H);
          const offY = box.top + (box.height - VIEW_H * scale) / 2;
          const toUser = (clientY: number) => (clientY - offY) / scale;

          const ra = a.getBoundingClientRect();
          const rb = b.getBoundingClientRect();
          const ya = ra.top + ra.height / 2;
          const yb = rb.top + rb.height / 2;
          const wanted = toUser(ya + (yb - ya) * f);

          /* The band a whole node fits in. Where the rail runs lower than that
             — a short window puts the last rows near the fold — the node stops
             at the edge of the band instead of walking its labels off the
             canvas. On a window tall enough for the rail (~950px and up) the
             clamp never binds and all six line up exactly. */
          const top = toUser(box.top) + NODE_ABOVE;
          const bottom = toUser(box.bottom) - NODE_BELOW;
          if (bottom <= top) return fallback;
          return { y: gsap.utils.clamp(top, bottom, wanted), top, bottom };
        };

        const measure = () => {
          const total = core.getTotalLength();
          beamLenRef.current = total;
          hubLenRef.current = hubs.map((h) => lengthAtX(h.x, total));
        };

        /**
         * Draw the scene at scroll progress `p`.
         *
         * The head, the drawn length and the camera all come off the SAME
         * interpolation, which is what keeps the beam's tip, the glowing node
         * and the highlighted rail row from ever disagreeing. At a whole step
         * the head sits exactly ON that phase's hub, and the camera puts that
         * hub at the stage's horizontal centre and at its rail row's level.
         */
        const render = (p: number) => {
          progressRef.current = p;
          const t = p * (N - 1);
          const i0 = Math.min(N - 1, Math.max(0, Math.floor(t)));
          const i1 = Math.min(N - 1, i0 + 1);
          const f = t - i0;

          // --- reads
          const { y: targetY, top, bottom } = railLevel(i0, i1, f);
          const total = beamLenRef.current;
          const lens = hubLenRef.current;
          const drawn =
            lens.length === N ? lens[i0] + (lens[i1] - lens[i0]) * f : p * total;
          const head = core.getPointAtLength(Math.min(Math.max(drawn, 0), total));

          // --- writes
          const camY = targetY - head.y;
          gsap.set(camera, { x: SCREEN_CX - head.x, y: camY });

          /* Hub opacity is owned here rather than by the class ladder, because
             it is the product of two independent things:

               state  how close this hub is to being the active one. Driven off
                      the CONTINUOUS `t` rather than the discrete `active`, so a
                      hub brightens as the scene scrubs toward it instead of
                      snapping when the index flips. The classes still carry the
                      active hub's colour and drop-shadow; only opacity moved.

               edge   how much of the hub still fits on the stage. A hub outside
                      the safe band is on its way off, and the ramp ends exactly
                      where its glyph's ink would first touch the viewport — so
                      a hub is never both visible and cut.

             `.hub`'s opacity transition is dropped in the CSS to match: a
             per-frame write and a 0.6s transition on the same property only
             ever produces lag. */
          const upRamp = Math.max(1, NODE_ABOVE - HUB_INK_ABOVE);
          const downRamp = Math.max(1, NODE_BELOW - HUB_INK_BELOW);
          gsap.set(hubRefs.current.filter(Boolean) as SVGGElement[], {
            opacity: (i: number) => {
              const base = i < t ? 0.5 : 0.3;
              const near = 1 - Math.min(1, Math.abs(i - t));
              const state = base + (1 - base) * near;

              const y = hubs[i].y + camY;
              const over =
                y < top ? (top - y) / upRamp : y > bottom ? (y - bottom) / downRamp : 0;

              return state * Math.max(0, 1 - over);
            },
          });
          gsap.set([core, glow], {
            strokeDashoffset: total ? 1 - drawn / total : 1,
          });
          gsap.set([cometRef.current, cometGlowRef.current], {
            attr: { cx: head.x, cy: head.y },
          });
        };

        measure();
        render(0);
        renderRef.current = render;

        const st = ScrollTrigger.create({
          id: "journeyPin",
          trigger: containerRef.current,
          start: "top top",
          end: `+=${(N - 1) * 62}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: (self) => {
            measure();
            render(self.progress);
          },
          onUpdate: (self) => {
            const p = self.progress;

            // scroll hint: visible as the scene pins, fades out the moment the
            // user starts advancing it
            if (hintRef.current) {
              gsap.set(hintRef.current, { autoAlpha: 1 - Math.min(1, p / 0.07) });
            }

            render(p);

            // discrete active step → drives the rail + hub ignition (React state,
            // only fires on step change so there is no per-frame re-render)
            const idx = Math.round(p * (N - 1));
            if (idx !== lastIdxRef.current) {
              lastIdxRef.current = idx;
              setActive(idx);
            }
          },
        });

        return () => {
          renderRef.current = null;
          st.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: containerRef }
  );

  /* The rail keeps moving for ~0.55s after the active step changes — the
     name grows, the body opens from 0fr to 1fr — and by then the scroll that
     caused it has usually stopped, taking with it the only thing driving
     `render`. The node would settle level with where the row USED to be. So
     for as long as that transition runs, keep redrawing at the progress the
     scene is already at: the node follows the row down and stops with it. */
  useEffect(() => {
    const render = renderRef.current;
    if (!render || prefersReducedMotion()) return;
    const until = performance.now() + 750;
    let raf = requestAnimationFrame(function tick() {
      render(progressRef.current);
      if (performance.now() < until) raf = requestAnimationFrame(tick);
    });
    return () => cancelAnimationFrame(raf);
  }, [active]);

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
          ref={svgRef}
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
              x={-900}
              y={-900}
              width={spanX + 2800}
              height={VIEW_H + 2200}
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

            {/* beam: the whole route as a dashed track, then the travelled part
                over it as a blurred glow + crisp core. Only those two get
                `pathLength={1}`, so their dashoffset is driven in 0-1 progress
                space; the track's dasharray stays in user units. */}
            <path d={beamD} className={styles.beamTrack} />
            <path ref={beamGlowRef} d={beamD} className={styles.beamGlow} pathLength={1} filter="url(#j-glow)" />
            <path ref={beamCoreRef} d={beamD} className={styles.beamCore} pathLength={1} />

            {/* hubs */}
            {hubs.map((h, i) => (
              <g
                key={steps[i].name}
                ref={(el) => {
                  hubRefs.current[i] = el;
                }}
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
                <span
                  className={styles.railBadge}
                  ref={(el) => {
                    badgeRefs.current[i] = el;
                  }}
                >
                  {s.n}
                </span>
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
