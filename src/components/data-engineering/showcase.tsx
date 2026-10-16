"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SectionHead from "@/components/landing/section-head";
import styles from "@/components/landing/landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface ShowcaseContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly name: string;
    readonly body: string;
    /**
     * Artwork for this entry, shown in the pinned media panel while the
     * entry is the one being read. Root-relative `src`, resolved with
     * `publicMediaUrl`. Decorative — the row already names the solution in
     * text — so `alt` is normally empty.
     */
    readonly image?: { readonly src: string; readonly alt: string };
  }[];
}

/**
 * Showcase — an editorial index whose artwork follows your reading position.
 *
 * The entries run down the left as a numbered list, full text visible, while
 * a single media panel sits pinned beside them on the right. As you scroll,
 * whichever entry is crossing the middle of the viewport becomes the active
 * one: its artwork cross-fades into the panel, its index turns coral, and a
 * rule draws across its foot.
 *
 * Why not the carousel the other service pages use: a carousel shows one
 * entry and hides the rest behind a dwell timer, which suits four or five
 * headline services being *sold*. This list is a catalogue being *scanned* —
 * every entry stays readable and comparable, and the artwork is the reward
 * for reading rather than a gate in front of it. It also needs no
 * interaction to come alive, so it reads the same to someone who never
 * touches the page.
 *
 * Nothing here is pinned by GSAP or scrubbed: the panel is CSS `sticky` and
 * the active entry is chosen by plain enter/leave triggers, so this stays
 * within the landing surface's reveals-and-staggers rule. Below 1000px the
 * media panel is dropped entirely and the list stands on its own.
 */
export default function Showcase({
  content,
  id = "services",
}: {
  content: ShowcaseContent;
  id?: string;
}) {
  const root = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (!root.current) return;
      const el = root.current;
      const rows = gsap.utils.toArray<HTMLElement>(`.${styles.showRow}`, el);
      if (!rows.length) return;

      // The active entry is tracked even under reduced motion — it is
      // navigation, not decoration, and the panel swap is a plain cross-fade
      // that the theme's reduced-motion rules already neutralise.
      const triggers = rows.map((row, i) =>
        ScrollTrigger.create({
          trigger: row,
          start: "top 62%",
          end: "bottom 62%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        }),
      );

      if (prefersReducedMotion()) return () => triggers.forEach((t) => t.kill());

      gsap.set(rows, { opacity: 0, y: 26 });
      const reveal = gsap.timeline({ paused: true });
      reveal.to(rows, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.09,
        clearProps: "transform,opacity",
      });

      // Detached timeline played once by a bare trigger, so a mid-play
      // `ScrollTrigger.refresh()` cannot strand it (see why-us.tsx).
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        once: true,
        onEnter: () => reveal.play(0),
      });

      return () => {
        triggers.forEach((t) => t.kill());
        st.kill();
        reveal.kill();
      };
    },
    { scope: root },
  );

  const withArt = content.items.filter((i) => i.image);

  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <div ref={root} className={styles.showGrid}>
        <ol className={styles.showList}>
          {content.items.map((item, i) => (
            <li
              key={item.name}
              className={i === active ? `${styles.showRow} ${styles.showRowActive}` : styles.showRow}
            >
              <span className={styles.showIndex} aria-hidden>
                {pad(i + 1)}
              </span>
              <div className={styles.showRowMain}>
                <h3 className={styles.showName}>{item.name}</h3>
                <p className={styles.showBody}>{item.body}</p>
              </div>
              <span className={styles.showRule} aria-hidden />
            </li>
          ))}
        </ol>

        {/* Pinned artwork. Decorative and index-driven, so it is kept out of
            the accessibility tree; every entry's meaning is in the list. */}
        {withArt.length > 0 && (
          <div className={styles.showMedia} aria-hidden>
            <div className={styles.showMediaFrame}>
              {content.items.map((item, i) =>
                item.image ? (
                  <span
                    key={item.name}
                    className={
                      i === active
                        ? `${styles.showMediaShot} ${styles.showMediaShotOn}`
                        : styles.showMediaShot
                    }
                  >
                    <Image
                      src={publicMediaUrl(item.image.src)}
                      alt=""
                      fill
                      sizes="(max-width: 999px) 0px, 42vw"
                    />
                  </span>
                ) : null,
              )}
              <span className={styles.showMediaVeil} />
              <span className={styles.showMediaCount}>
                {pad(active + 1)}
                <span className={styles.showMediaCountTotal}>/{pad(content.items.length)}</span>
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
