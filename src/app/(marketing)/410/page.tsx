import type { Metadata } from 'next';
import { goneMeta, notFoundContent } from '@/lib/home/not-found-content';
import ErrorPage from '@/components/common/error-page';

/**
 * Page gone — a clone of softsuave.com/410, in the marketing surface's own theme: the same page as /404
 * (`components/common/error-page`) with the same illustration, `public/images/not-found/404-error-signpost.png`.
 * Like the live page it answers 200, and it is `noindex, nofollow`.
 *
 * A SERVER component, so the route can export `metadata`.
 */

export const revalidate = 300;

export const metadata: Metadata = {
  // `absolute`: the live page's <title> carries no " | Soft Suave" suffix.
  title: { absolute: goneMeta.title },
  alternates: { canonical: goneMeta.path },
  // Always noindex, nofollow (SEO page sheet, row 116), like /404.
  robots: { index: false, follow: false },
};

export default function GonePage() {
  return <ErrorPage image={notFoundContent.image} link={notFoundContent.link} />;
}
