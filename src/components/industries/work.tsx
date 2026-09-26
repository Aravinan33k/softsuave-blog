"use client";

import BrandImage from "@/components/home/brand-image";
import FadeUp from "@/components/home/fade-up";
import { SiteLink } from "@/themes/softsuave/site-link";
import { caseStudies } from "@/lib/home/content";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * Sector proof: the site's own case studies, read from `caseStudies` in the
 * content module rather than restated, so every metric on this page is one the
 * rest of the site already publishes. Nothing is invented — each study keeps
 * its own tag, figure and year.
 *
 * Layout is 1 + 3: the lead study takes the full width as an image/copy split,
 * the rest sit as a pair of pairs. That rhythm is this page's, not the
 * homepage's work grid.
 */
export default function Work() {
  return (
    <section className={styles.shell} id="work">
      <SectionHead
        kicker={caseStudies.eyebrow}
        title={caseStudies.title}
        intro={caseStudies.body}
        tone="dark"
      />

      <div className={styles.work}>
        {caseStudies.items.map((study, i) => (
          <FadeUp key={study.key} className={styles.workCard} y={24}>
            <div className={styles.workInner}>
              <div className={styles.workFrame}>
                <BrandImage
                  page="four"
                  id={study.img}
                  alt={`${study.tag} case study: ${study.title}`}
                  fill
                  sizes={i === 0 ? "(min-width: 1000px) 52vw, 94vw" : "(min-width: 1000px) 31vw, 94vw"}
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
        ))}
      </div>

      <div className={styles.workCta}>
        <SiteLink href={caseStudies.cta.href} className={styles.pill} data-cursor="Read">
          {caseStudies.cta.label}
        </SiteLink>
      </div>
    </section>
  );
}
