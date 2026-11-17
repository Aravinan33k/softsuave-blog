import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { mgFaqs, mgHero, mgMeta, mgOffshore } from '@/lib/home/magento-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Services } from '@/components/magento/blocks';

import home from '@/components/home/home.module.css';

/** Magento Development — softsuave.com's /magento-development. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: mgMeta.title },
  description: mgMeta.description,
  alternates: { canonical: mgMeta.path },
  robots: pageRobots,
  openGraph: {
    title: mgMeta.title,
    description: mgMeta.description,
    url: absoluteUrl(mgMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(mgMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: mgMeta.title,
    description: mgMeta.description,
    images: [dynamicOgImage(mgMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(mgMeta.path)}#webpage`,
  name: mgMeta.title,
  description: mgMeta.description,
  url: absoluteUrl(mgMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function MagentoDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={mgHero} idPrefix="magento" />

        <div className={home.light}>
          <About />
          <Services />
        </div>

        <CtaBand
          content={{
            title: mgOffshore.title,
            body: (
              <>
                {mgOffshore.before}
                <strong>{mgOffshore.bold}</strong>
                {mgOffshore.after}
              </>
            ),
            cta: mgOffshore.cta,
          }}
        />

        <div className={home.light}>
          <Faq content={mgFaqs} idPrefix="magento-faq" />
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
          idPrefix="magento-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
