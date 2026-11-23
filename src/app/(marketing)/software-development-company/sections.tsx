'use client';

import type { ReactNode } from 'react';
import {
  sdDelivery,
  sdFaqs,
  sdHero,
  sdIndustries,
  sdProcess,
  sdServices,
  sdWhyUs,
} from '@/lib/home/software-development-content';
// Shared landing-page surface — `components/landing` plus the newer sections
// in `components/common`, over the homepage's typography and `.theme-four`
// tokens. This page adds none of its own; every section the live page carries
// already had a home here.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import Industries from '@/components/landing/industries';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim. Not a stylistic choice: the live page's
// copy for both IS the homepage's, to the word — its clients band reads
// "Preferred AI-Enabled Technology Partner for Startups and SMBs" and its
// reviews band "What Our Clients Say About Us", each with the same standfirst.
import Clients from '@/components/home/clients';
import Process from '@/components/landing/process';
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
      {/* Compact look — the same hero as the rest of the surface. */}
      <Hero content={sdHero} idPrefix="sd" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. Six one-paragraph
          services suit it better than the two-paragraph service board the
          app-framework pages use. */}
      <ServicesCarousel content={sdServices} />

      {/* The live page's "Why Choose Us" block: one line of prose, then the
          six reasons it names as a claim list. */}
      <div className={home.light}>
        <Overview content={sdWhyUs} variant="compact" />
      </div>

      {/* The seven stages as the shared simple process row — one process
          design on every landing page, per the Sep corrections review. */}
      <Process content={sdProcess} />

{/* One inverted band carrying both grids: twelve sectors four across,
          then the four delivery models. They pair up rather than alternating
          because the tech stack below them has to be dark, and the watermark
          numerals keep the second grid from reading as a repeat of the
          first. */}
      <div className={home.light}>
        <Industries content={sdIndustries} />
        {/* Its own anchor, so the nav reaches it without colliding with the
            industries grid above. */}
        <Industries content={sdDelivery} id="engagement" variant="watermark" />
      </div>

      {/* The homepage's marquee tech rows, one per group. Dark, as on the
          homepage: the rows fade out against the deep ground at both ends.
          `.techCompact` only clears the homepage's full-viewport
          min-height for this content-height page. `loopShortRows`: the five-
          tool Design and QA row is too short to overflow on a wide screen,
          and sat still while the four above it scrolled (review: "no
          scrolling effect"), so it repeats its chips to fill the strip. */}
      <div className={home.techCompact}>
        {techStack}
      </div>

      {/* The closing pair share the warm-white band, for the same reason the
          two grids above do. Testimonials lead: the review asked for them
          above the FAQ, so the page ends on the answers a reader came with
          rather than on the praise. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={sdFaqs} idPrefix="sd-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
