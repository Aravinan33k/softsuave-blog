'use client';

import {
  lifeAwards,
  lifeGallery,
  lifeHero,
  lifePerks,
  lifePractice,
  lifePurpose,
} from '@/lib/home/life-content';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
// PAGE-LOCAL SECTIONS, composed from the landing surface's classes and
// primitives — the photo-led arrangements live uses that the shared landing set
// has no equivalent for (see each component's header).
import PhotoMasthead from '@/components/common/photo-masthead';
import LifeGallery from '@/components/life/life-gallery';
import LifePurpose from '@/components/life/life-purpose';
import LifePerks from '@/components/life/life-perks';
import LifePractice from '@/components/life/life-practice';
import LifeAwards from '@/components/life/life-awards';
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
      <PhotoMasthead content={lifeHero} />

      <div className={home.light}>
        <LifeGallery content={lifeGallery} />
      </div>

      <LifePurpose content={lifePurpose} />

      <div className={home.light}>
        <LifePerks content={lifePerks} />
      </div>

      <LifePractice content={lifePractice} />

      <div className={home.light}>
        <LifeAwards content={lifeAwards} />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
