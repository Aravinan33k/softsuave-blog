import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import Industries from '@/components/landing/industries';
import CardIconBadge from '@/components/common/card-icon-badge';
import { SiteLink } from '@/themes/softsuave/site-link';
import { publicMediaUrl } from '@/lib/media-url';
import { lcAbout, lcBenefits, lcBest, lcPlatforms, type Piece } from '@/lib/home/low-code-content';
import landing from '@/components/landing/landing.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './low-code.module.css';

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

/** "A Trustworthy Low Code App Development Agencies in india": the copy beside its picture. */
export function About() {
  const a = lcAbout;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={a.title} intro={a.body} />
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

/** "Low Code Development Platforms": the six platform marks, each with its name. */
export function Platforms() {
  const p = lcPlatforms;
  return (
    <section className={landing.sectionShell} id="platforms">
      <FadeUp>
        <SectionHead title={<Title text={p.title} accent={p.accent} />} intro={<Pieces pieces={p.body} />} />
      </FadeUp>
      <FadeUp>
        <ul className={styles.platforms}>
          {p.items.map((it) => (
            <li key={it.name} className={styles.platform}>
              <span className={styles.platformLogo}>
                <Image src={publicMediaUrl(it.src)} alt="" width={120} height={80} unoptimized className={styles.platformMark} />
              </span>
              <span className={styles.platformName}>{it.name}</span>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}

/** The nine benefits: a mark, a name and a paragraph each. */
export function Benefits() {
  const b = lcBenefits;
  return (
    <Industries
      id="benefits"
      columns={3}
      content={{
        eyebrow: '',
        title: b.title,
        titleNode: <Title text={b.title} accent={b.accent} />,
        body: b.body,
        items: b.items.map((it) => ({
          name: it.name,
          body: it.body,
          link: false as const,
          image: { src: it.src, width: 60, height: 60, alt: '', badge: true },
        })),
      }}
    />
  );
}

/** "Why Are Our Low Code App Developers Considered the Best?": live's picture beside the six reasons. */
export function Best() {
  return (
    <section className={landing.sectionShell} id="best">
      <FadeUp>
        <SectionHead title={lcBest.title} intro={lcBest.body} />
      </FadeUp>
      <div className={styles.best}>
        <FadeUp className={styles.bestMedia}>
          <Image src="/images/low-code/why.webp" alt="Why You Choose Soft Suave?" width={424} height={520} sizes="(max-width: 1000px) 0px, 30vw" unoptimized />
        </FadeUp>
        <ul className={styles.bestGrid}>
          {lcBest.items.map((item) => (
            <li key={item.name} className={landing.proofItem}>
              <CardIconBadge title={item.name} body={item.body} />
              <h3 className={landing.proofName}>{item.name}</h3>
              <p className={landing.proofBody}>{item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
