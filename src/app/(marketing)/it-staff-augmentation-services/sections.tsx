'use client';

import {
  staffBenefits,
  staffFaqs,
  staffHero,
  staffIndustries,
  staffModels,
  staffProcess,
  staffRoles,
  staffTechnologies,
  staffWhyUs,
} from '@/lib/home/staff-augmentation-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip the live page opens on, its testimonials, and the closing
// enquiry band. Their copy already matches the live page's word for word.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Services from '@/components/landing/services';
import Process from '@/components/landing/process';
import CardGrid from '@/components/landing/industries';
import Industries from '@/components/generative-ai/industries';
import Faq from '@/components/landing/faq';
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
      <Hero content={staffHero} idPrefix="staff-aug" />

      <div className={home.light}>
        <Clients wideTitle />
      </div>

      <CardGrid content={staffWhyUs} id="why" columns={4} />

      <div className={home.light}>
        <CardGrid content={staffModels} id="models" variant="bold" />
      </div>

      <Process content={staffProcess} />

      <div className={home.light}>
        {/* Whole cards link (review: "remove the 'learn more' and make the
            whole cards clickable"). */}
        <Services content={staffRoles} variant="bold" cardLinks />
      </div>

      <CardGrid content={staffTechnologies} id="technologies" columns={4} />

      <div className={home.light}>
        {/* The Hire Software Developers "Developer Expertise" card style: one
            scrolling row with arrows that advances a card at a time on its own. */}
        <Industries
          content={{
            eyebrow: staffIndustries.eyebrow,
            title: staffIndustries.title,
            body: staffIndustries.body,
            wideHead: staffIndustries.wideHead,
            carousel: true,
            autoplay: true,
            items: staffIndustries.items.map((item) => ({ name: item.name, body: item.body ?? '' })),
          }}
          id="industries"
          variant="bold"
          links={false}
        />
      </div>

      <CardGrid content={staffBenefits} id="benefits" columns={5} />

      <div className={home.light}>
        <Testimonials />
        <Faq content={staffFaqs} idPrefix="staff-aug-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
