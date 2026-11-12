import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { SiteLink } from '@/themes/softsuave/site-link';
import { publicMediaUrl } from '@/lib/media-url';
import landing from '@/components/landing/landing.module.css';
import badge from '@/components/common/card-icon-badge.module.css';
import styles from './genai-integration.module.css';

export interface IconCard {
  readonly name: string;
  readonly body: string;
  /** The live page's own icon for the card. */
  readonly icon: string;
  readonly alt?: string;
  /** A label over the name, e.g. "STEP 1". */
  readonly label?: string;
}

/**
 * A section head over a grid of cards, each carrying the live page's own icon (in the accent badge, or on
 * its own where the icon is already a finished tile), with an optional button under the grid.
 */
export default function IconSection({
  id,
  eyebrow,
  title,
  body,
  items,
  columns = 3,
  bare = false,
  tint = false,
  cta,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: string;
  items: readonly IconCard[];
  columns?: 2 | 3 | 4 | 5;
  /** Draw the icon as it is, with no badge round it. */
  bare?: boolean;
  /** Draw each icon's shape in the accent orange, whatever colours the picture has. */
  tint?: boolean;
  cta?: { readonly label: string; readonly href: string };
}) {
  return (
    <section className={landing.sectionShell} id={id}>
      <SectionHead kicker={eyebrow} title={title} intro={body} />
      <FadeUp>
        <ul className={styles.grid} data-cols={columns}>
          {items.map((it, i) => (
            <li key={`${it.name}-${i}`} className={styles.card}>
              {bare ? (
                <Image src={publicMediaUrl(it.icon)} alt={it.alt ?? ''} width={48} height={48} unoptimized className={styles.bareIcon} />
              ) : (
                <span className={`${badge.badge} ${badge.sm}`}>
                  {tint ? (
                    <span className={styles.tintIcon} style={{ ['--mark' as string]: `url(${publicMediaUrl(it.icon)})` }} aria-hidden />
                  ) : (
                    <Image src={publicMediaUrl(it.icon)} alt={it.alt ?? ''} width={26} height={26} unoptimized className={styles.badgeIcon} />
                  )}
                </span>
              )}
              {it.label ? <span className={styles.label}>{it.label}</span> : null}
              <h3 className={styles.name}>{it.name}</h3>
              <p className={styles.body}>{it.body}</p>
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
