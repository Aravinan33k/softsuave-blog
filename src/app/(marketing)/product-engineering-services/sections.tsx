'use client';

import {
  prodAbout,
  prodHero,
  prodOverview,
  prodProcess,
  prodServices,
} from '@/lib/home/product-engineering-content';
// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, standing in for
// the live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import ServiceBoard from '@/components/common/service-board';
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
      <Hero content={prodHero} idPrefix="product-eng" variant="compact" />

      <div className={home.light}>
        <Overview content={prodOverview} />
        <Overview content={prodAbout} id="about" />
      </div>

      <Process content={prodProcess} />

      {/* Six names to pick from, one stage to read on — the live page's own
          tabs, whose copy is too long to sit on cards. */}
      <div className={home.light}>
        <ServiceBoard content={prodServices} />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
