'use client';

import type { ReactNode } from 'react';
import {
  constructionBenefits,
  constructionCta,
  constructionFaqs,
  constructionHero,
  constructionOverview,
  constructionSolutions,
  constructionSuccessStories,
} from '@/lib/home/construction-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, the case-study lane (with this page's
// own stories), the testimonials, and the closing enquiry band.
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
      <Hero content={constructionHero} idPrefix="construction" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={constructionOverview} id="overview" />

      <div className={home.light}>
        <Services content={constructionSolutions} id="solutions" variant="bold" />
      </div>

      <CardGrid content={constructionBenefits} id="benefits" variant="feature" />

      <div className={home.light}>
        {/* The homepage's technology rows under this section's live heading. */}
        <div className={home.techFit}>
          {techStack}
        </div>
        <WorkGrid
          content={constructionSuccessStories}
          id="success-stories"
          countLabel="case studies"
        />
      </div>

      {/* The band is its own dark surface wherever it sits, so it takes a
          dark slot rather than a `.light` wrapper. */}
      <CtaBand content={constructionCta} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={constructionFaqs} idPrefix="construction-faq" />
      </div>

      <Contact />
    </>
  );
}
