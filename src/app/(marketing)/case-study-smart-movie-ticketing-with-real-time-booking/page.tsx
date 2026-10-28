import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import {
  movieTicketingCaseStudy,
  movieTicketingMeta,
} from '@/lib/home/case-studies/smart-movie-ticketing-real-time-booking';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import CaseStudy from '@/components/case-study/case-study';

import home from '@/components/home/home.module.css';

/**
 * Smart Movie Ticketing with Real-Time Booking, rebuilt from
 * https://www.softsuave.com/case-study-smart-movie-ticketing-with-real-time-booking
 * on the case-study template (`components/case-study`). Copy and PDF are the
 * live page's; the layout and type are this site's.
 *
 * Head tags and schema mirror live's exactly, as on the Smart Warranty page
 * (see its `page.tsx` for why `og:site_name` is rendered rather than set
 * through `metadata.openGraph`): live's `<title>`, meta description,
 * canonical and its one Open Graph tag, `og:site_name`; no JSON-LD (the route
 * is in PAGES_WITH_OWN_SITE_GRAPH so the layout adds none); the footer keeps
 * its PostalAddress microdata, as live's does.
 *
 * A SERVER component so it can own its `metadata`. Fonts, the `.theme-four`
 * tokens and Lenis smooth scroll come from `app/(marketing)/layout.tsx`.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: movieTicketingMeta.title,
  description: movieTicketingMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/case-study-smart-movie-ticketing-with-real-time-booking' },
  robots: pageRobots,
  // No `openGraph`/`twitter` here; `og:site_name` is rendered in the page.
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath. */
const HOME_HREF = BASE_PATH || '/';

export default function MovieTicketingCaseStudyPage() {
  return (
    <div className={home.page}>
      {/* Live's only Open Graph tag; hoisted into <head> by React. */}
      <meta property="og:site_name" content={movieTicketingMeta.ogSiteName} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <CaseStudy
          content={movieTicketingCaseStudy}
          idPrefix="case-study-smart-movie-ticketing-with-real-time-booking"
        />
      </main>

      <Footer />
    </div>
  );
}
