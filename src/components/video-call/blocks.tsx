import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CardIconBadge from '@/components/common/card-icon-badge';
import { SiteLink } from '@/themes/softsuave/site-link';
import { vcAbout, vcFeatures, vcPortfolio, type Piece } from '@/lib/home/video-call-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './video-call.module.css';

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

const plain = (pieces: readonly Piece[]) => pieces.map((p) => (typeof p === 'string' ? p : p.b)).join('');

/** "Best Custom Video Call App Development Company": the copy beside its picture. */
export function About() {
  const a = vcAbout;
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

/** "Ground-breaking Features of Custom Video Call Application": eight cards, an icon over a name and a line. */
export function Features() {
  const f = vcFeatures;
  return (
    <section className={landing.sectionShell} id="features">
      <FadeUp>
        <SectionHead title={<Title text={f.title} accent={f.accent} />} intro={f.body} wide />
      </FadeUp>
      <ul className={styles.cards}>
        {f.items.map((it) => (
          <li key={it.name} className={landing.proofItem}>
            <FadeUp className={styles.card}>
              <CardIconBadge title={it.name} body={plain(it.body)} />
              <h3 className={styles.cardName}>{it.name}</h3>
              <p className={styles.cardBody}>
                <Pieces pieces={it.body} />
              </p>
            </FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Portfolio": two entries, each a kicker over its name, its text, its case-study link and its picture. */
export function Portfolio() {
  const p = vcPortfolio;
  return (
    <section className={landing.sectionShell} id="portfolio">
      <FadeUp>
        <SectionHead title={p.title} intro={p.body} />
      </FadeUp>
      <div className={styles.projects}>
        {p.items.map((it, i) => {
          const media = (
            <FadeUp key="media" className={`${base.media}${i % 2 ? ` ${styles.mediaFirstOnPhone}` : ''}`}>
              <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
            </FadeUp>
          );
          const text = (
            <FadeUp key="text" className={base.prose}>
              <span className={landing.kicker}>{it.kicker}</span>
              <h3 className={styles.projectName}>{it.name}</h3>
              <p>{it.text}</p>
              <SiteLink href={it.cta.href} className={`${home.pill} ${home.pillFilled} ${styles.projectCta}`}>
                {it.cta.label}
              </SiteLink>
            </FadeUp>
          );
          // As on the live page: the first entry runs picture then text, the second text then picture.
          return i % 2 ? (
            <div key={it.name} className={`${base.split} ${base.splitFlip}`}>
              {text}
              {media}
            </div>
          ) : (
            <div key={it.name} className={base.split}>
              {media}
              {text}
            </div>
          );
        })}
      </div>
    </section>
  );
}
