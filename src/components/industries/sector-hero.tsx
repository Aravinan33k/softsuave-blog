"use client";

import { useRef } from "react";
import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import Magnetic from "@/components/home/magnetic";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import { why } from "@/lib/home/content";
import { sectors } from "@/lib/home/industries-content";
import type { SectorPageContent } from "@/lib/home/sectors/types";
import styles from "./industries.module.css";

const years = why.stats.find((s) => s.icon === "years");

/**
 * Sector-page hero. The index's hero composition with one frame instead of
 * three: copy and both CTAs hold the left column, the sector's own portrait
 * frame the right.
 *
 * Construction and Aviation have no generated frame, so they get the
 * typographic panel instead — the sector's menu tagline set large, over the
 * names of what we build for it. Deliberately not a photograph of a different
 * industry.
 *
 * The secondary CTA is the route back to the index, so no sector page is a dead
 * end and the reader can always get to the other seven.
 */
export default function SectorHero({ content }: { content: SectorPageContent }) {
  const root = useRef<HTMLElement | null>(null);
  const { hero, solutions } = content;
  const indexEntry = sectors.items.find((s) => s.key === content.key);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(
        `.${styles.heroLine}`,
        { yPercent: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.09 },
        0.1,
      )
        .from(`.${styles.heroBody}`, { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" }, "-=0.55")
        .from(`.${styles.heroCtas}`, { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" }, "-=0.4")
        .from(
          `.${styles.heroFrame}, .${styles.heroBrief}`,
          { opacity: 0, y: 34, duration: 0.9, ease: "power3.out" },
          0.2,
        )
        .from(`.${styles.heroPlate}`, { opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <h1 className={styles.heroTitle}>
          {hero.titleLines.map((line, i) => (
            <span
              key={line}
              className={`${styles.heroLine} ${
                i === hero.titleLines.length - 1 ? styles.heroTitleAccent : ""
              }`}
            >
              {line}
              {i < hero.titleLines.length - 1 ? " " : null}
            </span>
          ))}
        </h1>
        <p className={styles.heroBody}>{hero.body}</p>

        <div className={styles.heroCtas}>
          <Magnetic>
            <Link
              href="/contact"
              className={`${styles.pill} ${styles.pillFilled}`}
              data-cursor="Book a call"
            >
              Book AI Strategy Call
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="/industries" className={styles.pill} data-cursor="Industries">
              All industries
            </Link>
          </Magnetic>
        </div>
      </div>

      <div className={`${styles.heroFrames} ${styles.heroFramesSolo}`}>
        {hero.img ? (
          <div className={styles.heroFrame}>
            <BrandImage
              page="four"
              id={hero.img}
              alt={`${content.name} — ${indexEntry?.tagline ?? content.name}`}
              fill
              priority
              sizes="(min-width: 1000px) 44vw, 92vw"
            />
          </div>
        ) : (
          <div className={styles.heroBrief}>
            {indexEntry ? <p className={styles.heroBriefLine}>{indexEntry.tagline}</p> : null}
            <ul className={styles.heroBriefList}>
              {solutions.items.slice(0, 4).map((item) => (
                <li key={item.name}>{item.name}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.heroPlate}>
          <span>
            <span className={styles.heroPlateFigure}>{solutions.items.length}</span> solution
            families
          </span>
          {years ? (
            <span>
              <span className={styles.heroPlateFigure}>
                {years.value}
                {years.suffix}
              </span>{" "}
              years delivering
            </span>
          ) : null}
        </div>
      </div>
    </section>
  );
}
