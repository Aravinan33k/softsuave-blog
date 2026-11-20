"use client";

import { enterprise } from "@/lib/home/content";
import Marquee from "./marquee";
import SplitReveal from "./split-reveal";
import FadeUp from "./fade-up";
import styles from "./home.module.css";

const integrations = [
  "Salesforce",
  "SAP",
  "Oracle",
  "Microsoft",
  "HubSpot",
  "Slack",
  "Google",
  "AWS",
  "Azure",
  "Snowflake",
  "Zoho",
  "ServiceNow",
  "Shopify",
  "WhatsApp",
  "CRM",
  "ERP",
  "API",
  "Cloud",
];

/**
 * Enterprise AI Integrations strip: the tools/platforms we connect AI into,
 * rendered as dual infinite marquees. Copy comes from the enterprise block.
 */
export default function Awards() {
  return (
    <section className={styles.awards} id="integrations">
      <div className={styles.awardsHead} data-skew>
        <span className={styles.eyebrow}>{enterprise.eyebrow}</span>
        <SplitReveal as="h2" className={styles.h2} type="words">
          {enterprise.title}
        </SplitReveal>
        <FadeUp className={styles.leadWrap}>
          <p className={styles.lead}>{enterprise.body}</p>
        </FadeUp>
      </div>

      <div className={styles.awardsMarquees}>
        <Marquee speed={26}>
          {integrations.map((r) => (
            <span key={r} className={styles.awardChip}>
              {r}
            </span>
          ))}
        </Marquee>
        <Marquee speed={22} reverse>
          {[...integrations].reverse().map((r) => (
            <span key={r} className={styles.awardChipGhost}>
              {r}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
