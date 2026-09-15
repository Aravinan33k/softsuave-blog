import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  fintechBenefits,
  fintechFaqs,
  fintechHero,
  fintechMeta,
  fintechMidCta,
  fintechOverview,
  fintechProcess,
  fintechSegments,
  fintechServices,
} from '@/lib/home/fintech-ai-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. Only the
// ones the live FinTech AI Solutions page actually carries: it has a client logo strip, a
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
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * FinTech AI Solutions landing page.
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
  title: `${fintechMeta.title} | Soft Suave`,
  description: fintechMeta.description,
  alternates: { canonical: fintechMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${fintechMeta.title} | Soft Suave`,
    description: fintechMeta.description,
    url: absoluteUrl(fintechMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${fintechMeta.title} | Soft Suave`,
    description: fintechMeta.description,
    images: [dynamicOgImage(fintechMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Overview', href: '#overview' },
  { label: 'Solutions', href: '#services' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Sectors', href: '#sectors' },
  { label: 'Process', href: '#journey' },
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
    mainEntity: fintechFaqs.items.map((f) => ({
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
    name: fintechMeta.title,
    serviceType: 'Fintech AI development services',
    description: fintechMeta.description,
    url: absoluteUrl(fintechMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: fintechServices.title,
      itemListElement: fintechServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function FintechAiSolutionsPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: fintechMeta.title, path: fintechMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={fintechHero} idPrefix="fintech" />

        <div className={home.light}>
          <Clients />
        </div>

        <Manifesto />

        <div className={home.light}>
          <Overview content={fintechOverview} />
        </div>

        <Services content={fintechServices} variant="bold" />

        <div className={home.light}>
          <CardGrid content={fintechBenefits} id="benefits" variant="feature" />
        </div>

        <CardGrid content={fintechSegments} id="sectors" variant="bold" />

        <div className={home.light}>
          <Process content={fintechProcess} variant="mosaic" />
        </div>

        <TechStack />

        <div className={home.light}>
          <WorkGrid />
        </div>

        <CtaBand content={fintechMidCta} />

        <div className={home.light}>
          <Testimonials />
        </div>

        <Faq content={fintechFaqs} idPrefix="fintech-faq" />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
