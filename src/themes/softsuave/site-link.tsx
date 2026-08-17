import Link from 'next/link';
import { isExternalHref, navHref } from './nav-data';

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
  const resolved = navHref(href);
  return isExternalHref(href) ? (
    <a href={resolved} {...rest}>
      {children}
    </a>
  ) : (
    <Link href={resolved} {...rest}>
      {children}
    </Link>
  );
}
