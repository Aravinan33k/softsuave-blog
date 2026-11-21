'use client';

import type { ReactNode } from 'react';
import {
  txFaqs,
  txHero,
  txOverview,
  txPlanCta,
  txServices,
  txWhyUs,
} from '@/lib/home/typescript-content';
// Shared landing-page surface — every section the brief calls for already had
// a home here; this page adds none of its own.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesCarousel from '@/components/common/services-carousel';
import CtaBand from '@/components/landing/cta-band';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
// Reused from the homepage verbatim, as the brief asks for both explicitly:
// the clients logo band, the testimonials band, and the closing enquiry CTA.
// TechStack is the homepage's own marquee too — the same choice made for the
// Next.js page's technology section, so the two closest sibling pages on this
// surface read as a matched pair rather than one using the static panel grid.
import Clients from '@/components/home/clients';
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
      <Hero content={txHero} idPrefix="tx" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={txOverview} variant="compact" />

      {/* Centre-focused carousel — one service in focus with its neighbours
          as context, each card wearing its own artwork. */}
      <div className={home.light}>
        <ServicesCarousel content={txServices} />
      </div>

      <CtaBand content={txPlanCta} />

      <div className={home.light}>
        <WhyUs content={txWhyUs} />
      </div>

      {/* The homepage's marquee tech rows, one per group, rather than the
          landing set's static panel grid. Dark, as on the homepage;
          `.techCompact` only clears the homepage's full-viewport
          min-height for this content-height page. Every group here already
          holds 3+ items, so none needs folding into another to avoid a
          thin-looking row. */}
      <div className={home.techCompact}>
        {techStack}
      </div>

      {/* The client stories now come before the FAQ, as the review asked and
          as every corrected page on this surface runs them — the proof lands
          before the objection-handling rather than after it. They share the
          warm-white band, so the two read as one closing chapter. */}
      <div className={home.light}>
        <Testimonials />
        <Faq content={txFaqs} idPrefix="tx-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
