import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { webEstimationMeta } from '@/lib/home/web-app-estimation-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import WebEstimationWizard from '@/components/developer-estimation/web-estimation-wizard';

import home from '@/components/home/home.module.css';
import styles from '@/components/developer-estimation/developer-estimation.module.css';

/** Web Estimation — softsuave.com's /test-web-est page (a step-by-step estimate form). */

export const revalidate = 300;

export const metadata: Metadata = {
  title: webEstimationMeta.title,
  description: webEstimationMeta.description,
  alternates: { canonical: webEstimationMeta.path },
  robots: pageRobots,
  openGraph: {
    title: webEstimationMeta.title,
    description: webEstimationMeta.description,
    url: absoluteUrl(webEstimationMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(webEstimationMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: webEstimationMeta.title,
    description: webEstimationMeta.description,
    images: [dynamicOgImage(webEstimationMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(webEstimationMeta.path)}#webpage`,
  name: webEstimationMeta.title,
  description: webEstimationMeta.description,
  url: absoluteUrl(webEstimationMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function TestWebEstPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />
      <div className={home.light}>
        <main id="main" className={styles.main}>
          <WebEstimationWizard />
        </main>
      </div>
      <Footer />
    </div>
  );
}
