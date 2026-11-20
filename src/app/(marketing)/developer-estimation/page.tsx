import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { developerEstimationMeta } from '@/lib/home/developer-estimation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import EstimationWizard from '@/components/developer-estimation/estimation-wizard';

import home from '@/components/home/home.module.css';
import styles from '@/components/developer-estimation/developer-estimation.module.css';

/** Developer Estimation — softsuave.com's /developer-estimation page (a step-by-step estimate form). */

export const revalidate = 300;

export const metadata: Metadata = {
  title: developerEstimationMeta.title,
  description: developerEstimationMeta.description,
  alternates: { canonical: developerEstimationMeta.path },
  robots: pageRobots,
  openGraph: {
    title: developerEstimationMeta.title,
    description: developerEstimationMeta.description,
    url: absoluteUrl(developerEstimationMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(developerEstimationMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: developerEstimationMeta.title,
    description: developerEstimationMeta.description,
    images: [dynamicOgImage(developerEstimationMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(developerEstimationMeta.path)}#webpage`,
  name: developerEstimationMeta.title,
  description: developerEstimationMeta.description,
  url: absoluteUrl(developerEstimationMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function DeveloperEstimationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />
      <div className={home.light}>
        <main id="main" className={styles.main}>
          <EstimationWizard />
        </main>
      </div>
      <Footer />
    </div>
  );
}
