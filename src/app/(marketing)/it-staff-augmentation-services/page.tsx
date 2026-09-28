import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import {
  staffBenefits,
  staffFaqs,
  staffHero,
  staffIndustries,
  staffMeta,
  staffModels,
  staffProcess,
  staffRoles,
  staffTechnologies,
  staffWhyUs,
} from '@/lib/home/staff-augmentation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, its testimonials, and the closing
// enquiry band. Their copy already matches the live page's word for word.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
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
 *
 * Below the hero, the section set and order are the live page's (see
 * `lib/home/staff-augmentation-content.ts`). Bands alternate so no two dark
 * sections sit together; testimonials and FAQ share one light band so the FAQ
 * sits light ahead of the dark closing band.
 */

export const revalidate = 300;

// The live page's own <title>, verbatim — it carries no brand suffix there.
export const metadata: Metadata = {
  title: staffMeta.title,
  description: staffMeta.description,
  alternates: { canonical: staffMeta.path },
  robots: pageRobots,
  openGraph: {
    title: staffMeta.title,
    description: staffMeta.description,
    url: absoluteUrl(staffMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(staffMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: staffMeta.title,
    description: staffMeta.description,
    images: [dynamicOgImage(staffMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

/**
 * This page's JSON-LD, from the shared builder: `Service` (its offers are the
 * page's own hireable roles), `WebPage`, `BreadcrumbList` and `FAQPage` (the
 * page's own FAQs), `@id`-linked to the organization `app/(marketing)/layout.tsx`
 * declares once. Built from the same content the page renders, so the schema
 * can never drift from what a visitor reads.
 */
const LD = pageSchemaGraph({
  path: staffMeta.path,
  title: staffMeta.title,
  // The live <title> verbatim, as the page's own metadata uses it.
  webPageName: staffMeta.title,
  description: staffMeta.description,
  serviceType: 'IT staff augmentation',
  // Matches the visible trail (`lib/home/landing-pages.ts`): Home › Software
  // Development › IT Staff Augmentation Services. Live's own parent link
  // (`/software-development-company-india`) 404s on its own site; pointed at
  // our real equivalent page instead of copying a dead link.
  showBreadcrumb: true,
  parents: [{ name: 'Software Development', path: '/software-development-company' }],
  breadcrumbName: 'IT Staff Augmentation Services',
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

        <div className={home.light}>
          <Clients />
        </div>

        <CardGrid content={staffWhyUs} id="why" columns={4} />

        <div className={home.light}>
          <CardGrid content={staffModels} id="models" variant="bold" />
        </div>

        <Process content={staffProcess} />

        <div className={home.light}>
          <Services content={staffRoles} variant="bold" />
        </div>

        <CardGrid content={staffTechnologies} id="technologies" columns={4} />

        <div className={home.light}>
          <CardGrid content={staffIndustries} id="industries" columns={5} />
        </div>

        <CardGrid content={staffBenefits} id="benefits" columns={5} />

        <div className={home.light}>
          <Testimonials />
          <Faq content={staffFaqs} idPrefix="staff-aug-faq" />
        </div>

        <Contact />
      </main>

      <Footer />
    </div>
  );
}
