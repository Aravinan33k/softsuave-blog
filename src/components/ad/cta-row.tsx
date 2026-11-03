import styles from "./ad.module.css";

/** A centred button under a section, with an optional line above it ("Ready to discuss?"). */
export default function CtaRow({
  lead,
  label,
  href,
}: {
  lead?: string;
  label: string;
  href: string;
}) {
  return (
    <section className={styles.shell}>
      <div className={styles.cta} style={{ marginTop: 0 }}>
        {lead && <p className={styles.ctaLead}>{lead}</p>}
        {/* Plain anchor: the trial modal (and Lenis) listen for in-page links. */}
        <a className={styles.btn} href={href}>
          {label}
        </a>
      </div>
    </section>
  );
}
