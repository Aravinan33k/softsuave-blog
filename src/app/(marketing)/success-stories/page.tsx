import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { successStoriesPageMeta } from '@/lib/home/success-stories-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import genAi from '@/components/generative-ai/gen-ai.module.css';
import Sections from './sections';

/**
 * Success Stories — mirrors softsuave.com/success-stories.
 *
 * Linked from the Resources mega panel. That link previously resolved to the
 * live site via `navHref`; registering this route in `landing-pages.ts` brings
 * it in-app.
 *
 * Same sections, in the same order, as the live page: the "Success Stories"
 * banner (our H1 masthead), Client Stories and Employee Stories — each a grid
 * of YouTube video cards — and the "Book Free Consultation" enquiry band.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: successStoriesPageMeta.title,
  description: successStoriesPageMeta.description,
  alternates: { canonical: successStoriesPageMeta.path },
  robots: pageRobots,
  openGraph: {
    title: successStoriesPageMeta.title,
    description: successStoriesPageMeta.description,
    url: absoluteUrl(successStoriesPageMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(successStoriesPageMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: successStoriesPageMeta.title,
    description: successStoriesPageMeta.description,
    images: [dynamicOgImage(successStoriesPageMeta.title, 'Soft Suave')],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function SuccessStoriesPage() {
  return (
    <div className={`${home.page} ${home.stackedHeads} ${landing.stackedHeads} ${genAi.stackedHeads}`}>
      {/* No JSON-LD: the live page carries none (13 Oct review: "need to update
          the schema"), and the route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization or WebSite here either. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
