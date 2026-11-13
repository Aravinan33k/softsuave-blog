import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { SiteLink } from '@/themes/softsuave/site-link';
import { publicMediaUrl } from '@/lib/media-url';
import Marquee from '@/components/home/marquee';
import home from '@/components/home/home.module.css';
import { fsAbout, fsStack, fsSteps, fsTrust, fsWhy } from '@/lib/home/hire-full-stack-content';
import landing from '@/components/landing/landing.module.css';
import base from '@/components/construction-tracking/construction-tracking.module.css';
import IconSection from '@/components/genai-services/icon-section';
import styles from './hire-full-stack.module.css';

type Piece = string | { readonly b: string } | { readonly text: string; readonly href: string };

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

/** "Onboard Offshore Full-Stack Developers For All Your IT Needs": the paragraphs beside the banner picture. */
export function About() {
  const a = fsAbout;
  const [first, ...rest] = a.paragraphs;
  return (
    <section className={base.band} id="overview">
      <FadeUp>
        <SectionHead title={a.title} intro={first} />
      </FadeUp>
      <div className={base.split}>
        <FadeUp className={base.prose}>
          {rest.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </FadeUp>
        <FadeUp className={base.media}>
          <Image src={a.image.src} alt={a.image.alt} width={a.image.width} height={a.image.height} sizes="(max-width: 900px) 70vw, 30vw" />
        </FadeUp>
      </div>
    </section>
  );
}

/** "Unleash Tech Potential With Full-Stack Experts": the eight stack combinations, each with its marks and a link. */
export function StackCards() {
  const s = fsStack;
  return (
    <section className={landing.sectionShell} id="stacks">
      <FadeUp>
        <SectionHead title={<Title text={s.title} accent={s.accent} />} intro={s.body} />
      </FadeUp>
      <FadeUp>
        <ul className={styles.stackGrid}>
          {s.items.map((it) => (
            <li key={it.name} className={styles.stackCard}>
              <span className={styles.stackIcons}>
                {it.icons.map((ic) => (
                  <Image key={ic.src} src={publicMediaUrl(ic.src)} alt={ic.alt} width={32} height={32} unoptimized className={styles.stackIcon} />
                ))}
              </span>
              <h3 className={styles.stackName}>{it.name}</h3>
              <p className={styles.stackBody}>{it.body}</p>
              <SiteLink href={it.href} className={styles.stackLink}>
                {s.linkLabel}
              </SiteLink>
            </li>
          ))}
        </ul>
      </FadeUp>
    </section>
  );
}

/** "Why Hire Remote Full Stack Developers in India?": the six reasons as a list of links, a trial button, then the cards. */
export function WhyIndia() {
  const w = fsWhy;
  return (
    <>
      <section className={`${landing.sectionShell} ${styles.whyHead}`} id="why">
        <FadeUp>
          <SectionHead title={<Title text={w.title} accent={w.accent} />} intro={w.body} />
        </FadeUp>
      </section>
      <div className={styles.whyPull}>
        <IconSection id="why-reasons" eyebrow="" title="" body="" items={w.items} columns={3} />
      </div>
      <div className={`${landing.gridCtaRow} ${styles.whyCta}`}>
        <SiteLink href={w.cta.href} className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`}>
          {w.cta.label}
        </SiteLink>
      </div>
    </>
  );
}

/** "Four Easy Steps to Onboard a Full-Stack Developer": the live strip, a wide one and a tall one for phones. */
export function Steps() {
  const s = fsSteps;
  return (
    <section className={landing.sectionShell} id="steps">
      <FadeUp>
        <SectionHead title={s.title} intro={<Pieces pieces={s.body} />} />
      </FadeUp>
      <FadeUp className={styles.stepsMedia}>
        <Image className={styles.stepsWide} src={s.web.src} alt={s.web.alt} width={s.web.width} height={s.web.height} sizes="100vw" />
        <Image className={styles.stepsTall} src={s.mobile.src} alt={s.mobile.alt} width={s.mobile.width} height={s.mobile.height} sizes="100vw" />
      </FadeUp>
    </section>
  );
}

/** "The World's Top Companies Trust Soft Suave": the text and its four points beside the clients picture. */
export function Trust() {
  const t = fsTrust;
  return (
    <section className={`${base.band} ${styles.trustPull}`} id="trust">
      <FadeUp>
        <SectionHead title={t.title} intro={<Pieces pieces={t.body} />} />
      </FadeUp>
      <FadeUp>
        <ul className={`${styles.points} ${styles.pointsRow}`}>
          {t.points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </FadeUp>
      <FadeUp className={home.clientsRow} delay={0.08}>
        <Marquee speed={30} className={home.clientsMarquee} separator={<span aria-hidden />}>
          {t.logos.map((logo) => (
            <span key={logo.name} className={home.clientsItem}>
              <span className={home.clientLogo}>
                <Image src={logo.src} alt={logo.name} fill sizes="170px" className="object-contain" />
              </span>
            </span>
          ))}
        </Marquee>
      </FadeUp>
    </section>
  );
}
