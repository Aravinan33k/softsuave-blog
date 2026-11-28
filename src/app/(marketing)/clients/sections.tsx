'use client';

import { clientsPageBrands, clientsPageHero } from '@/lib/home/clients-content';
// COMPANY-LEVEL SECTIONS — the homepage's own components. Recognitions and
// Testimonials read the homepage's own content, which matches the live page's
// copy verbatim; the logo band takes this page's heading and roster as props.
import Clients from '@/components/home/clients';
import Recognitions from '@/components/home/recognitions';
import Testimonials from '@/components/home/testimonials';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import PhotoMasthead from '@/components/common/photo-masthead';
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
      {/* Live's hero: the single word, no paragraph, over its handshake
          photograph. */}
      <PhotoMasthead content={clientsPageHero} />

      <div className={`${home.light} ${location.awardsTight}`}>
        <Clients
          title={clientsPageBrands.title}
          body={clientsPageBrands.body}
          logos={clientsPageBrands.logos}
        />
        <Recognitions />

        <Testimonials />
      </div>

      <Contact content={HIRE_CLOSING_BAND} eyebrow="" ctaIcon />
    </>
  );
}
