"use client";

import { useRef, type CSSProperties } from "react";
import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import Breadcrumb from "@/components/common/breadcrumb";
import PartnerBadges from "@/components/common/partner-badges";
import { why } from "@/lib/home/content";
import { hero, sectors } from "@/lib/home/industries-content";
import styles from "./industries.module.css";

/** The years figure the whole site quotes, so this plate can never disagree. */
const years = why.stats.find((s) => s.icon === "years");

/**
 * Sector-index hero: the H1 and both CTAs hold the left column, three generated
 * portrait frames compose the right one.
 *
 * The split is deliberate — no headline or button ever sits over a photograph,
 * at any width. Below 1000px the frames become a three-up strip under the copy
 * rather than a shrunken version of the desktop stack, and the caption plate
 * moves with them.
 *
 * The intro animation is a line-staggered lift, matching the landing heroes;
 * the frames fade in behind it. Under reduced motion nothing animates and the
 * whole composition is already in its final state.
 */
export default function Hero() {
  const root = useRef<HTMLElement | null>(null);

  // The entrance plays in CSS (the hero-entrance block in industries.module.css)
  // from the first paint, with this hero's former GSAP timings. At hydration
  // that timeline re-hid copy already on screen, delaying the page's measured
  // main content (LCP) to the end of every script (PageSpeed, 15 Oct).

  return (
    <section ref={root} className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <Breadcrumb />
        <h1 className={styles.heroTitle}>
          {hero.titleLines.map((line, i) => (
            <span
              key={line}
              style={{ ["--i" as string]: i } as CSSProperties}
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
        <p className={styles.heroAside}>{hero.aside}</p>

        <div className={styles.heroCtas}>
          <Link
            href={hero.primaryCta.href}
            className={`${styles.pill} ${styles.pillFilled}`}
            data-cursor="Book a call"
          >
            {hero.primaryCta.label}
          </Link>
          {/* In-page anchor: a plain <a> so ScrollProvider's Lenis handler
              intercepts it instead of the router. */}
          <a href={hero.secondaryCta.href} className={styles.pill} data-cursor="Scroll">
            {hero.secondaryCta.label}
          </a>
        </div>
        <PartnerBadges />
      </div>

      <div className={styles.heroFrames}>
        {hero.frames.map((frame, i) => (
          <div key={frame.id} className={styles.heroFrame} style={{ ["--i" as string]: i } as CSSProperties}>
            <BrandImage
              page="four"
              id={frame.id}
              alt={frame.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1000px) 26vw, 31vw"
            />
          </div>
        ))}

        <div className={styles.heroPlate}>
          <span>
            <span className={styles.heroPlateFigure}>{sectors.items.length}</span> sectors served
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
