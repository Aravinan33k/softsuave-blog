import Image from 'next/image';
import type { Metadata } from 'next';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { publicMediaUrl } from '@/lib/media-url';
import {
  asBeyond,
  asBeyondCta,
  asBuild,
  asBuildImage,
  asClients,
  asEnquiry,
  asHero,
  asMeta,
  asStruggle,
  asStruggleCta,
  asTech,
  asTrust,
  asTrialForm,
} from '@/lib/home/ad-ai-solution-content';

import Clients from '@/components/home/clients';

import Hero from '@/components/landing/hero';
// The grid whose cards can carry the live page's own icon images.
import CardGrid from '@/components/generative-ai/industries';

import WhyList from '@/components/ad/why-list';
import CtaRow from '@/components/ad/cta-row';
import LogoRows from '@/components/ad/logo-rows';
import ManagerEnquiry from '@/components/ad/manager-enquiry';
import TrialModal from '@/components/ad/trial-modal';

import home from '@/components/home/home.module.css';
import styles from '@/components/ad/ad.module.css';

/**
 * Accelerate your AI development projects — a clone of
 * softsuave.com/ad/ai-solution, rebuilt on the current theme and served at
 * /ad/ai-solution.
 *
 * The same ad-page kit as the other /ad pages, with this page's own content
 * (`lib/home/ad-ai-solution-content.ts`). No top navigation and no footer, like
 * the other /ad pages. Every "Let's Connect" button opens the trial popup.
 *
 * `noindex, nofollow` like the live page — in its metadata here, and as an
 * `X-Robots-Tag` header on every `/ad/*` route (next.config.ts). Not in
 * `landing-pages.ts`, so it stays out of the sitemap. A SERVER component (so it
 * can export `metadata`); sections are client components.
 */

export const revalidate = 300;

const ogImage = dynamicOgImage(asMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  title: asMeta.title,
  description: asMeta.description,
  alternates: { canonical: asMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: asMeta.title,
    description: asMeta.description,
    url: absoluteUrl(asMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: asMeta.title,
    description: asMeta.description,
    images: [ogImage],
  },
};

export default function AdAiSolutionPage() {
  return (
    <div className={home.page}>
      <main id="main" className={styles.adMain}>
        {/* Dark → light → dark rhythm; no two dark sections touch. */}
        <div className={styles.wipeForm}>
          <Hero noNav content={asHero} idPrefix="ad-ai-solution" breadcrumb={false} />
        </div>

        <div className={home.light}>
          <Clients logos={[...asClients.logos]} title={asClients.title} body="" eyebrow="" loopShortRows noFade />
          <CardGrid content={asStruggle} id="struggle" variant="bold" />
          <CtaRow {...asStruggleCta} tight />
        </div>

        {/* The page's dark band between two light ones. */}
        <div>
          <div className={styles.gridWithImage}>
            <CardGrid content={asBuild} id="build" variant="bold" />
            <Image
              src={publicMediaUrl(asBuildImage.src)}
              alt={asBuildImage.alt}
              width={asBuildImage.width}
              height={asBuildImage.height}
              sizes="(max-width: 999px) 90vw, 40vw"
              className={styles.gridImage}
            />
          </div>
          <CtaRow {...asStruggleCta} tight />
        </div>

        <div className={home.light}>
          <WhyList title={asTrust.title} items={asTrust.items} image={asTrust.image} />
          <CtaRow {...asStruggleCta} tight joined />
        </div>

        <div className={home.light}>
          <LogoRows content={asTech} />
        </div>

        <div className={home.light}>
          <CardGrid content={asBeyond} id="beyond" variant="bold" />
          <CtaRow {...asBeyondCta} tight />
        </div>

        <ManagerEnquiry content={asEnquiry} id="ad-contact-form" idPrefix="ad-ai-solution-contact" />
      </main>

      {/* Every "Let's Connect" button opens this. */}
      <TrialModal form={asTrialForm} idPrefix="ad-ai-solution-trial" wipe />
    </div>
  );
}
