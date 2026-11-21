'use client';

import {
  dsFaqs,
  dsFit,
  dsHero,
  dsIndustries,
  dsOverview,
  dsProcess,
  dsServices,
  dsTech,
  dsWhyUs,
} from '@/lib/home/data-science-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import FitGuide from '@/components/data-science/fit-guide';
import ServicesGrid from '@/components/common/services-grid';
import TechCluster from '@/components/data-science/tech-cluster';
import Industries from '@/components/landing/industries';
import CapabilityLattice from '@/components/data-science/capability-lattice';
import Faq from '@/components/landing/faq';
// Sections reused from the homepage verbatim: their copy is the homepage's
// own (`lib/home/content.ts`), so they render with the homepage's actual
// components rather than a second implementation of the same section.
import Clients from '@/components/home/clients';
import Process from '@/components/landing/process';
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
 */
export default function Sections() {
  return (
    <>
      {/* Compact look — the generative-AI page's hero, so the service
          pages read as a matched set. */}
      <Hero content={dsHero} idPrefix="ds" variant="compact" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={dsOverview} variant="compact" />

      {/* The brief's triage table as routed rows: problem → data → the
          starting point it earns, with the fallback branch beneath. */}
      <div className={home.light}>
        <FitGuide content={dsFit} />
      </div>

      <ServicesGrid content={dsServices} />

      {/* The six phases as the shared simple process row — one process
          design on every landing page, per the Sep corrections review. */}
      <Process content={dsProcess} />

      <div className={home.light}>
        <Industries content={dsIndustries} columns={3} />
      </div>

      {/* Not six cards in a row: this section's own copy argues the six
          capabilities have to connect, so every card is wired to every
          other and pointing at one lights just its connections. */}
      <CapabilityLattice content={dsWhyUs} />

      {/* Homepage case-study gallery, on the warm-white band as it is there. */}
      <div className={home.light}>
        <CaseStudies />
      </div>

      {/* Not the marquee the other service pages use: twenty-two tools in
          nine categories is small enough to show whole, so they arrive as
          scattered points and resolve into their clusters — this page's
          own subject, drawn. */}
      <TechCluster content={dsTech} />

      {/* Homepage client stories, on the warm-white band as they are there. */}
      <div className={home.light}>
        <Testimonials />
      </div>

      <Faq content={dsFaqs} idPrefix="ds-faq" />

      {/* The homepage's closing CTA, on its default /contact destination —
          the review sheet asked for the CTA buttons to lead to the contact
          page rather than back up to the hero's enquiry form. */}
      <Contact />
    </>
  );
}
