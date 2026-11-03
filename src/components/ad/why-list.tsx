import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

/** A heading over a plain list of reasons — the live "Why Hire…" block, which has no card copy. */
export default function WhyList({
  title,
  items,
  id = "why",
}: {
  title: string;
  items: readonly string[];
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead title={title} />
      <ul className={styles.whyList}>
        {items.map((item, i) => (
          <li key={item} className={styles.whyItem}>
            <FadeUp delay={Math.min(i % 3, 2) * 0.06}>{item}</FadeUp>
          </li>
        ))}
      </ul>
    </section>
  );
}
