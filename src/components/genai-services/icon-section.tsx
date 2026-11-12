import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { SiteLink } from '@/themes/softsuave/site-link';
import { publicMediaUrl } from '@/lib/media-url';
export interface IconCardItem {
  readonly name: string;
  /** Plain text, or runs of text with links. */
  readonly body: string | readonly Piece[];
  readonly icon: string;
  readonly label?: string;
  readonly href?: string;
}
import landing from '@/components/landing/landing.module.css';
import badge from '@/components/common/card-icon-badge.module.css';
import styles from './genai-services.module.css';

type Piece = string | { readonly text: string; readonly href: string };

function Pieces({ pieces }: { pieces: readonly Piece[] }) {
  return (
    <>
      {pieces.map((p, i) =>
        typeof p === 'string' ? (
          <span key={i}>{p}</span>
        ) : (
          <SiteLink key={i} href={p.href} className={styles.inlineLink}>
            {p.text}
          </SiteLink>
        ),
      )}
    </>
  );
}

/**
 * A section head over a grid of cards, each carrying the live page's own icon: drawn in the accent orange
 * inside the site's tinted badge (`tint`), left as the picture it is (`bare`), or the picture in a badge.
 * An optional button sits under the grid.
 */
export default function IconSection({
  id,
  eyebrow,
  title,
  body,
  items,
  columns = 3,
  mode = 'tint',
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string | readonly Piece[];
  items: readonly IconCardItem[];
  columns?: 2 | 3 | 4 | 5;
  mode?: 'tint' | 'bare';
  cta?: { readonly label: string; readonly href: string };
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={eyebrow} title={title} intro={typeof body === 'string' ? body : <Pieces pieces={body} />} />
      <FadeUp>
        <ul className={styles.grid} data-cols={columns}>
          {items.map((it) => (
            <li key={it.name} className={styles.card}>
              {mode === 'bare' ? (
                <Image src={publicMediaUrl(it.icon)} alt="" width={50} height={50} unoptimized className={styles.bareIcon} />
              ) : (
                <span className={`${badge.badge} ${badge.sm}`}>
                  <span className={styles.tintIcon} style={{ ['--mark' as string]: `url(${publicMediaUrl(it.icon)})` }} aria-hidden />
                </span>
              )}
              {it.label ? <span className={styles.label}>{it.label}</span> : null}
              <h3 className={styles.name}>
                {it.href ? (
                  <SiteLink href={it.href} className={styles.nameLink}>
                    {it.name}
                  </SiteLink>
                ) : (
                  it.name
                )}
              </h3>
              <p className={styles.body}>{typeof it.body === 'string' ? it.body : <Pieces pieces={it.body} />}</p>
            </li>
          ))}
        </ul>
      </FadeUp>
      {cta ? (
        <div className={landing.gridCtaRow}>
          <SiteLink href={cta.href} className={`${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`}>
            {cta.label}
          </SiteLink>
        </div>
      ) : null}
    </section>
  );
}
