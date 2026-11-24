'use client';

import type { ReactNode } from 'react';
import {
  cloudAbout,
  cloudApproach,
  cloudApproachSteps,
  cloudHero,
  cloudIntro,
  cloudModels,
  cloudServices,
} from '@/lib/home/cloud-computing-content';
// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, which stands
// in for the live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
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
      <Hero content={cloudHero} idPrefix="cloud" variant="compact" />

      <div className={home.light}>
        <Overview content={cloudIntro} id="overview" />
      </div>

      <Overview content={cloudAbout} id="about" />

      <div className={home.light}>
        <Overview content={cloudApproach} id="approach" />
        <Process content={cloudApproachSteps} id="approach-steps" />
      </div>

      {/* Live cards carry no links, so none are inferred from their names. */}
      <CardGrid content={cloudServices} id="services" variant="bold" autoLink={false} />

      <div className={home.light}>
        <CardGrid content={cloudModels} id="models" variant="bold" autoLink={false} />
        {techStack}
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
