'use client';

import type { ReactNode } from 'react';
import {
  logisticsBenefits,
  logisticsCta,
  logisticsFaqs,
  logisticsHero,
  logisticsOverview,
  logisticsSolutions,
  logisticsSuccessStories,
} from '@/lib/home/logistics-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components: the client strip the
// live page opens on, the story lane (fed this page's success stories), the
// client testimonials, and the closing enquiry band.
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
      <Hero content={logisticsHero} idPrefix="logistics" />

      <div className={home.light}>
        <Clients wideTitle="38ch" />
        <Overview content={logisticsOverview} id="overview" />
      </div>

      <Services content={logisticsSolutions} id="solutions" variant="bold" />

      <div className={home.light}>
        <CardGrid content={logisticsBenefits} id="benefits" variant="feature" />
        {/* The homepage's technology rows under this section's live heading. */}
        <div className={home.techFit}>
          {techStack}
        </div>
        <WorkGrid content={logisticsSuccessStories} id="results" countLabel="success stories" />
      </div>

      {/* The live page's band after the success stories (13 Oct review: "CTA
          section is missing"). The stories join the light band above so the
          dark band sits between two light ones, as on Telecom. */}
      <CtaBand content={logisticsCta} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={logisticsFaqs} idPrefix="logistics-faq" />
      </div>

      <Contact />
    </>
  );
}
