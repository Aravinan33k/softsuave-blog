import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { contactMeta } from '@/lib/home/contact-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import styles from '@/components/home/home.module.css';
import landing from '@/components/landing/landing.module.css';
import genAi from '@/components/generative-ai/gen-ai.module.css';
import Sections from './sections';

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
    <div className={`${styles.page} ${styles.stackedHeads} ${landing.stackedHeads} ${genAi.stackedHeads}`}>
      <Nav logoHref={HOME_HREF} />
      <main id="main">
        <Sections />
      </main>
      <Footer />
    </div>
  );
}
