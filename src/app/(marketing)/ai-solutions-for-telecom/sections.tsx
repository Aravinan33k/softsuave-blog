'use client';

import type { ReactNode } from 'react';
import {
  telecomBenefits,
  telecomCta,
  telecomFaqs,
  telecomHero,
  telecomIndustryOverview,
  telecomSolutions,
  telecomSuccessStories,
} from '@/lib/home/telecom-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, its testimonials, and the closing
// enquiry band. The success-story lane is the homepage's, fed this page's copy.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
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
      <Hero content={telecomHero} idPrefix="telecom" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
      </div>

      <Overview content={telecomIndustryOverview} id="industry-overview" />

      <div className={home.light}>
        <Services content={telecomSolutions} variant="bold" />
      </div>

      <CardGrid content={telecomBenefits} id="benefits" variant="feature" />

      <div className={home.light}>
        {/* The homepage's technology rows under this section's live heading. */}
        <div className={home.techFit}>
          {techStack}
        </div>
        <WorkGrid content={telecomSuccessStories} id="success-stories" countLabel="success stories" />
      </div>

      {/* The consultation band draws its own dark ground whatever wraps it,
          so it takes the dark slot between the two light pairs. */}
      <CtaBand content={telecomCta} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={telecomFaqs} idPrefix="telecom-faq" />
      </div>

      <Contact />
    </>
  );
}
