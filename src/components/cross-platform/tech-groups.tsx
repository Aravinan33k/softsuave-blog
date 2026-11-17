import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import landing from '@/components/landing/landing.module.css';
import { publicMediaUrl } from '@/lib/media-url';
import { cpTech } from '@/lib/home/cross-platform-content';
import styles from './cross-platform.module.css';

/**
 * "Top Most Technologies We Use For Cross-platform Development": the three groups the live page
 * tabs (Frameworks, Database, Clouds), each technology with its mark, name and a line on how it is used.
 */
export default function TechGroups() {
  const t = cpTech;
  return (
    <section className={landing.sectionShell} id="technologies">
      <FadeUp>
        <SectionHead kicker={t.eyebrow} title={t.title} intro={t.body} />
      </FadeUp>
      {t.groups.map((g) => (
        <div key={g.name} className={styles.group}>
          <FadeUp>
            <h3 className={styles.groupName}>{g.name}</h3>
          </FadeUp>
          <FadeUp>
            <ul className={styles.grid} data-count={g.items.length}>
              {g.items.map((it) => (
                <li key={it.name} className={styles.card}>
                  <span className={styles.logo}>
                    <Image src={publicMediaUrl(it.logo.src)} alt={it.logo.alt} width={64} height={64} unoptimized className={styles.mark} />
                  </span>
                  <h4 className={styles.name}>{it.name}</h4>
                  <p className={styles.body}>{it.body}</p>
                </li>
              ))}
            </ul>
          </FadeUp>
        </div>
      ))}
    </section>
  );
}
