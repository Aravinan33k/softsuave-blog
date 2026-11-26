"use client";

import { useEffect } from "react";
import { pushDataLayer } from "@/lib/analytics/datalayer";

/**
 * Counts clicks on the page's meeting CTAs — every in-page link to one of
 * `targets` — as `coffee_cta_click`, with where on the page it sat and its
 * label. One delegated listener, so the shared components that draw these
 * buttons (the hero, the card grid's CTA) need no change. A click is a click:
 * the lead is only counted when the form is accepted
 * (`meeting_request_submitted`, `coffee-form.tsx`).
 */
export default function CtaTracker({ targets }: { targets: readonly string[] }) {
  useEffect(() => {
    const selector = targets.map((t) => `a[href="${t}"]`).join(",");
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.(selector);
      if (!a) return;
      // In the hero section (`#top`) the masthead button links to the card and
      // the hero's own (phone/tablet) button to its wrapper — so the href
      // tells the two apart.
      const section = a.closest("section[id]")?.id ?? "page";
      const location = section === "top" ? (a.getAttribute("href") === targets[0] ? "header" : "hero") : section;
      pushDataLayer("coffee_cta_click", {
        cta_location: location,
        cta_text: (a.textContent ?? "").replace(/\s+/g, " ").replace("→", "").trim(),
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [targets]);

  return null;
}
