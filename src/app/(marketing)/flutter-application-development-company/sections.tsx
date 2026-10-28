'use client';

import type { ReactNode } from 'react';
import {
  flBenefits,
  flFaqs,
  flHero,
  flIdeaCta,
  flOverview,
  flProjects,
} from '@/lib/home/flutter-app-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own: every section the live page carries
// already had a home here, and the story cards it shares with the iOS page
// moved into `common` for it.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import CtaBand from '@/components/landing/cta-band';
import ServiceBoard from '@/components/common/service-board';
import StoryCards from '@/components/common/story-cards';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section. The
// live page's testimonials band carries the identical heading.
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import home from '@/components/home/home.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 * TechStack stays on the server (tech-logo) and arrives as a prop.
 */
export default function Sections({ techStack }: Readonly<{ techStack: ReactNode }>) {
  return (
    <>
      {/* Compact look — the same hero as the other app-development pages,
          so the marketing surface reads as a matched set. */}
      <Hero content={flHero} idPrefix="fl" variant="compact" />

      {/* The live page's "Why Choose Soft Suave" block: the prose, then the
          six reasons it names as a claim list. */}
      <div className={home.light}>
        <Overview content={flOverview} variant="compact" />
      </div>

      <CtaBand content={flIdeaCta} />

      {/* Six names to pick from, one stage to read on. Their copy is too
          long to sit on cards and too long to run down the page. */}
      <div className={home.light}>
        <ServiceBoard content={flBenefits} />
      </div>

      {techStack}

      {/* The FAQ now follows the client stories, as the review asked and as
          every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it.

          That puts the projects and the stories back to back on the warm
          white, so they share one wrapper: two light bands stacked would
          double the padding between them and read as separate panels rather
          than one chapter of proof. Same merge `landing/hire-page` does with
          its own runs. */}
      <div className={home.light}>
        {/* This page's own four projects, each with the live page's artwork —
            not the homepage case-study gallery, which is a different set of
            work. */}
        <StoryCards content={flProjects} />
        {/* Homepage client stories — the live page's band carries the same
            heading, "What Our Clients Say About Us". */}
        <Testimonials />
      </div>

      <Faq content={flFaqs} idPrefix="fl-faq" />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
