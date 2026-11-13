import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { mvBuild, mvFaqs, mvHero, mvMeta } from '@/lib/home/multi-vendor-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Features, Highlights, Panels, Platform, Tech, Why } from '@/components/multi-vendor/blocks';

import home from '@/components/home/home.module.css';

/** Multi-vendor Marketplace Platform — softsuave.com's /multi-vendor-marketplace-platform. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: mvMeta.title },
  description: mvMeta.description,
  alternates: { canonical: mvMeta.path },
  robots: pageRobots,
  openGraph: {
    title: mvMeta.title,
    description: mvMeta.description,
    url: absoluteUrl(mvMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(mvMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: mvMeta.title,
    description: mvMeta.description,
    images: [dynamicOgImage(mvMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(mvMeta.path)}#webpage`,
  name: mvMeta.title,
  description: mvMeta.description,
  url: absoluteUrl(mvMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function MultiVendorMarketplacePage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={mvHero} idPrefix="multi-vendor" />

        <div className={home.light}>
          <About />
          <Platform />
          <Panels />
        </div>

        <CtaBand content={{ title: mvBuild.title, body: '', cta: mvBuild.cta }} />

        <div className={home.light}>
          <Features />
          <Why />
        </div>

        <Tech />

        <div className={home.light}>
          <Faq content={mvFaqs} idPrefix="multi-vendor-faq" />
          <Highlights />
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
          idPrefix="multi-vendor-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
