"use client";

import { usePathname } from "next/navigation";

/**
 * Renders its children on every page except the homepage.
 *
 * Exists for the marketing layout's site-wide Organization + WebSite JSON-LD.
 * The homepage emits softsuave.com's own homepage schema verbatim
 * (`lib/home/home-live-schema.ts`), and parity with the live page means it
 * must not carry the layout's pair on top of it — a second Organization the
 * live homepage does not have.
 *
 * A layout cannot see the path without `headers()`, which would turn every
 * marketing page from static to per-request. This client wrapper reads it with
 * `usePathname` instead: client components are pre-rendered on the server with
 * the request's path, so the static HTML of `/` has no site-wide block and every
 * other page's HTML has it exactly as before. The children stay a server
 * component (`JsonLd`), and the check re-runs on client navigation because the
 * layout persists across it.
 *
 * `usePathname` excludes the basePath, so "/" is the homepage wherever the app
 * is mounted — the same test the footer uses for its in-page anchors.
 */
export function NotOnHomepage({ children }: { children: React.ReactNode }) {
  return usePathname() === "/" ? null : children;
}
