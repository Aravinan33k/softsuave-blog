import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
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
 * No page-level JSON-LD: the live page carries none, so this one adds nothing
 * beyond the Organization / WebSite nodes every marketing page gets from the
 * shared layout.
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
  robots: pageRobots,
  openGraph: {
    title: contactMeta.title,
    description: contactMeta.description,
    url: absoluteUrl('/contact'),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(contactMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: contactMeta.title,
    description: contactMeta.description,
    images: [dynamicOgImage(contactMeta.title, 'Soft Suave')],
  },
};

/**
 * The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 * needs the already-public path; the links below go through next/link, which
 * does.
 */
const HOME_HREF = BASE_PATH || '/';

export default function ContactPage() {
  return (
    <div className={styles.page}>
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
        {/* The offices on the live page's light world-map band; the dark
            awards band then sits between two light ones. */}
        <div className={styles.light}>
          <ContactOffices />
        </div>

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
