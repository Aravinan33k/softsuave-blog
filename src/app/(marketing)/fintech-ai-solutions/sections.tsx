'use client';

import type { ReactNode } from 'react';
import {
  fintechBenefits,
  fintechCta,
  fintechFaqs,
  fintechFeatures,
  fintechHero,
  fintechProcess,
  fintechSectors,
  fintechServices,
  fintechSolutions,
  fintechSuccessStories,
  fintechWhyUs,
} from '@/lib/home/fintech-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components: the success-story
// lane (given this page's own stories), the testimonials the live page runs,
// and the closing enquiry band.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// The live page's solution blocks — the same selector-and-panel the hire pages
// run for their evaluation criteria.
import Problems from '@/components/generative-ai/problems';
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
      <Hero content={fintechHero} idPrefix="fintech" />

      {/* The live page's client strip, under its own heading (13 Oct
          review: "need to update the our client section"), sharing the
          light band the solution panels open. */}
      <div className={home.light}>
        <Clients
          title="Preferred Technology Partner for World-Class Enterprises Globally"
          body="We use the latest technology and innovation to help enterprises and startups transform digitally, guiding them through product development with unmatched experience and actionable results."
        />
        <Problems content={fintechSolutions} id="solutions" />
      </div>

      <Services content={fintechServices} variant="bold" />

      <div className={home.light}>
        <Process content={fintechProcess} />
      </div>

      <CardGrid content={fintechSectors} id="sectors" variant="watermark" columns={5} />

      <div className={home.light}>
        <CardGrid content={fintechBenefits} id="benefits" variant="feature" />
      </div>

      <CardGrid content={fintechFeatures} id="features" columns={5} />

      <div className={home.light}>
        <Overview content={fintechWhyUs} id="why" />
      </div>

      {/* The homepage's technology rows under this section's live heading. */}
      <div className={home.techFit}>
        {techStack}
      </div>

      <div className={home.light}>
        <WorkGrid content={fintechSuccessStories} id="success-stories" countLabel="success stories" />
      </div>

      {/* The live page's band after the success stories (13 Oct review:
          "CTA section is missing"); client stories and the FAQ then share
          one light band, as on the Telecom and Construction pages. */}
      <CtaBand content={fintechCta} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={fintechFaqs} idPrefix="fintech-faq" />
      </div>

      <Contact />
    </>
  );
}
