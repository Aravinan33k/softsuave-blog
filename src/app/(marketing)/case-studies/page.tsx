import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { caseStudiesPageMeta } from '@/lib/home/case-studies-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Case Studies index.
 *
 * Three things point here: the Resources mega panel ("Case Studies"), the
 * footer, and the homepage's own case-study band, whose "View Case Study" CTA
 * is `/case-studies`. All three previously resolved to the live site, because
 * `navHref` treats any path outside `MARKETING_ROUTES` as softsuave.com's.
 * Registering this route in `landing-pages.ts` is what brings them in-app.
 *
 * A SERVER component so the route owns its `metadata`; `Listing` below is the
 * client component, because the industry filter is client state. The page's
 * JSON-LD is built in `./sections` from the same card data, so it is not also
 * serialized into the RSC payload (it was 39 KB, a third copy of every card).
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: caseStudiesPageMeta.title,
  description: caseStudiesPageMeta.description,
  alternates: { canonical: caseStudiesPageMeta.path },
  robots: pageRobots,
  openGraph: {
    title: caseStudiesPageMeta.title,
    description: caseStudiesPageMeta.description,
    url: absoluteUrl(caseStudiesPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(caseStudiesPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: caseStudiesPageMeta.title,
    description: caseStudiesPageMeta.description,
    images: [dynamicOgImage(caseStudiesPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function CaseStudiesPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
