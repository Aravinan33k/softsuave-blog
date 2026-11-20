import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import CardIconBadge from '@/components/common/card-icon-badge';
import { posAbout, posFeatures, posPortfolio, posServices, posSolutions, type Piece } from '@/lib/home/pos-content';
import landing from '@/components/landing/landing.module.css';
import home from '@/components/home/home.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './pos.module.css';

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

/** "Best Custom POS Software Development Company": the copy beside its picture. */
export function About() {
  const a = posAbout;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={a.title} intro={a.body} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {a.paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
      </div>
    </section>
  );
}

function Cards({ items, columns }: { items: readonly { readonly name: string; readonly body: string }[]; columns: 3 }) {
  return (
    <ul className={styles.cards} data-cols={columns}>
      {items.map((it) => (
        <li key={it.name} className={landing.proofItem}>
          <CardIconBadge title={it.name} body={it.body} size="sm" />
          <h3 className={landing.proofName}>{it.name}</h3>
          <p className={landing.proofBody}>{it.body}</p>
        </li>
      ))}
    </ul>
  );
}

/** "Soft Suave's Point Of Sale Development Services": the five services. */
export function Services() {
  const s = posServices;
  return (
    <section className={landing.sectionShell} id="services">
      <FadeUp>
        <SectionHead title={<Title text={s.title} accent={s.accent} />} intro={<Pieces pieces={s.body} />} />
      </FadeUp>
      <Cards items={s.items} columns={3} />
    </section>
  );
}

/** "Our Portfolio": the smart POS software and its picture. */
export function Portfolio() {
  const p = posPortfolio;
  return (
    <section className={base.band} id="portfolio">
      <FadeUp>
        <SectionHead title={p.title} intro={p.body} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          <h3 className={styles.portfolioName}>{p.name}</h3>
          <p>{p.text}</p>
          <a href={p.cta.href} className={`${home.pill} ${home.pillFilled} ${styles.portfolioCta}`}>
            {p.cta.label}
          </a>
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 900px) 80vw, 40vw" unoptimized />
        </FadeUp>
      </div>
    </section>
  );
}

/** "POS Solutions We Create": the five solutions. */
export function Solutions() {
  const s = posSolutions;
  return (
    <section className={landing.sectionShell} id="solutions">
      <FadeUp>
        <SectionHead title={s.title} intro={s.body} />
      </FadeUp>
      <Cards items={s.items} columns={3} />
    </section>
  );
}

/** "Robust Features of POS Software": the nine features, each with the site's icon. */
export function Features() {
  const f = posFeatures;
  return (
    <section className={landing.sectionShell} id="features">
      <FadeUp>
        <SectionHead title={<Title text={f.title} accent={f.accent} />} intro={<Pieces pieces={f.body} />} />
      </FadeUp>
      <ul className={styles.features}>
        {f.items.map((it) => (
          <li key={it} className={styles.feature}>
            <CardIconBadge title={it} size="sm" />
            <span className={styles.featureName}>{it}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
