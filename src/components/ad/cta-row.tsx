import landing from "@/components/landing/landing.module.css";
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
  attached = false,
  primary = false,
  headingLead = false,
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
  /**
   * Part of the section above rather than a band of its own: pulled up under
   * that section's cards to the same gap the process section leaves above its
   * button, instead of a full section's padding on top of the one above.
   */
  attached?: boolean;
  /**
   * The process section's button (`landing.btn` + `btnPrimary` + `btnLg`)
   * instead of the ad kit's own plate. Wins over `wipe` and `white`.
   */
  primary?: boolean;
  /** Set the lead line in the heading face at heading weight, not the light display serif. */
  headingLead?: boolean;
}) {
  return (
    <section
      className={[styles.shell, tight && styles.shellTight, joined && styles.shellJoined, attached && styles.shellAttached].filter(Boolean).join(" ")}
    >
      <div className={styles.cta} style={{ marginTop: 0 }}>
        {lead && <p className={headingLead ? `${styles.ctaLead} ${styles.ctaLeadHeading}` : styles.ctaLead}>{lead}</p>}
        {/* Plain anchor: the trial modal (and Lenis) listen for in-page links. */}
        {label && href && (
          <a
            className={
              primary
                ? `${landing.btn} ${landing.btnPrimary} ${landing.btnLg}`
                : wipe
                  ? `${styles.btn} ${styles.btnWipe}`
                  : white
                    ? `${styles.btn} ${styles.btnWhite}`
                    : styles.btn
            }
            href={href}
          >
            {label}
          </a>
        )}
      </div>
    </section>
  );
}
