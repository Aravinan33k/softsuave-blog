"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { appPath } from "@/lib/media-url";
import { THANK_YOU_PATH } from "@/lib/forms/thank-you";
import { SiteLink } from "@/themes/softsuave/site-link";
import FieldIcon, { RequiredMark } from "@/components/common/field-icon";
import PhoneField from "@/components/common/phone-field";
import fx from "@/components/common/enquiry-form.module.css";
import { emailError, nameError, phoneError } from "@/lib/forms/enquiry-rules";
import {
  estimationBilling,
  estimationButtons,
  estimationContact,
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

/** Toggle a value in a list, keeping the order it was first added. */
const toggle = <T,>(list: readonly T[], v: T): T[] => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function Tile({
  icon,
  label,
  selected,
  onToggle,
  small,
}: {
  icon: string;
  label: string;
  selected: boolean;
  onToggle: () => void;
  small?: boolean;
}) {
  return (
    <button
      type="button"
      className={`${styles.tile} ${selected ? styles.tileOn : ""} ${small ? styles.tileSm : ""}`}
      aria-pressed={selected}
      onClick={onToggle}
    >
      <span className={styles.tileCard}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" width={64} height={64} />
      </span>
      <span className={styles.tileLabel}>{label}</span>
    </button>
  );
}

function Heading({ children, as: Tag = "h3" }: { children: string; as?: "h1" | "h3" }) {
  return (
    <div className={`${styles.head} ${Tag === "h1" ? styles.headTight : ""}`}>
      <Tag className={Tag === "h1" ? styles.h1 : styles.h3}>{children}</Tag>
    </div>
  );
}

function Crumb({ icon, label, active, onClick }: { icon: string; label: string; active: boolean; onClick: () => void }) {
  return (
    <li className={`${styles.crumb} ${active ? styles.crumbOn : ""}`}>
      <button type="button" onClick={onClick} aria-current={active ? "step" : undefined}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={icon} alt="" width={22} height={22} />
        {label}
      </button>
    </li>
  );
}

export default function EstimationWizard() {
  const [step, setStep] = useState<Step>("developer");
  const [picks, setPicks] = useState<Picks>(EMPTY);
  /** After Proceed with a gap, only the rows still missing a choice stay open (as on the live page). */
  const [only, setOnly] = useState<GroupKey[] | null>(null);
  /** After Proceed on the role step with a type left unanswered, only that type's roles stay open. */
  const [missingTypes, setMissingTypes] = useState<TypeKey[] | null>(null);

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; phone?: string }>({});

  const router = useRouter();
  const pathname = usePathname();
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");
  const [sendError, setSendError] = useState<string | null>(null);
  const crumbList = useRef<HTMLOListElement | null>(null);
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

  // On a narrow screen the trail scrolls; keep the current step in view.
  useEffect(() => {
    const el = crumbList.current;
    if (el) el.scrollLeft = el.scrollWidth;
  }, [step, crumbs.length]);

  const summaryCards = (["web", "mobile"] as const).filter((t) => picks.types.includes(t));

  const payload = () => ({
    name: form.name,
    email: form.email,
    phone: form.phone.replace(/^\+/, ""),
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

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next = { name: nameError(form.name) ?? undefined, email: emailError(form.email) ?? undefined, phone: phoneError(form.phone) ?? undefined };
    setErrors(next);
    if (next.name || next.email || next.phone) return;

    setStatus("sending");
    setSendError(null);
    try {
      // `appPath`, not a bare "/api/…": `fetch` does not pick up `basePath`.
      const res = await fetch(appPath("/api/v1/enquiry"), {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          requirement: requirementText(),
          website,
          subject: "Developer Estimation",
          sourcePath: pathname,
          sourceKey: "developer-estimation",
        }),
      });
      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        throw new Error(
          detail?.error?.message ??
            (res.status === 429 ? "Too many attempts. Please wait a minute and try again." : "Something went wrong. Please try again."),
        );
      }
      router.push(THANK_YOU_PATH);
    } catch (err) {
      setStatus("error");
      setSendError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  const msg = (k: "name" | "email" | "phone") =>
    errors[k] ? (
      <p id={`est-${k}-error`} className={fx.fieldMessage}>
        {errors[k]}
      </p>
    ) : null;

  const showProceed = step === "developer" || step === "roles" || step === "tech";
  const quick = (
    <SiteLink href={estimationButtons.quick.href} className={styles.quick}>
      {estimationButtons.quick.label}
    </SiteLink>
  );

  return (
    <div className={styles.wizard}>
      <nav aria-label="breadcrumb" className={styles.crumbs}>
        <ol ref={crumbList}>
          {crumbs.map((c, i) => (
            <Crumb key={c.key} icon={c.icon} label={c.label} active={i === crumbs.length - 1} onClick={() => onCrumb(c.to)} />
          ))}
        </ol>
      </nav>

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
            return (
              <div key={type} className={styles.summary}>
                <div className={styles.summaryHead}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={card.icon} alt="" width={28} height={28} />
                  {card.title}
                </div>
                <dl className={styles.summaryBody}>
                  <div className={styles.summaryRow}>
                    <dt>{estimationSummary.roleLabel}</dt>
                    <dd>
                      {roles.map((r) => (
                        <span key={r.key} className={styles.chipIcon}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={r.smallIcon} alt="" width={26} height={26} />
                          {r.crumb}
                        </span>
                      ))}
                    </dd>
                  </div>
                  {roles.map((r) => (
                    <div key={r.key} className={styles.summaryRow}>
                      <dt>{r.summaryLabel}</dt>
                      <dd>
                        {r.techs
                          .filter((t) => (picks.techs[r.key] ?? []).includes(t.value))
                          .map((t) => (
                            <span key={t.value} className={styles.chipIcon}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={t.preview.icon} alt="" width={26} height={26} />
                              {t.preview.label}
                            </span>
                          ))}
                      </dd>
                    </div>
                  ))}
                  <div className={styles.summaryRow}>
                    <dt>{estimationSummary.experienceLabel}</dt>
                    <dd>
                      <span className={styles.chipIcon}>
                        <strong>{picks.years}</strong> {estimationSummary.yearsWord}
                      </span>
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt>{estimationSummary.interviewLabel}</dt>
                    <dd>
                      {(() => {
                        const v = picks.interview === "Yes" ? estimationSummary.interview.technical : estimationSummary.interview.trial;
                        return (
                          <span className={styles.chipIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={v.icon} alt="" width={26} height={26} />
                            {v.label}
                          </span>
                        );
                      })()}
                    </dd>
                  </div>
                  <div className={styles.summaryRow}>
                    <dt>{estimationSummary.billingLabel}</dt>
                    <dd>
                      {(() => {
                        const v = estimationSummary.billing[picks.billing as "Hourly" | "Monthly"];
                        return (
                          <span className={styles.chipIcon}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={v.icon} alt="" width={26} height={26} />
                            {v.label}
                          </span>
                        );
                      })()}
                    </dd>
                  </div>
                </dl>
              </div>
            );
          })}
          <div className={styles.actions}>
            <button type="button" className={`${home.pillFilled} ${styles.proceed}`} onClick={() => go("fee")}>
              {estimationButtons.proceed}
            </button>
          </div>
        </section>
      )}

      {step === "fee" && (
        <section className={styles.step}>
          <Heading>{estimationContact.title}</Heading>
          <div className={styles.contact}>
            <div className={`${fx.card} ${styles.contactCard}`}>
              <form className={fx.fields} onSubmit={onSubmit} noValidate>
                <div className={fx.honeypot} aria-hidden>
                  <label htmlFor="est-website">Website</label>
                  <input id="est-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
                </div>
                <div className={`${fx.field} ${errors.name ? fx.fieldInvalid : ""}`}>
                  <FieldIcon name="person" />
                  <input
                    id="est-name"
                    className={fx.input}
                    type="text"
                    name="name"
                    autoComplete="name"
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    aria-invalid={errors.name ? true : undefined}
                    aria-describedby={errors.name ? "est-name-error" : undefined}
                    placeholder=" "
                  />
                  <label className={fx.label} htmlFor="est-name">
                    <RequiredMark />
                    {estimationContact.nameLabel}
                  </label>
                  {msg("name")}
                </div>
                <div className={`${fx.field} ${errors.email ? fx.fieldInvalid : ""}`}>
                  <FieldIcon name="mail" />
                  <input
                    id="est-email"
                    className={fx.input}
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "est-email-error" : undefined}
                    placeholder=" "
                  />
                  <label className={fx.label} htmlFor="est-email">
                    <RequiredMark />
                    {estimationContact.emailLabel}
                  </label>
                  {msg("email")}
                </div>
                <div className={`${fx.field} ${errors.phone ? fx.fieldInvalid : ""}`}>
                  <FieldIcon name="phone" />
                  <PhoneField
                    id="est-phone"
                    value={form.phone}
                    onChange={(phone) => setForm((f) => ({ ...f, phone }))}
                    invalid={Boolean(errors.phone)}
                    describedBy={errors.phone ? "est-phone-error" : undefined}
                  />
                  <label className={`${fx.label} ${fx.labelFloat}`} htmlFor="est-phone">
                    <RequiredMark />
                    {estimationContact.phoneLabel}
                  </label>
                  {msg("phone")}
                </div>
                {status === "error" && sendError && (
                  <p className={fx.error} role="alert">
                    {sendError}
                  </p>
                )}
                <button type="submit" className={`${home.pillFilled} ${styles.submit}`} disabled={status === "sending"}>
                  {estimationContact.submit}
                </button>
              </form>
            </div>
            <div className={styles.contactArt}>
              <Image src={estimationContact.image} alt="" width={640} height={460} unoptimized />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
