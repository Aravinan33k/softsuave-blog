'use client';

import { careersHero, careersOpenings } from '@/lib/home/careers-content';
import SectionHead from '@/components/landing/section-head';
// PAGE-SPECIFIC SECTION — the live page's location tabs over a table of roles,
// which no shared landing component renders.
import OpeningsTable from '@/components/careers/openings-table';
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
      <section className={landing.indexHead} id="top">
        <SectionHead level={1} title={careersHero.title} intro={careersHero.intro} />
      </section>

      <div className={home.light}>
        <OpeningsTable content={careersOpenings} id="openings" />
      </div>
    </>
  );
}
