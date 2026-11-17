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
  swiftLogos,
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
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import { About, TechTiles, WorkFor, Why } from '@/components/swift/blocks';

import home from '@/components/home/home.module.css';

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
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={swiftHero} idPrefix="swift" breadcrumb={false} />

        {/* The live page's eight client logos under the hero, running as the clients band does. */}
        <div className={home.light}>
          <Clients logos={swiftLogos} title="" body="" eyebrow="" id="clients" />
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

        <ManagerEnquiry
          content={{
            ...faqsPageEnquiry,
            manager: {
              ...faqsPageEnquiry.manager,
              cta: { ...faqsPageEnquiry.manager.cta, href: navHref(faqsPageEnquiry.manager.cta.href) },
            },
          }}
          id="book-consultation"
          idPrefix="swift-contact"
          headingFont
        />
      </main>

      <Footer />
    </div>
  );
}
