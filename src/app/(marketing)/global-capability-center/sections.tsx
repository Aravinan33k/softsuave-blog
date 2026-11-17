'use client';

import {
  gccAudience,
  gccBenefits,
  gccClosingCta,
  gccHero,
  gccIntro,
  gccServices,
  gccWhyUs,
} from '@/lib/home/gcc-content';
// COMPANY-LEVEL SECTION — the homepage's own closing enquiry band, standing in
// for the live page's "Book Free Consultation" form block.
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
// `CardGrid` is `components/landing/industries`, a generic bordered card grid
// despite the filename.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import WhyUs from '@/components/landing/why-us';
import Services from '@/components/landing/services';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
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
      <Hero content={gccHero} idPrefix="gcc" />

      <div className={home.light}>
        <Overview content={gccIntro} id="overview" />
      </div>

      <WhyUs content={gccWhyUs} id="why" />

      <div className={home.light}>
        <Services content={gccServices} variant="bold" />
      </div>

      <CardGrid content={gccBenefits} id="benefits" variant="feature" />

      <div className={home.light}>
        <CardGrid content={gccAudience} id="audience" variant="bold" />
      </div>

      <CtaBand content={gccClosingCta} />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
