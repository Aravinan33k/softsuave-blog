import type { Metadata } from 'next';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl } from '@/lib/seo/metadata';
import { organizationLd } from '@/lib/seo/organization';
import { marketingWebSiteLd, SCHEMA_DATE_MODIFIED } from '@/lib/seo/page-graph';
import { breadcrumbLd } from '@/lib/seo/jsonld';
import { BASE_PATH, homepageEnabled } from '@/lib/flags';
import { meta, sectors } from '@/lib/home/industries-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Clients from '@/components/home/clients';

import Hero from '@/components/industries/hero';
import ProofRail from '@/components/industries/proof-rail';
import Sectors from '@/components/industries/sectors';
import Capabilities from '@/components/industries/capabilities';
import Work from '@/components/industries/work';
import Delivery from '@/components/industries/delivery';
import Closing from '@/components/industries/closing';

import styles from '@/components/home/home.module.css';

/**
 * `/industries` — the sector index.
 *
 * The slug is the live site's own: softsuave.com publishes this page at
 * `/industries`, and it is where that site's mega-menu "See all Industries"
 * goes. So this route replaces a link out with a page of ours rather than
 * inventing a URL.
 *
 * A SERVER component, like every other page in this group: only a server
 * component may export `metadata`, and the `(marketing)` layout's metadata is
 * the homepage's. The animated bands underneath are the client components.
 * Fonts, the `.theme-four` tokens and Lenis smooth scroll all come from that
 * layout — nothing is re-declared here.
 *
 * Band rhythm: the dark opening (hero, proof rail, sector bento) hands over to
 * a warm-white band for the capability ledger, back to dark for the case
 * studies and client marks, light again for the delivery models, and closes on
 * the dark conversion panel. `.light` re-points the surface tokens, so each
 * section inverts without a single markup change.
 */

// Matches the rest of the marketing surface; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: meta.title,
  description: meta.description,
  alternates: { canonical: meta.path },
  robots: { index: true, follow: true },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: absoluteUrl(meta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

/**
 * The eight sectors as an ItemList, built from the same data the grid renders.
 *
 * Each URL is absolute, as schema requires, and each one is now a page of ours:
 * the eight sector routes live at softsuave.com's own slugs. They sit behind
 * the same release flag as this index, so while that is off nothing here is
 * reachable to advertise in the first place.
 */
const sectorListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': `${absoluteUrl(meta.path)}#sectors`,
  name: 'Industries Soft Suave serves',
  itemListElement: sectors.items.map((sector, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: sector.name,
    description: sector.body,
    url: absoluteUrl(sector.href),
  })),
};

/**
 * The index itself. A `CollectionPage` rather than the `WebPage` the service
 * pages carry, because what this page is for is the list.
 *
 * `isPartOf` used to inline its own `{'@type': 'WebSite', name: 'Soft Suave'}`,
 * which is a second unidentified website beside the canonical one
 * `app/(marketing)/layout.tsx` emits. It names that one by `@id` instead, and
 * the list above is bound to this page as its `mainEntity` rather than floating
 * beside it unattached.
 */
const collectionLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${absoluteUrl(meta.path)}#webpage`,
  name: meta.title,
  description: meta.description,
  url: absoluteUrl(meta.path),
  inLanguage: 'en',
  dateModified: SCHEMA_DATE_MODIFIED,
  isPartOf: { '@id': marketingWebSiteLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
  mainEntity: { '@id': `${absoluteUrl(meta.path)}#sectors` },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

export default function IndustriesPage() {
  // "/" is only a page this app serves once the marketing homepage ships; until
  // then the trail must not point Google at a redirect — which leaves a
  // single-item trail, so the schema is omitted rather than emitted empty.
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: 'Industries', path: meta.path },
  ];
  const breadcrumb = trail.length > 1 ? breadcrumbLd(trail) : null;

  return (
    <div className={styles.page}>
      <JsonLd data={[collectionLd, sectorListLd, ...(breadcrumb ? [breadcrumb] : [])]} />
      {/* The homepage's own bar — same divisions, same mega panels, across the
          whole surface. Its in-page anchors resolve back to the homepage off
          it (see `navHrefForPage`). */}
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Hero />
        <ProofRail />
        <Sectors />

        <div className={styles.light}>
          <Capabilities />
        </div>

        <Work />
        <Clients />

        <div className={styles.light}>
          <Delivery />
        </div>

        <Closing />
      </main>

      <Footer />
    </div>
  );
}
