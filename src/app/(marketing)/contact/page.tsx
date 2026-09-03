import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
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

/** Labels deliberately differ from the homepage's, so no mega panel — its items
 *  are homepage anchors that would be dead here. */
const PAGE_NAV = [
  { label: 'Home', href: '/' },
  { label: 'AI Services', href: '/#services' },
  { label: 'Our Industries', href: '/#industries' },
  { label: 'Case Studies', href: '/#work' },
  { label: 'Blog', href: '/blog' },
] as const;

/** In-page: the enquiry section below is this page's only destination. */
const PAGE_CTA = { label: 'Book AI Strategy Call', href: '#contact' } as const;

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <Nav links={PAGE_NAV} cta={PAGE_CTA} logoHref={HOME_HREF} />
      <main id="main">
        <section className={styles.contactLead}>
          <span className={styles.eyebrow}>{contactPage.eyebrow}</span>
          <h1 className={styles.h2}>{contactPage.title}</h1>
          <p className={styles.lead}>{contactPage.body}</p>
        </section>
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
