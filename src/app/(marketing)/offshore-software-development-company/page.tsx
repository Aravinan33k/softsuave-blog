import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  offFaqs,
  offGovernance,
  offHero,
  offMeta,
  offMidCta,
  offModels,
  offOverview,
  offProcess,
  offServices,
} from '@/lib/home/offshore-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content. See the
// GCC page for the reasoning; none of these take props.
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import Industries from '@/components/home/industries';
import WorkGrid from '@/components/home/work-grid';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
// `CardGrid` is components/landing/industries, a generic bordered card grid;
// aliased because the homepage's Industries scene holds that name above.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * Offshore Software Development Company landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${offMeta.title} | Soft Suave`,
  description: offMeta.description,
  alternates: { canonical: offMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${offMeta.title} | Soft Suave`,
    description: offMeta.description,
    url: absoluteUrl(offMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(offMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${offMeta.title} | Soft Suave`,
    description: offMeta.description,
    images: [dynamicOgImage(offMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Services', href: '#services' },
  { label: 'Engagement Models', href: '#models' },
  { label: 'Process', href: '#journey' },
  { label: 'Industries', href: '#industries' },
  { label: 'Case Studies', href: '#work' },
  { label: 'Tech Stack', href: '#tech' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Get a free quote', href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: offFaqs.items.map((f) => ({
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
    name: offMeta.title,
    serviceType: 'Offshore software development',
    description: offMeta.description,
    url: absoluteUrl(offMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: offServices.title,
      itemListElement: offServices.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function OffshoreSoftwareDevelopmentPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: offMeta.title, path: offMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={offHero} idPrefix="offshore" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
          <Stats />
        </div>

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={offOverview} />

        <div className={home.light}>
          <Services content={offServices} variant="bold" />
        </div>

        <CardGrid content={offModels} id="models" variant="feature" />

        <div className={home.light}>
          <Process content={offProcess} variant="mosaic" />
        </div>

        <CtaBand content={offMidCta} />

        <div className={home.light}>
          <CardGrid content={offGovernance} id="governance" variant="bold" />
        </div>

        <Industries />

        <div className={home.light}>
          <WorkGrid />
        </div>

        <TechStack />

        <div className={home.light}>
          <Testimonials />
          <Faq content={offFaqs} idPrefix="offshore-faq" />
        </div>

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
