import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface TechStackProps {
  eyebrow: string;
  title: string;
  body: string;
  groups: readonly { readonly name: string; readonly items: readonly string[] }[];
}

/**
 * The stack, as static labelled chip rows.
 *
 * Deliberately not the homepage's marquee version: this list is a reference a
 * reader scans for a specific name ("do they use Qdrant?"), and names that are
 * sliding past are the hardest kind to scan. The homepage's marquee is doing a
 * different job — atmosphere — where nobody is looking for anything in
 * particular.
 */
export default function TechStack({ eyebrow, title, body, groups }: TechStackProps) {
  return (
    <section className={home.section} id="tech">
      <div className={home.sectionHead}>
        <span className={home.eyebrow}>{eyebrow}</span>
        <SplitReveal as="h2" className={home.h2} type="words">
          {title}
        </SplitReveal>
        <p className={home.lead}>{body}</p>
      </div>

      <FadeUp className={styles.stackGroups} delay={0.06}>
        {groups.map((group) => (
          <div key={group.name} className={styles.stackGroup}>
            <h3 className={styles.stackGroupName}>{group.name}</h3>
            <ul className={styles.stackChips}>
              {group.items.map((item) => (
                <li key={item} className={styles.stackChip}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}
