'use client';

import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import Breadcrumb from '@/components/common/breadcrumb';
import PartnerBadges from '@/components/common/partner-badges';
import EnquiryForm, { type EnquiryFormContent } from '@/components/common/enquiry-form';
import styles from './services.module.css';

export interface ServiceHeroProps {
  title: string;
  body: string;
  badges: readonly string[];
  form: EnquiryFormContent;
}

/**
 * Service-page hero: H1 + intro + trust badges on the left, the shared enquiry
 * card (`common/enquiry-form`) on the right.
 */
export default function ServiceHero({ title, body, badges, form }: ServiceHeroProps) {
  return (
    <section className={styles.hero} id="top">
      <div>
        <Breadcrumb />
        <SplitReveal as="h1" className={styles.heroTitle} type="words">
          {title}
        </SplitReveal>
        <FadeUp delay={0.1}>
          <p className={styles.heroBody}>{body}</p>
          <ul className={styles.badges}>
            {badges.map((b) => (
              <li key={b} className={styles.badge}>
                {b}
              </li>
            ))}
          </ul>
          <PartnerBadges />
        </FadeUp>
      </div>

      <FadeUp delay={0.18}>
        <EnquiryForm content={form} idPrefix="ai-development-service" />
      </FadeUp>
    </section>
  );
}
