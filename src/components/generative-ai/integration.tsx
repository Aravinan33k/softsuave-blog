"use client";

import { integration } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import TechLogo from "@/components/home/tech-logo";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * Integration and deployment options. The two cards carry the deployment and
 * connectivity story; the platform targets underneath render as a bordered cell
 * grid rather than the homepage's 52px-tall capsule chips — the technology-stack
 * section further down this page is the other place logos appear, and the two
 * should not look like the same component twice.
 */
export default function Integration() {
  return (
    <section className={styles.sectionShell} id="integrations">
      <SectionHead
        kicker={integration.eyebrow}
        title={integration.title}
        intro={integration.body}
      />

      <FadeUp>
        <div className={styles.integrationGrid}>
          {integration.blocks.map((b) => (
            <article key={b.label} className={styles.integrationCard}>
              <span className={styles.integrationLabel}>{b.label}</span>
              <p className={styles.integrationBody}>{b.body}</p>
            </article>
          ))}
        </div>

        <ul className={styles.targetGrid}>
          {integration.targets.map((t) => (
            <li key={t} className={styles.targetCell}>
              <span className={styles.targetLogo} aria-hidden>
                <TechLogo name={t} />
              </span>
              <span className={styles.targetName}>{t}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
