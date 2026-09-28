import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { BASE_PATH } from '@/lib/flags';
import { absoluteUrl, dynamicOgImage } from '@/lib/seo/metadata';
import { publicMediaUrl } from '@/lib/media-url';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationLd } from '@/lib/seo/organization';
import { awardsPage } from '@/lib/home/content';

import Nav from '@/components/home/nav';
import Footer from '@/components/home/footer';
import Contact from '@/components/home/contact';
import Breadcrumb from '@/components/common/breadcrumb';
import styles from '@/components/home/home.module.css';

/**
 * Awards and Recognition — the destination for the homepage band's "View All",
 * which used to send the reader off to softsuave.com.
 *
 * The wall is `awardsPage.items`: live's fifteen awards, in live's order, each
 * with live's title and one-line description. It uses the same `.recog*`
 * classes as the homepage band so a badge plaque looks identical in both
 * places. What it does NOT reuse is `.recogWallWrap`: that wrapper is the
 * homepage's collapse mechanism (`height: 0` until GSAP tweens it open), and
 * here the wall is the point of the page, so it is always open.
 *
 * Live closes on a "Schedule an Interview Now !" form; the closing `<Contact />`
 * band stands in for it, as on every other marketing page.
 *
 * A SERVER component: only a server component may export `metadata`, and the
 * (marketing) layout's metadata is the homepage's. Fonts, `.theme-four` tokens
 * and Lenis smooth scroll all come from that layout.
 */

// Matches the marketing cadence; nothing here is request-dependent.
export const revalidate = 300;

// Live's title and description (see `awardsPage` for the two typo fixes). No
// " | Soft Suave" suffix: the title already opens with the company name.
export const metadata: Metadata = {
  title: awardsPage.metaTitle,
  description: awardsPage.metaDescription,
  alternates: { canonical: '/awards-recognition' },
  openGraph: {
    title: awardsPage.metaTitle,
    description: awardsPage.metaDescription,
    url: absoluteUrl('/awards-recognition'),
    siteName: 'Soft Suave',
    type: 'website',
    images: [dynamicOgImage(awardsPage.title, 'Soft Suave')],
  },
  twitter: {
    card: 'summary_large_image',
    title: awardsPage.metaTitle,
    description: awardsPage.metaDescription,
    images: [dynamicOgImage(awardsPage.title, 'Soft Suave')],
  },
};

/** The nav logo is a plain <a>, which Next does NOT prefix with basePath, so it
 *  needs the already-public path; the links below go through next/link, which
 *  does. */
const HOME_HREF = BASE_PATH || '/';

const PAGE_URL = absoluteUrl('/awards-recognition');

/**
 * CollectionPage + ItemList for the award wall.
 *
 * Built from `awardsPage.items` — the same list the page renders — so the
 * structured data cannot drift from what a visitor sees. `organizationLd` is
 * referenced by `@id` for the publisher rather than repeated, the pattern the
 * service pages use.
 */
const awardsPageLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#webpage`,
  url: PAGE_URL,
  name: awardsPage.metaTitle,
  description: awardsPage.metaDescription,
  inLanguage: 'en',
  publisher: { '@id': organizationLd['@id'] },
  mainEntity: {
    '@type': 'ItemList',
    name: awardsPage.title,
    numberOfItems: awardsPage.items.length,
    itemListElement: awardsPage.items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'CreativeWork',
        name: item.title,
        description: item.description,
        ...(item.year ? { dateCreated: item.year } : {}),
        award: item.title,
        provider: { '@type': 'Organization', name: item.org },
      },
    })),
  },
} as const;

/*
 * Page-local layout for the wall. The shared `.recog*` rules in
 * home.module.css also serve the homepage band, so this page's differences
 * are stated here rather than there:
 *
 * - three columns, as live runs them (the shared wall's 240px minimum packs
 *   five, too narrow for a long title plus a sentence);
 * - each cell is a subgrid of three shared rows (badge / title / description),
 *   so in any visual row the titles top-align and every description starts on
 *   the same line however many lines its neighbour's title wraps to;
 * - the plaque runs square and larger, as in the homepage strip, since here it
 *   heads a wide card rather than sitting beside a short label.
 */
const wallStyle: CSSProperties = {
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
};

const cellStyle: CSSProperties = {
  display: 'grid',
  gridRow: 'span 3',
  gridTemplateRows: 'subgrid',
};

const cardStyle: CSSProperties = {
  display: 'grid',
  gridRow: '1 / -1',
  gridTemplateRows: 'subgrid',
  rowGap: 0,
  alignContent: 'start',
};

const badgeStyle: CSSProperties = {
  width: 'clamp(112px, 10vw, 148px)',
  height: 'clamp(112px, 10vw, 148px)',
  borderRadius: 16,
};

const badgeImgStyle: CSSProperties = {
  padding: 'clamp(10px, 1vw, 16px)',
};

const titleStyle: CSSProperties = {
  marginTop: 22,
};

const descStyle: CSSProperties = {
  margin: '12px 0 0',
  fontSize: 'clamp(0.875rem, 0.95vw, 0.95rem)',
  lineHeight: 1.6,
  color: 'var(--muted)',
};

export default function AwardsRecognitionPage() {
  return (
    <div className={styles.page}>
      <JsonLd data={[awardsPageLd]} />
      <Nav logoHref={HOME_HREF} />

      {/* The awards wall sits in the warm-white `.light` band: it re-points
          the surface tokens, so every `.recog*` rule below inverts with it.
          The nav, the closing band and the footer stay on the dark canvas,
          exactly as they do around the homepage's light bands. */}
      <main id="main">
        <div className={styles.light}>
          <section className={`${styles.section} ${styles.awardsPageSection}`} id="awards">
            <div className={styles.sectionHead}>
              {/* light-band variant, per the band's contract */}
              <Breadcrumb tone="band" />
              <h1 className={styles.h2}>{awardsPage.title}</h1>
              <p className={styles.lead}>{awardsPage.body}</p>
            </div>

            <ul className={styles.recogWall} style={wallStyle}>
              {awardsPage.items.map((item) => (
                <li key={item.key} className={styles.recogCell} style={cellStyle}>
                  <article className={styles.recogCard} style={cardStyle}>
                    <span className={styles.recogBadge} style={badgeStyle}>
                      {/* the title right below names the award and its
                          issuer, so the artwork adds nothing for a screen
                          reader */}
                      <Image
                        src={publicMediaUrl(item.src)}
                        alt=""
                        fill
                        sizes="148px"
                        className={styles.recogBadgeImg}
                        style={badgeImgStyle}
                      />
                    </span>
                    <h2 className={styles.recogTitle} style={titleStyle}>
                      {item.title}
                    </h2>
                    <p style={descStyle}>{item.description}</p>
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* The homepage's closing band, on its default /contact destination —
            the same close every other marketing page ends on. */}
        <Contact />
      </main>

      <Footer />
    </div>
  );
}
