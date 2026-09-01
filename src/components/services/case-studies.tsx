import FadeUp from '@/components/home/fade-up';
import Magnetic from '@/components/home/magnetic';
import SplitReveal from '@/components/home/split-reveal';
import { SiteLink } from '@/themes/softsuave/site-link';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface CaseStudiesProps {
  eyebrow: string;
  title: string;
  body: string;
  cta: { readonly label: string; readonly href: string };
  items: readonly {
    readonly industry: string;
    readonly name: string;
    readonly body: string;
    readonly metric: string;
    readonly metricLabel: string;
  }[];
}

/**
 * Case studies. Each card leads with the industry and the single number that
 * matters, because that pair is what a skimming reader takes away — the
 * paragraph is there for the ones who stop.
 *
 * The "view all" link goes through SiteLink: /case-studies is served by the live
 * marketing site today, so it must render as a plain anchor rather than a
 * <Link> that would client-navigate into a route this app does not have.
 */
export default function CaseStudies({ eyebrow, title, body, cta, items }: CaseStudiesProps) {
  return (
    <section className={home.section} id="work">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.caseGrid} delay={0.06}>
        {items.map((item) => (
          <article key={item.name} className={styles.caseCard}>
            <div className={styles.caseTop}>
              <span className={styles.caseIndustry}>{item.industry}</span>
              <span>
                <span className={styles.caseMetric}>{item.metric}</span>
                <span className={styles.caseMetricLabel}>{item.metricLabel}</span>
              </span>
            </div>
            <h3 className={styles.caseName}>{item.name}</h3>
            <p className={styles.caseBody}>{item.body}</p>
          </article>
        ))}
      </FadeUp>

      <FadeUp className={styles.caseFoot} delay={0.1}>
        <Magnetic>
          <SiteLink href={cta.href} className={home.pill} data-cursor="View">
            {cta.label}
          </SiteLink>
        </Magnetic>
      </FadeUp>
    </section>
  );
}
