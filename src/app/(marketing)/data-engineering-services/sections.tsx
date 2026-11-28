'use client';

import type { ReactNode } from 'react';
import {
  deEngagement,
  deFaqs,
  deHero,
  deIndustries,
  deOverview,
  dePlanCta,
  deProcess,
  deSolutions,
  deUseCases,
  deWhyUs,
} from '@/lib/home/data-engineering-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Comparison from '@/components/common/comparison';
import ServicesGrid from '@/components/common/services-grid';
import ProcessRail from '@/components/common/process-rail';
import Industries from '@/components/landing/industries';
import WhyUs from '@/components/landing/why-us';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import CaseStudies from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
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
      {/* Compact look — the generative-AI page's hero, so the service
          pages read as a matched set. */}
      <Hero content={deHero} idPrefix="de" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={deOverview} variant="compact" />

      {/* Every solution on screen at once, each card wearing its own
          artwork in its top corner — the GCC page's feature card. */}
      <div className={home.light}>
        <ServicesGrid content={deSolutions} />
      </div>

      {/* The six steps hang off one drawn spine. */}
      <ProcessRail content={deProcess} />

      {/* A true ledger: considerations down the middle, each option's
          answers in its own column. */}
      <div className={home.light}>
        <Comparison content={deEngagement} id="engagement" tone="neutral" layout="table" />
      </div>

      {/* Five cards fill one row on a wide desktop. The watermark index
          keeps this from reading as a repeat of the industries grid. */}
      <Industries content={deUseCases} id="use-cases" columns={5} variant="watermark" />

      <div className={home.light}>
        <Industries content={deIndustries} columns={3} />
      </div>

      <WhyUs content={deWhyUs} />

      {/* No light-field backdrop here: the review asked for this band to sit on
          the page's own ground rather than a colour of its own. */}
      <CtaBand content={dePlanCta} backdrop={false} />

      {/* Homepage case-study gallery, on the warm-white band as it is there. */}
      <div className={home.light}>
        <CaseStudies />
      </div>

      {/* The homepage's tech rows, one per group, on the dark band. Every
          row scrolls at every width (21 Oct review: the section had no
          scrolling effect), short rows repeating their chips until they
          fill the strip — the RAG and GraphQL pages' treatment, so no row
          stands still beside moving ones (the 1 Oct complaint that had made
          them all static). `.techFit` clears the full-viewport min-height
          that `.techCompact` never reaches. */}
      <div className={home.techFit}>
        {techStack}
      </div>

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={deFaqs} idPrefix="de-faq" />

      {/* The homepage's closing CTA, on its default /contact destination —
          the review sheet asked for the CTA buttons to lead to the contact
          page rather than back up to the hero's enquiry form. */}
      <Contact />
    </>
  );
}
