'use client';

import type { ReactNode } from 'react';
import {
  healthtechBenefits,
  healthtechCta,
  healthtechFaqs,
  healthtechHero,
  healthtechOverview,
  healthtechServices,
  healthtechSuccessStories,
} from '@/lib/home/healthtech-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components: the client strip the
// live page opens on, the success-story lane (with this page's stories), the
// testimonials and the closing enquiry band.
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
      <Hero content={healthtechHero} idPrefix="healthtech" />

      <div className={home.light}>
        <Clients />
      </div>

      <Overview content={healthtechOverview} id="overview" />

      <div className={home.light}>
        <Services content={healthtechServices} id="solutions" variant="bold" />
      </div>

      <CardGrid content={healthtechBenefits} id="benefits" variant="feature" />

      <div className={home.light}>
        {/* The homepage's technology rows under this section's live heading. */}
        <div className={home.techFit}>
          {techStack}
        </div>
        <WorkGrid content={healthtechSuccessStories} id="success-stories" countLabel="stories" />
      </div>

      {/* The live page's band after the success stories (13 Oct review: "CTA
          section is missing"). The stories join the light band above so the
          dark band sits between two light ones, as on Telecom. */}
      <CtaBand content={healthtechCta} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={healthtechFaqs} idPrefix="healthtech-faq" />
      </div>

      <Contact />
    </>
  );
}
