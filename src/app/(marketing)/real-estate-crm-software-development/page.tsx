import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { reHero, reMeta } from '@/lib/home/real-estate-crm-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Expertise, Portfolio } from '@/components/real-estate-crm/blocks';

import home from '@/components/home/home.module.css';

/** Custom Real Estate CRM Software Development — softsuave.com's /real-estate-crm-software-development. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: reMeta.title },
  description: reMeta.description,
  alternates: { canonical: reMeta.path },
  robots: pageRobots,
  openGraph: {
    title: reMeta.title,
    description: reMeta.description,
    url: absoluteUrl(reMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(reMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: reMeta.title,
    description: reMeta.description,
    images: [dynamicOgImage(reMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(reMeta.path)}#webpage`,
  name: reMeta.title,
  description: reMeta.description,
  url: absoluteUrl(reMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function RealEstateCrmSoftwareDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={reHero} idPrefix="re" breadcrumb={false} />

        <div className={home.light}>
          <About />
        </div>

        <Expertise />

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
          id="book-consultation"
          idPrefix="re-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
