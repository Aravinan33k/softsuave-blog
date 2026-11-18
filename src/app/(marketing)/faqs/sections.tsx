'use client';

import {
  faqsGeneral,
  faqsHire,
  faqsPageEnquiry,
  faqsPageHero,
  faqsPageIntro,
  faqsProject,
} from '@/lib/home/faqs-content';
import { navHref } from '@/themes/softsuave/nav-data';
import Hero from '@/components/landing/hero';
import SectionHead from '@/components/landing/section-head';
import Faq from '@/components/landing/faq';
import ConsultationClose from '@/components/common/consultation-close';
import home from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';

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
      <Hero content={faqsPageHero} idPrefix="faqs" variant="compact" breadcrumb={false} />

      <div className={home.light}>
        <section className={landing.sectionShell} id="faqs-intro" style={{ paddingBottom: 0 }}>
          <SectionHead title={faqsPageIntro.title} intro={faqsPageIntro.body} />
        </section>
        <Faq content={faqsGeneral} idPrefix="faq-general" />
      </div>

      <Faq content={faqsProject} idPrefix="faq-project" />

      <div className={home.light}>
        <Faq content={faqsHire} idPrefix="faq-hire" />
      </div>

      {/* The closing "Book Free Consultation" band in the /developer-profile design; its "Schedule a Call" goes to the free-consultation page. */}
      <ConsultationClose
        id="enquiry"
        idPrefix="faqs-contact"
        ctaIcon
        content={{
          title: faqsPageEnquiry.title,
          body: faqsPageEnquiry.body,
          steps: faqsPageEnquiry.steps,
          person: {
            image: { src: faqsPageEnquiry.manager.photo, width: 157, height: 157, alt: 'Soft Suave Manager' },
            name: faqsPageEnquiry.manager.name,
            role: faqsPageEnquiry.manager.role,
          },
          cta: {
            label: faqsPageEnquiry.manager.cta?.label ?? 'Schedule a Call',
            href: navHref(faqsPageEnquiry.manager.cta?.href ?? '/30-min-free-consultation'),
          },
          badges: faqsPageEnquiry.badges,
          form: faqsPageEnquiry.form,
        }}
      />
    </>
  );
}
