import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import FadeUp from "@/components/home/fade-up";
import Flag from "@/components/home/flag";
import SectionHead from "@/components/landing/section-head";
import { contactAwards, offices } from "@/lib/home/contact-content";
import styles from "./contact.module.css";

/**
 * The static sections of /contact below the channel cards — offices and
 * awards, in the live page's order (the testimonials use the homepage's own
 * section). Server-rendered; only the
 * `FadeUp` / `SectionHead` motion wrappers hydrate.
 */

export function ContactOffices() {
  return (
    <section className={styles.officesBand} aria-label="Our offices">
      {/* The live page's world map (public/images/contact/world-map.webp),
          used as a mask so the continents take the brand gradient. */}
      <span className={styles.worldMap} aria-hidden />
      <div className={styles.offices}>
        {offices.map((o, i) => (
          <FadeUp key={o.place} delay={i * 0.06}>
            <address className={styles.office}>
              <span className={styles.officeHead}>
                <Flag code={o.flag} className={styles.officeFlag} />
                <span className={styles.officePlace}>{o.place}</span>
              </span>
              <span className={styles.officeCompany}>{o.company}</span>
              {o.lines.map((l) => (
                <span key={l} className={styles.officeLine}>
                  {l}
                </span>
              ))}
              <a className={styles.officePhone} href={o.phone.href}>
                <svg
                  viewBox="0 0 24 24"
                  width="15"
                  height="15"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.58 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
                </svg>
                {o.phone.label}
              </a>
            </address>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

export function ContactAwards() {
  const a = contactAwards;
  return (
    <section className={styles.sectionShell} id="awards">
      <SectionHead kicker={a.eyebrow} title={a.title} intro={a.body} />
      <FadeUp>
        <ul className={styles.awardGrid}>
          {a.items.map((item) => (
            <li key={item.key} className={styles.award}>
              <span className={styles.awardArt}>
                {/* SVG art: served as-is, the optimizer does not rasterise SVG. */}
                <Image
                  src={publicMediaUrl(item.src)}
                  alt={item.title}
                  width={160}
                  height={92}
                  unoptimized
                />
              </span>
              <span className={styles.awardTitle}>{item.title}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
