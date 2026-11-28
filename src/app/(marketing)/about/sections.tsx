'use client';

import {
  aboutHero,
  aboutLeadership,
  aboutMilestones,
  aboutOverview,
} from '@/lib/home/about-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components and content, so the
// proof on this page is the same proof the rest of the site shows.
import Recognitions from '@/components/home/recognitions';
import Clients from '@/components/home/clients';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// SHARED LANDING SECTIONS, taking this page's copy.
import Hero from '@/components/landing/hero';
import Overview from '@/components/landing/overview';
import Process from '@/components/landing/process';
import Team from '@/components/landing/team';
import home from '@/components/home/home.module.css';
import location from '@/components/landing/location-app-page.module.css';

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
      <Hero content={aboutHero} idPrefix="about" />

      {/* The overview (with mission and vision inside it, as on the live
          page) and the milestone timeline share one light band: the section
          they replaced between them was the dark one, and this keeps the
          leadership and proof bands on the inversions they already had. */}
      <div className={home.light}>
        <Overview content={aboutOverview} id="mission" />

        {/* A chronology: each card is labelled with its year, not "Step N". */}
        <Process content={aboutMilestones} id="milestones" label="n" />
      </div>

      <Team content={aboutLeadership} id="team" columns={5} />

      {/* Both proof bands share one light band: they are the same argument
          told twice (who rates us, who buys from us), and splitting them
          across an inversion would read as two unrelated sections. */}
      <div className={`${home.light} ${location.awardsJoined}`}>
        <Recognitions />
        {/* The live About page's own heading and standfirst for this band. */}
        <Clients
          title="Preferred Technology Partner for Startups and SMBs Globally"
          body="We use the latest technology and AI innovation to help startups transform digitally, guiding them through product development with unmatched experience and actionable results."
        />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
