"use client";

import { useRef } from "react";
import TechLogo from "@/components/home/tech-logo";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

export interface StackLayersContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Tiers in the order the page lists them, top of the stack first. */
  layers: readonly {
    readonly name: string;
    readonly items: readonly { readonly name: string; readonly body: string }[];
  }[];
}

/**
 * The technology stack, drawn as an actual stack.
 *
 * The section is a list of tiers — Frontend over Platforms over Tools over
 * Database — and every technology in it comes with a real description, not
 * just a logo. So it is built as the thing it is named after: four slabs laid
 * one on another, each carrying its tier's technologies.
 *
 * The reveal is the stack being assembled, and it runs BOTTOM UP. The base
 * tier arrives first and each slab drops onto the one below it with a short
 * overshoot, which is the only order that reads as building rather than
 * falling. The tiers are in source order top-first (so the document matches
 * the page), and the stagger runs `from: "end"` to reverse it for the eye.
 *
 * Entrance is one detached timeline played once by a bare trigger — never a
 * timeline owned by a ScrollTrigger, which a mid-play `ScrollTrigger.refresh()`
 * would restore at its interrupted progress, paused (see why-us.tsx).
 */
export default function StackLayers({
  content,
  id = "tech",
}: {
  content: StackLayersContent;
  id?: string;
}) {
  const root = useRef<HTMLOListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const layers = gsap.utils.toArray<HTMLElement>(`.${styles.layer}`, root.current);
      const chips = gsap.utils.toArray<HTMLElement>(`.${styles.layerItem}`, root.current);
      if (!layers.length) return;

      gsap.set(layers, { opacity: 0, y: -34, scaleX: 0.965, transformOrigin: "center bottom" });
      gsap.set(chips, { opacity: 0, y: 14 });

      const tl = gsap.timeline({ paused: true });

      tl.to(layers, {
        opacity: 1,
        y: 0,
        scaleX: 1,
        duration: 0.72,
        ease: "back.out(1.5)",
        // Source order is top-first; the stack has to build from its base, so
        // the stagger runs backwards through it.
        stagger: { each: 0.16, from: "end" },
        clearProps: "transform,opacity",
      }).to(
        chips,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: { each: 0.05, from: "end" },
          clearProps: "transform,opacity",
        },
        0.3,
      );

      const st = ScrollTrigger.create({
        trigger: root.current,
        start: "top 80%",
        once: true,
        onEnter: () => tl.play(0),
      });

      return () => {
        st.kill();
        tl.kill();
      };
    },
    { scope: root },
  );

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <ol ref={root} className={styles.layerStack}>
        {content.layers.map((layer) => (
          <li key={layer.name} className={styles.layer}>
            <div className={styles.layerHead}>
              {/* An icon picked from the layer's name, not the "01"-from-the-base
                  ordinal it used to carry: the Sep corrections review asked for
                  icons in place of numbers. The stack's order is the sequence. */}
              <CardIconBadge title={layer.name} size="sm" className={styles.layerIndex} />
              <h3 className={styles.layerName}>{layer.name}</h3>
              <span className={styles.layerRule} aria-hidden />
            </div>

            <ul className={styles.layerItems}>
              {layer.items.map((item) => (
                <li key={item.name} className={styles.layerItem}>
                  <span className={styles.layerItemHead}>
                    <span className={styles.layerItemLogo} aria-hidden>
                      <TechLogo name={item.name} />
                    </span>
                    <span className={styles.layerItemName}>{item.name}</span>
                  </span>
                  <p className={styles.layerItemBody}>{item.body}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
