"use client";

import { useRef } from "react";
import BrandImage from "./brand-image";
import { testimonials } from "@/lib/home/content";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/home/gsap";
import SplitReveal from "./split-reveal";
import styles from "./home.module.css";

/**
 * Testimonials — a clean card grid: a header, then one card per review
 * (avatar + name + role + rating + quote). Three-up on desktop, stacked on
 * mobile. Cards stagger-fade in on scroll. Reduced motion renders them static.
 */
export default function Testimonials() {
  const root = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !root.current) return;
      gsap.from(`.${styles.tCard}`, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 82%", once: true },
      });
    },
    { scope: root },
  );

  return (
    <section className={`${styles.section} ${styles.testimonialsSection}`} id="testimonials">
      <div className={styles.sectionHead}>
        <span className={styles.eyebrow}>{testimonials.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {testimonials.title}
        </SplitReveal>
        <p className={styles.lead}>{testimonials.body}</p>
      </div>

      <div ref={root} className={styles.tGrid}>
        {testimonials.items.map((t) => (
          <article key={t.name} className={styles.tCard}>
            <div className={styles.tCardHead}>
              <div className={styles.tAvatar}>
                <BrandImage page="four" id={t.avatarId} className={styles.avatarImg} sizes="56px" />
              </div>
              <div className={styles.tMeta}>
                <span className={styles.tName}>{t.name}</span>
                <span className={styles.tRole}>{t.role}</span>
              </div>
            </div>
            <p className={styles.tQuote}>{t.quote}</p>
            <span className={styles.tRating}>★ {t.rating}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
