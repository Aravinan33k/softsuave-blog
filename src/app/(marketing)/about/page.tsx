import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { aboutMadhuLd, aboutManoharLd, aboutRameshLd, aboutSudhendraLd } from '@/lib/seo/about';
import { aboutMeta } from '@/lib/home/about-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
import Sections from './sections';

/**
 * About Us — the Company page, rebuilt from https://www.softsuave.com/about.
 *
 * A SERVER component so it can own its `metadata` and emit JSON-LD; every
 * section below is a client component. Fonts, `.theme-four` tokens and Lenis
 * smooth scroll come from `app/(marketing)/layout.tsx`.
 *
 * Section set and order follow the live page — hero, overview with mission
 * and vision, milestones, leadership, recognitions, clients — closing on the
 * brand's contact band, as every page in this group does.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
  alternates: { canonical: aboutMeta.path },
  robots: pageRobots,
  openGraph: {
    title: aboutMeta.title,
    description: aboutMeta.description,
    url: absoluteUrl(aboutMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: aboutMeta.title,
    description: aboutMeta.description,
    images: [dynamicOgImage(aboutMeta.title, 'Soft Suave')],
  },
};

/* The title is the live page's own and already names the brand, so it is used
   as-is rather than getting the " | Soft Suave" suffix the other pages add. */

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

export default function AboutPage() {
  return (
    <div className={home.page}>
      {/* softsuave.com's own schema for this page, one <script> per block —
          see `lib/seo/about.ts`. */}
      <JsonLd data={aboutRameshLd} />
      <JsonLd data={aboutManoharLd} />
      <JsonLd data={aboutMadhuLd} />
      <JsonLd data={aboutSudhendraLd} />
      <Nav logoHref={HOME_HREF} />

      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
