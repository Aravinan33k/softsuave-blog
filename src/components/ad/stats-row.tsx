import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

/** A row of headline figures — the stats strip of `TopTalent`, on its own. */
export default function StatsRow({
  stats,
}: {
  stats: readonly { readonly figure: string; readonly label: string }[];
}) {
  return (
    <section className={styles.shell}>
      <FadeUp>
        <dl className={styles.stats} style={{ marginTop: 0 }}>
          {stats.map((s) => (
            <div key={s.label} className={styles.stat}>
              <dt className={styles.statFigure}>{s.figure}</dt>
              <dd className={styles.statLabel}>{s.label}</dd>
            </div>
          ))}
        </dl>
      </FadeUp>
    </section>
  );
}
