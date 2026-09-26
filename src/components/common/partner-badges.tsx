import Image from "next/image";
import { partnerHeroBadges } from "@/lib/home/hero-badges";
import { publicMediaUrl } from "@/lib/media-url";
import styles from "@/components/landing/landing.module.css";

/**
 * The four partner badges (Upwork, Clutch, Microsoft, AWS) as image plaques,
 * for a hero that is not one of the two content-driven landing heroes.
 *
 * The Sep corrections review asked for these at the end of every hero section.
 * `landing/hero` and `generative-ai/hero` render them from their content's
 * `badges`; the AI development service and Industries heroes are bespoke, so
 * they drop this in. It reuses the landing hero's own badge classes, so the
 * plaques are the same size and treatment on every page.
 */
export default function PartnerBadges({ className }: { className?: string }) {
  return (
    <ul className={`${styles.badges}${className ? ` ${className}` : ""}`} aria-label="Credentials">
      {partnerHeroBadges.map((b) => (
        <li key={b.src} className={`${styles.badge} ${styles.badgeLogo}`}>
          <Image
            src={publicMediaUrl(b.src)}
            alt={b.alt}
            width={b.width}
            height={b.height}
            className={styles.badgeLogoImg}
          />
        </li>
      ))}
    </ul>
  );
}
