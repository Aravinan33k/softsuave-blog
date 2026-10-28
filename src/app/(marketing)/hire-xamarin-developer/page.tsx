import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { absoluteUrl, ogImageUrl } from '@/lib/seo/metadata';
import { hxMeta } from '@/lib/home/hire-xamarin-content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';

import home from '@/components/home/home.module.css';
// This page's own section rhythm (`--section-y`, `--gutter`), scoped to it.
import page from './page.module.css';
import Sections from './sections';

/**
 * Hire Xamarin Developer — softsuave.com/hire-xamarin-developer carried into
 * the new theme, slug unchanged.
 *
 * Not rendered through `HireRolePage` or `HirePage`: both templates fix which
 * component draws each band, and this page's brief draws its expertise,
 * services and why-hire bands with components neither template uses. So it
 * composes the shared sections directly, as the TypeScript page does, and
 * every word comes from `lib/home/hire-xamarin-content.ts`.
 *
 * A SERVER component so it can export `metadata` and emit JSON-LD; the
 * sections are client components. Fonts, `.theme-four` and Lenis come from
 * `app/(marketing)/layout.tsx`.
 */

export const revalidate = 300;

/**
 * The link-preview image. softsuave.com names one for this page
 * (/assets/new-formate/xamarin-developer.jpg) but the file 404s, so this is a
 * branded 1200×630 card in the style of the other hire pages': the logo and
 * the H1 on the site's dark ground.
 */
const OG_IMAGE = {
  url: ogImageUrl('/assets/images/hire-xamarin-developer-og.webp'),
  width: 1200,
  height: 630,
  alt: 'Hire Xamarin Developers in India on Contract - Soft Suave',
};

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  // (Live's og:title reads "Hire Kotlin Developer…", a copy-paste slip, so
  // the share title is the page title instead.)
  title: hxMeta.title,
  description: hxMeta.description,
  alternates: { canonical: hxMeta.path },
  robots: pageRobots,
  openGraph: {
    title: hxMeta.title,
    description: hxMeta.description,
    url: absoluteUrl(hxMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: hxMeta.title,
    description: hxMeta.description,
    images: [OG_IMAGE.url],
  },
};

/*
 * Structured data: none of the page's own, as on softsuave.com — the live
 * page's HTML carries no JSON-LD (the one Organization an SEO tool reports
 * there is injected by the shared GTM container, which this site loads too).
 * The route is in `PAGES_WITH_OWN_SITE_GRAPH`, so the layout adds no
 * Organization or WebSite either, and the footer keeps its address microdata.
 */

const HOME_HREF = BASE_PATH || '/';

export default function HireXamarinDeveloperPage() {
  return (
    // `data-type-scale` opts this page into the deployed reference's type
    // sizes; each section's stylesheet scopes its overrides to it.
    <div className={`${home.page} ${page.root}`} data-type-scale="hire">
      <Nav logoHref={HOME_HREF} />

      {/*
       * Band rhythm: hero dark, then light/dark chapters that alternate with
       * no two dark sections touching — clients and the why-hire cards share
       * the first light chapter, the client stories and FAQ the last, as on
       * the TypeScript page, and the closing Contact band is dark.
       */}
      <main id="main">
        <Sections />
      </main>

      <Footer />
    </div>
  );
}
