import SectionHead from "@/components/landing/section-head";
import FadeUp from "@/components/home/fade-up";
import styles from "./ad.module.css";

export interface PricingContent {
  readonly eyebrow: string;
  readonly title: string;
  readonly body: string;
  readonly plans: readonly { readonly price: string; readonly unit: string; readonly body: string }[];
  readonly fixed: { readonly title: string; readonly body: string };
  readonly cta: { readonly label: string; readonly href: string };
}

/** Hourly / monthly / fixed-price plans, then the trial CTA. */
export default function PricingPlans({
  content,
  id = "pricing",
}: {
  content: PricingContent;
  id?: string;
}) {
  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.body} />
      <div className={styles.plans}>
        {content.plans.map((plan, i) => (
          <FadeUp key={plan.unit} delay={i * 0.08}>
            <div className={styles.plan}>
              <span className={styles.planPrice}>{plan.price}</span>
              <span className={styles.planUnit}>{plan.unit}</span>
              <p className={styles.planBody}>{plan.body}</p>
            </div>
          </FadeUp>
        ))}
        <FadeUp delay={content.plans.length * 0.08}>
          <div className={styles.plan}>
            <h3 className={styles.planTitle}>{content.fixed.title}</h3>
            <p className={styles.planBody}>{content.fixed.body}</p>
          </div>
        </FadeUp>
      </div>
      <div className={styles.cta}>
        <a className={styles.btn} href={content.cta.href}>
          {content.cta.label}
        </a>
      </div>
    </section>
  );
}
