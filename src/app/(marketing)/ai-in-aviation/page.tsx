import { JsonLd } from '@/components/seo/json-ld';
import SectorPage from '@/components/industries/sector-page';
import { aviation as content } from '@/lib/home/sectors/aviation';
import { sectorMetadata, sectorJsonLd } from '@/lib/home/sectors/seo';

/**
 * One of the eight sector pages under `/industries`.
 *
 * The slug is softsuave.com's own, so this route takes over a URL that already
 * exists rather than inventing one — which is also why the index's cards and
 * the nav's Industries panel needed no edit: `navHref` flips a path to local the
 * moment it is listed in MARKETING_PATHS.
 *
 * A SERVER component, like every page in this group: only a server component
 * may export `metadata`. Everything animated lives in `SectorPage`'s bands.
 */

export const revalidate = 300;

export const metadata = sectorMetadata(content);

export default function AviationAiPage() {
  return (
    <>
      <JsonLd data={sectorJsonLd(content)} />
      <SectorPage content={content} />
    </>
  );
}
