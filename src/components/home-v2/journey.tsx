"use client";

import { useRef } from "react";
import {
  FlaskConical,
  Plug,
  Rocket,
  ScanSearch,
  Target,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import { journey } from "@/lib/home/content";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "@/components/home/split-reveal";
import home from "@/components/home/home.module.css";
import styles from "./home-v2.module.css";

/** One glyph per phase, by its number in content.ts. */
const ICONS: Record<string, LucideIcon> = {
  "01": Target,
  "02": ScanSearch,
  "03": FlaskConical,
  "04": Plug,
  "05": Rocket,
  "06": TrendingUp,
};

/** How long the fill takes to travel from the first phase to the sixth. */
const FILL_SECONDS = 4;

/**
 * Homepage AI Transformation Journey (`/`): a lit timeline in place of the
 * pinned scene.
 *
 * Every phase is on screen at once as a card with its icon on a route. When
 * the section comes into view the route fills itself with the brand gradient,
 * slowly, from the first phase to the sixth, and each phase lights up as the
 * fill reaches it. It plays on its own — scrolling only starts it, never
 * drives it — and once lit the route stays lit. Wide screens run the route
 * left to right with the cards alternating above and below it; below 1200px
 * it runs down the left edge of a single column.
 *
 * The route is measured from the first node to the last (not sized in CSS),
 * so it starts and ends exactly on them in either orientation.
 */
export default function Journey() {
  const root = useRef<HTMLElement | null>(null);
  const rail = useRef<HTMLDivElement | null>(null);
  const fill = useRef<HTMLSpanElement | null>(null);

  useGSAP(
    () => {
      const railEl = rail.current;
      const fillEl = fill.current;
      if (!railEl || !fillEl) return;
      const steps = Array.from(railEl.querySelectorAll<HTMLElement>(`.${styles.jrStep}`));
      const nodes = Array.from(railEl.querySelectorAll<HTMLElement>(`.${styles.jrNode}`));
      const last = Math.max(1, steps.length - 1);
      let horizontal = true;
      let progress = 0;

      const paint = () => {
        fillEl.style.transform = horizontal ? `scaleX(${progress})` : `scaleY(${progress})`;
        steps.forEach((step, i) => {
          step.dataset.on = String(progress > 0 && progress >= i / last - 0.02);
        });
      };

      // Run the track from the first node's centre to the last node's.
      const measure = () => {
        const box = railEl.getBoundingClientRect();
        const a = nodes[0].getBoundingClientRect();
        const b = nodes[nodes.length - 1].getBoundingClientRect();
        const ax = a.left + a.width / 2 - box.left;
        const ay = a.top + a.height / 2 - box.top;
        const bx = b.left + b.width / 2 - box.left;
        const by = b.top + b.height / 2 - box.top;
        horizontal = Math.abs(by - ay) < 2;
        const s = railEl.style;
        s.setProperty("--track-x", `${horizontal ? ax : ax - 1}px`);
        s.setProperty("--track-y", `${horizontal ? ay - 1 : ay}px`);
        s.setProperty("--track-w", `${horizontal ? bx - ax : 2}px`);
        s.setProperty("--track-h", `${horizontal ? 2 : by - ay}px`);
        s.setProperty("--fill-dir", horizontal ? "90deg" : "180deg");
        paint();
      };

      measure();
      const ro = new ResizeObserver(measure);
      ro.observe(railEl);

      if (prefersReducedMotion()) {
        progress = 1;
        paint();
        return () => ro.disconnect();
      }

      // Once the route is well into view, fill it end to end on a timer.
      const state = { p: 0 };
      let tween: gsap.core.Tween | null = null;
      const st = ScrollTrigger.create({
        trigger: railEl,
        start: "top 70%",
        once: true,
        onEnter: () => {
          tween = gsap.to(state, {
            p: 1,
            duration: FILL_SECONDS,
            ease: "power1.inOut",
            onUpdate: () => {
              progress = state.p;
              paint();
            },
          });
        },
      });

      return () => {
        ro.disconnect();
        st.kill();
        tween?.kill();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`${home.section} ${styles.jr}`} id="journey">
      <div className={styles.head}>
        <div>
          <span className={home.eyebrow}>{journey.eyebrow}</span>
          <SplitReveal as="h2" className={home.h2} type="words">
            {journey.title}
          </SplitReveal>
        </div>
        <p className={home.lead}>{journey.body}</p>
      </div>

      <div ref={rail} className={styles.jrRail}>
        <span className={styles.jrTrack} aria-hidden>
          <span ref={fill} className={styles.jrFill} />
        </span>
        <ol className={styles.jrList}>
          {journey.steps.map((s) => {
            const Icon = ICONS[s.n] ?? Target;
            return (
              <li key={s.n} className={styles.jrStep}>
                <span className={styles.jrNode} aria-hidden>
                  <Icon strokeWidth={1.7} />
                </span>
                <div className={styles.jrCard}>
                  <span className={styles.jrPhase}>Phase {s.n}</span>
                  <h3 className={styles.jrName}>{s.name}</h3>
                  <p className={styles.jrBody}>{s.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
