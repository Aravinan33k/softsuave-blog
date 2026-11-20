'use client';

import type { ReactNode } from 'react';
import {
  ecommerceChallenges,
  ecommerceCta,
  ecommerceFaqs,
  ecommerceHero,
  ecommerceProcess,
  ecommerceServices,
  ecommerceSuccessStories,
  ecommerceWhyUs,
} from '@/lib/home/ecommerce-ai-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, and the closing enquiry band.
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Contact from '@/components/home/contact';
// SECTOR-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Services from '@/components/landing/services';
import Process from '@/components/landing/process';
import CtaBand from '@/components/landing/cta-band';
import Faq from '@/components/landing/faq';
// The live page's challenge tabs — the same selector-and-panel the hire pages
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
      <Hero content={ecommerceHero} idPrefix="ecommerce" />

      <div className={home.light}>
        <Clients />
      </div>

      <Problems content={ecommerceChallenges} id="challenges" />

      <div className={home.light}>
        <Overview content={ecommerceWhyUs} id="why" />
      </div>

      <Services content={ecommerceServices} variant="bold" />

      <div className={home.light}>
        {/* The homepage's technology rows under this section's live heading. */}
        <div className={home.techFit}>
          {techStack}
        </div>
        <Process content={ecommerceProcess} />
        {/* The image-led success-story lane the other industry pages run
            (13 Oct review: "redesign the success stories section"). */}
        <WorkGrid content={ecommerceSuccessStories} id="success-stories" countLabel="success stories" />
      </div>

      {/* The live page's closing band, ahead of the FAQ here so the dark band
          sits between two light ones rather than against the closing CTA. */}
      <CtaBand content={ecommerceCta} />

      <div className={home.light}>
        <Faq content={ecommerceFaqs} idPrefix="ecommerce-faq" />
      </div>

      <Contact />
    </>
  );
}
