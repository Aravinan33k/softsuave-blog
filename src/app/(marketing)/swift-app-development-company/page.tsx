import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { faqsPageEnquiry } from '@/lib/home/faqs-content';
import {
  swiftExpertise,
  swiftFaqs,
  swiftHero,
  swiftHire,
  swiftMeta,
} from '@/lib/home/swift-content';
import { navHref } from '@/themes/softsuave/nav-data';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
import ServiceBoard from '@/components/common/service-board';
import Clients from '@/components/home/clients';
import ConsultationClose from '@/components/common/consultation-close';
import { About, TechTiles, WorkFor, Why } from '@/components/swift/blocks';

import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

/** Swift App Development Company — softsuave.com's /swift-app-development-company. */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: swiftMeta.title },
  description: swiftMeta.description,
  alternates: { canonical: swiftMeta.path },
  robots: pageRobots,
  openGraph: {
    title: swiftMeta.title,
    description: swiftMeta.description,
    url: absoluteUrl(swiftMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(swiftMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: swiftMeta.title,
    description: swiftMeta.description,
    images: [dynamicOgImage(swiftMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(swiftMeta.path)}#webpage`,
  name: swiftMeta.title,
  description: swiftMeta.description,
  url: absoluteUrl(swiftMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function SwiftAppDevelopmentCompanyPage() {
  return (
    <div className={`${home.page} ${location.submitBlack}`}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={swiftHero} idPrefix="swift" breadcrumb={false} />

        {/* The homepage client carousel, logos only. */}
        <div className={home.light}>
          <Clients title="" body="" eyebrow="" id="clients" />
          <About />
          <ServiceBoard content={swiftExpertise} />
        </div>

        <CtaBand content={swiftHire} />

        <div className={home.light}>
          <TechTiles />
        </div>

        <WorkFor />

        <div className={home.light}>
          <Why />
        </div>

        <Faq content={swiftFaqs} idPrefix="swift-faq" />

        <ConsultationClose
          id="book-consultation"
          idPrefix="swift-contact"
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
