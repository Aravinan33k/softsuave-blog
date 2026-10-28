import type { Metadata } from 'next';
import { BASE_PATH, pageRobots } from '@/lib/flags';
import { JsonLd } from '@/components/seo/json-ld';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
import { hxFaqs, hxHero, hxMeta, hxServices } from '@/lib/home/hire-xamarin-content';

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

const ogImage = dynamicOgImage(hxMeta.title, 'Soft Suave');

export const metadata: Metadata = {
  // The live page's own title, verbatim; the root title template is "%s".
  title: hxMeta.title,
  description: hxMeta.description,
  alternates: { canonical: 'https://www.softsuave.com/hire-xamarin-developer' },
  robots: pageRobots,
  openGraph: {
    title: hxMeta.title,
    description: hxMeta.description,
    url: absoluteUrl(hxMeta.path),
    siteName: 'Soft Suave',
    type: 'website',
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: hxMeta.title,
    description: hxMeta.description,
    images: [ogImage],
  },
};

/**
 * Service + WebPage + FAQPage, `@id`-linked, from the same helper the hire
 * templates use. The FAQPage is built from the accordion's own items, so the
 * schema can never state an answer the page does not show. The live page
 * publishes no breadcrumb, so none is emitted.
 */
const LD = pageSchemaGraph({
  path: hxMeta.path,
  title: hxMeta.title,
  description: hxMeta.description,
  serviceType: hxMeta.serviceType,
  serviceName: hxMeta.role,
  showBreadcrumb: false,
  caption: hxHero.titleLines.join(' '),
  audience: `Startups, SMBs and enterprises hiring ${hxMeta.role}`,
  offerCatalogName: hxServices.title,
  offers: hxServices.items.map((i) => ({ name: i.name, description: i.body })),
  faqName: hxFaqs.title,
  faqs: hxFaqs.items,
});

const HOME_HREF = BASE_PATH || '/';

export default function HireXamarinDeveloperPage() {
  return (
    // `data-type-scale` opts this page into the deployed reference's type
    // sizes; each section's stylesheet scopes its overrides to it.
    <div className={`${home.page} ${page.root}`} data-type-scale="hire">
      <JsonLd data={LD} />
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
