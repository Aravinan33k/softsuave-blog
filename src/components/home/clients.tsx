"use client";

import Image from "next/image";
import { clients } from "@/lib/home/content";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import styles from "./home.module.css";

/**
 * Client proof band — the partner statement plus the logo strip, sitting
 * directly under "Why Soft Suave" so the numbers are immediately backed by who
 * they were earned with.
 *
 * Each mark renders as its real logo when `clients.logos[].src` points at a
 * file, and as a typographic wordmark until then, so the strip reads as
 * finished either way. The hairline-ruled row scales from three names to a
 * couple of dozen without a layout change.
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
        <ul className={styles.clientsList}>
          {clients.logos.map((logo) => (
            <li key={logo.name} className={styles.clientsItem}>
              {logo.src ? (
                <span className={styles.clientLogo}>
                  <Image
                    src={logo.src}
                    alt={logo.name}
                    fill
                    sizes="200px"
                    className="object-contain"
                  />
                </span>
              ) : (
                <span className={styles.clientWordmark}>{logo.name}</span>
              )}
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
