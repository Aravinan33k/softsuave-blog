import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  legacyDrivers,
  legacyHero,
  legacyMeta,
  legacyMidCta,
  legacyOverview,
  legacyServices,
} from '@/lib/home/legacy-modernization-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content.
import Manifesto from '@/components/home/manifesto';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Legacy Modernization Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${legacyMeta.title} | Soft Suave`,
  description: legacyMeta.description,
  alternates: { canonical: legacyMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${legacyMeta.title} | Soft Suave`,
    description: legacyMeta.description,
    url: absoluteUrl(legacyMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${legacyMeta.title} | Soft Suave`,
    description: legacyMeta.description,
    images: [dynamicOgImage(legacyMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Why Modernize', href: '#drivers' },
  { label: 'Services', href: '#services' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Get an assessment', href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: legacyMeta.title,
    serviceType: 'Legacy application modernization',
    description: legacyMeta.description,
    url: absoluteUrl(legacyMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: legacyServices.title,
      itemListElement: legacyServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function LegacyModernizationPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: legacyMeta.title, path: legacyMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={legacyHero} idPrefix="legacy" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={legacyOverview} />
        </div>

        <CardGrid content={legacyDrivers} id="drivers" variant="feature" />

        <div className={home.light}>
          <Services content={legacyServices} variant="bold" />
        </div>

        <CtaBand content={legacyMidCta} />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
