import { brand, footer } from "@/lib/home/content";
import { SiteLink } from "@/themes/softsuave/site-link";
import home from "@/components/home/home.module.css";
import styles from "./ad.module.css";

/**
 * The closing legal line for an /ad page: the site footer's bottom strip on
 * its own — "© {year} Soft Suave — A KiwiTech Affiliate Company" with the
 * Privacy Policy and Terms & Conditions links — without the rest of the
 * footer, since the ad pages carry no navigation.
 *
 * Same data (`brand`, `footer.legal` in `lib/home/content.ts`) and the same
 * classes as `components/home/footer.tsx`, so the two read identically and a
 * change to the legal links reaches both. Terms & Conditions stays a plain
 * label there because softsuave.com has no terms page.
 *
 * A server component; the year is the render's year (pages revalidate).
 */
export default function AdLegalFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.adLegal}>
      <div className={home.footerBottom}>
        <span>
          © {year} {brand.name} — {brand.tagline}
        </span>
        <span className={home.footerLegal}>
          {footer.legal.map((l, i) => (
            <span key={l.label}>
              {i > 0 ? <span aria-hidden> · </span> : null}
              {l.href ? <SiteLink href={l.href}>{l.label}</SiteLink> : l.label}
            </span>
          ))}
        </span>
      </div>
    </footer>
  );
}
