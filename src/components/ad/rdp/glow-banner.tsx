import { CalendarDays } from "lucide-react";
import landing from "@/components/landing/landing.module.css";
import styles from "../rdp.module.css";

/**
 * A rounded dark banner with a coral glow and drawn glow lines, in the look of
 * /ad/coffee-with-us' closing card (/ad/remote-developers-page: the strategy
 * call and the closing CTA). A second line, if given, takes the accent.
 */
export default function GlowBanner({
  id,
  eyebrow,
  lines,
  body,
  ctas,
}: {
  id: string;
  eyebrow?: string;
  lines: readonly string[];
  body?: string;
  ctas: readonly { readonly label: string; readonly href: string; readonly external?: boolean }[];
}) {
  return (
    <section className={styles.shell} id={id} aria-labelledby={`${id}-title`}>
      <div className={styles.glow}>
        <svg className={styles.glowLines} viewBox="0 0 800 300" preserveAspectRatio="none" aria-hidden focusable="false">
          {Array.from({ length: 12 }, (_, n) => (
            <path key={n} d={`M ${380 + n * 18} 300 C ${520 + n * 10} ${230 - n * 8}, ${640 + n * 6} ${260 - n * 16}, 800 ${70 + n * 14}`} />
          ))}
        </svg>
        <div className={styles.glowCopy}>
          {eyebrow && <span className={styles.glowEyebrow}>{eyebrow}</span>}
          <h2 id={`${id}-title`} className={styles.glowTitle}>
            {lines[0]}
            {lines[1] && (
              <>
                <br />
                <span>{lines[1]}</span>
              </>
            )}
          </h2>
          {body && <p className={styles.glowBody}>{body}</p>}
          <div className={styles.glowActions}>
            {ctas.map((cta, i) => (
              <a
                key={cta.label}
                href={cta.href}
                className={i === 0 ? `${landing.btn} ${landing.btnPrimary} ${landing.btnLg}` : `${landing.btn} ${landing.btnLg} ${styles.glowSecondary}`}
                {...(cta.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              >
                {cta.href.includes("calendly.com") && <CalendarDays size={18} aria-hidden />}
                {cta.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
