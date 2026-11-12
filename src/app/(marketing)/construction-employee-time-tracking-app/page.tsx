import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import {
  timeTrackingFaqs,
  timeTrackingFeatures,
  timeTrackingHero,
  timeTrackingMeta,
} from '@/lib/home/construction-time-tracking-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Services from '@/components/home/services';
import Hero from '@/components/generative-ai/hero';
import Faq from '@/components/generative-ai/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { Benefits, DemoBand, Intro, StepsAndApps, Why } from '@/components/construction-tracking/blocks';

import home from '@/components/home/home.module.css';

/** Construction employee time tracking app — softsuave.com's /construction-employee-time-tracking-app. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: timeTrackingMeta.title,
  description: timeTrackingMeta.description,
  alternates: { canonical: timeTrackingMeta.path },
  robots: pageRobots,
  openGraph: {
    title: timeTrackingMeta.title,
    description: timeTrackingMeta.description,
    url: absoluteUrl(timeTrackingMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(timeTrackingMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: timeTrackingMeta.title,
    description: timeTrackingMeta.description,
    images: [dynamicOgImage(timeTrackingMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(timeTrackingMeta.path)}#webpage`,
  name: timeTrackingMeta.title,
  description: timeTrackingMeta.description,
  url: absoluteUrl(timeTrackingMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function ConstructionTimeTrackingPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={timeTrackingHero} idPrefix="time-tracking" wide breadcrumb={false} />

        <div className={home.light}>
          <Intro />
          <Benefits />
        </div>

        <Services content={timeTrackingFeatures} />

        <div className={home.light}>
          <StepsAndApps />
        </div>

        <DemoBand />

        <div className={home.light}>
          <Why />
          <Faq content={timeTrackingFaqs} idPrefix="time-tracking-faq" />
        </div>

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="enquiry"
          idPrefix="time-tracking-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
