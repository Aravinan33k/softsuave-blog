import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import {
  privacyPolicyBody,
  privacyPolicyHero,
  privacyPolicyPageMeta,
} from '@/lib/home/privacy-policy-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import Listing from '@/components/landing/listing';
import LegalProse from '@/components/generative-ai/legal-prose';

import home from '@/components/home/home.module.css';

/**
 * Privacy Policy.
 *
 * Two bands: the /case-studies masthead (`Listing` with no items — the same
 * photo, veil, breadcrumb and H1), then the policy text in the Overview
 * section's shell and prose measure, on a warm-white band. The footer's
 * 'Privacy Policy' link resolves here once the route is registered in
 * `landing-pages.ts`.
 *
 * A SERVER component so the route owns its `metadata` and JSON-LD.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: privacyPolicyPageMeta.title,
  description: privacyPolicyPageMeta.description,
  alternates: { canonical: privacyPolicyPageMeta.path },
  robots: pageRobots,
  openGraph: {
    title: privacyPolicyPageMeta.title,
    description: privacyPolicyPageMeta.description,
    url: absoluteUrl(privacyPolicyPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(privacyPolicyPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: privacyPolicyPageMeta.title,
    description: privacyPolicyPageMeta.description,
    images: [dynamicOgImage(privacyPolicyPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(privacyPolicyPageMeta.path)}#webpage`,
  name: privacyPolicyPageMeta.title,
  description: privacyPolicyPageMeta.description,
  url: absoluteUrl(privacyPolicyPageMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function PrivacyPolicyPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id='main'>
        <Listing content={privacyPolicyHero} id='top' />

        <div className={home.light}>
          <LegalProse content={privacyPolicyBody} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
