'use client';

import type { ReactNode } from 'react';
import {
  piApplications,
  piCapabilities,
  piComparison,
  piFaqs,
  piHero,
  piIndustries,
  piIntegration,
  piOverview,
  piProcess,
  piWhyUs,
} from '@/lib/home/predictive-intelligence-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Comparison from '@/components/common/comparison';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import Process from '@/components/landing/process';
import Integration from '@/components/common/integration';
import WhyUs from '@/components/landing/why-us';
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
      <Hero content={piHero} idPrefix="pi" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      {/* The comparison is an H3 sub-section under the Overview's H2, so it
          renders at level 3 and stays in the same band. `neutral` tone
          because the table distinguishes two approaches rather than
          recommending one. */}
      <Overview content={piOverview} variant="compact" />
      <Comparison
        content={piComparison}
        id="vs-analytics"
        tone="neutral"
        level={3}
        layout="table"
      />

      {/* Every capability on screen at once, each card wearing its own
          artwork in its top corner — the GCC page's feature card. Two
          across, so the four capabilities are a 2x2 grid (7 Oct review). */}
      <div className={home.light}>
        <ServicesGrid content={piCapabilities} columns={2} />
      </div>

      <Industries content={piApplications} id="use-cases" />

      <div className={home.light}>
        <Process content={piProcess} variant="stages" />
      </div>

      <Integration content={piIntegration} hoverBorder />

      {/* Six industries read as two rows of three rather than four then a
          two-card remainder. */}
      <div className={home.light}>
        <Industries content={piIndustries} columns={3} />
      </div>

      <WhyUs content={piWhyUs} />

      {/* The review sheet's tech-stack table, rendered as the homepage's
          marquee rows (one per category) like /data-engineering-services.
          `techCompact` only clears the band's full-viewport min-height.
          Ahead of the case studies, in the order the Sep 23 sheet lists the
          three sections that follow "Why choose us". */}
      {/* Every row holds still and wraps, the Android page's treatment
          (1 Oct review: two of the eight rows were static while the rest
          scrolled, so the section read as half-finished). Kept on its dark
          band; group names wrap as they do there. `.techFit` clears the
          full-viewport min-height that `.techCompact` never reaches. */}
      <div className={home.techFit}>
        {techStack}
      </div>

      {/* Homepage case-study gallery, on the warm-white band as it is there. */}
      <div className={home.light}>
        <CaseStudies />
      </div>

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <div className={home.light}>
        <Faq content={piFaqs} idPrefix="pi-faq" />
      </div>

      {/* The homepage's closing CTA, on its default /contact destination —
          the review sheet asked for the CTA buttons to lead to the contact
          page rather than back up to the hero's enquiry form. */}
      <Contact />
    </>
  );
}
