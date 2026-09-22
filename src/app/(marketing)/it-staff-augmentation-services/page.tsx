import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
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

/**
 * This page's JSON-LD, from the shared builder.
 *
 * It replaces a hand-written `Service` whose `provider` was an inline
 * `{'@type': 'Organization', name: 'Soft Suave'}` — an unidentified company
 * repeated on every page of this surface rather than the canonical one — with
 * no `WebPage` node and nothing joining the Service, the FAQ and the trail.
 * `pageSchemaGraph` emits those `@id`-linked and points provider and publisher
 * at the organization `app/(marketing)/layout.tsx` declares once.
 */
const LD = pageSchemaGraph({
  path: staffMeta.path,
  title: staffMeta.title,
  description: staffMeta.description,
  serviceType: 'IT staff augmentation',
  // Matches the live page's own breadcrumb trail: Home › Software Development
  // — the live trail stops at the parent and never names this page itself.
  // Live's own parent link (`/software-development-company-india`) 404s on
  // its own site; pointed at our real equivalent page instead of copying a
  // dead link.
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbEndsAtParent: true,
  offerCatalogName: staffRoles.title,
  offers: staffRoles.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: staffFaqs.title,
  faqs: staffFaqs.items,
});

export default function ItStaffAugmentationPage() {

  return (
    <div className={home.page}>
      <JsonLd data={LD} />
      <Nav logoHref={HOME_HREF} />

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
