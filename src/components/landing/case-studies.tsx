"use client";

import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

export interface CaseStudiesContent {
  eyebrow: string;
  title: string;
  body: string;
  /** Optional — link out to the full case-study index. */
  allCta?: { readonly label: string; readonly href: string };
  items: readonly {
    readonly key: string;
    readonly tag: string;
    readonly title: string;
    readonly metricValue: string;
    readonly metricLabel: string;
    /** Optional — the engagement in a sentence, under the title. */
    readonly body?: string;
    /** Optional — omitted where the engagement year isn't published. */
    readonly year?: string;
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
  content,
  id = "work",
}: {
  content: CaseStudiesContent;
  id?: string;
}) {
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
              {item.body && <p className={styles.caseBody}>{item.body}</p>}
              {item.year && <span className={styles.caseYear}>{item.year}</span>}
            </article>
          ))}
        </div>
      </FadeUp>

      {content.allCta && (
        <FadeUp>
          <div className={styles.caseFoot}>
            <a
              href={content.allCta.href}
              className={styles.btn}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.allCta.label}
            </a>
          </div>
        </FadeUp>
      )}
    </section>
  );
}
