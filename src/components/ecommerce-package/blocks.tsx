import Industries from '@/components/landing/industries';
import SectionHead from '@/components/generative-ai/section-head';
import CtaBand from '@/components/landing/cta-band';
import FadeUp from '@/components/home/fade-up';
import { SiteLink } from '@/themes/softsuave/site-link';
import { ecomCta, ecomPackage, ecomSolutions } from '@/lib/home/ecommerce-package-content';
import type { Piece } from '@/lib/home/construction-time-tracking-content';
import PackageTable from './package-table';
import styles from './ecommerce-package.module.css';

function Title({ text, accent }: { text: string; accent: string }) {
  const i = text.indexOf(accent);
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span style={{ color: 'var(--accent)' }}>{accent}</span>
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

/** "Custom-tailored eCommerce Solutions": the three platforms, as the site's card grid. */
export function Solutions() {
  const s = ecomSolutions;
  return (
    <Industries
      id="ecom-solutions"
      columns={3}
      content={{
        eyebrow: '',
        title: s.title,
        titleNode: <Title text={s.title} accent={s.accent} />,
        body: '',
        bodyNode: <Pieces pieces={s.body} />,
        items: s.items.map((it) => ({
          name: it.name,
          body: it.body,
          link: false as const,
          image: { src: it.icon, width: 70, height: 70, alt: it.alt },
        })),
      }}
    />
  );
}

/** "Package & Prices": the table. */
export function Packages() {
  return (
    <section className={styles.band} id="packages">
      <FadeUp>
        <SectionHead title={ecomPackage.title} intro={ecomPackage.body} />
      </FadeUp>
      <FadeUp>
        <PackageTable />
      </FadeUp>
    </section>
  );
}

/** The closing band. */
export function Closing() {
  return <CtaBand content={{ title: ecomCta.title, body: '', cta: ecomCta.cta }} />;
}
