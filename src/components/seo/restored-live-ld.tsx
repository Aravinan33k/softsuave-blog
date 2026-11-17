import { JsonLd } from '@/components/seo/json-ld';
import { RESTORED_LIVE_LD } from '@/lib/seo/live-schema-restored';

/**
 * The live page's own JSON-LD blocks for `path` (lib/seo/live-schema-restored.ts), one
 * script tag each, in the order the live page serves them.
 */
export function RestoredLiveLd({ path }: { path: string }) {
  return (
    <>
      {(RESTORED_LIVE_LD[path] ?? []).map((data, i) => (
        <JsonLd key={i} data={data} />
      ))}
    </>
  );
}
