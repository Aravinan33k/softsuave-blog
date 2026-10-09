"use client";

import { usePathname } from "next/navigation";
import { PAGES_WITH_OWN_SITE_GRAPH } from "@/lib/seo/own-organization";

/**
 * Decides whether the marketing layout emits its site-wide JSON-LD, by page:
 *
 *   "/"                              nothing — the homepage mirrors
 *                                    softsuave.com's own homepage schema
 *                                    exactly (`lib/home/home-live-schema.ts`),
 *                                    Organization included, and nothing more.
 *   PAGES_WITH_OWN_SITE_GRAPH        nothing — the page's approved spec is its
 *                                    whole schema, Organization included and
 *                                    WebSite not.
 *   every other page                 the Organization + WebSite pair.
 *
 * The graph arrives as server-rendered JSON-LD (`JsonLd`); this only decides
 * whether to render it. A layout cannot see the path without `headers()`,
 * which would turn every marketing page from static to per-request, whereas a
 * client component is pre-rendered on the server with the request's path — so
 * each page's static HTML carries exactly its own variant, and the choice
 * re-runs on client navigation because the layout persists across it.
 *
 * `usePathname` excludes the basePath, so these are app paths wherever the site
 * is mounted.
 */
export function SiteGraph({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  if (path === "/" || PAGES_WITH_OWN_SITE_GRAPH.has(path)) return null;
  return children;
}
