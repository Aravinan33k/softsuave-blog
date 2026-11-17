import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { retailHero, retailMeta } from '@/lib/home/retail-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { Addons, Features } from '@/components/retail/blocks';

import home from '@/components/home/home.module.css';

/** Retail Solutions — softsuave.com's /retail-solutions. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: retailMeta.title },
  description: retailMeta.description,
  alternates: { canonical: retailMeta.path },
  robots: pageRobots,
  openGraph: {
    title: retailMeta.title,
    description: retailMeta.description,
    url: absoluteUrl(retailMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(retailMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: retailMeta.title,
    description: retailMeta.description,
    images: [dynamicOgImage(retailMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(retailMeta.path)}#webpage`,
  name: retailMeta.title,
  description: retailMeta.description,
  url: absoluteUrl(retailMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function RetailSolutionsPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={retailHero} idPrefix="retail" />

        <div className={home.light}>
          <Features />
          <Addons />
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
          idPrefix="retail-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
