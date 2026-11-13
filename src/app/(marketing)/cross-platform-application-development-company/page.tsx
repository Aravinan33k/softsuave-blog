import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import {
  cpCapabilities,
  cpDelivery,
  cpFaqs,
  cpHero,
  cpMeta,
  cpOffshore,
  cpOverview,
  cpServices,
} from '@/lib/home/cross-platform-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ServiceBoard from '@/components/common/service-board';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TechGroups from '@/components/cross-platform/tech-groups';

import home from '@/components/home/home.module.css';

/** Cross-platform App Development — softsuave.com's /cross-platform-application-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: cpMeta.title,
  description: cpMeta.description,
  alternates: { canonical: cpMeta.path },
  robots: pageRobots,
  openGraph: {
    title: cpMeta.title,
    description: cpMeta.description,
    url: absoluteUrl(cpMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(cpMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: cpMeta.title,
    description: cpMeta.description,
    images: [dynamicOgImage(cpMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(cpMeta.path)}#webpage`,
  name: cpMeta.title,
  description: cpMeta.description,
  url: absoluteUrl(cpMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function CrossPlatformDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={cpHero} idPrefix="cross-platform" />

        <div className={home.light}>
          <Overview content={cpOverview} variant="compact" />
        </div>

        <Industries content={cpCapabilities} id="capabilities" variant="bold" />

        <div className={home.light}>
          <ServiceBoard content={cpServices} />
        </div>

        <Industries content={cpDelivery} id="delivery" variant="watermark" />

        <CtaBand content={cpOffshore} backdrop={false} tightTop />

        <div className={home.light}>
          <TechGroups />
          <Faq content={cpFaqs} idPrefix="cross-platform-faq" />
        </div>

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix="cross-platform-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
