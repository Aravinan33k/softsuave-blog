'use client';

import type { ReactNode } from 'react';
import {
  ragComparison,
  ragFaqs,
  ragHero,
  ragIndustries,
  ragOverview,
  ragProjectCta,
  ragServices,
  ragUseCases,
  ragWhyUs,
} from '@/lib/home/rag-document-ai-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Comparison from '@/components/common/comparison';
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
      {/* Compact look — the generative-AI page's hero, so the two service
          pages read as a matched pair. */}
      <Hero content={ragHero} idPrefix="rag" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      {/* All four paragraphs shown in full: the "View more / View less"
          clamp is gone (1 Oct review: "remove the View More and View Less
          options in this section"). */}
      <Overview content={ragOverview} variant="compact" />

      <div className={home.light}>
        {/* Every service on screen at once, each card wearing its own
            artwork in its top corner — the GCC page's feature card. */}
        <ServicesGrid content={ragServices} />
      </div>

      {/* Same bordered card grid as Industries, filled with use cases —
          three across (1 Oct review: "we can try 3x2 alignments"), so the
          five cards sit 3 + 2 instead of 4 + 1. */}
      <Industries content={ragUseCases} id="use-cases" columns={3} />

      <div className={home.light}>
        <CtaBand content={ragProjectCta} />
      </div>

      {/* Decision board — each factor leans a marker toward the approach
          that fits, with a tally of who takes how many. */}
      <Comparison content={ragComparison} />

      <div className={home.light}>
        <Industries content={ragIndustries} />
      </div>

      <WhyUs content={ragWhyUs} />

      {/* Homepage case-study gallery, on the warm-white band as it is there. */}
      <div className={home.light}>
        <CaseStudies />
      </div>

      {/* Dark, as on the homepage and the generative-AI page. `.techCompact`
          only clears the homepage's full-viewport min-height.
          `loopShortRows`: rows of five (Evaluation & Monitoring,
          Infrastructure) fit a wide screen and held still while the longer
          rows scrolled (7 Oct review: "the technologies under 'Evaluation &
          Monitoring' are not scrolling"). */}
      <div className={home.techCompact}>
        {techStack}
      </div>

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={ragFaqs} idPrefix="rag-faq" />

      {/* The homepage's closing CTA, on its default /contact destination —
          the review sheet asked for the CTA buttons to lead to the contact
          page rather than back up to the hero's enquiry form. */}
      <Contact />
    </>
  );
}
