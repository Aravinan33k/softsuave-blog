import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CaseStudyToc from '@/components/case-study/case-study-toc';
import { SiteLink } from '@/themes/softsuave/site-link';
import {
  mvAbout,
  mvFeatures,
  mvHighlights,
  mvPanels,
  mvPlatform,
  mvTech,
  mvWhy,
  type Piece,
} from '@/lib/home/multi-vendor-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import article from '@/components/case-study/case-study.module.css';
import PhoneSlider from './phone-slider';
import styles from './multi-vendor.module.css';

/** A heading with the live page's coloured words picked out. */
function Title({ text, accent }: { text: string; accent: string }) {
  const i = accent ? text.indexOf(accent) : -1;
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className={base.accent}>{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

function Pieces({ pieces }: { pieces: readonly Piece[] }) {
  return (
    <>
      {pieces.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : 'b' in p ? (
          <strong key={i}>{p.b}</strong>
        ) : (
          <SiteLink key={i} href={p.href}>
            {p.text}
          </SiteLink>
        ),
      )}
    </>
  );
}

/** "Multi Vendor eCommerce Marketplace Development": the copy beside its picture. */
export function About() {
  const a = mvAbout;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead wide title={<Title text={a.title} accent={a.accent} />} intro={a.body} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {a.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
      </div>
    </section>
  );
}

/** "eCommerce - Multi Vendor Marketplace Application": the three platform cards. */
export function Platform() {
  const p = mvPlatform;
  return (
    <section className={landing.sectionShell} id="platform">
      <FadeUp>
        <SectionHead title={<Title text={p.title} accent={p.accent} />} intro={p.body} />
      </FadeUp>
      <ul className={`${styles.cards} ${styles.cards3}`}>
        {p.items.map((it) => (
          <li key={it.name} className={landing.proofItem}>
            <span className={styles.cardIcon}>
              <Image src={it.icon} alt={it.alt} width={56} height={56} unoptimized />
            </span>
            <h3 className={landing.proofName}>{it.name}</h3>
            <p className={landing.proofBody}>
              <Pieces pieces={it.body} />
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The four panels beside the case-study pages' contents column — one link per panel, the current one in the accent
 * colour as the page scrolls, then "Contact Us" and "Get Free Demo".
 */
export function Panels() {
  const s = mvPanels;
  return (
    <section className={`${landing.sectionShell} ${article.layout}`} id="panels">
      <CaseStudyToc
        activeLine={0.22}
        items={s.items.map((it) => ({ id: it.id, label: it.nav }))}
        action={
          <div className={styles.tocActions}>
            {s.actions.map((a, i) =>
              a.href.startsWith('#') ? (
                <a key={a.label} href={a.href} className={`${home.pill}${i === 0 ? ` ${home.pillFilled}` : ''}`}>
                  {a.label}
                </a>
              ) : (
                <SiteLink key={a.label} href={a.href} className={`${home.pill}${i === 0 ? ` ${home.pillFilled}` : ''}`}>
                  {a.label}
                </SiteLink>
              ),
            )}
          </div>
        }
      />
      <div className={article.article}>
        {s.items.map((it, n) => (
          <FadeUp key={it.id} className={styles.panel}>
            <section id={it.id} className={article.section} aria-labelledby={`${it.id}-title`}>
              <h2 id={`${it.id}-title`} className={`${landing.title} ${article.sectionTitle}`}>
                <Title text={it.title} accent={it.accent} />
              </h2>
              <p className={article.para}>{it.body}</p>
              <div className={`${styles.panelGrid}${n % 2 === 1 ? ` ${styles.panelFlip}` : ''}`}>
                <div className={styles.panelPoints}>
                  {it.points.map((pt) => (
                    <div key={pt.name}>
                      <h3 className={styles.pointTitle}>{pt.name}</h3>
                      <p className={article.para}>
                        <Pieces pieces={pt.body} />
                      </p>
                    </div>
                  ))}
                </div>
                <div className={styles.panelMedia}>
                  <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 80vw, 30vw" unoptimized />
                </div>
              </div>
            </section>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

/** "Other Features of Multi-vendor Marketplace App": the six screens in the phone. */
export function Features() {
  const f = mvFeatures;
  return (
    <section className={landing.sectionShell} id="features">
      <FadeUp>
        <SectionHead title={<Title text={f.title} accent={f.accent} />} intro={f.body} />
      </FadeUp>
      <FadeUp>
        <PhoneSlider phone={f.phone} screens={f.screens} />
      </FadeUp>
    </section>
  );
}

/** "Why Choose Us For Your Online Business?": the seven reasons, each its picture and name. */
export function Why() {
  const w = mvWhy;
  return (
    <section className={landing.sectionShell} id="why">
      <FadeUp>
        <SectionHead title={<Title text={w.title} accent={w.accent} />} intro={w.body} />
      </FadeUp>
      <ul className={`${styles.cards} ${styles.cards4}`}>
        {w.items.map((it) => (
          <li key={it.name} className={landing.proofItem}>
            <span className={styles.cardIcon}>
              <Image src={it.icon} alt={it.alt} width={50} height={50} unoptimized />
            </span>
            <h3 className={landing.proofName}>{it.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Robust Technologies We Use": the six marks. */
export function Tech() {
  const t = mvTech;
  return (
    <section className={landing.sectionShell} id="technologies">
      <FadeUp>
        <SectionHead title={t.title} intro={t.body} />
      </FadeUp>
      <ul className={styles.logos}>
        {t.logos.map((l) => (
          <li key={l.src} className={styles.logo}>
            <Image src={l.src} alt={l.alt} width={l.width} height={l.height} unoptimized />
          </li>
        ))}
      </ul>
    </section>
  );
}

/** The five highlights above the closing form. */
export function Highlights() {
  return (
    <section className={landing.sectionShell} id="highlights">
      <ul className={`${styles.cards} ${styles.cards5}`}>
        {mvHighlights.map((it) => (
          <li key={it.name} className={landing.proofItem}>
            <span className={styles.cardIcon}>
              <Image src={it.icon} alt={it.alt} width={85} height={85} unoptimized />
            </span>
            <h3 className={landing.proofName}>{it.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}
