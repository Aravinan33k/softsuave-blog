"use client";

import { useEffect } from "react";

/**
 * Every "Start 40 Hours Free Trial", "Learn More" and "Hire Now" on
 * /ad/remote-developers-page is a plain link to the hero form (`href`). The
 * page's smooth scroll carries the reader there; this then moves focus to the
 * form's first field, so a keyboard or screen-reader user lands in the form,
 * not just near it. `preventScroll` leaves the scroll position to the page.
 */
export default function TrialFocus({ href, fieldId }: { href: string; fieldId: string }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.(`a[href="${href}"]`);
      if (!a) return;
      const field = document.getElementById(fieldId);
      if (!field) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(() => field.focus({ preventScroll: true }), reduce ? 0 : 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [href, fieldId]);

  return null;
}
