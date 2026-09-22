import 'server-only';
import type { Metadata } from 'next';

import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { pageSchemaGraph } from '@/lib/seo/page-graph';
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
 * Service + WebPage + FAQPage for a role page, plus a `BreadcrumbList` on the
 * few whose live page carries one.
 *
 * The Service catalogue is the page's own capability list, so the schema can
 * never describe an offering the page does not show. The FAQ schema is built
 * from the same items the accordion renders — Google requires the answer to be
 * visible, and `Faq` renders every answer into the DOM, collapsed rather than
 * absent.
 *
 * Built through `pageSchemaGraph` rather than the bare `serviceLd`/`faqPageLd`
 * pair it used to call. Those emit no `@id`, so the Service and the FAQPage sat
 * in one script with nothing joining them and no `WebPage` for either to belong
 * to, and `providerName` inlined a fresh unidentified Organization on each of
 * the nine pages instead of naming the canonical one. The breadcrumb is off by
 * default (see `HireRolePageContent.showBreadcrumb`) — most of these fourteen
 * pages have none on their live page, and this must never state more than the
 * live page does. Where a page opts in, `pageSchemaGraph` still drops it if the
 * resulting trail is a single item: while `/` is not served, a trail whose
 * first item is a 307 is worse than no trail at all.
 */
export function hireRoleJsonLd(content: HireRolePageContent): object[] {
  return pageSchemaGraph({
    path: content.slug,
    title: content.meta.title,
    description: content.meta.description,
    serviceType: content.serviceType,
    // The role as a thing you can hire — "AI Developers" — rather than the
    // page's `<title>`, which is written to win the click.
    serviceName: content.name,
    // Off by default — see `HireRolePageContent.showBreadcrumb`. Only a
    // handful of these 14 pages have a breadcrumb on their live page.
    showBreadcrumb: content.showBreadcrumb ?? false,
    parents: content.breadcrumbParents,
    breadcrumbEndsAtParent: content.breadcrumbEndsAtParent,
    breadcrumbName: content.name,
    caption: content.hero.titleLines.join(' '),
    audience: `Startups, SMBs and enterprises hiring ${content.name}`,
    // The offer catalogue is whichever section the page actually uses to list
    // what you can hire: the capability carousel where a page has one, and
    // otherwise the specialisations grid that carries that list alone. Either
    // way the schema describes a section the reader can see.
    offerCatalogName: (content.capabilities ?? content.specialisations)?.title,
    offers: (content.capabilities ?? content.specialisations)?.items.map((i) => ({
      name: i.name,
      description: i.body,
    })),
    faqName: content.faq.title,
    faqs: content.faq.items,
  });
}
