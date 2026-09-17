import 'server-only';
import type { Metadata } from 'next';

import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { breadcrumbLd, faqPageLd, serviceLd } from '@/lib/seo/jsonld';
import { homepageEnabled } from '@/lib/flags';
import { brand } from '@/lib/home/content';
import type { HireRolePageContent } from './types';

/**
 * Metadata and structured data for a hire-by-role route.
 *
 * The nine `page.tsx` files would otherwise repeat the same thirty lines of
 * `Metadata` and JSON-LD with one string changed, which is exactly how a canonical
 * ends up pointing at the wrong page. Built here from the content module instead,
 * so each route file is the route and nothing else.
 *
 * `server-only`: it reaches `lib/seo/metadata`, which requires `DATABASE_URL`
 * through `env.ts` and must never be pulled into a client bundle.
 */

export function hireRoleMetadata(content: HireRolePageContent): Metadata {
  const { meta, slug, name } = content;
  // The dynamic OG route renders the title and a subtitle into the brand frame,
  // so a role page gets a real card without an image slot per page — and the
  // image pipeline needs no new slot (which it could not generate here anyway).
  const ogImage = dynamicOgImage(name, meta.description);

  return {
    // The root layout's title template is "%s", so this renders verbatim.
    title: meta.title,
    description: meta.description,
    alternates: { canonical: slug },
    robots: { index: true, follow: true },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: absoluteUrl(slug),
      siteName: brand.name,
      type: 'website',
      images: [{ url: ogImage, width: 1200, height: 630, alt: name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [ogImage],
    },
  };
}

/**
 * Service + FAQPage + BreadcrumbList for a role page.
 *
 * The Service catalogue is the page's own capability list, so the schema can
 * never describe an offering the page does not show. The FAQ schema is built
 * from the same items the accordion renders — Google requires the answer to be
 * visible, and `Faq` renders every answer into the DOM, collapsed rather than
 * absent.
 *
 * The breadcrumb is omitted while `/` is not served: a trail whose first item
 * is a 307 to the archive is worse than no trail, and with Home dropped only
 * one item remains, which is not a trail at all.
 */
export function hireRoleJsonLd(content: HireRolePageContent): object[] {
  const trail = [
    ...(homepageEnabled ? [{ name: 'Home', path: '/' }] : []),
    { name: content.name, path: content.slug },
  ];

  return [
    serviceLd({
      name: content.serviceType,
      description: content.meta.description,
      path: content.slug,
      providerName: brand.name,
      // The offer catalogue is whichever section the page actually uses to list
      // what you can hire: the capability carousel where a page has one, and
      // otherwise the specialisations grid that carries that list alone. Either
      // way the schema describes a section the reader can see.
      offers: (content.capabilities ?? content.specialisations)?.items.map((i) => ({
        name: i.name,
        body: i.body,
      })),
    }),
    faqPageLd(content.faq.items),
    ...(trail.length > 1 ? [breadcrumbLd(trail)] : []),
  ];
}
