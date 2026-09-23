"use client";

import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { SiteLink } from "@/themes/softsuave/site-link";
import { serviceHref } from "@/lib/home/service-href";
import styles from "./service-link.module.css";

/**
 * Resolver for a service card's link on the current page: the card's own
 * `href` if the content set one, else the route derived from its name — and
 * never the page the reader is already on. See `lib/home/service-href.ts`.
 */
export function useServiceHref(): (name: string, explicit?: string) => string | undefined {
  const pathname = usePathname();
  return useCallback(
    (name: string, explicit?: string) => serviceHref(name, pathname, explicit),
    [pathname],
  );
}

/**
 * The small "Learn more →" under a service card's copy.
 *
 * A separate affordance rather than an anchor around the whole card: several
 * of the cards it sits in are carousel slides or tabs that already respond to
 * clicks, and nesting a link inside those would steal their interaction. The
 * accessible name carries the service, because a grid of identical "Learn
 * more" links tells a screen reader nothing about where each one goes.
 *
 * `SiteLink`, not a bare `next/link`: marketing paths are release-gated, and
 * `navHref` sends a not-yet-served one to the live site rather than a 404.
 */
export default function ServiceLink({
  href,
  label,
  className,
  tabIndex,
}: Readonly<{
  href: string;
  /** The service's name, appended visually hidden to the link text. */
  label: string;
  className?: string;
  /** For a slide that is off screen and must stay out of the tab order. */
  tabIndex?: number;
}>) {
  return (
    <SiteLink
      href={href}
      className={className ? `${styles.link} ${className}` : styles.link}
      tabIndex={tabIndex}
      onClick={(e) => e.stopPropagation()}
    >
      Learn more
      <span className={styles.srOnly}> about {label}</span>
      <svg viewBox="0 0 24 24" className={styles.arrow} aria-hidden focusable="false">
        <path
          d="M5 12h14M13 6l6 6-6 6"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </SiteLink>
  );
}
