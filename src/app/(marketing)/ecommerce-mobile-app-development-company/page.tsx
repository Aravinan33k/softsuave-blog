import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { ecFaqs, ecHero, ecMeta } from '@/lib/home/ecommerce-app-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import Faq from '@/components/landing/faq';
import ConsultationClose from '@/components/common/consultation-close';
import { About, Benefits, CaseStudy, Features, Platforms } from '@/components/ecommerce-app/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** eCommerce App Development — softsuave.com's /ecommerce-mobile-app-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: ecMeta.title,
  description: ecMeta.description,
  alternates: { canonical: ecMeta.path },
  robots: pageRobots,
  openGraph: {
    title: ecMeta.title,
    description: ecMeta.description,
    url: absoluteUrl(ecMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(ecMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: ecMeta.title,
    description: ecMeta.description,
    images: [dynamicOgImage(ecMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(ecMeta.path)}#webpage`,
  name: ecMeta.title,
  description: ecMeta.description,
  url: absoluteUrl(ecMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function EcommerceMobileAppDevelopmentPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={ecHero} idPrefix="ecommerce-app" />

        <div className={home.light}>
          <About />
        </div>

        <Features />

        <div className={home.light}>
          <Benefits />
        </div>

        <CaseStudy />

        <div className={home.light}>
          <Platforms />
          <Faq content={ecFaqs} idPrefix="ecommerce-app-faq" />
        </div>

        <ConsultationClose
          id="book-consultation"
          idPrefix="ecommerce-app-contact"
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
