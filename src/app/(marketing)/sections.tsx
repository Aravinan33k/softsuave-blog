'use client';

import type { ReactNode } from 'react';
import styles from '@/components/home/home.module.css';
import ad from '@/components/ad/ad.module.css';
import Hero from '@/components/home-v2/hero';
import Manifesto from '@/components/home/manifesto';
import Stats from '@/components/home/stats';
import Clients from '@/components/home/clients';
import WorkGrid from '@/components/home/work-grid';
import Services from '@/components/home/services';
import Journey from '@/components/home-v2/journey';
import Industries from '@/components/home-v2/industries';
import Awards from '@/components/home/awards';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';

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
      {/* `halfHeads` (here, on Clients, the tech stack and client stories):
          the head set as on Hire Software Developers — eyebrow on its own row,
          the heading in the left half, the subtext in the right half after a
          rule at the centre, top-aligned (review). */}
      <div id="why" className={`${styles.light} ${styles.whySection} ${ad.halfHeads}`}>
        <Manifesto />
        <Stats />
      </div>
      {/* Clients continues the light band opened by "Why Soft Suave" — the
          proof numbers and the names behind them read as one chapter. */}
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={`${styles.light} ${ad.halfHeads}`}>
        <Clients />
      </div>
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={ad.halfHeads}>
        <Industries />
      </div>
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={`${styles.light} ${ad.halfHeads}`}>
        <Services />
      </div>
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={ad.halfHeads}>
        <Journey />
      </div>
      {/* Case studies invert to the warm-white band — the photography and the
          outcome numbers carry more weight on light, and it breaks up the run
          of dark sections between Journey and Awards. */}
      <div className={styles.light}>
        <WorkGrid />
      </div>
      <Awards />
      {/* Warm-white band. The badges are real directory artwork with white
          grounds baked in, so each sits on a light plaque; the existing
          `.light .recogBadge` rule trades that plaque's dark drop shadow
          for a hairline, which is what keeps it separated from the band. */}
      <div className={styles.light}>
        <Recognitions />
      </div>
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={ad.halfHeads}>{techStack}</div>
      {/* Client stories invert to the warm-white band, so the run reads
          TechStack(dark) → stories(light) → Contact(dark). The archive's own
          styles are token-driven, so the wrapper is the whole switch — the
          one exception is each photograph's hover veil, which stays
          near-black on purpose because it sits on the picture, not the page
          (see `.rImageVeilLabel`). */}
      {/* `halfHeads`, as on Why Soft Suave above. */}
      <div className={`${styles.light} ${ad.halfHeads}`}>
        <Testimonials />
      </div>
      <Contact />
    </>
  );
}
