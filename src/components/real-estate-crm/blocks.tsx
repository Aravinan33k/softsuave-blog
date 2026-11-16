import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { SiteLink } from '@/themes/softsuave/site-link';
import { reAbout, reExpertise, rePortfolio, type Piece } from '@/lib/home/real-estate-crm-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './real-estate-crm.module.css';

/** A heading with the live page's coloured words picked out. */
function Title({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
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
      {pieces.map((p, i) => (typeof p === 'string' ? <span key={i}>{p}</span> : <strong key={i}>{p.b}</strong>))}
    </>
  );
}

/** "Custom Real Estate CRM Software Development Services": the two paragraphs beside their picture. */
export function About() {
  const a = reAbout;
  return (
    <section className={landing.sectionShell} id="about">
      <FadeUp>
        <SectionHead title={<Title text={a.title} accent={a.accent} />} intro={a.body} wide />
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

/** "Real Estate Software Development Expertise": eight round-plaque marks, each over its name. */
export function Expertise() {
  const e = reExpertise;
  return (
    <section className={landing.sectionShell} id="expertise">
      <FadeUp>
        <SectionHead title={<Title text={e.title} accent={e.accent} />} intro={e.body} wide />
      </FadeUp>
      <ul className={styles.grid}>
        {e.items.map((it) => (
          <li key={it.name} className={styles.tile}>
            <FadeUp className={styles.tileInner}>
              <span className={styles.plaque}>
                <Image src={it.src} alt={it.name} width={64} height={64} unoptimized />
              </span>
              <h3 className={styles.tileName}>{it.name}</h3>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Portfolio": the real estate CRM software, its text and its picture. */
export function Portfolio() {
  const p = rePortfolio;
  return (
    <section className={base.band} id="portfolio">
      <FadeUp>
        <SectionHead title={p.title} intro={p.body} />
      </FadeUp>
      <div className={`${base.split} ${base.splitFlip}`}>
        <FadeUp className={base.media}>
          <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
        <FadeUp className={base.prose}>
          <h3 className={styles.portfolioName}>{p.name}</h3>
          <p>{p.text}</p>
          <SiteLink href={p.cta.href} className={`${home.pill} ${home.pillFilled} ${styles.portfolioCta}`}>
            {p.cta.label}
          </SiteLink>
        </FadeUp>
      </div>
    </section>
  );
}
