import { gtmContainerId, gtmHosts, gtmLoad } from '@/lib/flags';
import GtmLoader from './gtm-loader';

/**
 * Google Tag Manager, the way softsuave.com loads it — the container is the
 * only tag on the live site, and Analytics (and anything else) is configured
 * inside it rather than pasted into the page. So there is one snippet here, not
 * one per tool.
 *
 * Both halves of GTM's install instructions, mounted once from the root layout
 * so they are on every page. The container ID comes from `lib/flags.ts`
 * (GTM-TWMFSDC unless overridden); nothing renders when `NEXT_PUBLIC_GTM_ID=off`.
 * The same constant gates the CSP in `next.config.ts`.
 *
 * - `GoogleTagManagerHead` is the stock `<script>` snippet, verbatim, as high in
 *   `<head>` as the layout allows. It is in the served HTML, so GTM checkers and
 *   Tag Assistant find it exactly as they do on the old PHP pages.
 * - `GoogleTagManagerBody` is GTM's `<noscript>` iframe, the first thing in
 *   `<body>` as GTM specifies — the half that records a visit from a client that
 *   never runs the script. It needs `frame-src` for googletagmanager.com, which
 *   the CSP adds alongside `script-src` when the container is configured.
 *
 * `NEXT_PUBLIC_GTM_LOAD=deferred` swaps the head snippet for `GtmLoader`, which
 * injects the same container on the first interaction instead (see `gtmLoad` in
 * `lib/flags.ts` for why that exists). The container is then not in the HTML.
 */

// The container ID reaches an inline script, so only a plain GTM-style ID is let
// through; anything else (a typo in NEXT_PUBLIC_GTM_ID) renders no snippet.
const SAFE_ID = /^[\w-]+$/;

/**
 * Google's snippet, as given in GTM's install instructions, with the ID filled in —
 * run only when the page is on one of `gtmHosts` (see `lib/flags.ts`). The hosts
 * are plain hostnames (checked there), so JSON-encoding them is safe to inline.
 */
const headSnippet = (id: string) =>
  `if(${JSON.stringify(gtmHosts)}.indexOf(location.hostname)>-1)
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');`;

export function GoogleTagManagerHead() {
  if (!gtmContainerId || gtmLoad !== 'eager' || !SAFE_ID.test(gtmContainerId)) return null;
  return <script dangerouslySetInnerHTML={{ __html: headSnippet(gtmContainerId) }} />;
}

export function GoogleTagManagerBody() {
  if (!gtmContainerId || !SAFE_ID.test(gtmContainerId)) return null;

  const id = encodeURIComponent(gtmContainerId);

  return (
    <>
      {gtmLoad === 'deferred' && <GtmLoader id={gtmContainerId} deferred />}
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
