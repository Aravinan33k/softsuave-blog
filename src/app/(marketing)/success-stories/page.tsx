import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
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
  robots: { index: true, follow: true },
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

/**
 * A `CollectionPage` whose parts are the videos, as `VideoObject` nodes.
 *
 * Only what the page itself states: name, thumbnail and the YouTube URL.
 * `uploadDate` and `description`, which Google wants for a video rich result,
 * are left out rather than invented — the page does not carry them.
 */
const structuredData = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${absoluteUrl(successStoriesPageMeta.path)}#webpage`,
    name: successStoriesPageMeta.title,
    description: successStoriesPageMeta.description,
    url: absoluteUrl(successStoriesPageMeta.path),
    inLanguage: 'en',
    about: { '@id': organizationLd['@id'] },
    publisher: { '@id': organizationLd['@id'] },
    hasPart: [clientStories, employeeStories].flatMap((group) =>
      group.items.map((story) => ({
        '@type': 'VideoObject',
        name: story.title,
        url: story.href,
        thumbnailUrl: absoluteUrl(story.image.src),
        genre: group.title,
        publisher: { '@id': organizationLd['@id'] },
      })),
    ),
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className={home.page}>
      <JsonLd data={structuredData} />
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
