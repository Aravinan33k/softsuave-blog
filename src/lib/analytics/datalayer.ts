/**
 * Pushes one event onto GTM's `dataLayer`, which the container (loaded once
 * from the root layout, `components/analytics/google-tag-manager.tsx`) turns
 * into GA4 / ad conversions. Nothing loads here: if GTM is off, the push just
 * queues and is never read.
 *
 * Callers pass only non-personal values (where a click came from, which form
 * was sent). Never a name, email, phone or message.
 */
export function pushDataLayer(event: string, params: Record<string, string> = {}): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}
