"use client";

import { clients } from "@/lib/home/generative-ai";
import { why } from "@/lib/home/content";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * "Our Clients" — a bordered proof panel: the four headline numbers across the
 * top, the segments we ship for along the bottom.
 *
 * Deliberately NOT the homepage's client/recognition strip, which is two
 * counter-running marquees of 5rem display type. A static panel states the same
 * proof without the motion, keeps every figure readable on a phone, and does not
 * repeat a look the homepage already owns. Individual client logos live on the
 * main site's /clients page and are not bundled here.
 */
const SEGMENTS = [
  "Enterprise IT",
  "Funded Startups",
  "Global SMBs",
  "Product Teams",
  "Digital Natives",
  "Scale-Ups",
];

export default function Clients() {
  return (
    <section className={styles.trustBar} id="clients">
      <SectionHead kicker={clients.eyebrow} title={clients.title} intro={clients.body} />

      <FadeUp>
        <div className={styles.trustPanel}>
          <div className={styles.trustStats}>
            {why.stats.map((stat) => (
              <div key={stat.label} className={styles.trustStat}>
                <span className={styles.trustFigure}>
                  {stat.value}
                  {stat.suffix}
                </span>
                <span className={styles.trustLabel}>{stat.label}</span>
              </div>
            ))}
          </div>

          <ul className={styles.trustSegments}>
            {SEGMENTS.map((s) => (
              <li key={s} className={styles.trustSegment}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </FadeUp>
    </section>
  );
}
