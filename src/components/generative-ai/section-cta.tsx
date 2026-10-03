import { SiteLink } from "@/themes/softsuave/site-link";
import styles from "./gen-ai.module.css";

/**
 * A section's own closing button, under its grid or carousel — the live hire
 * pages close some of these sections on one ("Ready to discuss? Contact us",
 * "Talk to Our Experts"; review: "a CTA button is missing"). `.ctaActions`
 * gives it the mid-page conversion band's size, so every mid-page button on
 * the surface is one size. Renders nothing when the content declares none.
 */
export default function SectionCta({
  cta,
}: {
  cta?: { readonly label: string; readonly href: string };
}) {
  if (!cta) return null;
  return (
    <div className={`${styles.ctaActions} ${styles.sectionCtaRow}`}>
      <SiteLink href={cta.href} className={`${styles.btn} ${styles.btnPrimary}`}>
        {cta.label}
      </SiteLink>
    </div>
  );
}
