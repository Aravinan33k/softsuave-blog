'use client';

import type { ReactNode } from 'react';
import styles from '@/components/home/home.module.css';
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Services from '@/components/home/services';
import Awards from '@/components/home/awards';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
// The previous homepage's hero, Industries and Journey (`/` now uses the
// redesigned ones in components/home-v2).
import Hero from '@/components/home/hero';
import Industries from '@/components/home/industries';
import Journey from '@/components/home/journey';

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
      <Hero />
      <div id="why" className={`${styles.light} ${styles.whySection}`}>
        <Manifesto />
        <Stats />
      </div>
      <div className={styles.light}>
        <Clients />
      </div>
      <Industries />
      <div className={styles.light}>
        <Services />
      </div>
      <Journey />
      <div className={styles.light}>
        <WorkGrid />
      </div>
      <Awards />
      <div className={styles.light}>
        <Recognitions />
      </div>
      {techStack}
      <div className={styles.light}>
        <Testimonials />
      </div>
      <Contact />
    </>
  );
}
