import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { posFaqs, posHero, posMeta } from '@/lib/home/pos-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import QuotePopup from '@/components/pos/quote-popup';
import { About, Features, Portfolio, Services, Solutions } from '@/components/pos/blocks';

import home from '@/components/home/home.module.css';

/** POS Software Development Company — softsuave.com's /pos-software-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: posMeta.title },
  description: posMeta.description,
  alternates: { canonical: posMeta.path },
  robots: pageRobots,
  openGraph: {
    title: posMeta.title,
    description: posMeta.description,
    url: absoluteUrl(posMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(posMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: posMeta.title,
    description: posMeta.description,
    images: [dynamicOgImage(posMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(posMeta.path)}#webpage`,
  name: posMeta.title,
  description: posMeta.description,
  url: absoluteUrl(posMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function PosSoftwareDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={posHero} idPrefix="pos" />

        <div className={home.light}>
          <About />
        </div>

        <Services />

        <div className={home.light}>
          <Portfolio />
        </div>

        <Solutions />

        <div className={home.light}>
          <Features />
          <Faq content={posFaqs} idPrefix="pos-faq" />
        </div>

        <QuotePopup />

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix="pos-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
