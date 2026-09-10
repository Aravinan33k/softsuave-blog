"use client";

import BrandImage from "@/components/home/brand-image";
import FadeUp from "@/components/home/fade-up";
import Magnetic from "@/components/home/magnetic";
import { SiteLink } from "@/themes/softsuave/site-link";
import { caseStudies } from "@/lib/home/content";
import type { SectorPageContent } from "@/lib/home/sectors/types";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * Sector proof.
 *
 * The study, when there is one, is read out of `caseStudies.items` by key — the
 * site's own work, with its own figure and wording, never re-stated here. Four
 * of the eight sectors have one; on the others this section is its masthead
 * alone, above the shared figures rail the page renders next. Borrowing another
 * sector's study to fill the space would misattribute real client work.
 */
export default function SectorProof({ content }: { content: SectorPageContent }) {
  const { proof } = content;
  const study = proof.caseStudyKey
    ? caseStudies.items.find((s) => s.key === proof.caseStudyKey)
    : undefined;

  return (
    <section className={styles.shell} id="work">
      <SectionHead kicker={proof.eyebrow} title={proof.title} intro={proof.body} tone="dark" />

      {study ? (
        <>
          <div className={styles.work}>
            <FadeUp className={styles.workCard} y={24}>
              <div className={styles.workInner}>
                <div className={styles.workFrame}>
                  <BrandImage
                    page="four"
                    id={study.img}
                    alt={`${study.tag} case study: ${study.title}`}
                    fill
                    sizes="(min-width: 1000px) 52vw, 94vw"
                  />
                </div>
                <div className={styles.workCopy}>
                  <div className={styles.workTagRow}>
                    <span>{study.tag}</span>
                    <span className={styles.workYear}>{study.year}</span>
                  </div>
                  <div className={styles.workMetric}>
                    <span className={styles.workMetricValue}>{study.metricValue}</span>
                    <span className={styles.workMetricLabel}>{study.metricLabel}</span>
                  </div>
                  <h3 className={styles.workTitle}>{study.title}</h3>
                  <p className={styles.workText}>{study.body}</p>
                </div>
              </div>
            </FadeUp>
          </div>

          <div className={styles.workCta}>
            <Magnetic>
              <SiteLink href={caseStudies.cta.href} className={styles.pill} data-cursor="Read">
                {caseStudies.cta.label}
              </SiteLink>
            </Magnetic>
          </div>
        </>
      ) : null}
    </section>
  );
}
