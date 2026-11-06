"use client";

import { useEffect } from "react";

/** Interactions that load the container at once — any sign of a person. */
const TRIGGERS = ["pointerdown", "keydown", "touchstart", "scroll", "wheel", "mousemove"] as const;

/** With no interaction, how long after `load` the container still comes in. */
const FALLBACK_MS = 5000;

declare global {
  interface Window {
    dataLayer?: unknown[];
    __gtmLoaded?: boolean;
  }
}

/**
 * Loads the GTM container once — see `gtmLoad` in `lib/flags.ts` for when and
 * why. What it injects is the stock snippet: the `gtm.start` push, then
 * `gtm.js` async. Client-side navigations keep the one container, as they did
 * with the snippet in the root layout.
 */
export default function GtmLoader({ id, deferred }: { id: string; deferred: boolean }) {
  useEffect(() => {
    if (window.__gtmLoaded) return;

    let timer: number | undefined;
    const load = () => {
      if (window.__gtmLoaded) return;
      window.__gtmLoaded = true;
      cleanup();
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(s);
    };
    const startFallback = () => {
      timer = window.setTimeout(load, FALLBACK_MS);
    };
    function cleanup() {
      for (const t of TRIGGERS) window.removeEventListener(t, load);
      window.removeEventListener("load", startFallback);
      window.clearTimeout(timer);
    }

    if (!deferred) {
      load();
      return;
    }
    for (const t of TRIGGERS) window.addEventListener(t, load, { once: true, passive: true });
    if (document.readyState === "complete") startFallback();
    else window.addEventListener("load", startFallback, { once: true });
    return cleanup;
  }, [id, deferred]);

  return null;
}
