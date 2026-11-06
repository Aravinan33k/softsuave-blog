"use client";

import { useMemo, useState } from "react";
import { SiteLink } from "@/themes/softsuave/site-link";
import { ChipIcon, ContactStep, Crumbs, Heading, SummaryCard, SummaryRow, Tile, toggle } from "./estimation-parts";
import {
  estimationBilling,
  estimationButtons,
  estimationCrumbs,
  estimationEvaluate,
  estimationExperience,
  estimationIntro,
  estimationRoleHeading,
  estimationRoles,
  estimationSummary,
  estimationTechOrder,
  estimationTypes,
  type GroupKey,
  type RoleOption,
  type TypeKey,
} from "@/lib/home/developer-estimation-content";
import home from "@/components/home/home.module.css";
import styles from "./developer-estimation.module.css";

type Step = "developer" | "roles" | "tech" | "exp" | "technical" | "billing" | "preview" | "fee";

const ALL_ROLES: readonly RoleOption[] = [...estimationRoles.mobile, ...estimationRoles.web];
const roleOf = (key: GroupKey) => ALL_ROLES.find((r) => r.key === key)!;
const typeOfRole = (key: GroupKey): TypeKey => (estimationRoles.web.some((r) => r.key === key) ? "web" : "mobile");

type Picks = {
  types: TypeKey[];
  roles: GroupKey[];
  techs: Partial<Record<GroupKey, string[]>>;
  years: string;
  interview: string;
  billing: string;
};

const EMPTY: Picks = { types: [], roles: [], techs: {}, years: "1+", interview: "", billing: "" };

export default function EstimationWizard() {
  const [step, setStep] = useState<Step>("developer");
  const [picks, setPicks] = useState<Picks>(EMPTY);
  /** After Proceed with a gap, only the rows still missing a choice stay open (as on the live page). */
  const [only, setOnly] = useState<GroupKey[] | null>(null);
  /** After Proceed on the role step with a type left unanswered, only that type's roles stay open. */
  const [missingTypes, setMissingTypes] = useState<TypeKey[] | null>(null);

  const hasWeb = picks.types.includes("web");
  const hasMobile = picks.types.includes("mobile");

  const roleGroups = useMemo(() => {
    const out: { type: TypeKey; roles: readonly RoleOption[] }[] = [];
    if (hasMobile) out.push({ type: "mobile", roles: estimationRoles.mobile });
    if (hasWeb) out.push({ type: "web", roles: estimationRoles.web });
    return out;
  }, [hasMobile, hasWeb]);

  const chosenRoles = useMemo(() => estimationTechOrder.filter((k) => picks.roles.includes(k)), [picks.roles]);
  const shownRoles = only ? chosenRoles.filter((k) => only.includes(k)) : chosenRoles;

  const go = (next: Step) => {
    setStep(next);
    setOnly(null);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  };

  /** Roles of a type that were picked. */
  const rolesOfType = (type: TypeKey) => picks.roles.filter((r) => typeOfRole(r) === type);

  const canProceed = (() => {
    switch (step) {
      case "developer":
        return picks.types.length > 0;
      case "roles":
        return roleGroups.some((g) => rolesOfType(g.type).length > 0);
      case "tech":
        return shownRoles.some((k) => (picks.techs[k] ?? []).length > 0);
      default:
        return true;
    }
  })();

  const proceed = () => {
    if (step === "developer") {
      setPicks((p) => ({ ...p, roles: p.roles.filter((r) => p.types.includes(typeOfRole(r))) }));
      go("roles");
    } else if (step === "roles") {
      const missing = roleGroups.filter((g) => rolesOfType(g.type).length === 0).map((g) => g.type);
      if (missing.length) {
        setMissingTypes(missing);
        return;
      }
      setMissingTypes(null);
      go("tech");
    } else if (step === "tech") {
      const missing = chosenRoles.filter((k) => (picks.techs[k] ?? []).length === 0);
      if (missing.length) {
        setOnly(missing);
        return;
      }
      go("exp");
    }
  };


  const crumbs = (() => {
    const c = estimationCrumbs;
    const list: { key: string; icon: string; label: string; to: Step | "start" }[] = [
      { key: "est", ...c.estimation, to: "start" },
      { key: "dev", ...c.developer, to: "developer" },
    ];
    if (step === "developer") return list;
    const both = hasWeb && hasMobile;
    const head = both ? c.webMobile : hasWeb ? c.web : c.mobile;
    list.push({ key: "head", ...head, to: "roles" });
    if (step === "roles") return list;
    if (both) list.push({ key: "tech", ...c.technology, to: "tech" });
    else chosenRoles.forEach((k) => list.push({ key: k, icon: roleOf(k).smallIcon, label: roleOf(k).crumb, to: "tech" }));
    if (step === "tech") return list;
    list.push({ key: "exp", ...c.experience, to: "exp" });
    return list;
  })();

  const onCrumb = (to: Step | "start") => {
    if (to === "start") {
      setPicks(EMPTY);
      setMissingTypes(null);
      go("developer");
      return;
    }
    setMissingTypes(null);
    go(to);
  };

  const summaryCards = (["web", "mobile"] as const).filter((t) => picks.types.includes(t));

  const payload = () => ({
    desire_content: "Hire Developer",
    developer: picks.types.map((t) => estimationTypes.find((x) => x.key === t)!.value),
    webdeveloper: estimationRoles.web.filter((r) => picks.roles.includes(r.key)).map((r) => r.value),
    mobiledeveloper: estimationRoles.mobile.filter((r) => picks.roles.includes(r.key)).map((r) => r.value),
    frontend: hasWeb && picks.roles.includes("frontend") ? (picks.techs.frontend ?? []) : [],
    backend: hasWeb && picks.roles.includes("backend") ? (picks.techs.backend ?? []) : [],
    fullstack: hasWeb && picks.roles.includes("fullstack") ? (picks.techs.fullstack ?? []) : [],
    android: hasMobile && picks.roles.includes("android") ? (picks.techs.android ?? []) : [],
    apple: hasMobile && picks.roles.includes("ios") ? (picks.techs.ios ?? []) : [],
    hybrid: hasMobile && picks.roles.includes("hybrid") ? (picks.techs.hybrid ?? []) : [],
    billtype: picks.billing,
    interview: picks.interview,
    expyear: picks.years.replace("+", ""),
  });

  /** The estimate as the plain text the enquiry endpoint stores as the lead's requirement. */
  const requirementText = () => {
    const d = payload();
    const line = (label: string, list: readonly string[]) => (list.length ? `${label}: ${list.join(", ")}` : "");
    return [
      d.desire_content,
      line("Developer", d.developer),
      line("Web roles", d.webdeveloper),
      line("Frontend", d.frontend),
      line("Backend", d.backend),
      line("Fullstack", d.fullstack),
      line("Mobile roles", d.mobiledeveloper),
      line("Android", d.android),
      line("iOS", d.apple),
      line("Hybrid", d.hybrid),
      `Experience: ${picks.years} years`,
      `Interview: ${d.interview}`,
      `Billing Type: ${d.billtype}`,
    ]
      .filter(Boolean)
      .join("\n");
  };

  const showProceed = step === "developer" || step === "roles" || step === "tech";
  const quick = (
    <SiteLink href={estimationButtons.quick.href} className={styles.quick}>
      {estimationButtons.quick.label}
    </SiteLink>
  );

  return (
    <div className={styles.wizard}>
      <Crumbs items={crumbs} onSelect={(to) => onCrumb(to as Step | "start")} />

      {step === "developer" && (
        <section className={styles.step}>
          <Heading as="h1">{estimationIntro.title}</Heading>
          <p className={styles.question}>{estimationIntro.question}</p>
          <div className={styles.tiles}>
            {estimationTypes.map((t) => (
              <Tile
                key={t.key}
                icon={t.icon}
                label={t.label}
                selected={picks.types.includes(t.key)}
                onToggle={() => setPicks((p) => ({ ...p, types: toggle(p.types, t.key) }))}
              />
            ))}
          </div>
        </section>
      )}

      {step === "roles" &&
        roleGroups
          .filter((g) => !missingTypes || missingTypes.includes(g.type))
          .map((g) => (
            <section key={g.type} className={styles.step}>
              <Heading>{estimationRoleHeading[g.type]}</Heading>
              <div className={styles.tiles}>
                {g.roles.map((r) => (
                  <Tile
                    key={r.key}
                    icon={r.icon}
                    label={r.label}
                    selected={picks.roles.includes(r.key)}
                    onToggle={() => setPicks((p) => ({ ...p, roles: toggle(p.roles, r.key) }))}
                  />
                ))}
              </div>
            </section>
          ))}

      {step === "tech" &&
        shownRoles.map((k) => {
          const role = roleOf(k);
          const sel = picks.techs[k] ?? [];
          return (
            <section key={k} className={styles.step}>
              <Heading>{role.heading}</Heading>
              <div className={`${styles.tiles} ${styles.tilesWrap}`}>
                {role.techs.map((tech) => (
                  <Tile
                    key={tech.value}
                    icon={tech.icon}
                    label={tech.label}
                    selected={sel.includes(tech.value)}
                    onToggle={() => setPicks((p) => ({ ...p, techs: { ...p.techs, [k]: toggle(p.techs[k] ?? [], tech.value) } }))}
                  />
                ))}
              </div>
            </section>
          );
        })}

      {showProceed && (
        <div className={styles.actions}>
          <button type="button" className={`${home.pillFilled} ${styles.proceed}`} disabled={!canProceed} onClick={proceed}>
            {estimationButtons.proceed}
          </button>
          {step !== "developer" && quick}
          {step === "developer" && quick}
        </div>
      )}

      {step === "exp" && (
        <section className={styles.step}>
          <Heading>{estimationExperience.title}</Heading>
          <label className={styles.expRow}>
            <span>{estimationExperience.prompt}</span>
            <select className={styles.select} value={picks.years} onChange={(e) => setPicks((p) => ({ ...p, years: e.target.value }))}>
              {estimationExperience.years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} onClick={() => go("technical")}>
              {estimationButtons.proceed}
            </button>
            {quick}
          </div>
        </section>
      )}

      {step === "technical" && (
        <section className={styles.step}>
          <Heading>{estimationEvaluate.title}</Heading>
          <div className={styles.tiles}>
            {estimationEvaluate.options.map((o) => (
              <Tile key={o.value} icon={o.icon} label={o.label} selected={picks.interview === o.value} onToggle={() => setPicks((p) => ({ ...p, interview: o.value }))} />
            ))}
          </div>
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} disabled={!picks.interview} onClick={() => go("billing")}>
              {estimationButtons.proceed}
            </button>
            {quick}
          </div>
        </section>
      )}

      {step === "billing" && (
        <section className={styles.step}>
          <Heading>{estimationBilling.title}</Heading>
          <div className={styles.tiles}>
            {estimationBilling.options.map((o) => (
              <Tile key={o.value} icon={o.icon} label={o.label} selected={picks.billing === o.value} onToggle={() => setPicks((p) => ({ ...p, billing: o.value }))} />
            ))}
          </div>
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} disabled={!picks.billing} onClick={() => go("preview")}>
              {estimationButtons.proceed}
            </button>
            {quick}
          </div>
        </section>
      )}

      {step === "preview" && (
        <section className={styles.step}>
          <Heading>{estimationSummary.title}</Heading>
          {summaryCards.map((type) => {
            const card = estimationSummary.cards[type];
            const roles = estimationRoles[type].filter((r) => picks.roles.includes(r.key));
            const interview = picks.interview === "Yes" ? estimationSummary.interview.technical : estimationSummary.interview.trial;
            const billing = estimationSummary.billing[picks.billing as "Hourly" | "Monthly"];
            return (
              <SummaryCard key={type} icon={card.icon} title={card.title}>
                <SummaryRow label={estimationSummary.roleLabel}>
                  {roles.map((r) => (
                    <ChipIcon key={r.key} icon={r.smallIcon}>
                      {r.crumb}
                    </ChipIcon>
                  ))}
                </SummaryRow>
                {roles.map((r) => (
                  <SummaryRow key={r.key} label={r.summaryLabel}>
                    {r.techs
                      .filter((t) => (picks.techs[r.key] ?? []).includes(t.value))
                      .map((t) => (
                        <ChipIcon key={t.value} icon={t.preview.icon}>
                          {t.preview.label}
                        </ChipIcon>
                      ))}
                  </SummaryRow>
                ))}
                <SummaryRow label={estimationSummary.experienceLabel}>
                  <ChipIcon>
                    <strong>{picks.years}</strong> {estimationSummary.yearsWord}
                  </ChipIcon>
                </SummaryRow>
                <SummaryRow label={estimationSummary.interviewLabel}>
                  <ChipIcon icon={interview.icon}>{interview.label}</ChipIcon>
                </SummaryRow>
                <SummaryRow label={estimationSummary.billingLabel}>
                  <ChipIcon icon={billing.icon}>{billing.label}</ChipIcon>
                </SummaryRow>
              </SummaryCard>
            );
          })}
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} onClick={() => go("fee")}>
              {estimationButtons.proceed}
            </button>
          </div>
        </section>
      )}

      {step === "fee" && <ContactStep requirement={requirementText} subject="Developer Estimation" sourceKey="developer-estimation" />}
    </div>
  );
}
