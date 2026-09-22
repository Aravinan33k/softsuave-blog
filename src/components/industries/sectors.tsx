"use client";

import BrandImage from "@/components/home/brand-image";
import FadeUp from "@/components/home/fade-up";
import { SiteLink } from "@/themes/softsuave/site-link";
import { sectors } from "@/lib/home/industries-content";
import CardIconBadge from "@/components/common/card-icon-badge";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * The sector bento — the page's centrepiece.
 *
 * Twelve-column grid of unequal cards (5/4/3, then three quarters, then a wide
 * pair), so it reads as a composition rather than a row of equal tiles. Two of
 * the eight have no generated photograph and take the flat treatment; the grid
 * puts them together in the final wide row, where the difference in treatment
 * reads as intentional rhythm.
 *
 * Each card's copy — name, tagline, description, three named solutions — is
 * always visible: hover only lifts the card and drifts the photograph, so
 * nothing here is discoverable by pointer alone. `.sectorGo::after` stretches
 * the link's hit area over the whole card while leaving exactly one focusable
 * element with one accessible name per sector.
 *
 * `SiteLink` resolves each sector's destination. Every one of the eight is now
 * a page of ours at softsuave.com's own slug, so these render as `next/link`
 * routes — no edit needed here when they landed, because listing the slugs in
 * MARKETING_PATHS is what flipped them from absolute links out to local ones.
 */
export default function Sectors() {
  return (
    <section className={styles.shell} id="sectors">
      <SectionHead
        kicker={sectors.eyebrow}
        title={sectors.title}
        intro={sectors.body}
        tone="dark"
      />

      <FadeUp>
        <div className={styles.sectorGrid}>
          {sectors.items.map((sector) => (
            <article
              key={sector.key}
              // Deep-link target for the nav's Industries panel, which sends
              // each sector item to `/industries#sector-<key>`.
              id={`sector-${sector.key}`}
              className={`${styles.sectorCard} ${
                sector.img ? styles.sectorMediaCard : styles.sectorFlat
              }`}
            >
              {sector.img ? (
                <>
                  <div className={styles.sectorMedia}>
                    <BrandImage
                      page="four"
                      id={sector.img}
                      alt={`${sector.name} — ${sector.tagline}`}
                      fill
                      sizes="(min-width: 1000px) 34vw, (min-width: 700px) 48vw, 92vw"
                    />
                  </div>
                  <div className={styles.sectorScrim} aria-hidden />
                </>
              ) : null}

              {/* An icon picked from the sector's own words, not a "01"
                  ordinal: the Sep corrections review asked for icons in place
                  of numbers. */}
              <CardIconBadge
                title={sector.name}
                body={sector.tagline}
                size="sm"
                className={styles.sectorIndex}
              />

              <div className={styles.sectorBody}>
                <h3 className={styles.sectorName}>{sector.name}</h3>
                <span className={styles.sectorTagline}>{sector.tagline}</span>
                <p className={styles.sectorText}>{sector.body}</p>

                <ul className={styles.sectorChips}>
                  {sector.solutions.map((solution) => (
                    <li key={solution} className={styles.sectorChip}>
                      {solution}
                    </li>
                  ))}
                </ul>

                <SiteLink href={sector.href} className={styles.sectorGo} data-cursor="Explore">
                  Explore {sector.name}
                  <span className={styles.sectorArrow} aria-hidden>
                    &#8594;
                  </span>
                </SiteLink>
              </div>
            </article>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
