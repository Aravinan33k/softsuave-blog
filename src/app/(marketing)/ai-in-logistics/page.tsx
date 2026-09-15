import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  logisticsBenefits,
  logisticsFaqs,
  logisticsHero,
  logisticsMeta,
  logisticsMidCta,
  logisticsOverview,
  logisticsSegments,
  logisticsServices,
} from '@/lib/home/logistics-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. Only the
// ones the live Logistics AI Solutions page actually carries: it has a client logo strip, a
// positioning block, a technology list, success stories and testimonials. It has no
// company stats block, no awards section, no recognitions band and no
// "industries we serve" section, so none are rendered here.
import Manifesto from '@/components/home/manifesto';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Logistics AI Solutions landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Section order mirrors the live page's own. Bands alternate strictly by
 * position, so a section this page does not have cannot leave two light bands
 * adjacent.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${logisticsMeta.title} | Soft Suave`,
  description: logisticsMeta.description,
  alternates: { canonical: logisticsMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${logisticsMeta.title} | Soft Suave`,
    description: logisticsMeta.description,
    url: absoluteUrl(logisticsMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(logisticsMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${logisticsMeta.title} | Soft Suave`,
    description: logisticsMeta.description,
    images: [dynamicOgImage(logisticsMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Overview', href: '#overview' },
  { label: 'Solutions', href: '#services' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Applications', href: '#applications' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'Case Studies', href: '#work' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Book a consultation', href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: logisticsFaqs.items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: typeof f.a === 'string' ? f.a : f.a.join(' '),
      },
    })),
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: logisticsMeta.title,
    serviceType: 'Logistics and supply chain AI development services',
    description: logisticsMeta.description,
    url: absoluteUrl(logisticsMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: logisticsServices.title,
      itemListElement: logisticsServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function LogisticsAiSolutionsPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: logisticsMeta.title, path: logisticsMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={logisticsHero} idPrefix="logistics" />

        <div className={home.light}>
          <Clients />
        </div>

        <Manifesto />

        <div className={home.light}>
          <Overview content={logisticsOverview} />
        </div>

        <Services content={logisticsServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={logisticsBenefits} id="benefits" variant="feature" />
        </div>

        <CardGrid content={logisticsSegments} id="applications" variant="bold" />

        <div className={home.light}>
          <TechStack />
        </div>

        <WorkGrid />

        <div className={home.light}>
          <CtaBand content={logisticsMidCta} />
        </div>

        <Testimonials />

        <div className={home.light}>
          <Faq content={logisticsFaqs} idPrefix="logistics-faq" />
        </div>

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
