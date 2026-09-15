import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  cloudBenefits,
  cloudHero,
  cloudMeta,
  cloudMidCta,
  cloudOverview,
  cloudProcess,
  cloudServiceModels,
  cloudServices,
} from '@/lib/home/cloud-computing-content';

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
 * Cloud Computing Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${cloudMeta.title} | Soft Suave`,
  description: cloudMeta.description,
  alternates: { canonical: cloudMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${cloudMeta.title} | Soft Suave`,
    description: cloudMeta.description,
    url: absoluteUrl(cloudMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${cloudMeta.title} | Soft Suave`,
    description: cloudMeta.description,
    images: [dynamicOgImage(cloudMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#journey' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Plan your migration', href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: cloudMeta.title,
    serviceType: 'Cloud computing services',
    description: cloudMeta.description,
    url: absoluteUrl(cloudMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: cloudServices.title,
      itemListElement: cloudServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function CloudComputingPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: cloudMeta.title, path: cloudMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={cloudHero} idPrefix="cloud" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Overview content={cloudOverview} />
        </div>

        <CardGrid content={cloudBenefits} id="benefits" variant="feature" />

        <div className={home.light}>
          <Services content={cloudServices} variant="bold" />
        </div>

        <CardGrid content={cloudServiceModels} id="service-models" variant="bold" />

        <div className={home.light}>
          <Process content={cloudProcess} variant="mosaic" />
        </div>

        <CtaBand content={cloudMidCta} />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
