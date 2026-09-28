import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  offCaseStudies,
  offFaqs,
  offGovernance,
  offHero,
  offIndustries,
  offMeta,
  offMidCta,
  offModels,
  offOverview,
  offProcess,
  offServices,
  offTech,
  offWhyUs,
} from '@/lib/home/offshore-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip, the testimonials and the closing enquiry band.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
// The case-study lane, given this page's own seven studies.
import WorkGrid from '@/components/home/work-grid';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import WhyUs from '@/components/landing/why-us';
import TechStack from '@/components/landing/tech-stack';
import Faq from '@/components/landing/faq';
// The live page's sector cards — a photo at rest, the description on hover.
import Industries from '@/components/generative-ai/industries';

import home from '@/components/home/home.module.css';

/**
 * Offshore Software Development Company landing page.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/offshore-content.ts`). Bands alternate so no two dark sections sit
 * together: the services and engagement models share one light band so the
 * always-dark CTA band can follow them, and testimonials and the FAQ share the
 * light band ahead of the dark closing enquiry.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it already ends "| Soft Suave".
export const metadata: Metadata = {
  title: offMeta.title,
  description: offMeta.description,
  alternates: { canonical: offMeta.path },
  robots: pageRobots,
  openGraph: {
    title: offMeta.title,
    description: offMeta.description,
    url: absoluteUrl(offMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(offMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: offMeta.title,
    description: offMeta.description,
    images: [dynamicOgImage(offMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own service list), `WebPage`, `FAQPage` (the page's own FAQs) and the
 * `BreadcrumbList` the visible trail shows — Home › Software Development ›
 * Offshore Software Development — `@id`-linked to the organization
 * `app/(marketing)/layout.tsx` declares once. Built from the same content the
 * page renders, so the schema can never drift from what a visitor reads.
 */
const LD = pageSchemaGraph({
  path: offMeta.path,
  title: offMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: offMeta.title,
  description: offMeta.description,
  // The live page's own Service name.
  serviceName: 'Offshore Software Development Services',
  serviceType: 'Offshore software development',
  offerCatalogName: offServices.title,
  offers: offServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: offFaqs.title,
  faqs: offFaqs.items,
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'Offshore Software Development',
});

export default function OffshoreSoftwareDevelopmentPage() {
  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={offHero} idPrefix="offshore" />

        <div className={home.light}>
          {/* The live band's own heading and standfirst, not the homepage's. */}
          <Clients
            title="Our Clients"
            body="See how leading companies across industries achieved growth, innovation, and efficiency by leveraging our offshore software development expertise."
          />
        </div>

        <Overview content={offOverview} />

        <div className={home.light}>
          <Services content={offServices} variant="bold" />
          <CardGrid content={offModels} id="models" variant="feature" />
        </div>

        <CtaBand content={offMidCta} />

        <div className={home.light}>
          <Process content={offProcess} />
        </div>

        <Industries content={offIndustries} links={false} />

        <div className={home.light}>
          <Overview content={offGovernance} id="governance" />
        </div>

        <WhyUs content={offWhyUs} />

        <div className={home.light}>
          <TechStack content={offTech} />
        </div>

        <WorkGrid content={offCaseStudies} id="case-studies" />

        <div className={home.light}>
          <Testimonials />
          <Faq content={offFaqs} idPrefix="offshore-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
