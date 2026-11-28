'use client';

import type { ReactNode } from 'react';
import {
  offCaseStudies,
  offFaqs,
  offGovernance,
  offHero,
  offMidCta,
  offModels,
  offOverview,
  offProcess,
  offServices,
  offWhyUs,
} from '@/lib/home/offshore-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content: the
// client strip, the testimonials and the closing enquiry band.
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// The case-study lane, given this page's own seven studies.
import WorkGrid from '@/components/home/work-grid';
// SERVICE-SPECIFIC SECTIONS — shared landing components taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Industries from '@/components/generative-ai/industries';
import { serviceHref } from '@/lib/home/service-href';
import CardGrid from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import Process from '@/components/landing/process';
import WhyUs from '@/components/landing/why-us';
import Faq from '@/components/landing/faq';
import home from '@/components/home/home.module.css';

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 * Industries, TechStack stay on the server (tech-logo) and arrive as props.
 */
export default function Sections({ industries, techStack }: Readonly<{ industries: ReactNode; techStack: ReactNode }>) {
  return (
    <>
      <Hero content={offHero} idPrefix="offshore" />

      <div className={home.light}>
        {/* The live band's own heading and standfirst, not the homepage's. */}
        <Clients
          title="Our Clients"
          body="See how leading companies across industries achieved growth, innovation, and efficiency by leveraging our offshore software development expertise."
        />
      </div>

      <Overview content={offOverview} />

      <div className={home.light}>
        {/* Whole cards link (review: "remove the 'Learn More' and make the
            whole card clickable"); each engagement model gets its "Hire Now"
            (review: "the hire now button is missing in these cards"). */}
        {/* The Hire Software Developers "Developer Expertise" card style: one
            scrolling row with arrows that advances a card at a time on its own.
            A card links where its own `href` (or its name's route) says, and
            stays unlinked where there is none. */}
        <Industries
          content={{
            eyebrow: offServices.eyebrow,
            title: offServices.title,
            body: offServices.body,
            wideHead: offServices.wideHead,
            carousel: true,
            autoplay: true,
            items: offServices.items.map((item) => {
              const href = serviceHref(item.name, '/offshore-software-development-company', item.href);
              return href
                ? { name: item.name, body: item.body, href }
                : { name: item.name, body: item.body, link: false as const };
            }),
          }}
          id="services"
          variant="bold"
          cardLinks
        />
        <CardGrid
          content={offModels}
          id="models"
          variant="feature"
          cardCta={{ label: 'Hire Now', href: '/contact' }}
        />
      </div>

      <CtaBand content={offMidCta} />

      <div className={home.light}>
        <Process content={offProcess} />
      </div>

      {industries}

      <div className={home.light}>
        <Overview content={offGovernance} id="governance" />
      </div>

      <WhyUs content={offWhyUs} />

      <div className={home.light}>
        {techStack}
      </div>

      <WorkGrid content={offCaseStudies} id="case-studies" />

      <div className={home.light}>
        <Testimonials />
        <Faq content={offFaqs} idPrefix="offshore-faq" />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
