import Link from 'next/link';
import { isExternalHref, navHref, navRoute } from './nav-data';

/**
 * A link to a Soft Suave path that may or may not be served by this app.
 *
 * Which is which moves with the release schedule — `/` is ours once the
 * marketing homepage ships and the live site's until then — so the choice
 * between `next/link` (prefetch, client navigation) and a plain anchor can't be
 * hard-coded at the call site. `navHref` decides; this picks the element to match.
 */
export function SiteLink({
  href,
  children,
  ...rest
}: Omit<React.ComponentProps<'a'>, 'href'> & { href: string }) {
  // The two branches take different forms of the same destination: an anchor gets
  // the public url, <Link> the app-internal route. They coincide while the app is
  // served from the domain root, and diverge under a subpath mount — see
  // `navRoute`, which is where that difference is kept.
  return isExternalHref(href) ? (
    <a href={navHref(href)} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={navRoute(href)} {...rest}>
      {children}
    </Link>
  );
}
