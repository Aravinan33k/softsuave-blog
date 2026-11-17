import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { estimateChooser, estimateMeta } from '@/lib/home/cost-estimation-content';
import { SiteLink } from '@/themes/softsuave/site-link';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import { Heading } from '@/components/developer-estimation/estimation-parts';

import home from '@/components/home/home.module.css';
import styles from '@/components/developer-estimation/developer-estimation.module.css';

/**
 * Free Cost Estimation — softsuave.com's /free-cost-estimation: an H1 over two tiles that lead into the two
 * estimate wizards. That is all the live page has, so that is all this is.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: estimateMeta.title,
  description: estimateMeta.description,
  alternates: { canonical: estimateMeta.path },
  robots: pageRobots,
  openGraph: {
    title: estimateMeta.title,
    description: estimateMeta.description,
    url: absoluteUrl(estimateMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(estimateMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: estimateMeta.title,
    description: estimateMeta.description,
    images: [dynamicOgImage(estimateMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(estimateMeta.path)}#webpage`,
  name: estimateMeta.title,
  description: estimateMeta.description,
  url: absoluteUrl(estimateMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function FreeCostEstimationPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />
      <div className={home.light}>
        <main id="main" className={`${styles.main} ${styles.mainCompact}`}>
          <div className={styles.wizard}>
            <section className={styles.step}>
              <Heading as="h1" tight={false}>
                {estimateChooser.title.replace(estimateChooser.accent, '')}
                <span className={styles.accentOrange}>{estimateChooser.accent}</span>
              </Heading>
              <div className={styles.tiles}>
                {estimateChooser.options.map((o) => (
                  <SiteLink key={o.href} href={o.href} className={styles.tile}>
                    <span className={styles.tileCard}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={o.icon} alt="" width={64} height={64} />
                    </span>
                    <span className={styles.tileLabel}>{o.label}</span>
                  </SiteLink>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
