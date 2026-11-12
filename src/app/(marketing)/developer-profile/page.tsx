import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { locationClientLogos } from '@/lib/home/mobile-app-location-shared';
import {
  devProfileClose,
  devProfileHero,
  devProfileMeta,
  devProfileProfiles,
  devProfileTestimonials,
} from '@/lib/home/developer-profile-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import TalentHero from '@/components/landing/talent-hero';
import DeveloperProfiles from '@/components/landing/developer-profiles';
import Clients from '@/components/home/clients';
import Testimonials from '@/components/home/testimonials';
import ConsultationClose from '@/components/common/consultation-close';

import home from '@/components/home/home.module.css';
// The location pages' type, rhythm and widths (heading weight 600, the
// hire-software-developers reference's spacing), shared.
import location from '@/components/landing/location-app-page.module.css';

/**
 * Developer Profile — softsuave.com/developer-profile carried into the new
 * theme, slug unchanged, every word from `lib/home/developer-profile-content.ts`,
 * in the live page's order but for the clients band, moved up by request:
 * hero and stats, clients, sample profiles (with the download dialog),
 * testimonials, closing consultation.
 *
 * Head as live: title, description, canonical and robots — and robots is
 * `noindex, nofollow` there, so it is here too, permanently (not
 * `pageRobots`, which turns indexable when the site opens to search). The
 * route is out of the sitemap (`sitemap: false` in the registry) and in
 * PAGES_WITH_OWN_SITE_GRAPH, so no structured data is emitted, as live has
 * none.
 *
 * Order and band rhythm: hero dark, clients light (moved up under the hero
 * by request), profiles dark, testimonials light, closing consultation dark.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: devProfileMeta.title,
  description: devProfileMeta.description,
  // The live canonical, verbatim — the production URL, not this deployment's.
  alternates: { canonical: devProfileMeta.canonical },
  // The live page is noindex,nofollow — kept whatever the site-wide setting.
  robots: { index: false, follow: false },
};

const HOME_HREF = BASE_PATH || '/';

export default function DeveloperProfilePage() {
  return (
    <div className={`${home.page} ${location.root}`} data-type-scale="hire">
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <TalentHero content={devProfileHero} />

        {/* Straight after the hero, by request — on the light band, so the
            dark hero and the dark profiles either side of it stay apart. The
            software-development-company-spain clients band: the shared band's
            own heading and standfirst with the deployed homepage's 27 logos. */}
        <div className={home.light}>
          <Clients logos={locationClientLogos} />
        </div>

        {/* On the dark ground, by request. */}
        <DeveloperProfiles content={devProfileProfiles} />

        <div className={home.light}>
          <Testimonials content={devProfileTestimonials} />
        </div>

        <ConsultationClose content={devProfileClose} idPrefix="developer-profile-close" />
      </main>

      <Footer />
    </div>
  );
}
