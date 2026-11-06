import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  anClients,
  anContact,
  anHero,
  anIndustries,
  anIndustriesCta,
  anMeta,
  anPopup,
  anScreens,
  anServices,
  anServicesCta,
  anTestimonials,
  anWhy,
} from '@/lib/home/ad-android-development-company-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

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
 * Top Android App Development Company in India — a clone of
 * softsuave.com/ad/android-development-company, rebuilt on the current theme and
 * served at /ad/android-development-company.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-android-development-company-content.ts`). No top navigation and
 * no footer, like the other /ad pages. Every "Enquire Now" / "Get …" button opens
 * the enquiry popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(anMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: anMeta.title,
  description: anMeta.description,
  alternates: { canonical: anMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: anMeta.title,
    description: anMeta.description,
    url: absoluteUrl(anMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: anMeta.title,
    description: anMeta.description,
    images: [ogImage],
  },
};

export default function AdAndroidDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={anHero} idPrefix="ad-android" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={[...anClients.logos]} title={anClients.title} body="" eyebrow="" loopShortRows noFade />
          {/* The live icons are white, drawn on its red cards; on this band they are turned dark. */}
          <div className={styles.markOnDark}>
            <CardGrid content={anServices} id="services" variant="bold" />
          </div>
          <CtaRow {...anServicesCta} tight />
        </div>

        <StepTabs content={anWhy} />

        <div className={home.light}>
          <CardGrid content={anIndustries} id="industries" variant="tiles" />
          <CtaRow {...anIndustriesCta} tight />
          <AppScreens content={anScreens} />
        </div>

        <div className={home.light}>
          <Testimonials content={anTestimonials} />
        </div>

        <ContactBand content={anContact} idPrefix="ad-android-contact" />
      </main>

      {/* Every "Enquire Now" and "Get …" button opens this. */}
      <TrialModal form={anPopup} idPrefix="ad-android-trial" wipe />
    </div>
  );
}
