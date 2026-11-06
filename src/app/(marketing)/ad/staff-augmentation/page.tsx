import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { HIRE_CLIENT_LOGOS } from '@/lib/home/hire-blocks';
import {
  saugClients,
  saugClosingBand,
  saugHero,
  saugHire,
  saugMeta,
  saugPopup,
  saugServices,
  saugTestimonials,
  saugWhy,
  saugWhyClosing,
} from '@/lib/home/ad-staff-augmentation-content';

import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';

import Hero from '@/components/landing/hero';
import CtaBand from '@/components/landing/cta-band';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';
// The engagement-model cards the /hire-* pages use, here with a "Hire Now" on each.
import Integration from '@/components/generative-ai/integration';

import CtaRow from '@/components/ad/cta-row';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Hire Remote Developers on Contract (staff augmentation) — a clone of
 * softsuave.com/ad/staff-augmentation, rebuilt on the current theme and served at
 * /ad/staff-augmentation.
 *
 * /ad/remote-developers' sibling: the same ad-page kit, with this page's own content
 * (`lib/home/ad-staff-augmentation-content.ts`). No top navigation and no footer, like
 * the other /ad pages; the live page has no closing form either. Every trial, "Talk to
 * Our Experts" and "Hire Now" button opens the two-column popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(saugMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: saugMeta.title,
  description: saugMeta.description,
  alternates: { canonical: saugMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: saugMeta.title,
    description: saugMeta.description,
    url: absoluteUrl(saugMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: saugMeta.title,
    description: saugMeta.description,
    images: [ogImage],
  },
};

export default function AdStaffAugmentationPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <Hero noNav content={saugHero} idPrefix="ad-staff-aug-2" breadcrumb={false} />

        <div className={home.light}>
          <Clients logos={HIRE_CLIENT_LOGOS} eyebrow="Our Clients" title={saugClients.title} body={saugClients.body} />
          <CardGrid content={saugServices} id="services" variant="bold" />
        </div>

        {/* "Hire Developers On-Demand": a dark band between two light ones. Its two-tone line icons (black and
            red) are turned light, keeping their red. */}
        <div className={styles.iconsOnDark}>
          <Integration content={saugHire} id="hire" variant="bold" blockCta={saugHire.cta} span={4} />
        </div>

        <div className={home.light}>
          <CardGrid content={saugWhy} id="why" variant="bold" />
          <CtaRow lead={saugWhyClosing} />
          <Testimonials content={saugTestimonials} />
        </div>

        <CtaBand content={saugClosingBand} />
      </main>

      {/* Every trial, "Talk to Our Experts" and "Hire Now" button opens this. */}
      <TrialModal form={saugPopup.form} side={saugPopup.side} idPrefix="ad-staff-aug-2-trial" wipe />
    </div>
  );
}
