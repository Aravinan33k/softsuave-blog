"use client";

import { Fragment, useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import styles from "@/components/landing/landing.module.css";

/**
 * A left-to-right pipeline: what goes in, what each stage does to it, what
 * comes out. `detail` is a one-line gloss under the stage name; `label` is a
 * screen-reader name for the whole diagram.
 */
export interface FlowContent {
  label: string;
  steps: readonly { readonly name: string; readonly detail?: string }[];
}

/**
 * Pipeline diagram — numbered stage cards joined by hairline connectors,
 * horizontal from 1000px and stacked below it.
 *
 * Motion, in two movements (both skipped under reduced motion, where the
 * diagram is simply all there):
 *
 *   reveal   on entering the viewport, the stages spring in left to right and
 *            each connector draws itself toward the next stage — one staggered
 *            timeline, once.
 *   flow     after the reveal, a single coral packet travels the pipeline
 *            stage to stage on a loop; the stage it arrives at lights up
 *            (accent border) until the packet moves on. The loop pauses while
 *            the diagram is off-screen so it costs nothing when unseen.
 *
 * The packet moves along `left` (horizontal) or `top` (stacked), decided by
 * `gsap.matchMedia`, so a resize across the breakpoint reverts and rebuilds
 * the loop for the new axis instead of leaving a dot travelling sideways
 * across a vertical line.
 */
export default function Flow({ content }: { content: FlowContent }) {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const el = root.current;
      const steps = gsap.utils.toArray<HTMLElement>(`.${styles.flowStep}`, el);
      const lines = gsap.utils.toArray<HTMLElement>(`.${styles.flowLine}`, el);
      const dots = gsap.utils.toArray<HTMLElement>(`.${styles.flowDot}`, el);
      if (!steps.length) return;

      const activate = (i: number) => {
        steps.forEach((s, j) => s.classList.toggle(styles.flowStepActive, j === i));
      };
      const clear = () => steps.forEach((s) => s.classList.remove(styles.flowStepActive));

      let revealed = false;
      let inView = false;

      const mm = gsap.matchMedia();
      mm.add(
        { horizontal: "(min-width: 1000px)", stacked: "(max-width: 999px)" },
        (ctx) => {
          const { horizontal } = ctx.conditions as { horizontal: boolean };
          const axis = horizontal ? "left" : "top";

          // --- reveal: stages spring in, connectors draw toward the next one.
          // Initial state set up front and a paused timeline of `to` tweens,
          // played once by a bare trigger below — not a timeline owned by a
          // ScrollTrigger, which a mid-play `ScrollTrigger.refresh()` would
          // leave stranded at its interrupted progress (see why-us.tsx).
          const axisScale = horizontal ? "scaleX" : "scaleY";
          gsap.set(steps, { opacity: 0, y: horizontal ? 18 : 12, scale: 0.94 });
          gsap.set(lines, {
            [axisScale]: 0,
            transformOrigin: horizontal ? "left center" : "center top",
          });

          const reveal = gsap.timeline({
            paused: true,
            onComplete: () => {
              revealed = true;
              if (inView) loop.play(0);
            },
          });
          steps.forEach((step, i) => {
            reveal.to(
              step,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.55,
                ease: "back.out(1.6)",
                clearProps: "transform,opacity",
              },
              i === 0 ? 0 : "-=0.25",
            );
            if (lines[i]) {
              reveal.to(
                lines[i],
                { [axisScale]: 1, duration: 0.4, ease: "power2.out", clearProps: "transform" },
                "-=0.2",
              );
            }
          });

          const enter = ScrollTrigger.create({
            trigger: el,
            start: "top 82%",
            once: true,
            onEnter: () => reveal.play(0),
          });

          // --- flow: one packet, stage to stage, on a loop.
          const loop = gsap.timeline({ repeat: -1, repeatDelay: 1.1, paused: true });
          steps.forEach((_, i) => {
            loop.call(activate, [i], i === 0 ? 0 : "+=0");
            if (dots[i]) {
              loop
                .fromTo(
                  dots[i],
                  { [axis]: "0%", autoAlpha: 0, scale: 0.6 },
                  { autoAlpha: 1, scale: 1, duration: 0.18, ease: "power1.out" },
                  "+=0.45",
                )
                .to(dots[i], { [axis]: "100%", duration: 0.85, ease: "power1.inOut" }, "<")
                .to(dots[i], { autoAlpha: 0, scale: 0.6, duration: 0.18, ease: "power1.in" }, "-=0.12");
            }
          });
          // Hold the final stage lit through the repeat delay, then reset.
          loop.call(clear, [], `+=${1.0}`);

          // Only animate while the diagram is on-screen.
          const gate = ScrollTrigger.create({
            trigger: el,
            start: "top bottom",
            end: "bottom top",
            onToggle: (self) => {
              inView = self.isActive;
              if (!revealed) return;
              if (inView) loop.play();
              else loop.pause();
            },
          });

          return () => {
            enter.kill();
            reveal.kill();
            gate.kill();
            loop.kill();
            clear();
          };
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  const last = content.steps.length - 1;

  return (
    <div ref={root} className={styles.flow} role="list" aria-label={content.label}>
      {content.steps.map((step, i) => (
        <Fragment key={step.name}>
          <div className={styles.flowStep} role="listitem">
            {/* An icon picked from the stage's words, not a "01" ordinal (the
                Sep corrections review asked for icons in place of numbers);
                the arrows between the cards still carry the order. */}
            <CardIconBadge
              title={step.name}
              body={step.detail}
              size="sm"
              className={styles.flowIndex}
            />
            <span className={styles.flowName}>{step.name}</span>
            {step.detail && <span className={styles.flowDetail}>{step.detail}</span>}
          </div>

          {i < last && (
            <div className={styles.flowLink} aria-hidden>
              <span className={styles.flowLine} />
              <span className={styles.flowDot} />
              <svg className={styles.flowArrow} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 2.5l4 3.5-4 3.5" />
              </svg>
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
