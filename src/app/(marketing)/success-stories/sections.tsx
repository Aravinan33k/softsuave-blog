'use client';

import {
  clientStories,
  employeeStories,
  successStoriesClosingBand,
  successStoriesPageHero,
} from '@/lib/home/success-stories-content';
import Contact from '@/components/home/contact';
import SectionHead from '@/components/landing/section-head';
import VideoStories from '@/components/landing/video-stories';
import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
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
    </>
  );
}
