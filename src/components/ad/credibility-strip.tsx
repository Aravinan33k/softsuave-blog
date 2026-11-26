import styles from "./coffee.module.css";

type Item = { readonly figure: string; readonly label: string };

/**
 * The proof row along the bottom of the /ad/coffee-with-us hero: each figure
 * large and bold over an Inter label in capitals, all in one muted colour,
 * split by thin fading rules. Five across on a desktop, wrapping to fewer per
 * row on smaller screens. A definition list, so each figure is read with its
 * label.
 */
export default function CredibilityStrip({ items }: { items: readonly Item[] }) {
  return (
    <section className={styles.cred} aria-label="Soft Suave at a glance">
      <dl className={styles.credList}>
        {items.map((item) => (
          <div key={item.label} className={styles.credItem}>
            <dt className={styles.credFigure}>{item.figure}</dt>
            <dd className={styles.credLabel}>{item.label}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
