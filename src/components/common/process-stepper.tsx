"use client";

import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import { linkify, type InlineLink } from "@/components/common/linkify";
import SectionHead from "@/components/generative-ai/section-head";
import FadeUp from "@/components/home/fade-up";
import gen from "@/components/generative-ai/gen-ai.module.css";
import styles from "./process-stepper.module.css";

export interface ProcessStepperStep {
  /** The step's name — the step's H3, and its label in the step bar. */
  readonly name: string;
  /** Optional sub-heading under the name, rendered as an H4. */
  readonly subtitle?: string;
  /** The step's prose, one string per paragraph, verbatim. */
  readonly paragraphs: readonly string[];
  /** Optional deliverables / checklist under the prose. */
  readonly points?: readonly string[];
  /**
   * Optional illustration beside the copy (below it on narrow screens).
   * Root-relative under public/, resolved through `publicMediaUrl`. Drawn
   * whole (`object-fit: contain`) in a box of the art's own aspect ratio.
   */
  readonly image?: {
    readonly src: string;
    readonly width: number;
    readonly height: number;
    readonly alt: string;
  };
}

export interface ProcessStepperContent {
  /** Kicker above the heading. Empty or omitted renders none. */
  eyebrow?: string;
  title: string;
  body?: string;
  /**
   * Phrases in the steps' paragraphs to link, matched on their own words — see
   * `common/linkify`. Threaded across every step, so a phrase links once.
   */
  links?: readonly InlineLink[];
  steps: readonly ProcessStepperStep[];
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * A process section for steps with real substance — a name, a sub-heading,
 * several paragraphs, a checklist and an illustration each — where the shared
 * `SimpleProcess` row (one sentence per card) would have to cut the copy.
 *
 * Click-to-show: a numbered step bar with a connecting line that fills up to
 * the current step, and one panel beneath it showing that step. Clicking a
 * stop switches the panel.
 *
 * It is the WAI-ARIA tabs pattern: the stops are `role="tab"` buttons in a
 * `role="tablist"`, with roving focus — Left/Right move between steps,
 * Home/End jump to the first/last — and each panel is a `role="tabpanel"`
 * labelled by its stop.
 *
 * Every panel is rendered into the HTML; the inactive ones carry `hidden`. So
 * the whole process — each step's H3/H4, prose, links and checklist — is still
 * in the document for crawlers and for the page's text, only not on screen.
 *
 * Below 700px the stop labels give way to a "Step N of M · Name" line under
 * the bar. Content-driven and page-agnostic: pass any number of steps.
 */
export default function ProcessStepper({
  content,
  id = "journey",
}: Readonly<{
  content: ProcessStepperContent;
  /** Section anchor; also namespaces the tab and panel ids. */
  id?: string;
}>) {
  const { steps } = content;
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const select = (i: number, focus = false) => {
    const next = Math.max(0, Math.min(steps.length - 1, i));
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const to =
      e.key === "ArrowRight" ? (i + 1) % steps.length
      : e.key === "ArrowLeft" ? (i - 1 + steps.length) % steps.length
      : e.key === "Home" ? 0
      : e.key === "End" ? steps.length - 1
      : -1;
    if (to < 0) return;
    e.preventDefault();
    select(to, true);
  };

  const progress = steps.length > 1 ? active / (steps.length - 1) : 1;
  const usedLinks = new Set<string>();
  const tabId = (i: number) => `${id}-tab-${i + 1}`;
  const panelId = (i: number) => `${id}-step-${i + 1}`;

  return (
    <section
      className={`${gen.sectionShell} ${styles.section}`}
      id={id}
      style={{ ["--ps-count" as string]: steps.length } as CSSProperties}
    >
      {/* The intro takes the same inline links as the steps (the South Africa
          page links "full-stack engineering services" there), placed first
          so a phrase linked in the intro is not linked again below. */}
      <SectionHead
        kicker={content.eyebrow || undefined}
        title={content.title}
        intro={content.body ? linkify(content.body, content.links, usedLinks, gen.proseLink) : undefined}
      />

      <div className={styles.rail}>
        <div className={styles.railInner} style={{ ["--ps-progress" as string]: progress } as CSSProperties}>
          <span className={styles.track} aria-hidden>
            <span className={styles.fill} />
          </span>
          <div className={styles.railList} role="tablist" aria-label={`${content.title}: steps`}>
            {steps.map((step, i) => (
              <button
                key={step.name}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={tabId(i)}
                aria-selected={i === active}
                aria-controls={panelId(i)}
                tabIndex={i === active ? 0 : -1}
                className={styles.railLink}
                data-state={i < active ? "done" : i === active ? "active" : "next"}
                onClick={() => select(i)}
                onKeyDown={(e) => onTabKey(e, i)}
              >
                <span className={styles.railDot} aria-hidden>
                  {pad(i + 1)}
                </span>
                <span className={styles.railName}>{step.name}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Narrow screens hide the stop labels; this names the current one. */}
        <p className={styles.current} aria-hidden>
          Step {active + 1} of {steps.length} · <b>{steps[active]?.name}</b>
        </p>
      </div>

      <FadeUp>
        {steps.map((step, i) => (
          <div
            key={step.name}
            id={panelId(i)}
            role="tabpanel"
            aria-labelledby={tabId(i)}
            hidden={i !== active}
            className={styles.panel}
          >
            <div className={styles.card}>
              <div className={styles.copy}>
                <span className={styles.label} aria-hidden>
                  Step {pad(i + 1)}
                </span>
                <h3 className={styles.name}>{step.name}</h3>
                {step.subtitle ? <h4 className={styles.subtitle}>{step.subtitle}</h4> : null}

                <div className={styles.prose}>
                  {step.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{linkify(p, content.links, usedLinks, gen.proseLink)}</p>
                  ))}
                </div>

                {step.points && step.points.length > 0 ? (
                  <ul className={styles.points}>
                    {step.points.map((point) => (
                      <li key={point} className={styles.point}>
                        <svg
                          className={styles.pointMark}
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M4 10.6l4 3.8 8-8.8" />
                        </svg>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>

              {step.image ? (
                // One frame shape for every step, so the illustrations share a
                // height as the panels switch; each is fitted whole inside it.
                <figure className={styles.media}>
                  <Image
                    src={publicMediaUrl(step.image.src)}
                    alt={step.image.alt}
                    fill
                    sizes="(max-width: 999px) 88vw, 36vw"
                    className={styles.mediaImg}
                  />
                </figure>
              ) : null}
            </div>
          </div>
        ))}
      </FadeUp>
    </section>
  );
}

