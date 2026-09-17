import Script from 'next/script';
import { gtmContainerId } from '@/lib/flags';

/**
 * Google Tag Manager, the way softsuave.com loads it — the container is the
 * only tag on the live site, and Analytics (and anything else) is configured
 * inside it rather than pasted into the page. So there is one snippet here, not
 * one per tool.
 *
 * Renders NOTHING when `NEXT_PUBLIC_GTM_ID` is unset, which is the default. See
 * `lib/flags.ts`: the same constant gates the CSP in `next.config.ts`, so an
 * unconfigured deployment ships no third-party script and no origin allowing
 * one.
 *
 * `afterInteractive` rather than `beforeInteractive`: the container is not
 * needed to render the page, and loading it ahead of hydration would put a
 * third-party request in front of the first paint on every route. The
 * `dataLayer` bootstrap runs inline first, so tags pushed by the page are
 * queued whether or not the container has arrived.
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
      <Script id="gtm-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}
      </Script>
      <Script
        id="gtm-loader"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtm.js?id=${id}`}
      />
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
