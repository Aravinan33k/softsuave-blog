'use client';

import type { CSSProperties } from 'react';
import Image from 'next/image';
import { publicMediaUrl } from '@/lib/media-url';
import { awardsPage } from '@/lib/home/content';
import Contact from '@/components/home/contact';
import { HIRE_CLOSING_BAND } from '@/lib/home/hire-blocks';
import Breadcrumb from '@/components/common/breadcrumb';
import styles from '@/components/home/home.module.css';

const descStyle: CSSProperties = {
  margin: '12px 0 0',
  fontSize: 'clamp(0.875rem, 0.95vw, 0.95rem)',
  lineHeight: 1.6,
  color: 'var(--muted)',
};

const titleStyle: CSSProperties = {
  marginTop: 22,
};

const badgeImgStyle: CSSProperties = {
  padding: 'clamp(10px, 1vw, 16px)',
};

const badgeStyle: CSSProperties = {
  width: 'clamp(112px, 10vw, 148px)',
  height: 'clamp(112px, 10vw, 148px)',
  borderRadius: 16,
};

const cardStyle: CSSProperties = {
  display: 'grid',
  gridRow: '1 / -1',
  gridTemplateRows: 'subgrid',
  rowGap: 0,
  alignContent: 'start',
};

const cellStyle: CSSProperties = {
  display: 'grid',
  gridRow: 'span 3',
  gridTemplateRows: 'subgrid',
};

const wallStyle: CSSProperties = {
  gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
};

/**
 * The page's sections, rendered from one client boundary that imports its own copy.
 *
 * Handed to these client components as props by the route, the copy was serialized into
 * the RSC payload as well as rendered, so every paragraph was in the document twice.
 * Importing it here sends the payload a bare client reference instead.
 */
export default function Sections() {
  return (
    <>
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

      {/* The hire pages' "Book Free Consultation" close, on its default
          /contact destination (13 Oct review: one final CTA for every page
          but the homepage, the AI service pages and the industry pages). */}
      <Contact content={HIRE_CLOSING_BAND} eyebrow="" />
    </>
  );
}
