import type { Metadata } from 'next';
import { pageRobots } from '@/lib/flags';
import { notFoundContent, notFoundMeta } from '@/lib/home/not-found-content';
import ErrorPage from '@/components/common/error-page';

/**
 * Page not found — a clone of softsuave.com/404, in the marketing surface's own theme. The page itself
 * is `components/common/error-page` (shared with /410); its copy is in `lib/home/not-found-content.ts`
 * and the illustration is `public/images/not-found/404-error-signpost.png`. `noindex, nofollow`.
 *
 * A SERVER component, so the route can export `metadata`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: notFoundMeta.title },
  alternates: { canonical: notFoundMeta.path },
  robots: pageRobots,
};

export default function NotFoundPage() {
  return <ErrorPage image={notFoundContent.image} link={notFoundContent.link} />;
}
