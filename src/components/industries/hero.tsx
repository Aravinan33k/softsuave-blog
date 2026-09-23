"use client";

import { useRef } from "react";
import Link from "next/link";
import BrandImage from "@/components/home/brand-image";
import Breadcrumb from "@/components/common/breadcrumb";
import PartnerBadges from "@/components/common/partner-badges";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
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

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      const tl = gsap.timeline({ delay: 0.15 });
      tl.from(
        `.${styles.heroLine}`,
        { yPercent: 40, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.09 },
        0.1,
      )
        .from(
          `.${styles.heroBody}`,
          { opacity: 0, y: 20, duration: 0.7, ease: "power2.out" },
          "-=0.55",
        )
        .from(
          `.${styles.heroAside}`,
          { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" },
          "-=0.45",
        )
        .from(
          `.${styles.heroCtas}`,
          { opacity: 0, y: 16, duration: 0.6, ease: "power2.out" },
          "-=0.4",
        )
        .from(
          `.${styles.heroFrame}`,
          { opacity: 0, y: 34, duration: 0.9, ease: "power3.out", stagger: 0.08 },
          0.2,
        )
        .from(`.${styles.heroPlate}`, { opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");
    },
    { scope: root },
  );

  return (
    <section ref={root} className={styles.hero} id="top">
      <div className={styles.heroCopy}>
        <Breadcrumb />
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
          <div key={frame.id} className={styles.heroFrame}>
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
