import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { STAFF_AUG_LIVE_LD } from '@/lib/seo/it-staff-augmentation-services';
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

/**
 * The page's link-preview image: softsuave.com's own share card for this
 * page (1200x628), set to the exact 1200x630 the large preview uses
 * (review: "add the Social Share Preview image").
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/it-staff-augmentation-services-og.webp'),
  width: 1200,
  height: 630,
  alt: 'IT Staff Augmentation Services - Soft Suave',
};

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
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: staffMeta.title,
    description: staffMeta.description,
    images: [OG_IMAGE.url],
  },
};

const HOME_HREF = BASE_PATH || '/';


export default function ItStaffAugmentationPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, verbatim, one <script> per
          block — see `lib/seo/it-staff-augmentation-services.ts`. */}
      {STAFF_AUG_LIVE_LD.map((block, i) => (
        <JsonLd key={i} data={block} />
      ))}
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
          {/* Whole cards link (review: "remove the 'learn more' and make the
              whole cards clickable"). */}
          <Services content={staffRoles} variant="bold" cardLinks />
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
