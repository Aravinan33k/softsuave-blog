import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationLd } from '@/lib/seo/organization';
import { contactPage } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Contact from '@/components/home/contact';
import Footer from '@/components/home/footer';
import styles from '@/components/home/home.module.css';

/**
 * Contact page — the destination for the "Book AI Strategy Call" CTAs in the
 * hero and the nav, which previously only scrolled to the homepage's own
 * enquiry section and so had nowhere to go from any other route.
 *
 * A SERVER component: only a server component may export `metadata`, and the
 * (marketing) layout's metadata is the homepage's. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll all come from that layout.
 */

const TITLE = 'Contact Us';
const DESCRIPTION =
  'Book a free AI strategy session with Soft Suave and find where AI can create the biggest impact in your organization.';

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  title: `${TITLE} | Soft Suave`,
  description: DESCRIPTION,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: `${TITLE} | Soft Suave`,
    description: DESCRIPTION,
    url: absoluteUrl('/contact'),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path; the links below go through next/link, which
 * does.
 */
const HOME_HREF = BASE_PATH || '/';

const PAGE_URL = absoluteUrl('/contact');

/**
 * ContactPage schema. `organizationLd` carries the real contact details (the
 * addresses and points of contact), so this references it by `@id` rather than
 * restating any of them here — the same split the service pages use.
 */
const contactPageLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: `${TITLE} | Soft Suave`,
  description: DESCRIPTION,
  inLanguage: 'en',
  about: { '@id': organizationLd['@id'] },
  publisher: { '@id': organizationLd['@id'] },
} as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={[contactPageLd]} />
      <Nav logoHref={HOME_HREF} />
      <main id="main">
        {/* The masthead keeps the page's own near-black ground (the nav is
            over it, and it is what the reader lands on). */}
        <section className={styles.contactLead}>
          <h1 className={styles.h2}>{contactPage.title}</h1>
          <p className={styles.lead}>{contactPage.body}</p>
        </section>
        {/* The enquiry band inverts to the light band instead: `.light`
            re-points the same --bg/--text/--accent tokens the section already
            reads, so it needs no light variant of its own. `data-nav-tone`
            then overrides what the bar would infer from that: the nav flips
            itself light over any `.light` band, and on a page this short that
            meant the bar changing colour mid-scroll. It stays black over both
            bands here. `.contactLight` drops the
            section's own backdrop, which is a dark photo under a near-opaque
            BLACK veil and would otherwise stay black on the white. The footer
            sits outside this wrapper, so it is untouched.

            `#contact` rather than the default `/contact`: this band IS the
            enquiry section, so the CTA scrolls to it instead of reloading the
            page. The nav bar's own CTA still points at `/contact`. */}
        <div className={`${styles.light} ${styles.contactLight}`} data-nav-tone="dark">
          <Contact ctaHref="#contact" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
