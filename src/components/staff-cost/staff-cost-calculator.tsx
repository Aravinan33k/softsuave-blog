"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Calculator, ChevronDown, ChevronUp, CircleDollarSign, Share2, SlidersHorizontal, UserPlus, Users, X } from "lucide-react";
import { emailError, nameError } from "@/lib/forms/enquiry-rules";
import {
  DAYS_PER_UNIT,
  HOURS_PER_DAY,
  staffCostExperience,
  staffCostLabels as L,
  staffCostRoles,
  staffCostShare as S,
} from "@/lib/home/staff-cost-calculator-content";
import home from "@/components/home/home.module.css";
import styles from "./staff-cost-calculator.module.css";

type Unit = keyof typeof DAYS_PER_UNIT;
type Dev = { id: number; role: string; exp: string; tech: string };
type Option = { value: string; label: string; icon?: ReactNode };

const money = (n: number) => `$${n.toLocaleString("en-US")}`;

/** A listbox dropdown whose options carry a small icon. Keyboard: arrows, Enter, Escape. */
function Select({
  label,
  value,
  options,
  placeholder,
  disabled,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly Option[];
  placeholder: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLDivElement | null>(null);
  const id = useId();
  const current = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const choose = (v: string) => {
    onChange(v);
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === "Escape") return setOpen(false);
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!open) {
        setActive(Math.max(0, options.findIndex((o) => o.value === value)));
        return setOpen(true);
      }
      setActive((i) => (e.key === "ArrowDown" ? Math.min(options.length - 1, i + 1) : Math.max(0, i - 1)));
    }
    if ((e.key === "Enter" || e.key === " ") && open) {
      e.preventDefault();
      choose(options[active].value);
    }
  };

  return (
    <div className={`${styles.select} ${disabled ? styles.selectDisabled : ""}`} ref={root} onKeyDown={onKey}>
      <button
        type="button"
        className={styles.selectButton}
        aria-label={label}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        disabled={disabled}
        onClick={() => {
          setActive(Math.max(0, options.findIndex((o) => o.value === value)));
          setOpen((o) => !o);
        }}
      >
        <span className={`${styles.selectValue} ${current ? "" : styles.selectPlaceholder}`}>
          {current?.icon}
          {current ? current.label : placeholder}
        </span>
        <ChevronDown className={`${styles.caret} ${open ? styles.caretOpen : ""}`} aria-hidden size={16} />
      </button>
      {open && (
        <ul className={styles.options} role="listbox" id={`${id}-list`} aria-label={label}>
          {options.map((o, i) => (
            <li
              key={o.value}
              role="option"
              aria-selected={o.value === value}
              className={`${styles.option} ${i === active ? styles.optionActive : ""} ${o.value === value ? styles.optionOn : ""}`}
              onPointerEnter={() => setActive(i)}
              onClick={() => choose(o.value)}
            >
              {o.icon}
              {o.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CardHead({ icon, title, subtitle, small }: { icon: ReactNode; title: string; subtitle: string; small?: boolean }) {
  return (
    <div className={`${styles.cardHead} ${small ? styles.cardHeadSm : ""}`}>
      <span className={styles.badge}>{icon}</span>
      <div>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardSub}>{subtitle}</p>
      </div>
    </div>
  );
}

/** `marks` are the site's own technology logos, drawn on the server and keyed by technology name. */
export default function StaffCostCalculator({ marks }: { marks: Readonly<Record<string, ReactNode>> }) {
  const nextId = useRef(2);
  const [duration, setDuration] = useState("4");
  const [unit, setUnit] = useState<Unit>("weeks");
  const [devs, setDevs] = useState<Dev[]>([{ id: 1, role: "", exp: "", tech: "" }]);
  const [shareOpen, setShareOpen] = useState(false);

  const count = devs.length;
  const setCount = (n: number) => {
    const target = Math.max(0, Math.floor(n) || 0);
    setDevs((list) => {
      if (target <= list.length) return list.slice(0, target);
      const extra = Array.from({ length: target - list.length }, () => ({ id: nextId.current++, role: "", exp: "", tech: "" }));
      return [...list, ...extra];
    });
  };
  const patch = (id: number, change: Partial<Dev>) => setDevs((list) => list.map((d) => (d.id === id ? { ...d, ...change } : d)));

  const totalDays = (parseInt(duration, 10) || 1) * DAYS_PER_UNIT[unit];

  const rows = useMemo(
    () =>
      devs.flatMap((d, i) => {
        const exp = staffCostExperience.find((e) => e.value === d.exp);
        if (!d.role || !exp) return [];
        const rate = exp.rate;
        const daily = rate * HOURS_PER_DAY;
        return [{ n: i + 1, role: d.role, tech: d.tech, exp: d.exp, rate, daily, total: daily * totalDays }];
      }),
    [devs, totalDays],
  );
  const total = rows.reduce((sum, r) => sum + r.total, 0);

  const roleOptions: Option[] = staffCostRoles.map((r) => ({
    value: r.value,
    label: r.value,
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src={r.icon} alt="" width={16} height={16} className={styles.optIcon} />,
  }));
  const expOptions: Option[] = staffCostExperience.map((e) => ({
    value: e.value,
    label: e.label,
    // eslint-disable-next-line @next/next/no-img-element
    icon: <img src={e.icon} alt="" width={16} height={16} className={styles.optIcon} />,
  }));
  const techOptions = (role: string): Option[] =>
    (staffCostRoles.find((r) => r.value === role)?.techs ?? []).map((t) => ({
      value: t,
      label: t,
      icon: <span className={styles.optMark}>{marks[t]}</span>,
    }));

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.main}>
          <section className={styles.card}>
            <CardHead icon={<SlidersHorizontal size={18} aria-hidden />} title={L.project.title} subtitle={L.project.subtitle} />
            <div className={styles.configGrid}>
              <div className={styles.stat}>
                <span className={styles.statLabel}>
                  <i className={styles.pulse} aria-hidden />
                  {L.workingHours.label}
                </span>
                <p className={styles.statValue}>{L.workingHours.value}</p>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sc-duration">
                  {L.duration.label}
                </label>
                <div className={styles.durationRow}>
                  <input
                    id="sc-duration"
                    className={styles.input}
                    type="number"
                    min={1}
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                  />
                  <Select
                    label={L.duration.label}
                    value={unit}
                    options={L.duration.units}
                    placeholder=""
                    onChange={(v) => setUnit(v as Unit)}
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="sc-count">
                  {L.developers.label}
                </label>
                <div className={styles.stepper}>
                  <input
                    id="sc-count"
                    className={styles.input}
                    type="number"
                    min={1}
                    value={count}
                    onChange={(e) => setCount(parseInt(e.target.value, 10))}
                  />
                  <span className={styles.stepButtons}>
                    <button type="button" aria-label="Increase" onClick={() => setCount(count + 1)}>
                      <ChevronUp size={14} aria-hidden />
                    </button>
                    <button type="button" aria-label="Decrease" onClick={() => setCount(count - 1)}>
                      <ChevronDown size={14} aria-hidden />
                    </button>
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className={styles.card}>
            <CardHead icon={<Users size={18} aria-hidden />} title={L.team.title} subtitle={L.team.subtitle} />
            <div className={styles.devList}>
              {devs.map((d, i) => (
                <div key={d.id} className={styles.dev}>
                  <div className={styles.devHead}>
                    <span className={styles.devTitle}>
                      <span className={styles.index}>{i + 1}</span>
                      <h4>{`${L.developer} ${i + 1}`}</h4>
                    </span>
                    <button type="button" className={styles.remove} aria-label={`Remove ${L.developer} ${i + 1}`} onClick={() => setCount(count - 1)}>
                      <X size={16} aria-hidden />
                    </button>
                  </div>
                  <div className={styles.devGrid}>
                    <div className={styles.field}>
                      <span className={styles.label}>{L.role.label}</span>
                      <Select
                        label={L.role.label}
                        value={d.role}
                        options={roleOptions}
                        placeholder={L.role.placeholder}
                        onChange={(v) => patch(d.id, { role: v, tech: "" })}
                      />
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>{L.experience.label}</span>
                      <Select
                        label={L.experience.label}
                        value={d.exp}
                        options={expOptions}
                        placeholder={L.experience.placeholder}
                        onChange={(v) => patch(d.id, { exp: v })}
                      />
                    </div>
                    <div className={styles.field}>
                      <span className={styles.label}>{L.technology.label}</span>
                      <Select
                        label={L.technology.label}
                        value={d.tech}
                        options={techOptions(d.role)}
                        placeholder={L.technology.placeholder}
                        disabled={!d.role}
                        onChange={(v) => patch(d.id, { tech: v })}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <aside className={`${styles.card} ${styles.summary}`}>
          <CardHead small icon={<Calculator size={16} aria-hidden />} title={L.summary.title} subtitle={L.summary.subtitle} />
          <div className={styles.total}>
            <h3 className={styles.totalLabel}>
              <CircleDollarSign size={20} aria-hidden />
              {L.total}
            </h3>
            <div className={styles.totalAmount} aria-live="polite">
              {money(total)}
            </div>
          </div>
          <button type="button" className={`${home.pillFilled} ${styles.share}`} onClick={() => setShareOpen(true)}>
            <Share2 size={16} aria-hidden />
            {L.share}
          </button>

          {rows.length === 0 ? (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>
                <UserPlus size={20} aria-hidden />
              </span>
              <p>{L.empty}</p>
            </div>
          ) : (
            <div className={styles.breakdown}>
              {rows.map((r) => (
                <div key={r.n}>
                  <h4 className={styles.rowTitle}>
                    <span className={styles.index}>{r.n}</span>
                    {`${r.role}${r.tech ? ` (${r.tech})` : ""} - ${r.exp}`}
                  </h4>
                  <div className={styles.rowStats}>
                    <div className={styles.stat2}>
                      <span>{L.hourlyRate}</span>
                      <strong>{money(r.rate)}</strong>
                    </div>
                    <div className={styles.stat2}>
                      <span>{L.dailyCost}</span>
                      <strong>{money(r.daily)}</strong>
                    </div>
                    <div className={`${styles.stat2} ${styles.stat2Hot}`}>
                      <span>{L.totalCost}</span>
                      <strong>{money(r.total)}</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>

      {shareOpen && (
        <ShareModal
          onClose={() => setShareOpen(false)}
          estimate={() => ({
            duration: parseInt(duration, 10) || 1,
            unit,
            hoursPerDay: HOURS_PER_DAY,
            developers: rows.map(({ role, tech, exp, rate, daily, total: t }) => ({
              role,
              technology: tech,
              experience: exp,
              hourlyRate: rate,
              dailyCost: daily,
              totalCost: t,
            })),
            total,
          })}
        />
      )}
    </>
  );
}

function ShareModal({ onClose, estimate }: { onClose: () => void; estimate: () => unknown }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const first = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    first.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next = { name: nameError(form.name) ?? undefined, email: emailError(form.email) ?? undefined };
    setErrors(next);
    if (next.name || next.email) return;
    // The estimate is not sent anywhere yet — the payload is only logged until the endpoint is wired.
    console.log({ name: form.name.trim(), email: form.email.trim(), estimate: estimate(), url: window.location.href });
  };

  return (
    <div className={styles.overlay} onPointerDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="sc-share-title">
        <button type="button" className={styles.modalClose} aria-label="Close" onClick={onClose}>
          <X size={20} aria-hidden />
        </button>
        <h3 id="sc-share-title" className={styles.modalTitle}>
          {S.title}
        </h3>
        <form className={styles.modalForm} onSubmit={onSubmit} noValidate>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sc-name">
              {S.name.label}
            </label>
            <input
              id="sc-name"
              ref={first}
              className={styles.input}
              type="text"
              autoComplete="name"
              placeholder={S.name.placeholder}
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={errors.name ? "sc-name-error" : undefined}
            />
            {errors.name && (
              <p id="sc-name-error" className={styles.error}>
                {errors.name}
              </p>
            )}
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="sc-email">
              {S.email.label}
            </label>
            <input
              id="sc-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              placeholder={S.email.placeholder}
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={errors.email ? "sc-email-error" : undefined}
            />
            {errors.email && (
              <p id="sc-email-error" className={styles.error}>
                {errors.email}
              </p>
            )}
          </div>
          <button type="submit" className={`${home.pillFilled} ${styles.modalSubmit}`}>
            <Share2 size={16} aria-hidden />
            {S.submit}
          </button>
        </form>
      </div>
    </div>
  );
}
