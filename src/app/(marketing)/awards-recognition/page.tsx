import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { awardsPage } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import styles from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Awards and Recognition — the destination for the homepage band's "View All",
 * which used to send the reader off to softsuave.com.
 *
 * The wall is `awardsPage.items`: live's fifteen awards, in live's order, each
 * with live's title and one-line description. It uses the same `.recog*`
 * classes as the homepage band so a badge plaque looks identical in both
 * places. What it does NOT reuse is `.recogWallWrap`: that wrapper is the
 * homepage's collapse mechanism (`height: 0` until GSAP tweens it open), and
 * here the wall is the point of the page, so it is always open.
 *
 * Live closes on a "Schedule an Interview Now !" form; the closing `<Contact />`
 * band stands in for it with the hire pages' "Book Free Consultation" copy, as
 * on every marketing page but the homepage, the AI service pages and the
 * industry pages.
 *
 * A SERVER component: only a server component may export `metadata`, and the
 * (marketing) layout's metadata is the homepage's. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll all come from that layout.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// Live's title and description (see `awardsPage` for the two typo fixes). No
// " | Soft Suave" suffix: the title already opens with the company name.
export const metadata: Metadata = {
  title: awardsPage.metaTitle,
  description: awardsPage.metaDescription,
  alternates: { canonical: '/awards-recognition' },
  openGraph: {
    title: awardsPage.metaTitle,
    description: awardsPage.metaDescription,
    url: absoluteUrl('/awards-recognition'),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(awardsPage.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: awardsPage.metaTitle,
    description: awardsPage.metaDescription,
    images: [dynamicOgImage(awardsPage.title, 'Soft Suave')],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

export default function AwardsRecognitionPage() {
  return (
    <div className={styles.page}>
      {/* No JSON-LD: the live page carries none (13 Oct review: "need to update
          the schema"), and the route is in PAGES_WITH_OWN_SITE_GRAPH, so the
          layout adds no Organization or WebSite here either. */}
      <Nav logoHref={HOME_HREF} />

      {/* The awards wall sits in the warm-white `.light` band: it re-points
          the surface tokens, so every `.recog*` rule below inverts with it.
          The nav, the closing band and the footer stay on the dark canvas,
          exactly as they do around the homepage's light bands. */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
