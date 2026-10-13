import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import {
  clientStories,
  employeeStories,
  successStoriesClosingBand,
  successStoriesPageHero,
  successStoriesPageMeta,
} from '@/lib/home/success-stories-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Contact from '@/components/home/contact';

import SectionHead from '@/components/landing/section-head';
import VideoStories from '@/components/landing/video-stories';

import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

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
    <div className={home.page}>
      {/* No JSON-LD: the live page carries none (13 Oct review: "need to update
          the schema"), and the route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization or WebSite here either. */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <section className={landing.indexHead} id="top">
          <SectionHead level={1} title={successStoriesPageHero.title} />
        </section>

        {/* The story grids sit on the light band, so the page is not dark from
            the masthead to the footer; the masthead and the enquiry band stay dark. */}
        <div className={home.light}>
          <VideoStories group={clientStories} />
          <VideoStories group={employeeStories} />
        </div>

        <Contact content={successStoriesClosingBand} eyebrow="" />
      </main>

      <Footer />
    </div>
  );
}
