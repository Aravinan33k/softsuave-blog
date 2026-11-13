import Image from 'next/image';
import { SiteLink } from '@/themes/softsuave/site-link';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/generative-ai/section-head';
import Industries from '@/components/landing/industries';
import CtaBand from '@/components/landing/cta-band';
import home from '@/components/home/home.module.css';
import {
  pmCustomers,
  pmFeatures,
  pmIntro,
  pmPortfolio,
  pmTry,
} from '@/lib/home/construction-pm-content';
import type { Piece } from '@/lib/home/construction-time-tracking-content';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './construction-pm.module.css';

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

/** The site's section head: the title on the left, a divider rule, the standfirst on the right. */
function Head({ title, accent, body }: { title: string; accent?: string; body?: React.ReactNode }) {
  return (
    <FadeUp>
      <SectionHead title={accent ? <Title text={title} accent={accent} /> : title} intro={body} />
    </FadeUp>
  );
}

/** "Construction Project Management Software": two paragraphs beside their picture. */
export function Intro() {
  const t = pmIntro;
  return (
    <section className={base.band} id="overview">
      <Head title={t.title} accent={t.accent} body={t.body} />
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {t.paragraphs.map((p, i) => (
            <p key={i}>
              <Pieces pieces={p} />
            </p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={t.image.src} alt={t.image.alt} width={t.image.width} height={t.image.height} sizes="(max-width: 900px) 100vw, 40vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** The ten features, in the site's card grid (accent rule on top, the card's mark, name and description). */
export function Features() {
  const f = pmFeatures;
  return (
    <div id="features">
      <Industries
        id="pm-features"
        columns={3}
        content={{
          eyebrow: '',
          title: f.title,
          titleNode: <Title text={f.title} accent={f.accent} />,
          body: '',
          bodyNode: <Pieces pieces={f.body} />,
          items: f.items.map((it) => ({
            name: it.name,
            body: it.body,
            link: false as const,
            image: { src: it.icon, width: 80, height: 80, alt: it.alt },
          })),
        }}
      />
    </div>
  );
}

/** "Our Valuable Customers". */
export function Customers() {
  const c = pmCustomers;
  return (
    <section className={`${base.band} ${base.bandTight}`} id="customers">
      <Head title={c.title} body={c.body} />
      <ul className={styles.customers}>
        {c.items.map((it) => (
          <li key={it.name} className={styles.customer}>
            <Image src={it.icon} alt={it.alt} width={50} height={50} className={styles.customerIcon} />
            <h3 className={styles.customerName}>{it.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** "Try Our Project Management Software…": the site's call-to-action band, its button opening the quote form. */
export function TryBand() {
  const t = pmTry;
  return <CtaBand content={{ title: t.title, body: <Pieces pieces={t.body} />, cta: t.cta }} />;
}

/** "Portfolio": the one piece, its picture on the left. */
export function Portfolio() {
  const p = pmPortfolio;
  return (
    <section className={base.band} id="portfolio">
      <Head title={p.title} body={p.body} />
      <div className={`${base.split} ${styles.portfolioSplit}`}>
        <FadeUp className={base.media}>
          <Image src={p.image.src} alt={p.image.alt} width={p.image.width} height={p.image.height} sizes="(max-width: 900px) 90vw, 40vw" />
        </FadeUp>
        <FadeUp className={base.prose}>
          <h3 className={base.h3}>
            <Title text={p.heading} accent={p.accent} />
          </h3>
          <p>{p.text}</p>
          <a href={p.cta.href} className={`${home.pill} ${home.pillFilled} ${home.navCta}`}>
            {p.cta.label}
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
