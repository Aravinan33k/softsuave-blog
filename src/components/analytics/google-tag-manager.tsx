import { gtmContainerId, gtmLoad } from '@/lib/flags';
import GtmLoader from './gtm-loader';

/**
 * Google Tag Manager, the way softsuave.com loads it — the container is the
 * only tag on the live site, and Analytics (and anything else) is configured
 * inside it rather than pasted into the page. So there is one snippet here, not
 * one per tool.
 *
 * Mounted once, in the root layout, so it is on every page. The container ID
 * comes from `lib/flags.ts` (GTM-TWMFSDC unless overridden); this renders
 * nothing only when `NEXT_PUBLIC_GTM_ID=off`. The same constant gates the CSP
 * in `next.config.ts`.
 *
 * `GtmLoader` injects the snippet — by default on the visitor's first
 * interaction or a few seconds after load (`gtmLoad`, `lib/flags.ts`), never
 * ahead of the page's own scripts. It is not a `next/script`: that would also
 * put a `<link rel="preload">` for gtm.js in every page's head, fetching the
 * container alongside the render-blocking CSS whenever it is going to run.
 *
 * The `<noscript>` iframe is GTM's own fallback, kept because it is the half of
 * the snippet that records a visit from a client that never runs the script.
 * It needs `frame-src` for googletagmanager.com, which the CSP adds alongside
 * `script-src` when the container is configured.
 */
export default function GoogleTagManager() {
  if (!gtmContainerId) return null;

  const id = encodeURIComponent(gtmContainerId);

  return (
    <>
      <GtmLoader id={gtmContainerId} deferred={gtmLoad === 'deferred'} />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${id}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
