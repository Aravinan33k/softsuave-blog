"use client";

import { process as generativeAiProcess } from "@/lib/home/generative-ai";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface ProcessContent {
  eyebrow: string;
  title: string;
  body: string;
  steps: readonly { readonly n: string; readonly name: string; readonly body: string }[];
}

/**
 * Delivery process as a vertical rail of squared numbered markers — the
 * readable, non-pinned counterpart to the homepage's scroll-pinned Journey
 * scene. No scroll hijacking, so the whole process stays scannable on a phone.
 */
export default function Process({
  content = generativeAiProcess,
  id = "journey",
}: {
  content?: ProcessContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <ol className={styles.processList}>
        {content.steps.map((step) => (
          <li key={step.n} className={styles.processStep}>
            <div className={styles.processRail} aria-hidden>
              <span className={styles.processMarker}>{step.n}</span>
              <span className={styles.processLine} />
            </div>
            <FadeUp y={18} duration={0.55}>
              <span className={styles.processStepLabel}>Step {step.n}</span>
              <h3 className={styles.processName}>{step.name}</h3>
              <p className={styles.processBody}>{step.body}</p>
            </FadeUp>
          </li>
        ))}
      </ol>
    </section>
  );
}
