"use client";

import Image from "next/image";
import { clients } from "@/lib/home/content";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import Marquee from "./marquee";
import styles from "./home.module.css";

/**
 * Client proof band — the partner statement plus the logo strip, sitting
 * directly under "Why Soft Suave" so the numbers are immediately backed by who
 * they were earned with.
 *
 * The strip is `Marquee` (the same infinite-scroll primitive as Awards and the
 * footer), not a static wrapped grid: with two dozen marks a wrap reads as a
 * dense wall, while a slow, hover-pausing carousel keeps every mark legible
 * and scales to any list length without a layout change. Reduced motion
 * renders `Marquee`'s static fallback row, so nothing here depends on motion
 * to be readable.
 *
 * Each mark renders as its real logo when `clients.logos[].src` points at a
 * file, and as a typographic wordmark until then, so the strip reads as
 * finished either way.
 */
export default function Clients() {
  return (
    <section className={`${styles.section} ${styles.clients}`} id="clients">
      <div className={styles.clientsHead}>
        <div className={styles.clientsHeadMain}>
          <span className={styles.eyebrow}>{clients.eyebrow}</span>
          <SplitReveal as="h2" className={styles.h2} type="words">
            {clients.title}
          </SplitReveal>
        </div>
        <FadeUp className={styles.clientsHeadAside}>
          <p className={styles.clientsBody}>{clients.body}</p>
        </FadeUp>
      </div>

      <FadeUp className={styles.clientsRow} delay={0.08}>
        <Marquee speed={30} className={styles.clientsMarquee} separator={<span aria-hidden />}>
          {clients.logos.map((logo) => (
            <span key={logo.name} className={styles.clientsItem}>
              {logo.src ? (
                <span className={styles.clientLogo}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="170px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className={styles.clientWordmark}>{logo.name}</span>
              )}
            </span>
          ))}
        </Marquee>
      </FadeUp>
    </section>
  );
}
