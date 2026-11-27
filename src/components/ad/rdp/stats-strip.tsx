import CountUp from "@/components/home/count-up";
import styles from "../rdp.module.css";

/**
 * The large-number strip under the hero (/ad/remote-developers-page), in the
 * look of /ad/coffee-with-us' credibility strip. Each figure is written into
 * the HTML as its real value; `CountUp` only animates it once when it scrolls
 * into view, and leaves it alone under `prefers-reduced-motion`.
 */
export default function StatsStrip({ items }: { items: readonly { readonly figure: string; readonly label: string }[] }) {
  return (
    <section className={styles.stats} aria-label="Soft Suave at a glance">
      <dl className={styles.statsList}>
        {items.map((item) => (
          <div key={item.label} className={styles.statsItem}>
            <dt className={styles.statsFigure}>
              <CountUp value={item.figure} />
            </dt>
            <dd className={styles.statsLabel}>{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
