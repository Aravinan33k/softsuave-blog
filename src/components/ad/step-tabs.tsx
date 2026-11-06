"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { publicMediaUrl } from "@/lib/media-url";
import SectionHead from "@/components/landing/section-head";
import CardIconBadge from "@/components/common/card-icon-badge";
import landing from "@/components/landing/landing.module.css";
import styles from "./ad.module.css";

export interface StepTabsContent {
  readonly eyebrow?: string;
  readonly title: string;
  readonly intro: string;
  readonly steps: readonly {
    /** "01". */
    readonly n: string;
    /** The tab's label ("Ideate"). */
    readonly label: string;
    readonly title: string;
    /** The words of `title` drawn in the accent colour. */
    readonly accent: string;
    readonly body: string;
    readonly cta: { readonly label: string; readonly href: string };
    readonly image: { readonly src: string; readonly width: number; readonly height: number; readonly alt: string };
  }[];
}

/**
 * A heading over a board of tabs, one step each — the live "Why Choose Soft Suave"
 * block (Ideate / Develop / Release). The board is the one /web-application-
 * development-company's services use: a card per step (icon, name, arrow) with the
 * chosen step open on a stage beneath — its number and name, a headline with its key
 * words picked out, a line, a button and an illustration.
 *
 * Every step's copy is rendered, the unchosen ones `hidden`, so none of it is withheld
 * from a crawler. Arrow keys, Home and End move between the tabs.
 */
export default function StepTabs({ content, id = "why" }: { content: StepTabsContent; id?: string }) {
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const steps = content.steps;

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const last = steps.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <section className={styles.shell} id={id}>
      <SectionHead kicker={content.eyebrow} title={content.title} intro={content.intro} />

      <div className={landing.sbWrap}>
        <div className={landing.sbGrid} role="tablist" aria-label={content.title} onKeyDown={onKeyDown}>
          {steps.map((s, i) => (
            <button
              key={s.label}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`${id}-tab-${i}`}
              aria-selected={active === i}
              aria-controls={`${id}-panel-${i}`}
              tabIndex={active === i ? 0 : -1}
              className={landing.sbCard}
              onClick={() => setActive(i)}
            >
              <CardIconBadge title={s.label} body={s.body} size="sm" />
              <span className={landing.sbCardName}>{s.label}</span>
              <span className={landing.sbCardMark} aria-hidden>
                <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 10h11" />
                  <path d="M11 6l4 4-4 4" />
                </svg>
              </span>
            </button>
          ))}
        </div>

        <div className={landing.sbStage}>
          {steps.map((s, i) => {
            const [before, after] = s.title.split(s.accent);
            return (
              <div
                key={s.label}
                className={landing.sbPanel}
                role="tabpanel"
                id={`${id}-panel-${i}`}
                aria-labelledby={`${id}-tab-${i}`}
                tabIndex={0}
                hidden={i !== active}
                data-active={i === active}
              >
                <div className={landing.sbFigure}>
                  <Image
                    src={publicMediaUrl(s.image.src)}
                    alt={s.image.alt}
                    fill
                    sizes="(max-width: 999px) 92vw, 42vw"
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <div className={landing.sbCopy}>
                  <CardIconBadge title={s.label} body={s.body} />
                  <p className={styles.stepNum}>
                    <span>{s.n}</span> {s.label}
                  </p>
                  <h3 className={landing.sbPanelName}>
                    {before}
                    <span className={styles.stepAccent}>{s.accent}</span>
                    {after}
                  </h3>
                  <p className={landing.sbText}>{s.body}</p>
                  <a
                    className={`${landing.btn} ${landing.btnPrimary}`}
                    href={s.cta.href}
                    style={{ alignSelf: "flex-start", justifySelf: "start", width: "fit-content" }}
                  >
                    {s.cta.label}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
