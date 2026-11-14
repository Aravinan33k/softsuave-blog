import styles from "./ad.module.css";

/** A centred button under a section, with an optional line above it ("Ready to discuss?"). */
export default function CtaRow({
  lead,
  label,
  href,
  wipe = false,
  tight = false,
  joined = false,
  white = false,
}: {
  lead?: string;
  /** Omit with `href` for a closing line on its own, no button. */
  label?: string;
  href?: string;
  /** The black left-to-right hover fill (see `.btnWipe`). */
  wipe?: boolean;
  /** No top padding — for a row straight under a card grid that already ends in its own section padding. */
  tight?: boolean;
  /** No bottom padding — for a row followed by a section on the same ground that carries its own top padding. */
  joined?: boolean;
  /** The white left-to-right hover fill, for a button on a dark section (see `.btnWhite`). */
  white?: boolean;
}) {
  return (
    <section
      className={[styles.shell, tight && styles.shellTight, joined && styles.shellJoined].filter(Boolean).join(" ")}
    >
      <div className={styles.cta} style={{ marginTop: 0 }}>
        {lead && <p className={styles.ctaLead}>{lead}</p>}
        {/* Plain anchor: the trial modal (and Lenis) listen for in-page links. */}
        {label && href && (
          <a className={wipe ? `${styles.btn} ${styles.btnWipe}` : white ? `${styles.btn} ${styles.btnWhite}` : styles.btn} href={href}>
            {label}
          </a>
        )}
      </div>
    </section>
  );
}
