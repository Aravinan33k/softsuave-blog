import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { ecomHero, ecomMeta } from '@/lib/home/ecommerce-package-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Hero from '@/components/generative-ai/hero';
import { Closing, Packages, Solutions } from '@/components/ecommerce-package/blocks';

import home from '@/components/home/home.module.css';

/** Ecommerce app development package — softsuave.com's /ecommerce-app-development-package. */

export const revalidate = 300;

export const metadata: Metadata = {
  title: ecomMeta.title,
  description: ecomMeta.description,
  alternates: { canonical: ecomMeta.path },
  robots: pageRobots,
  openGraph: {
    title: ecomMeta.title,
    description: ecomMeta.description,
    url: absoluteUrl(ecomMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(ecomMeta.shortTitle, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: ecomMeta.title,
    description: ecomMeta.description,
    images: [dynamicOgImage(ecomMeta.shortTitle, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${absoluteUrl(ecomMeta.path)}#webpage`,
  name: ecomMeta.title,
  description: ecomMeta.description,
  url: absoluteUrl(ecomMeta.path),
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
};

export default function EcommercePackagePage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero content={ecomHero} idPrefix="ecom-package" wide breadcrumb={false} />

        <div className={home.light}>
          <Solutions />
          <Packages />
        </div>

        <Closing />
      </main>

      <Footer />
    </div>
  );
}
