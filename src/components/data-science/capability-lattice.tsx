"use client";

import { useCallback, useLayoutEffect, useRef, useState, useSyncExternalStore } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";
import type { CardGridContent } from "@/components/landing/industries";

const pad = (n: number) => String(n).padStart(2, "0");

const REDUCED = "(prefers-reduced-motion: reduce)";

/**
 * Whether the visitor asked for less motion, as a subscription rather than a
 * one-off read in an effect: the mesh's rendered state depends on it, and it
 * can change mid-session. The server snapshot is `false` — nothing is drawn
 * server-side anyway, since the edges only exist once the ports are measured.
 */
const subscribeMotion = (onChange: () => void) => {
  if (typeof window === "undefined" || !window.matchMedia) return () => {};
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
};

interface Edge {
  readonly a: number;
  readonly b: number;
  readonly x1: number;
  readonly y1: number;
  readonly x2: number;
  readonly y2: number;
  readonly len: number;
  /** Seconds into the draw at which this edge starts. */
  readonly delay: number;
}

/**
 * Why Soft Suave — the reasons as a wired lattice rather than six cards in a
 * row.
 *
 * This section's own argument is that the six things have to CONNECT: the
 * intro says the engagement should join business questions, available data,
 * analytical methods, validation, information security and the surrounding
 * software environment. Six separate cards say the opposite — six separate
 * capabilities. So each card carries a port, and every port is wired to every
 * other: fifteen edges, drawn shortest-first as the section is reached, so the
 * mesh grows outward from the tight pairs to the long diagonals. Pointing at
 * a card drops the rest of the mesh away and lights only that card's five
 * connections — the claim, checked one capability at a time.
 *
 * The mesh is measured from the ports' real positions and re-measured on
 * resize, so it is correct at every breakpoint and after fonts land rather
 * than only at the width it was designed on. It is decorative — every word of
 * the argument is in the text — so the SVG is `aria-hidden` and nothing here
 * is a focus stop.
 *
 * The edges draw on a CSS transition, not a tween: they are React-rendered
 * from measured state, and a resize re-render mid-tween would fight GSAP for
 * the same property. Cards and ports keep the usual hardened reveal — initial
 * state set, then a detached free-running tween fired once by a bare trigger,
 * which no `ScrollTrigger.refresh()` can strand (see why-us.tsx).
 */
export default function CapabilityLattice({
  content,
  id = "why",
}: {
  content: CardGridContent;
  id?: string;
}) {
  const wrap = useRef<HTMLDivElement | null>(null);
  const ports = useRef<(HTMLSpanElement | null)[]>([]);

  const [edges, setEdges] = useState<readonly Edge[]>([]);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [revealed, setRevealed] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  const still = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(REDUCED).matches,
    () => false,
  );
  // Reduced motion never reaches the reveal below, so the mesh would stay
  // undrawn forever. It is simply there instead, with the transition off.
  const drawn = revealed || still;

  const measure = useCallback(() => {
    const el = wrap.current;
    if (!el) return;
    const box = el.getBoundingClientRect();
    if (!box.width) return;

    const pts = ports.current.map((p) => {
      if (!p) return null;
      const r = p.getBoundingClientRect();
      return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
    });

    const next: Edge[] = [];
    for (let a = 0; a < pts.length; a += 1) {
      for (let b = a + 1; b < pts.length; b += 1) {
        const p = pts[a];
        const q = pts[b];
        if (!p || !q) continue;
        next.push({
          a,
          b,
          x1: p.x,
          y1: p.y,
          x2: q.x,
          y2: q.y,
          len: Math.hypot(q.x - p.x, q.y - p.y),
          delay: 0,
        });
      }
    }

    // Shortest first, so the mesh grows from the near pairs outward to the
    // long diagonals instead of arriving as one flat wash.
    const order = [...next].sort((m, n) => m.len - n.len);
    const delayOf = new Map(order.map((e, i) => [`${e.a}-${e.b}`, 0.2 + i * 0.035]));

    setSize({ w: box.width, h: box.height });
    setEdges(next.map((e) => ({ ...e, delay: delayOf.get(`${e.a}-${e.b}`) ?? 0 })));
  }, []);

  useLayoutEffect(() => {
    measure();
    const el = wrap.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !wrap.current) return;
      const el = wrap.current;
      const cards = gsap.utils.toArray<HTMLElement>(`.${styles.latNode}`, el);
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.latPort}`, el);
      if (!cards.length) return;

      gsap.set(cards, { opacity: 0, y: 30 });
      gsap.set(dots, { scale: 0, transformOrigin: "center center" });

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => {
          gsap.to(cards, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            // Leave no inline transform behind, so the CSS hover lift works.
            clearProps: "transform,opacity",
          });
          gsap.to(dots, {
            scale: 1,
            duration: 0.5,
            ease: "back.out(2.4)",
            stagger: 0.08,
            delay: 0.12,
            clearProps: "transform",
          });
          // The wiring follows the ports it attaches to.
          setRevealed(true);
        },
      });

      return () => st.kill();
    },
    { scope: wrap },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div
        ref={wrap}
        className={still ? `${styles.lattice} ${styles.latStill}` : styles.lattice}
      >
        <svg
          className={styles.latLinks}
          width={size.w || undefined}
          height={size.h || undefined}
          data-focused={active !== null}
          aria-hidden
        >
          {edges.map((e) => (
            <line
              key={`${e.a}-${e.b}`}
              className={
                active === e.a || active === e.b
                  ? `${styles.latLink} ${styles.latLinkOn}`
                  : styles.latLink
              }
              x1={e.x1}
              y1={e.y1}
              x2={e.x2}
              y2={e.y2}
              strokeDasharray={e.len}
              style={{
                strokeDashoffset: drawn ? 0 : e.len,
                transitionDelay: drawn ? `${e.delay}s` : "0s",
              }}
            />
          ))}
        </svg>

        <ul className={styles.latGrid}>
          {content.items.map((item, i) => (
            <li
              key={item.name}
              className={styles.latNode}
              data-lit={active === i}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <span
                ref={(el) => {
                  ports.current[i] = el;
                }}
                className={styles.latPort}
                aria-hidden
              />
              <span className={styles.latIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <h3 className={styles.latName}>{item.name}</h3>
              <p className={styles.latBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
