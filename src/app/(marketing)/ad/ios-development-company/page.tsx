import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  ioClients,
  ioContact,
  ioHero,
  ioIndustries,
  ioIndustriesCta,
  ioMeta,
  ioPopup,
  ioScreens,
  ioServices,
  ioServicesCta,
  ioTestimonials,
  ioWhy,
} from '@/lib/home/ad-ios-development-company-content';

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
 * Top iOS Development Company in India — a clone of
 * softsuave.com/ad/ios-development-company, rebuilt on the current theme and
 * served at /ad/ios-development-company.
 *
 * The twin of /ad/android-development-company: the same ad-page kit, with this page's own content
 * (`lib/home/ad-ios-development-company-content.ts`). No top navigation and
 * no footer, like the other /ad pages. Every "Enquire Now" / "Get …" button opens
 * the enquiry popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(ioMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: ioMeta.title,
  description: ioMeta.description,
  alternates: { canonical: ioMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: ioMeta.title,
    description: ioMeta.description,
    url: absoluteUrl(ioMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: ioMeta.title,
    description: ioMeta.description,
    images: [ogImage],
  },
};

export default function AdIosDevelopmentCompanyPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={ioHero} idPrefix="ad-ios" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={[...ioClients.logos]} title={ioClients.title} body="" eyebrow="" loopShortRows noFade />
          {/* The live icons are white, drawn on its red cards; on this band they are turned dark. */}
          <div className={`${styles.markOnDark} ${styles.sweepTop}`}>
            <CardGrid content={ioServices} id="services" variant="bold" />
          </div>
          <CtaRow {...ioServicesCta} tight />
        </div>

        <StepTabs content={ioWhy} />

        <div className={home.light}>
          <CardGrid content={ioIndustries} id="industries" variant="tiles" />
          <CtaRow {...ioIndustriesCta} tight />
          <AppScreens content={ioScreens} />
        </div>

        <div className={home.light}>
          <Testimonials content={ioTestimonials} />
        </div>

        <ContactBand content={ioContact} idPrefix="ad-ios-contact" />
      </main>

      {/* Every "Enquire Now" and "Get …" button opens this. */}
      <TrialModal form={ioPopup} idPrefix="ad-ios-trial" wipe />
    </div>
  );
}
