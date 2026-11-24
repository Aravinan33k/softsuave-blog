'use client';

import {
  legacyAbout,
  legacyHero,
  legacyServices,
  legacyTopCompany,
} from '@/lib/home/legacy-modernization-content';
// COMPANY-LEVEL SECTIONS — the homepage's closing enquiry band, which is the
// live page's "Book Free Consultation" form.
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
// Four services carrying three or four paragraphs each — the board keeps every
// paragraph without a wall of text, as on the PHP and NodeJS pages.
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
      <Hero content={legacyHero} idPrefix="legacy" variant="compact" />

      <div className={home.light}>
        <Overview content={legacyTopCompany} id="overview" />
      </div>

      <Overview content={legacyAbout} id="why" />

      <div className={home.light}>
        <ServiceBoard content={legacyServices} />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
