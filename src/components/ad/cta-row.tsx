import styles from "./ad.module.css";

/** A centred button under a section, with an optional line above it ("Ready to discuss?"). */
export default function CtaRow({
  lead,
  label,
  href,
  wipe = false,
}: {
  lead?: string;
  label: string;
  href: string;
  /** The black left-to-right hover fill (see `.btnWipe`). */
  wipe?: boolean;
}) {
  return (
    <section className={styles.shell}>
      <div className={styles.cta} style={{ marginTop: 0 }}>
        {lead && <p className={styles.ctaLead}>{lead}</p>}
        {/* Plain anchor: the trial modal (and Lenis) listen for in-page links. */}
        <a className={wipe ? `${styles.btn} ${styles.btnWipe}` : styles.btn} href={href}>
          {label}
        </a>
      </div>
    </section>
  );
}
