import 'server-only';
import { revalidatePath } from 'next/cache';

// Revalidate the ISR cache on content changes. Always refreshes the blog
// archive and feeds; callers pass specific content paths too. ("/" is the
// static marketing homepage and never lists posts, so it isn't refreshed.)
// Best-effort — a failure is logged, never thrown.
export function revalidateContent(paths: string[] = []): void {
  const targets = new Set<string>(['/blog', '/sitemap.xml', '/rss.xml', ...paths]);
  for (const p of targets) {
    try {
      revalidatePath(p);
    } catch (err) {
      console.error('[revalidate] failed for', p, err);
    }
  }
}

/**
 * Archive paths for a post's categories and tags. Publishing or recategorising a
 * post changes what those archives list, but nothing used to revalidate them —
 * they stayed stale until the 300s window lapsed. Pass the result through to
 * `revalidateContent` alongside the post's own path.
 */
export function taxonomyPaths(
  post: { categories?: { category: { slug: string } }[]; tags?: { tag: { slug: string } }[] },
): string[] {
  return [
    ...(post.categories ?? []).map((c) => `/category/${c.category.slug}`),
    ...(post.tags ?? []).map((t) => `/tag/${t.tag.slug}`),
  ];
}
