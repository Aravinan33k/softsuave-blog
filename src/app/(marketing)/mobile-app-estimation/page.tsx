import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { mobileEstimationMeta } from '@/lib/home/mobile-app-estimation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import MobileEstimationWizard from '@/components/developer-estimation/mobile-estimation-wizard';

import home from '@/components/home/home.module.css';
import styles from '@/components/developer-estimation/developer-estimation.module.css';

/** Mobile App Estimation — softsuave.com's /mobile-app-estimation page (a step-by-step estimate form). */

export const revalidate = 300;

export const metadata: Metadata = {
  title: mobileEstimationMeta.title,
  description: mobileEstimationMeta.description,
  alternates: { canonical: mobileEstimationMeta.path },
  robots: pageRobots,
  openGraph: {
    title: mobileEstimationMeta.title,
    description: mobileEstimationMeta.description,
    url: absoluteUrl(mobileEstimationMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(mobileEstimationMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: mobileEstimationMeta.title,
    description: mobileEstimationMeta.description,
    images: [dynamicOgImage(mobileEstimationMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(mobileEstimationMeta.path)}#webpage`,
  name: mobileEstimationMeta.title,
  description: mobileEstimationMeta.description,
  url: absoluteUrl(mobileEstimationMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function MobileAppEstimationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />
      <div className={home.light}>
        <main id="main" className={styles.main}>
          <MobileEstimationWizard />
        </main>
      </div>
      <Footer />
    </div>
  );
}
