import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { pmHero, pmMeta } from '@/lib/home/construction-pm-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/generative-ai/hero';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import QuoteModal from '@/components/construction-pm/quote-modal';
import { Customers, Features, Intro, Portfolio, TryBand } from '@/components/construction-pm/blocks';

import home from '@/components/home/home.module.css';

/** Construction project management software — softsuave.com's /construction-project-management-software. */

export const revalidate = 300;

/** The live page's own title and description (it publishes both as one line each). */
const TITLE = 'Construction Project Management Software Development Company';
const DESCRIPTION =
  'Construction project management software development company building custom solutions for planning, scheduling, and real-time collaboration.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: pmMeta.path },
  robots: pageRobots,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl(pmMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(pmMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: [dynamicOgImage(pmMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(pmMeta.path)}#webpage`,
  name: TITLE,
  description: DESCRIPTION,
  url: absoluteUrl(pmMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function ConstructionProjectManagementPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={pmHero} idPrefix="construction-pm" wide breadcrumb={false} />

        <div className={home.light}>
          <Intro />
          <Features />
          <Customers />
        </div>

        <TryBand />

        <div className={home.light}>
          <Portfolio />
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
          idPrefix="construction-pm-contact"
          headingFont
        />
      </main>

      <QuoteModal />
      <Footer />
    </div>
  );
}
