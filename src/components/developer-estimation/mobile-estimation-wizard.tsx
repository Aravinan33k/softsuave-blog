"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteLink } from "@/themes/softsuave/site-link";
import { navRoute } from "@/themes/softsuave/nav-data";
import { estimationButtons } from "@/lib/home/developer-estimation-content";
import {
  mobileCrumbs,
  mobileDetails,
  mobileHybrid,
  mobileIntro,
  mobileNative,
  mobilePlatforms,
  mobileProject,
  mobileSummary,
  mobileWebEstimatePath,
  type PlatformKey,
} from "@/lib/home/mobile-app-estimation-content";
import home from "@/components/home/home.module.css";
import { ChipIcon, ContactStep, Crumbs, Heading, SummaryCard, SummaryRow, Tile, toggle, type CrumbItem } from "./estimation-parts";
import styles from "./developer-estimation.module.css";

type Step = "platform" | "tech" | "project" | "details" | "preview" | "fee";

type Picks = {
  platforms: PlatformKey[];
  native: string[];
  hybrid: string[];
  projects: string[];
  newNotes: string;
  existingNotes: string;
  percent: string;
};

const EMPTY: Picks = { platforms: [], native: [], hybrid: [], projects: [], newNotes: "", existingNotes: "", percent: "10" };

export default function MobileEstimationWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("platform");
  const [picks, setPicks] = useState<Picks>(EMPTY);
  /** After Proceed with a group left unanswered, only that group stays open (as on the live page). */
  const [onlyGroup, setOnlyGroup] = useState<"native" | "hybrid" | null>(null);

  const hasWeb = picks.platforms.includes("web");
  const hasNative = picks.platforms.includes("native");
  const hasHybrid = picks.platforms.includes("hybrid");
  const hasNew = picks.projects.includes("New");
  const hasExisting = picks.projects.includes("Existing");

  const go = (next: Step) => {
    setStep(next);
    setOnlyGroup(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const showNative = hasNative && (onlyGroup === null || onlyGroup === "native");
  const showHybrid = hasHybrid && (onlyGroup === null || onlyGroup === "hybrid");

  const canProceed = (() => {
    switch (step) {
      case "platform":
        return picks.platforms.length > 0;
      case "tech":
        return (showNative && picks.native.length > 0) || (showHybrid && picks.hybrid.length > 0);
      case "project":
        return picks.projects.length > 0;
      case "details":
        return (!hasNew || picks.newNotes.trim() !== "") && (!hasExisting || picks.existingNotes.trim() !== "");
      default:
        return true;
    }
  })();

  const proceed = () => {
    if (step === "platform") {
      if (hasWeb && !hasNative && !hasHybrid) {
        // Web on its own leaves this wizard for the web estimate page.
        router.push(navRoute(mobileWebEstimatePath));
        return;
      }
      go("tech");
    } else if (step === "tech") {
      if (hasNative && picks.native.length === 0) return setOnlyGroup("native");
      if (hasHybrid && picks.hybrid.length === 0) return setOnlyGroup("hybrid");
      go("project");
    } else if (step === "project") {
      go("details");
    } else if (step === "details") {
      go("preview");
    }
  };

  const crumbs: CrumbItem[] = (() => {
    const c = mobileCrumbs;
    const list: CrumbItem[] = [
      { key: "est", ...c.estimation, to: "start" },
      { key: "mobile", ...c.mobile, to: "platform" },
    ];
    if (step === "platform") return list;
    const head = hasNative && hasHybrid ? c.nativeHybrid : hasNative ? c.native : c.hybrid;
    list.push({ key: "head", ...head, to: "tech" });
    if (step === "tech") return list;
    list.push({ key: "project", ...c.project, to: "project" });
    if (step === "project") return list;
    list.push({ key: "details", ...c.details, to: "details" });
    return list;
  })();

  const onCrumb = (to: string) => {
    if (to === "start") {
      setPicks(EMPTY);
      go("platform");
      return;
    }
    go(to as Step);
  };

  /** The estimate as the plain text the enquiry endpoint stores as the lead's requirement. */
  const requirementText = () => {
    const list = (label: string, items: readonly string[]) => (items.length ? `${label}: ${items.join(", ")}` : "");
    return [
      "Mobile Developer",
      list("Platform", picks.platforms.map((k) => mobilePlatforms.find((p) => p.key === k)!.value)),
      list("Native", picks.native),
      list("Hybrid", picks.hybrid),
      list("Project Type", picks.projects),
      hasNew ? `New Project Details: ${picks.newNotes.trim()}` : "",
      hasExisting ? `Existing Project Details: ${picks.existingNotes.trim()}` : "",
      hasExisting ? `Project Completion: ${picks.percent}%` : "",
    ]
      .filter(Boolean)
      .join("\n");
  };

  const quick = (
    <SiteLink href={estimationButtons.quick.href} className={styles.quick}>
      {estimationButtons.quick.label}
    </SiteLink>
  );
  const proceedButton = (
    <button type="button" className={`${home.pillFilled} ${styles.proceed}`} disabled={!canProceed} onClick={proceed}>
      {estimationButtons.proceed}
    </button>
  );
  const actions = (
    <div className={styles.actions}>
      {proceedButton}
      {quick}
    </div>
  );

  const card = hasWeb ? mobileSummary.cardWebMobile : mobileSummary.cardMobile;

  return (
    <div className={styles.wizard}>
      <Crumbs items={crumbs} onSelect={onCrumb} />

      {step === "platform" && (
        <section className={styles.step}>
          <Heading as="h1">{mobileIntro.title}</Heading>
          <p className={styles.question}>{mobileIntro.question}</p>
          <div className={styles.tiles}>
            {mobilePlatforms.map((p) => (
              <Tile
                key={p.key}
                icon={p.icon}
                label={p.label}
                selected={picks.platforms.includes(p.key)}
                onToggle={() => setPicks((s) => ({ ...s, platforms: toggle(s.platforms, p.key) }))}
              />
            ))}
          </div>
          {actions}
        </section>
      )}

      {step === "tech" && (
        <>
          {showNative && (
            <section className={styles.step}>
              <Heading>{mobileNative.heading}</Heading>
              <div className={styles.tiles}>
                {mobileNative.techs.map((t) => (
                  <Tile
                    key={t.value}
                    icon={t.icon}
                    label={t.label}
                    selected={picks.native.includes(t.value)}
                    onToggle={() => setPicks((s) => ({ ...s, native: toggle(s.native, t.value) }))}
                  />
                ))}
              </div>
            </section>
          )}
          {showHybrid && (
            <section className={styles.step}>
              <Heading>{mobileHybrid.heading}</Heading>
              <div className={styles.tiles}>
                {mobileHybrid.techs.map((t) => (
                  <Tile
                    key={t.value}
                    icon={t.icon}
                    label={t.label}
                    selected={picks.hybrid.includes(t.value)}
                    onToggle={() => setPicks((s) => ({ ...s, hybrid: toggle(s.hybrid, t.value) }))}
                  />
                ))}
              </div>
            </section>
          )}
          {actions}
        </>
      )}

      {step === "project" && (
        <section className={styles.step}>
          <Heading>{mobileProject.title}</Heading>
          <div className={styles.tiles}>
            {mobileProject.options.map((o) => (
              <Tile
                key={o.value}
                icon={o.icon}
                label={o.label}
                selected={picks.projects.includes(o.value)}
                onToggle={() => setPicks((s) => ({ ...s, projects: toggle(s.projects, o.value) }))}
              />
            ))}
          </div>
          {actions}
        </section>
      )}

      {step === "details" && (
        <>
          {hasNew && (
            <section className={styles.step}>
              <Heading>{mobileDetails.newTitle}</Heading>
              <textarea
                className={styles.notes}
                rows={5}
                aria-label={mobileDetails.newTitle}
                value={picks.newNotes}
                onChange={(e) => setPicks((s) => ({ ...s, newNotes: e.target.value }))}
              />
            </section>
          )}
          {hasExisting && (
            <section className={styles.step}>
              <Heading>{mobileDetails.existingTitle}</Heading>
              <label className={styles.expRow}>
                <span>{mobileDetails.completionPrefix}</span>
                <select className={styles.select} value={picks.percent} onChange={(e) => setPicks((s) => ({ ...s, percent: e.target.value }))}>
                  {mobileDetails.percents.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <span>{mobileDetails.completionSuffix}</span>
              </label>
              <Heading>{mobileDetails.existingNotes}</Heading>
              <textarea
                className={styles.notes}
                rows={5}
                aria-label={mobileDetails.existingNotes}
                value={picks.existingNotes}
                onChange={(e) => setPicks((s) => ({ ...s, existingNotes: e.target.value }))}
              />
            </section>
          )}
          {actions}
        </>
      )}

      {step === "preview" && (
        <section className={styles.step}>
          <Heading>{mobileSummary.title}</Heading>
          <SummaryCard icon={"icon" in card ? card.icon : undefined} title={card.title}>
            <SummaryRow label={mobileSummary.developmentLabel}>
              {mobilePlatforms
                .filter((p) => picks.platforms.includes(p.key))
                .map((p) => (
                  <ChipIcon key={p.key} icon={mobileSummary.development[p.key].icon}>
                    {mobileSummary.development[p.key].label}
                  </ChipIcon>
                ))}
            </SummaryRow>
            {picks.native.length > 0 && (
              <SummaryRow label={mobileNative.summaryLabel}>
                {mobileNative.techs
                  .filter((t) => picks.native.includes(t.value))
                  .map((t) => (
                    <ChipIcon key={t.value} icon={t.preview.icon}>
                      {t.preview.label}
                    </ChipIcon>
                  ))}
              </SummaryRow>
            )}
            {picks.hybrid.length > 0 && (
              <SummaryRow label={mobileHybrid.summaryLabel}>
                {mobileHybrid.techs
                  .filter((t) => picks.hybrid.includes(t.value))
                  .map((t) => (
                    <ChipIcon key={t.value} icon={t.preview.icon}>
                      {t.preview.label}
                    </ChipIcon>
                  ))}
              </SummaryRow>
            )}
            <SummaryRow label={mobileSummary.projectTypeLabel}>
              {mobileProject.options
                .filter((o) => picks.projects.includes(o.value))
                .map((o) => (
                  <ChipIcon key={o.value} icon={o.preview.icon}>
                    {o.preview.label}
                  </ChipIcon>
                ))}
            </SummaryRow>
            {hasNew && (
              <SummaryRow label={mobileSummary.newNotesLabel}>
                <span className={styles.notesText}>{picks.newNotes}</span>
              </SummaryRow>
            )}
            {hasExisting && (
              <SummaryRow label={mobileSummary.existingNotesLabel}>
                <span className={styles.notesText}>{picks.existingNotes}</span>
              </SummaryRow>
            )}
            {hasExisting && (
              <SummaryRow label={mobileSummary.completionLabel}>
                <ChipIcon>
                  <strong>{picks.percent}</strong> {mobileDetails.completionSuffix}
                </ChipIcon>
              </SummaryRow>
            )}
          </SummaryCard>
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} onClick={() => go("fee")}>
              {estimationButtons.proceed}
            </button>
          </div>
        </section>
      )}

      {step === "fee" && <ContactStep requirement={requirementText} subject="Mobile App Estimation" sourceKey="mobile-app-estimation" />}
    </div>
  );
}
