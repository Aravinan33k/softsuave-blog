"use client";

import Image from "next/image";
import Logo from "./logo";
import { footer, brand } from "@/lib/home/content";
import { publicMediaUrl } from "@/lib/media-url";
import { SiteLink } from "@/themes/softsuave/site-link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon } from "@/themes/softsuave/icons";
import styles from "./home.module.css";

/**
 * Site footer: the brand block, the sitemap columns, then a proof/contact band
 * carrying the ISO certification, the social marks and the offices.
 *
 * Two link kinds live side by side here, and the distinction is load-bearing:
 * an in-page `#anchor` must stay a plain <a> so ScrollProvider's Lenis handler
 * intercepts it, while a site path goes through `SiteLink`, which decides
 * between <Link> and a plain anchor depending on whether this app serves that
 * route yet (see `navHref` in themes/softsuave/nav-data).
 *
 * Social icons come from the blog theme's icon set rather than new artwork —
 * one set of brand marks for the whole app, and inline SVG keeps them inside
 * the CSP (no external icon CDN).
 */

const SOCIAL_ICONS = {
  LinkedIn: LinkedinIcon,
  Instagram: InstagramIcon,
  YouTube: YoutubeIcon,
} as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Logo tone="light" size={28} />
          <p className={styles.footerTag}>{footer.tagline}</p>
          <a
            href={`mailto:${footer.contact.email}`}
            className={styles.footerEmail}
            data-cursor="Email"
          >
            {footer.contact.email}
          </a>

          <ul className={styles.footerSocial}>
            {footer.social.map((s) => {
              const Icon = SOCIAL_ICONS[s.name as keyof typeof SOCIAL_ICONS];
              return (
                <li key={s.name}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    data-cursor="Follow"
                  >
                    <Icon className={styles.footerSocialIcon} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} className={styles.footerCol} aria-label={col.title}>
            <div className={styles.footerColTitle}>{col.title}</div>
            {col.links.map((l) =>
              // In-page anchors must be plain <a> for the Lenis scroll handler.
              l.href.startsWith("#") ? (
                <a key={l.label} href={l.href}>
                  {l.label}
                </a>
              ) : (
                <SiteLink key={l.label} href={l.href}>
                  {l.label}
                </SiteLink>
              ),
            )}
          </nav>
        ))}
      </div>

      <div className={styles.footerMeta}>
        <div className={styles.footerCert}>
          <div className={styles.footerColTitle}>Certification</div>
          <span className={styles.footerCertBadge}>
            <Image
              src={publicMediaUrl(footer.certification.src)}
              alt={`${footer.certification.name} certified`}
              width={footer.certification.width}
              height={footer.certification.height}
              sizes="180px"
              className={styles.footerCertImg}
            />
          </span>
        </div>

        <div className={styles.footerOffices}>
          <div className={styles.footerColTitle}>Offices</div>
          <div className={styles.footerOfficeList}>
            {footer.offices.map((o) => (
              <address key={o.region} className={styles.footerOffice}>
                <span className={styles.footerOfficeRegion}>{o.region}</span>
                <span className={styles.footerOfficeName}>{o.company}</span>
                {o.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
            ))}
          </div>
        </div>

        <div className={styles.footerPhones}>
          <div className={styles.footerColTitle}>Talk to us</div>
          <ul className={styles.footerPhoneList}>
            {footer.contact.phones.map((p) => (
              <li key={p.href}>
                <span className={styles.footerPhoneRegion}>{p.region}</span>
                <a href={p.href} data-cursor="Call">
                  {p.display}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <span>
          © {year} {brand.name} — {brand.tagline}
        </span>
        <span className={styles.footerLegal}>
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
