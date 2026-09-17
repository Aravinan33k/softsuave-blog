import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  prodBenefits,
  prodEngagement,
  prodHero,
  prodMeta,
  prodMidCta,
  prodOverview,
  prodProcess,
  prodServices,
} from '@/lib/home/product-engineering-content';

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
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';

import home from '@/components/home/home.module.css';

/**
 * Product Engineering Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${prodMeta.title} | Soft Suave`,
  description: prodMeta.description,
  alternates: { canonical: prodMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${prodMeta.title} | Soft Suave`,
    description: prodMeta.description,
    url: absoluteUrl(prodMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(prodMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${prodMeta.title} | Soft Suave`,
    description: prodMeta.description,
    images: [dynamicOgImage(prodMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Services', href: '#services' },
  { label: 'Approach', href: '#journey' },
  { label: 'Outcomes', href: '#benefits' },
  { label: 'Models', href: '#models' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: "Let's discuss your product", href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: prodMeta.title,
    serviceType: 'Product engineering',
    description: prodMeta.description,
    url: absoluteUrl(prodMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: prodServices.title,
      itemListElement: prodServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function ProductEngineeringPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: prodMeta.title, path: prodMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={prodHero} idPrefix="product-eng" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={prodOverview} />
        </div>

        <Services content={prodServices} variant="bold" />

        <div className={home.light}>
          <Process content={prodProcess} variant="mosaic" />
        </div>

        <CardGrid content={prodBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <CtaBand content={prodMidCta} />
        </div>

        <CardGrid content={prodEngagement} id="models" variant="bold" />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
