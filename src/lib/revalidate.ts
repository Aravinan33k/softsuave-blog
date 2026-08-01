import 'server-only';
import { revalidatePath } from 'next/cache';

// Revalidate the ISR cache on content changes. Always refreshes the home page
// and feeds; callers pass specific content paths too. Best-effort — a failure
// is logged, never thrown.
export function revalidateContent(paths: string[] = []): void {
  const targets = new Set<string>(['/', '/sitemap.xml', '/rss.xml', ...paths]);
  for (const p of targets) {
    try {
      revalidatePath(p);
    } catch (err) {
      console.error('[revalidate] failed for', p, err);
    }
  }
}
