'use client';

import type { ReactNode } from 'react';
import {
  cvCapabilities,
  cvFaqs,
  cvHero,
  cvIndustries,
  cvOverview,
  cvPipeline,
  cvProcess,
  cvServices,
  cvSetupCta,
  cvWhyUs,
} from '@/lib/home/computer-vision-content';
// Shared landing-page surface — bordered panels and grids over the homepage's
// typography and `.theme-four` tokens.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CapabilityGuide from '@/components/computer-vision/capability-guide';
import ServicesGrid from '@/components/common/services-grid';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
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
      <Hero content={cvHero} idPrefix="cv" variant="compact" />

      <div className={home.light}>
        <Clients />
      </div>

      {/* The overview's H2 introduces both the prose and the five workflow
          stages below it, so the stages render headless rather than
          opening a second section with a duplicate heading. */}
      <Overview content={cvOverview} variant="compact" />
      <Process content={cvPipeline} id="pipeline" variant="stages" />

      <div className={home.light}>
        <CapabilityGuide content={cvCapabilities} />
      </div>

      {/* Every service on screen at once, each card wearing its own
          artwork in its top corner — the GCC page's feature card. */}
      <ServicesGrid content={cvServices} />

      <div className={home.light}>
        <Industries content={cvIndustries} />
      </div>

      <CtaBand content={cvSetupCta} />

      <div className={home.light}>
        {/* Seven steps stay four across (four then three balances better
            than five then two); `even` just levels the card bottoms and
            drops the justified body copy. */}
        <Process content={cvProcess} variant="even" />
      </div>

      <WhyUs content={cvWhyUs} />

      {/* The homepage's tech rows, one per group, as the Android page has
          them (1 Oct review: "the tech stack UI is not looking good — use the
          /android-application-development-company page style"). Ahead of the
          case studies, per the Sep 23 review: the stack answers "can you
          build it" before the proof. On the dark band (1 Oct: "use dark
          background for techstack section"), as on the homepage.
          `.techFit` clears the homepage's full-viewport min-height;
          `staticFrom` holds the rows still from tablet width up;
          `.techWideLabels` keeps each group name on one line. */}
      <div className={`${home.techFit} ${home.techWideLabels}`}>
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

      <Faq content={cvFaqs} idPrefix="cv-faq" />

      {/* The homepage's closing CTA, on its default /contact destination —
          the review sheet asked for the CTA buttons to lead to the contact
          page rather than back up to the hero's enquiry form. */}
      <Contact />
    </>
  );
}
