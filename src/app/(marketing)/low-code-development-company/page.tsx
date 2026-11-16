import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import { lcFaqs, lcHero, lcMeta, lcReady, lcSteps } from '@/lib/home/low-code-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import Faq from '@/components/landing/faq';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, Benefits, Best, Platforms } from '@/components/low-code/blocks';

import home from '@/components/home/home.module.css';

/** Low-Code Development Company — softsuave.com's /low-code-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: lcMeta.title,
  description: lcMeta.description,
  alternates: { canonical: lcMeta.path },
  robots: pageRobots,
  openGraph: {
    title: lcMeta.title,
    description: lcMeta.description,
    url: absoluteUrl(lcMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(lcMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: lcMeta.title,
    description: lcMeta.description,
    images: [dynamicOgImage(lcMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(lcMeta.path)}#webpage`,
  name: lcMeta.title,
  description: lcMeta.description,
  url: absoluteUrl(lcMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function LowCodeDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={lcHero} idPrefix="low-code" />

        <div className={home.light}>
          <About />
        </div>

        <Platforms />

        <div className={home.light}>
          <Benefits />
        </div>

        <CtaBand content={lcReady} backdrop={false} />

        <div className={home.light}>
          <Process content={lcSteps} variant="mosaic" />
        </div>

        <Best />

        <div className={home.light}>
          <Faq content={lcFaqs} idPrefix="low-code-faq" />
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
          idPrefix="low-code-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
