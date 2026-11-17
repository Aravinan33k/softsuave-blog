"use client";

import { usePathname } from "next/navigation";
import { JsonLd } from "@/components/seo/json-ld";
import { PAGES_WITH_OWN_SITE_GRAPH } from "@/lib/seo/own-organization";
import { MARKETING_SITE_GRAPH } from "@/lib/seo/site-graph-data";

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
 * This imports the graph itself rather than taking it as children. A layout
 * cannot see the path without `headers()`, which would turn every marketing page
 * from static to per-request, so the choice is made here, in a client component
 * that is pre-rendered on the server with the request's path — each page's static
 * HTML carries exactly its own variant, and the choice re-runs on client
 * navigation because the layout persists across it. Children, though, are
 * serialized into the RSC payload whether or not they render, which put the whole
 * Organization + WebSite graph (address and all) into the payload of every page
 * that skips it.
 *
 * `usePathname` excludes the basePath, so these are app paths wherever the site
 * is mounted.
 */
export function SiteGraph() {
  const path = usePathname();
  if (path === "/" || PAGES_WITH_OWN_SITE_GRAPH.has(path)) return null;
  return <JsonLd data={MARKETING_SITE_GRAPH} />;
}
