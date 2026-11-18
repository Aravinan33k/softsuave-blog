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
import ConsultationClose from '@/components/common/consultation-close';
import QuotePopup from '@/components/pos/quote-popup';
import { About, Features, Portfolio, Services, Solutions } from '@/components/pos/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

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
    <div className={`${home.page} ${location.submitBlack}`}>
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

        <ConsultationClose
          id="book-consultation"
          idPrefix="pos-contact"
          blackSubmit
          content={{
            title: faqsPageEnquiry.title,
            body: faqsPageEnquiry.body,
            steps: faqsPageEnquiry.steps,
            person: {
              image: { src: faqsPageEnquiry.manager.photo, width: 157, height: 157, alt: 'Soft Suave Manager' },
              name: faqsPageEnquiry.manager.name,
              role: faqsPageEnquiry.manager.role,
            },
            cta: {
              label: faqsPageEnquiry.manager.cta?.label ?? 'Schedule a Call',
              href: navHref(faqsPageEnquiry.manager.cta?.href ?? '/30-min-free-consultation'),
            },
            badges: faqsPageEnquiry.badges,
            form: faqsPageEnquiry.form,
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
