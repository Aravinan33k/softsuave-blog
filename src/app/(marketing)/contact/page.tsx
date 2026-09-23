import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationLd } from '@/lib/seo/organization';
import { contactHeading, contactMeta, contactTestimonials } from '@/lib/home/contact-content';

import Nav from '@/components/home/nav';
import Breadcrumb from '@/components/common/breadcrumb';
import ContactChannels from '@/components/contact/contact-channels';
import { ContactAwards, ContactOffices } from '@/components/contact/contact-sections';
import Testimonials from '@/components/home/testimonials';
import Footer from '@/components/home/footer';
import styles from '@/components/home/home.module.css';
import cx from '@/components/contact/contact.module.css';

/**
 * Contact page — the content of https://www.softsuave.com/contact in the
 * marketing surface's own theme: the three contact channels (stepped form,
 * meeting scheduler, quick contact), the office addresses, the award
 * certificates and the client testimonials, in the live page's order. All copy
 * lives in `src/lib/home/contact-content.ts`.
 *
 * A SERVER component: only a server component may export `metadata`, and the
 * (marketing) layout's metadata is the homepage's. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll all come from that layout.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: contactMeta.title },
  description: contactMeta.description,
  alternates: { canonical: '/contact' },
  openGraph: {
    title: contactMeta.title,
    description: contactMeta.description,
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
  name: contactMeta.title,
  description: contactMeta.description,
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
        {/* The hero — heading and the three channel cards — on white. `.light`
            re-points the band tokens (so the breadcrumb and h1 turn dark);
            `.heroWhite` takes its warm off-white ground to pure white. */}
        <div className={`${styles.light} ${cx.heroWhite}`}>
          <section className={cx.lead}>
            <Breadcrumb tone="band" className={cx.crumb} />
            <h1 className={cx.h1}>{contactHeading}</h1>
          </section>
          <ContactChannels />
        </div>
        <ContactOffices />

        <ContactAwards />

        {/* The homepage's own testimonials section, in the same warm-white band
            the homepage gives it, fed the live contact page's wording. */}
        <div className={styles.light}>
          <Testimonials content={contactTestimonials} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
