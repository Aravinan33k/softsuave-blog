"use client";

import Logo from "./logo";
import { footer, brand } from "@/lib/home/content";
import Marquee from "./marquee";
import styles from "./home.module.css";

/**
 * Large-type footer: a giant serif marquee, the sitemap columns, a decorative
 * (non-autoplaying, silent) sound toggle, and the legal row.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerMarquee}>
        <Marquee speed={16} velocity>
          {["Let's build", "Book AI Strategy Call", "From idea to outcome", brand.name].map((t) => (
            <span key={t} className={styles.footerBig}>
              {t}
            </span>
          ))}
        </Marquee>
      </div>

      <div className={styles.footerGrid}>
        <div className={styles.footerBrand}>
          <Logo tone="light" size={28} />
          <p className={styles.footerTag}>{footer.tagline}</p>
          <a href={`mailto:${brand.email}`} className={styles.footerEmail} data-cursor="Email">
            {brand.email}
          </a>
        </div>

        {footer.columns.map((col) => (
          <div key={col.title} className={styles.footerCol}>
            <div className={styles.footerColTitle}>{col.title}</div>
            {col.links.map((l) => (
              <a key={l} href="#contact">
                {l}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.footerBottom}>
        <span>
          © {year} {brand.name} — {brand.tagline}
        </span>
        <span>{footer.legal.join(" · ")}</span>
      </div>
    </footer>
  );
}
