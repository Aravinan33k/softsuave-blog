"use client";

import { caseStudies as homeCaseStudies } from "@/lib/home/content";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./gen-ai.module.css";

export interface CaseStudiesContent {
  eyebrow: string;
  title: string;
  body: string;
  items: readonly {
    readonly key: string;
    readonly tag: string;
    readonly title: string;
    readonly metricValue: string;
    readonly metricLabel: string;
    readonly year: string;
  }[];
}

/**
 * Case studies as outcome cards led by the metric.
 *
 * The homepage's `WorkGrid` tells the same story as a full-height horizontal
 * scroll-snap gallery of image tiles with arrow controls and a progress tick.
 * That is a showcase; a service landing page wants the numbers legible at a
 * glance, in one static grid, with no images to generate. Copy comes from the
 * same `lib/home/content.ts` source the homepage reads, so there is still one
 * set of case-study facts.
 */
export default function CaseStudies({
  content = homeCaseStudies,
  id = "work",
}: {
  content?: CaseStudiesContent;
  id?: string;
} = {}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.caseGrid}>
          {content.items.map((item) => (
            <article key={item.key} className={styles.caseCard}>
              <span className={styles.caseTag}>{item.tag}</span>
              <span className={styles.caseMetric}>{item.metricValue}</span>
              <span className={styles.caseMetricLabel}>{item.metricLabel}</span>
              <h3 className={styles.caseTitle}>{item.title}</h3>
              <span className={styles.caseYear}>{item.year}</span>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
