import type { Metadata } from 'next';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl } from '@/lib/seo/metadata';
import { thankYouMeta } from '@/lib/home/thank-you-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * Thank You — where every lead form lands once the lead is accepted
 * (`lib/forms/thank-you.ts`), as softsuave.com's forms land on its
 * /thank-you. Same content as the live page (`lib/home/thank-you-content.ts`),
 * in this site's header, footer and landing-page type.
 *
 * Deliberately NOT registered in lib/home/landing-pages.ts: that list feeds the
 * sitemap, and a confirmation page is not a search result (the live one is
 * noindex too). It is a static route, so it renders whether or not it is
 * listed there.
 */

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: thankYouMeta.title,
  description: thankYouMeta.description,
  alternates: { canonical: thankYouMeta.path },
  robots: { index: false, follow: false },
  openGraph: {
    title: thankYouMeta.title,
    description: thankYouMeta.description,
    url: absoluteUrl(thankYouMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function ThankYouPage() {
  return (
    <div className={home.page}>
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
