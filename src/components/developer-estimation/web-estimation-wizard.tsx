"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SiteLink } from "@/themes/softsuave/site-link";
import { navRoute } from "@/themes/softsuave/nav-data";
import { estimationButtons } from "@/lib/home/developer-estimation-content";
import { mobileProject } from "@/lib/home/mobile-app-estimation-content";
import {
  webEstimationCrumbs,
  webEstimationDetails,
  webEstimationMobilePath,
  webEstimationProject,
  webEstimationSummary,
} from "@/lib/home/web-app-estimation-content";
import home from "@/components/home/home.module.css";
import { ChipIcon, ContactStep, Crumbs, Heading, SummaryCard, SummaryRow, Tile, toggle, type CrumbItem } from "./estimation-parts";
import styles from "./developer-estimation.module.css";

type Step = "project" | "details" | "preview" | "fee";

export default function WebEstimationWizard() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("project");
  const [projects, setProjects] = useState<string[]>([]);
  const [newNotes, setNewNotes] = useState("");
  const [existingNotes, setExistingNotes] = useState("");
  const [percent, setPercent] = useState("10");

  const hasNew = projects.includes("New");
  const hasExisting = projects.includes("Existing");

  const go = (next: Step) => {
    setStep(next);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  const canProceed =
    step === "project"
      ? projects.length > 0
      : step === "details"
        ? (!hasNew || newNotes.trim() !== "") && (!hasExisting || existingNotes.trim() !== "")
        : true;

  const proceed = () => {
    if (step === "project") go("details");
    else if (step === "details") go("preview");
  };

  const c = webEstimationCrumbs;
  const crumbs: CrumbItem[] = [
    { key: "mobile", ...c.mobile, to: "mobile" },
    { key: "project", ...c.project, to: "project" },
    ...(step === "project" ? [] : [{ key: "details", ...c.details, to: "details" }]),
  ];

  const onCrumb = (to: string) => {
    if (to === "mobile") {
      router.push(navRoute(webEstimationMobilePath));
      return;
    }
    go(to as Step);
  };

  /** The estimate as the plain text the enquiry endpoint stores as the lead's requirement. */
  const requirementText = () =>
    [
      "Web Developer",
      `Project Type: ${projects.join(", ")}`,
      hasNew ? `New Project Details: ${newNotes.trim()}` : "",
      hasExisting ? `Existing Project Details: ${existingNotes.trim()}` : "",
      hasExisting ? `Project Completion: ${percent}%` : "",
    ]
      .filter(Boolean)
      .join("\n");

  const actions = (
    <div className={styles.actions}>
      <button type="button" className={`${home.pillFilled} ${styles.proceed}`} disabled={!canProceed} onClick={proceed}>
        {estimationButtons.proceed}
      </button>
      <SiteLink href={estimationButtons.quick.href} className={styles.quick}>
        {estimationButtons.quick.label}
      </SiteLink>
    </div>
  );

  return (
    <div className={styles.wizard}>
      <Crumbs items={crumbs} onSelect={onCrumb} />

      {step === "project" && (
        <section className={styles.step}>
          <Heading as="h1">{webEstimationProject.title}</Heading>
          <p className={styles.question}>{webEstimationProject.question}</p>
          <div className={styles.tiles}>
            {mobileProject.options.map((o) => (
              <Tile key={o.value} icon={o.icon} label={o.label} selected={projects.includes(o.value)} onToggle={() => setProjects((p) => toggle(p, o.value))} />
            ))}
          </div>
          {actions}
        </section>
      )}

      {step === "details" && (
        <>
          {hasNew && (
            <section className={styles.step}>
              <Heading>{webEstimationDetails.newTitle}</Heading>
              <textarea className={styles.notes} rows={5} aria-label={webEstimationDetails.newTitle} value={newNotes} onChange={(e) => setNewNotes(e.target.value)} />
            </section>
          )}
          {hasExisting && (
            <section className={styles.step}>
              <Heading>{webEstimationDetails.existingTitle}</Heading>
              <label className={styles.expRow}>
                <span>{webEstimationDetails.completionPrefix}</span>
                <select className={styles.select} value={percent} onChange={(e) => setPercent(e.target.value)}>
                  {webEstimationDetails.percents.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <span>{webEstimationDetails.completionSuffix}</span>
              </label>
              <Heading>{webEstimationDetails.existingNotes}</Heading>
              <textarea
                className={styles.notes}
                rows={5}
                aria-label={webEstimationDetails.existingNotes}
                value={existingNotes}
                onChange={(e) => setExistingNotes(e.target.value)}
              />
            </section>
          )}
          {actions}
        </>
      )}

      {step === "preview" && (
        <section className={styles.step}>
          <Heading>{webEstimationSummary.title}</Heading>
          <SummaryCard icon={webEstimationSummary.card.icon} title={webEstimationSummary.card.title}>
            <SummaryRow label={webEstimationSummary.projectTypeLabel}>
              {mobileProject.options
                .filter((o) => projects.includes(o.value))
                .map((o) => (
                  <ChipIcon key={o.value} icon={o.preview.icon}>
                    {o.preview.label}
                  </ChipIcon>
                ))}
            </SummaryRow>
            {hasNew && (
              <SummaryRow label={webEstimationSummary.newNotesLabel}>
                <span className={styles.notesText}>{newNotes}</span>
              </SummaryRow>
            )}
            {hasExisting && (
              <SummaryRow label={webEstimationSummary.existingNotesLabel}>
                <span className={styles.notesText}>{existingNotes}</span>
              </SummaryRow>
            )}
            {hasExisting && (
              <SummaryRow label={webEstimationSummary.completionLabel}>
                <ChipIcon>
                  <strong>{percent}</strong> {webEstimationDetails.completionSuffix}
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

      {step === "fee" && <ContactStep requirement={requirementText} subject="Web Estimation" sourceKey="test-web-est" />}
    </div>
  );
}
