"use client";

import { usePathname } from "next/navigation";
import { PAGES_WITH_OWN_ORGANIZATION } from "@/lib/seo/own-organization";

/**
 * Picks which site-wide JSON-LD the marketing layout emits, by page:
 *
 *   "/"                              nothing — the homepage mirrors
 *                                    softsuave.com's own homepage schema
 *                                    exactly (`lib/home/home-live-schema.ts`),
 *                                    Organization included, and nothing more.
 *   PAGES_WITH_OWN_ORGANIZATION      `websiteOnly` — the page publishes its own
 *                                    Organization, so the layout must not add a
 *                                    second node with the same `@id`.
 *   every other page                 `full`, the Organization + WebSite pair.
 *
 * Both variants arrive as server-rendered JSON-LD (`JsonLd`); this only
 * chooses between them. A layout cannot see the path without `headers()`,
 * which would turn every marketing page from static to per-request, whereas a
 * client component is pre-rendered on the server with the request's path — so
 * each page's static HTML carries exactly its own variant, and the choice
 * re-runs on client navigation because the layout persists across it.
 *
 * `usePathname` excludes the basePath, so these are app paths wherever the site
 * is mounted.
 */
export function SiteGraph({ full, websiteOnly }: { full: React.ReactNode; websiteOnly: React.ReactNode }) {
  const path = usePathname();
  if (path === "/") return null;
  return PAGES_WITH_OWN_ORGANIZATION.has(path) ? websiteOnly : full;
}
