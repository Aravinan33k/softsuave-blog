import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { freeTrialMeta } from '@/lib/home/free-trial-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * 40-Hour Free Trial — a clone of softsuave.com/free-7-days-trial, adapted
 * for hiring Anthropic (Claude) developers. Same sections in the same order:
 * Hero, Our Clients, Built Around You, Awards, Testimonials, Book Free
 * Consultation. Copy lives in `lib/home/free-trial-content.ts`.
 *
 * Registered in lib/home/landing-pages.ts, which brings the
 * "Start 40 Hours Free Trial" CTA on every hire page in-app (it used to
 * resolve to the live site).
 */

export const revalidate = 300;

const ogImage = dynamicOgImage('Hire Anthropic Developers', '40-Hour Free Trial');

export const metadata: Metadata = {
  // The root layout's title template is "%s", so this renders verbatim.
  title: freeTrialMeta.title,
  description: freeTrialMeta.description,
  alternates: { canonical: freeTrialMeta.path },
  robots: pageRobots,
  openGraph: {
    title: freeTrialMeta.title,
    description: freeTrialMeta.description,
    url: absoluteUrl(freeTrialMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: freeTrialMeta.title,
    description: freeTrialMeta.description,
    images: [ogImage],
  },
};

const HOME_HREF = BASE_PATH || '/';

export default function FreeTrialPage() {
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
