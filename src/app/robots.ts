import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    // Both admin paths are listed: /blog/admin is the public entry point and
    // /admin still resolves (it 307s there), so excluding only one would leave
    // the login page crawlable at the other.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/blog/admin/', '/api/', '/preview/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
