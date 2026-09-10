"use client";

import TechLogo from "@/components/home/tech-logo";
import FadeUp from "@/components/home/fade-up";
import SectionHead from "./section-head";
import styles from "./landing.module.css";

const pad = (n: number) => String(n).padStart(2, "0");

export interface TechStackContent {
  eyebrow: string;
  title: string;
  body: string;
  groups: readonly { readonly name: string; readonly items: readonly string[] }[];
}

/**
 * Technology stack as static bordered group panels.
 *
 * The homepage renders this as one auto-running marquee per group, alternating
 * direction and pausing on hover. On a landing page the stack is reference
 * information — a visitor scanning for "do they use Qdrant" should not have to
 * wait for a carousel to bring it round, and four moving rows next to the
 * integration grid above is a lot of motion for one page. `TechLogo` is kept:
 * the marks are brand assets, not a homepage layout.
 */
export default function TechStack({
  content,
  id = "tech",
}: {
  content: TechStackContent;
  id?: string;
}) {
  return (
    <section className={styles.sectionShell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />

      <FadeUp>
        <div className={styles.stackList}>
          {content.groups.map((group, i) => (
            <div key={group.name} className={styles.stackGroup}>
              <div className={styles.stackGroupHead}>
                <span className={styles.stackGroupIndex} aria-hidden>
                  {pad(i + 1)}
                </span>
                <h3 className={styles.stackGroupName}>{group.name}</h3>
              </div>

              <ul className={styles.stackItems}>
                {group.items.map((item) => (
                  <li key={item} className={styles.stackItem}>
                    <span className={styles.stackItemLogo} aria-hidden>
                      <TechLogo name={item} />
                    </span>
                    <span className={styles.stackItemName}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
