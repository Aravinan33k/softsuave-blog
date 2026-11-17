import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  apClients,
  apContact,
  apHero,
  apIndustries,
  apIndustriesCta,
  apMeta,
  apPopup,
  apScreens,
  apServices,
  apServicesCta,
  apTech,
  apTestimonials,
  apWhy,
} from '@/lib/home/ad-app-development-company-india-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
// The homepage's marquee rows — they scroll, alternating direction, as on the live page.
import TechRows from '@/components/home/tech-stack';

import Hero from '@/components/landing/hero';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';

import CtaRow from '@/components/ad/cta-row';
import StepTabs from '@/components/ad/step-tabs';
import AppScreens from '@/components/ad/app-screens';
import ContactBand from '@/components/ad/contact-band';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Top Mobile App Development Company in India — a clone of
 * softsuave.com/ad/app-development-company-india, rebuilt on the current theme
 * and served at /ad/app-development-company-india.
 *
 * The sibling of /ad/android-development-company: the same ad-page kit and, where
 * the live pages share them, the same content
 * (`lib/home/ad-app-development-company-india-content.ts`). No top navigation and
 * no footer, like the other /ad pages. Every "Get …" button opens the enquiry popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(apMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: apMeta.title,
  description: apMeta.description,
  alternates: { canonical: apMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: apMeta.title,
    description: apMeta.description,
    url: absoluteUrl(apMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: apMeta.title,
    description: apMeta.description,
    images: [ogImage],
  },
};

export default function AdAppDevelopmentCompanyIndiaPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={apHero} idPrefix="ad-app-india" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={apClients.title} body={apClients.body} />
          {/* The live icons are white or green, drawn on its red cards; here they are made for this band. */}
          <CardGrid content={apServices} id="services" variant="bold" />
          <CtaRow {...apServicesCta} tight />
        </div>

        <StepTabs content={apWhy} />

        <div className={home.light}>
          <TechRows content={apTech} loopShortRows />
          <CardGrid content={apIndustries} id="industries" variant="tiles" />
          <CtaRow {...apIndustriesCta} tight />
        </div>

        {/* "Our Work": the page's dark band between two light ones. */}
        <div>
          <AppScreens content={apScreens} />
        </div>

        <div className={home.light}>
          <Testimonials content={apTestimonials} />
        </div>

        <ContactBand content={apContact} idPrefix="ad-app-india-contact" />
      </main>

      {/* Every "Get …" button opens this. */}
      <TrialModal form={apPopup} idPrefix="ad-app-india-trial" wipe />
    </div>
  );
}
