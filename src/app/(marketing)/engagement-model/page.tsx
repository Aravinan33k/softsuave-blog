import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import {
  engagementAwards,
  engagementClients,
  engagementFooterCta,
  engagementModelHero,
  engagementModelMeta,
} from '@/lib/home/engagement-model-content';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { recognitions } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import FadeUp from '@/components/home/fade-up';
import Recognitions from '@/components/home/recognitions';
import Clients from '@/components/home/clients';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { Perks, TechBand } from '@/components/engagement-model/engagement-body';
import { SiteLink } from '@/themes/softsuave/site-link';
import { navHref } from '@/themes/softsuave/nav-data';

import home from '@/components/home/home.module.css';
import styles from '@/components/engagement-model/engagement-model.module.css';

/** Engagement Models — softsuave.com's /engagement-model page. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: engagementModelMeta.title,
  description: engagementModelMeta.description,
  alternates: { canonical: engagementModelMeta.path },
  robots: pageRobots,
  openGraph: {
    title: engagementModelMeta.title,
    description: engagementModelMeta.description,
    url: absoluteUrl(engagementModelMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(engagementModelMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: engagementModelMeta.title,
    description: engagementModelMeta.description,
    images: [dynamicOgImage(engagementModelMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(engagementModelMeta.path)}#webpage`,
  name: engagementModelMeta.title,
  description: engagementModelMeta.description,
  url: absoluteUrl(engagementModelMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function EngagementModelPage() {
  const [l1, l2, l3] = engagementModelHero.titleLines;
  return (
    <div className={`${home.page} ${styles.page}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main" className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroWaves} aria-hidden />
          <div className={styles.heroVeil} aria-hidden />
          <div className={styles.heroInner}>
            <h1 className={styles.h1}>
              <span className={styles.line}>
                {l1}{' '}<span className={styles.accent}>{l2}</span>
              </span>
              <span className={styles.line}>{l3}</span>
            </h1>
            <p className={styles.lead}>{engagementModelHero.body}</p>
          </div>
        </section>

        <div className={home.light}>
          <Perks />
        </div>

        <TechBand />

        <div className={home.light}>
          <Recognitions content={{ title: engagementAwards.title, items: recognitions.items }} />
        </div>

        <div className={home.light}>
          <Clients
            eyebrow={engagementClients.eyebrow}
            title={engagementClients.title}
            body=""
            logos={[...engagementClients.logos]}
          />
          <FadeUp className={styles.moreRow}>
            <SiteLink href={engagementClients.more.href} className={`${home.pillFilled} ${home.pillLg}`}>
              {engagementClients.more.label}
            </SiteLink>
          </FadeUp>
        </div>

        <FadeUp>
          <ManagerEnquiry
            content={{
              ...faqsPageEnquiry,
              manager: {
                ...faqsPageEnquiry.manager,
                cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
              },
            }}
            id="enquiry"
            idPrefix="engagement-contact"
          />
        </FadeUp>

        <FadeUp className={styles.estimate}>
          <SiteLink href={engagementFooterCta.href} className={`${home.pillFilled} ${home.pillLg}`}>
            {engagementFooterCta.label}
          </SiteLink>
        </FadeUp>
      </main>

      <Footer />
    </div>
  );
}
