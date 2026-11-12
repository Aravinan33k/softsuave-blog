import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import Industries from '@/components/landing/industries';
import { SiteLink } from '@/themes/softsuave/site-link';
import { publicMediaUrl } from '@/lib/media-url';
import {
  ecAbout,
  ecBenefits,
  ecCaseStudy,
  ecFeatures,
  ecPlatforms,
  type Piece,
} from '@/lib/home/ecommerce-app-content';
import landing from '@/components/landing/landing.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import styles from './ecommerce-app.module.css';

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

/** "Incredible eCommerce App Development To Boost Sales Online": the copy beside its picture. */
export function About() {
  const a = ecAbout;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={<Title text={a.title} accent={a.accent} />} intro={a.body} />
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
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 80vw, 40vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** The eight features: an orange mark and a name each, then the quote button. */
export function Features() {
  const f = ecFeatures;
  return (
    <Industries
      id="features"
      columns={4}
      content={{
        eyebrow: '',
        title: f.title,
        titleNode: <Title text={f.title} accent={f.accent} />,
        body: f.body,
        cta: f.cta,
        items: f.items.map((it) => ({
          name: it.name,
          link: false as const,
          image: { src: it.src, width: 60, height: 60, alt: it.alt, badge: true },
        })),
      }}
    />
  );
}

/** The eight benefits: a mark, a name and a paragraph each. */
export function Benefits() {
  const b = ecBenefits;
  return (
    <Industries
      id="benefits"
      columns={4}
      content={{
        eyebrow: '',
        title: b.title,
        titleNode: <Title text={b.title} accent={b.accent} />,
        body: b.body,
        items: b.items.map((it) => ({
          name: it.name,
          body: it.body,
          link: false as const,
          image: { src: it.src, width: 60, height: 60, alt: it.alt, badge: true },
        })),
      }}
    />
  );
}

/** "Case Studies": the one study, its copy and download button beside the app screen. */
export function CaseStudy() {
  const c = ecCaseStudy;
  const it = c.item;
  return (
    <section className={base.band} id="case-study">
      <FadeUp>
        <SectionHead title={c.title} intro={c.body} />
      </FadeUp>
      <div className={`${base.split} ${styles.caseRow}`}>
        <FadeUp className={base.prose}>
          <h3 className={base.h3}>{it.name}</h3>
          <p>{it.body}</p>
          <div className={styles.caseCta}>
            <SiteLink href={it.cta.href} className={`${landing.btn} ${landing.btnPrimary}`}>
              {it.cta.label}
            </SiteLink>
          </div>
        </FadeUp>
        <FadeUp className={`${base.media} ${styles.caseMedia}`}>
          <Image src={it.image.src} alt={it.image.alt} width={it.image.width} height={it.image.height} sizes="(max-width: 900px) 50vw, 20vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** "eCommerce App Development Platforms": the four platform marks. */
export function Platforms() {
  const p = ecPlatforms;
  return (
    <section className={landing.sectionShell} id="platforms">
      <FadeUp>
        <SectionHead title={<Title text={p.title} accent={p.accent} />} intro={p.body} />
      </FadeUp>
      <FadeUp>
        <ul className={styles.platforms}>
          {p.items.map((it) => (
            <li key={it.alt} className={styles.platform}>
              <Image src={publicMediaUrl(it.src)} alt={it.alt} width={200} height={90} unoptimized className={styles.platformMark} />
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}
