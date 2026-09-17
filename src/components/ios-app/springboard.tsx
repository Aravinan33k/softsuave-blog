"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface SpringboardContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * SQUARE artwork for the tile — it is cropped 1:1 and masked into a
     * rounded square, so anything else arrives distorted or badly cut.
     * `alt` may be empty when decorative: the tile names its service in text.
     */
    readonly image?: { readonly src: string; readonly alt: string };
  }[];
}

/**
 * Services as a springboard — each one on a rounded square tile, laid out the
 * way apps sit on an iOS home screen.
 *
 * This page sells work across iPhone, Watch and TV, so the section is built
 * from the one interface all three share. The tiles carry a photograph rather
 * than a glyph, cropped square and masked into the superellipse-ish rounded
 * square the platform uses, with the service's index in the corner where a
 * badge would sit.
 *
 * The reveal is the spring an icon grid arrives on: tiles scale up from
 * nothing with a `back.out` overshoot, staggered along the grid rather than
 * row by row, so it reads as a screen populating rather than a list appearing.
 * Hovering presses the tile down slightly and lifts its shadow — the tap
 * feedback the same interface gives.
 *
 * Entrance is one detached timeline played once by a bare trigger — never a
 * timeline owned by a ScrollTrigger, which a mid-play `ScrollTrigger.refresh()`
 * would restore at its interrupted progress, paused (see why-us.tsx).
 */
export default function Springboard({
  content,
  id = "services",
}: {
  content: SpringboardContent;
  id?: string;
}) {
  const root = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tiles = gsap.utils.toArray<HTMLElement>(`.${styles.sbdTile}`, root.current);
      const copy = gsap.utils.toArray<HTMLElement>(`.${styles.sbdCopy}`, root.current);
      if (!tiles.length) return;

      gsap.set(tiles, { scale: 0.55, opacity: 0, transformOrigin: "center center" });
      gsap.set(copy, { opacity: 0, y: 12 });

      const tl = gsap.timeline({ paused: true });

      tl.to(tiles, {
        scale: 1,
        opacity: 1,
        duration: 0.7,
        ease: "back.out(2)",
        stagger: { each: 0.07, from: "start" },
        clearProps: "transform,opacity",
      }).to(
        copy,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
          stagger: 0.07,
          clearProps: "transform,opacity",
        },
        0.22,
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

      <ul ref={root} className={styles.sbdGrid}>
        {content.items.map((item, i) => (
          <li key={item.name} className={styles.sbdItem}>
            <span className={styles.sbdTile}>
              {item.image && (
                <Image
                  src={publicMediaUrl(item.image.src)}
                  alt={item.image.alt}
                  fill
                  sizes="(max-width: 699px) 40vw, (max-width: 1079px) 28vw, 18vw"
                />
              )}
              <span className={styles.sbdBadge} aria-hidden>
                {pad(i + 1)}
              </span>
            </span>

            <div className={styles.sbdCopy}>
              <h3 className={styles.sbdName}>{item.name}</h3>
              <p className={styles.sbdText}>{item.body}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
