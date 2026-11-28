'use client';

import Clients from '@/components/home/clients';
import Contact from '@/components/home/contact';
import Hero from '@/components/industries/hero';
import Sectors from '@/components/industries/sectors';
import Closing from '@/components/industries/closing';
import styles from '@/components/home/home.module.css';

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
      {/* The live page's section set: hero, client strip, the "Next step"
          consultation band, the sector cards, then the closing CTA every
          industry page ends on (13 Oct review: "move this section before
          the Sector section" / "Use the final cta used in other industry
          section on this page"). The by-the-numbers rail, capabilities
          ledger, case studies and staffing sections it no longer runs are
          gone. The always-dark "Next step" panel sits between the light
          client and sector bands. */}
      <Hero />

      <div className={styles.light}>
        <Clients />
      </div>

      <Closing id="next-step" />

      <div className={styles.light}>
        <Sectors />
      </div>

      <Contact />
    </>
  );
}
