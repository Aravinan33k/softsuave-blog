"use client";

import { integration } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

/**
 * Integration and deployment options — the two cards carry the deployment and
 * connectivity story. The platform targets themselves aren't repeated here;
 * the technology-stack section further down this page is where those names
 * live.
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
      </FadeUp>
    </section>
  );
}
