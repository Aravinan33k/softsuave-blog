import Image from 'next/image';
import FadeUp from '@/components/home/fade-up';
import SectionHead from '@/components/landing/section-head';
import { publicMediaUrl } from '@/lib/media-url';
import { genaiWhy } from '@/lib/home/genai-services-content';
import landing from '@/components/landing/landing.module.css';
import styles from './genai-services.module.css';

/** "Why Choose Soft Suave for GenAI Integration": the live illustration beside the four reasons. */
export default function WhyChoose() {
  const w = genaiWhy;
  return (
    <section className={landing.sectionShell} id="why">
      <SectionHead kicker={w.eyebrow} title={w.title} intro={w.body} />
      <div className={styles.whySplit}>
        <FadeUp className={styles.whyMedia}>
          <Image src={publicMediaUrl(w.image.src)} alt={w.image.alt} width={w.image.width} height={w.image.height} sizes="(max-width: 900px) 80vw, 40vw" />
        </FadeUp>
        <FadeUp>
          <ul className={styles.whyList}>
            {w.items.map((it) => (
              <li key={it.name} className={styles.whyItem}>
                {/* The live icons are white artwork, so they are drawn in the accent to read on a light band. */}
                <span className={styles.whyIcon} style={{ ['--mark' as string]: `url(${publicMediaUrl(it.icon)})` }} aria-hidden />
                <div>
                  <h3 className={styles.whyName}>{it.name}</h3>
                  <p className={styles.body}>{it.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  );
}
