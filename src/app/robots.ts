import type { MetadataRoute } from 'next';
import { absoluteUrl } from '@/lib/seo/metadata';

export default function robots(): MetadataRoute.Robots {
  return {
    // /blog/admin/ is still listed: it 302s to /admin, and a crawler that
    // followed the old subpath URL should not be invited to index the hop.
    rules: [{ userAgent: '*', allow: '/', disallow: ['/admin/', '/blog/admin/', '/api/', '/preview/'] }],
    sitemap: absoluteUrl('/sitemap.xml'),
  };
}
