"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Logo from "./logo";
import Flag from "./flag";
import { footer, brand } from "@/lib/home/content";
import { navHrefForPage } from "@/lib/home/nav-menu";
import { publicMediaUrl } from "@/lib/media-url";
import { SiteLink } from "@/themes/softsuave/site-link";
import { LinkedinIcon, InstagramIcon, YoutubeIcon, PhoneIcon, WhatsappIcon } from "@/themes/softsuave/icons";
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
 * But an anchor is only in-page ON the homepage. The Services column falls back
 * to `#services` for the services that have no page of their own, and off the
 * homepage no such section exists — those links used to resolve to nothing on
 * every other page of the surface (the nine industries routes included). So the
 * href goes through `navHrefForPage` first, exactly as the nav bar and the mega
 * panels do, which rewrites it to `/#services` anywhere but `/`. The plain-<a>
 * vs `SiteLink` choice is then made on the RESOLVED href, so a rewritten
 * anchor becomes a real route link rather than a dead same-page jump.
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
  // Same rule the nav uses: anchors stay in-page on the homepage and become
  // links back to it everywhere else.
  const onHome = usePathname() === "/";

  return (
    <footer className={styles.footer}>
      <div className={styles.footerGrid}>
        {/* Brand block order is load-bearing and was called out in review:
            lockup first, then the tagline, then the social marks. The email
            used to sit between the tagline and the marks, which split the
            brand's own three-part stack — it now follows them. */}
        <div className={styles.footerBrand}>
          <Logo tone="light" size={44} className={styles.footerLogo} />
          <p className={styles.footerTag}>{footer.tagline}</p>

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

          <a
            href={`mailto:${footer.contact.email}`}
            className={styles.footerEmail}
            data-cursor="Email"
          >
            {footer.contact.email}
          </a>
        </div>

        {footer.columns.map((col) => (
          <nav key={col.title} className={styles.footerCol} aria-label={col.title}>
            <div className={styles.footerColTitle}>{col.title}</div>
            {col.links.map((l) => {
              const href = navHrefForPage(l.href, onHome);
              // A still-in-page anchor must be a plain <a> for the Lenis scroll
              // handler; anything resolved to a route goes through SiteLink.
              return href.startsWith("#") ? (
                <a key={l.label} href={href}>
                  {l.label}
                </a>
              ) : (
                <SiteLink key={l.label} href={href}>
                  {l.label}
                </SiteLink>
              );
            })}
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
                <Flag code={p.country} className={styles.footerPhoneFlag} />
                <a href={p.href} data-cursor="Call">
                  {p.display}
                  {/* Bare on the row that ends in channel marks — "(Business
                      Enquiry)" followed by two icons reads as though the
                      brackets were meant to enclose them. The HR line below
                      has nothing after it and keeps its brackets. */}
                  {"note" in p && p.note ? (
                    <span className={styles.footerPhoneNote}>
                      {"whatsapp" in p && p.whatsapp ? ` ${p.note}` : ` (${p.note})`}
                    </span>
                  ) : null}
                </a>
                {/* Siblings of the tel: link, never nested inside it — an <a>
                    may not contain another, and the WhatsApp mark opens a
                    different destination from the one the number dials. The
                    handset is decorative (the whole number beside it is
                    already the call link, so a second one would just be two
                    tab stops onto the same action); the WhatsApp mark is a
                    real link and carries its own name. */}
                {"whatsapp" in p && p.whatsapp ? (
                  <span className={styles.footerPhoneChannels}>
                    <PhoneIcon className={styles.footerPhoneChannelIcon} />
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.footerPhoneChannelLink}
                      aria-label={`Message ${p.display} on WhatsApp`}
                      data-cursor="Chat"
                    >
                      <WhatsappIcon className={styles.footerPhoneChannelIcon} />
                    </a>
                  </span>
                ) : null}
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
