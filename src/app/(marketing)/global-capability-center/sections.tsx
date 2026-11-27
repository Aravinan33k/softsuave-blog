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
import Overview from '@/components/generative-ai/overview';
import WhyUs from '@/components/landing/why-us';
import Industries from '@/components/generative-ai/industries';
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
        {/* The Hire Software Developers "Global Delivery" treatment: a bordered 4:3
            frame, centred against the copy, that shrinks whole with the column
            instead of being cropped. */}
        <Overview
          content={{
            ...gccIntro,
            image: gccIntro.image && {
              src: gccIntro.image.src,
              width: gccIntro.image.width,
              height: gccIntro.image.height,
              alt: gccIntro.image.alt,
              blurDataURL: gccIntro.image.blurDataURL,
              align: 'both',
            },
          }}
          id="overview"
        />
      </div>

      <WhyUs content={gccWhyUs} id="why" />

      <div className={home.light}>
        {/* The Hire Software Developers "Developer Expertise" card style: one scrolling
            row with arrows that advances a card at a time on its own. */}
        <Industries
          content={{
            eyebrow: gccServices.eyebrow,
            title: gccServices.title,
            body: gccServices.body,
            wideHead: true,
            carousel: true,
            autoplay: true,
            items: gccServices.items.map((item) => ({ name: item.name, body: item.body })),
          }}
          id="services"
          variant="bold"
          links={false}
        />
      </div>

      <CardGrid content={gccBenefits} id="benefits" variant="feature" />

      <div className={home.light}>
        <CardGrid
          content={{
            ...gccAudience,
            // "GCC-as-a-Service" is one name: it wraps whole, never at its hyphens.
            titleNode: (
              <>
                Who Should Consider <span style={{ whiteSpace: 'nowrap' }}>GCC-as-a-Service</span>?
              </>
            ),
          }}
          id="audience"
          variant="bold"
          span={4}
        />
      </div>

      <CtaBand content={gccClosingCta} />

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
