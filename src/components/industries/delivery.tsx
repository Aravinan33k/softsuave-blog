"use client";

import FadeUp from "@/components/home/fade-up";
import { SiteLink } from "@/themes/softsuave/site-link";
import { engagementModels } from "@/lib/home/content";
import { engagement } from "@/lib/home/industries-content";
import SectionHead from "./section-head";
import styles from "./industries.module.css";

/**
 * How a sector team is staffed, on the page's second light band.
 *
 * The three shapes are `engagementModels` from the content module — the site's
 * own engagement copy, not a new set of tiers, and with no prices attached
 * because none are published.
 *
 * Underneath, the rail links out to the delivery-model pages softsuave.com
 * publishes (Global Capability Center, staff augmentation, offshore, product
 * engineering, modernization, cloud). Every one is a real page; `SiteLink`
 * sends them to the live site until this app serves its own.
 */
export default function Delivery() {
  return (
    <section className={styles.shell} id="delivery">
      <SectionHead
        kicker={engagement.eyebrow}
        title={engagement.title}
        intro={engagement.body}
        tone="light"
      />

      <FadeUp>
        <div className={styles.models}>
          {engagementModels.tiers.map((tier) => (
            <div
              key={tier.name}
              className={`${styles.model} ${tier.highlight ? styles.modelLead : ""}`}
            >
              <span className={styles.modelFor}>{tier.forWho}</span>
              <h3 className={styles.modelName}>{tier.name}</h3>
              <ul className={styles.modelList}>
                {tier.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeUp>

      <div className={styles.routes}>
        <span className={styles.routesLabel}>Delivery models in detail</span>
        <ul className={styles.routeList}>
          {engagement.routes.map((route) => (
            <li key={route.href}>
              <SiteLink href={route.href} className={styles.routeLink} data-cursor="Open">
                {route.label}
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
