import type { Metadata } from 'next';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import {
  staffComparison,
  staffFaqs,
  staffHero,
  staffMeta,
  staffMidCta,
  staffModels,
  staffOverview,
  staffProcess,
  staffRoles,
} from '@/lib/home/staff-augmentation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content.
import Manifesto from '@/components/home/manifesto';
import Clients from '@/components/home/clients';
import Industries from '@/components/home/industries';
import TechStack from '@/components/home/tech-stack';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Comparison from '@/components/landing/comparison';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Faq from '@/components/landing/faq';

import home from '@/components/home/home.module.css';

/**
 * IT Staff Augmentation Services landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: `${staffMeta.title} | Soft Suave`,
  description: staffMeta.description,
  alternates: { canonical: staffMeta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${staffMeta.title} | Soft Suave`,
    description: staffMeta.description,
    url: absoluteUrl(staffMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(staffMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${staffMeta.title} | Soft Suave`,
    description: staffMeta.description,
    images: [dynamicOgImage(staffMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Why Soft Suave', href: '#why' },
  { label: 'Models', href: '#models' },
  { label: 'Process', href: '#journey' },
  { label: 'Roles', href: '#services' },
  { label: 'Compare', href: '#comparison' },
  { label: 'Industries', href: '#industries' },
  { label: 'FAQs', href: '#faq' },
  { label: 'Blog', href: '/blog' },
] as const;

const PAGE_CTA = { label: 'Hire engineers', href: '#enquiry' } as const;

const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: staffFaqs.items.map((f) => ({
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
    name: staffMeta.title,
    serviceType: 'IT staff augmentation',
    description: staffMeta.description,
    url: absoluteUrl(staffMeta.path),
    areaServed: 'Worldwide',
    provider: {
      '@type': 'Organization',
      name: 'Soft Suave',
      url: 'https://www.softsuave.com',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: staffRoles.title,
      itemListElement: staffRoles.items.map((i) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: i.name, description: i.body },
      })),
    },
  },
];

export default function ItStaffAugmentationPage() {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: staffMeta.title, path: staffMeta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={home.page}>
      <JsonLd data={[...structuredData, ...(breadcrumb ? [breadcrumb] : [])]} />
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={staffHero} idPrefix="staff-aug" />

        <div id="why" className={`${home.light} ${home.whySection}`}>
          <Manifesto />
        </div>

        <div className={home.light}>
          <Clients />
        </div>

        <Overview content={staffOverview} />

        <div className={home.light}>
          <CardGrid content={staffModels} id="models" variant="feature" />
        </div>

        <Process content={staffProcess} variant="mosaic" />

        <div className={home.light}>
          <Services content={staffRoles} variant="bold" />
        </div>

        <Comparison content={staffComparison} />

        <div className={home.light}>
          <CtaBand content={staffMidCta} />
        </div>

        <Industries />

        <div className={home.light}>
          <TechStack />
        </div>

        <Testimonials />
        <Faq content={staffFaqs} idPrefix="staff-aug-faq" />

        <Contact ctaHref="#enquiry" />
      </main>

      <Footer />
    </div>
  );
}
