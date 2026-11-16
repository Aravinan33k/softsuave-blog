'use client';

import { useRef, useState, type FormEvent } from 'react';
import { appPath } from '@/lib/media-url';
import { emailError, nameError, phoneError } from '@/lib/forms/enquiry-rules';
import FieldIcon, { RequiredMark } from '@/components/common/field-icon';
import PhoneField from '@/components/common/phone-field';
import fx from '@/components/common/enquiry-form.module.css';
import { careerForm as copy, RESUME_MAX_BYTES } from '@/lib/home/career-content';
import styles from './career.module.css';

type Fields = { name: string; email: string; phone: string; experience: string };
type Errors = Partial<Record<'name' | 'email' | 'phone' | 'resume', string>>;
const EMPTY: Fields = { name: '', email: '', phone: '', experience: copy.experienceOptions[0].value };

/** `.pdf` / `.doc`, the live script's only accepted types. */
const extensionOf = (fileName: string) => fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase();
// No `accept` filter on the input, as on the live page: a filter can grey out files in the picker. Every file can be
// chosen, and one that is not a pdf or doc is answered with the live script's message under the field.
const isResumeType = (fileName: string) => fileName.includes('.') && ['pdf', 'doc'].includes(extensionOf(fileName));

/**
 * "Submit Your Application": the live page's form on this site's form card — name, e-mail, phone, experience and
 * the resume — posting to /api/v1/career, which hands the application on to softsuave.com's own career endpoint.
 * `role` is the slug the page was opened for (`?role=…`); it travels with the application so the team can tell
 * which opening it is for.
 */
export default function CareerForm({ role }: { role: string | null }) {
  const [form, setForm] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [file, setFile] = useState<File | null>(null);
  const [website, setWebsite] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');
  const [sendError, setSendError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const set = (k: keyof Fields) => (v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (k !== 'experience') setErrors((er) => ({ ...er, [k]: undefined }));
    if (status === 'done') setStatus('idle');
  };

  const onFile = (picked: File | null) => {
    setStatus((s) => (s === 'done' ? 'idle' : s));
    if (!picked) {
      setFile(null);
      return;
    }
    // The live script's checks, as messages under the field rather than alerts.
    if (!isResumeType(picked.name)) {
      setFile(null);
      setErrors((er) => ({ ...er, resume: copy.wrongType }));
      if (fileInput.current) fileInput.current.value = '';
      return;
    }
    if (picked.size >= RESUME_MAX_BYTES) {
      setFile(null);
      setErrors((er) => ({ ...er, resume: copy.tooBig }));
      if (fileInput.current) fileInput.current.value = '';
      return;
    }
    setErrors((er) => ({ ...er, resume: undefined }));
    setFile(picked);
  };

  /** What is wrong with each field right now (undefined = fine). The one rule set: the button, a field on blur and submit all use it. */
  const problems = (f: Fields, picked: File | null): Errors => ({
    name: f.name.trim() ? (nameError(f.name) ?? undefined) : copy.required,
    email: f.email.trim() ? (emailError(f.email) ? copy.invalidEmail : undefined) : copy.required,
    phone: f.phone.trim() ? (phoneError(f.phone) ?? undefined) : copy.required,
    resume: picked ? undefined : copy.required,
  });

  // The button is live only once every field is right: a valid name, e-mail and phone, and a resume that passed the
  // file checks. The experience always holds one of the six options.
  const now = problems(form, file);
  const complete = !now.name && !now.email && !now.phone && !now.resume && !errors.resume;

  /** Tell the reader what is wrong with one field when they leave it — the disabled button cannot be pressed to find out. */
  const checkField = (k: 'name' | 'email' | 'phone') => () => setErrors((er) => ({ ...er, [k]: problems(form, file)[k] }));

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const next: Errors = { ...problems(form, file), resume: file ? undefined : (errors.resume ?? copy.required) };
    setErrors(next);
    if (next.name || next.email || next.phone || next.resume) return;

    setStatus('sending');
    setSendError(null);
    try {
      const body = new FormData();
      body.append('name', form.name);
      body.append('email', form.email);
      body.append('phone', form.phone);
      body.append('experience', form.experience);
      if (role) body.append('role', role);
      body.append('website', website);
      body.append('file', file as File, (file as File).name);
      // `appPath`, not a bare "/api/…": `fetch` does not pick up `basePath`. No Content-Type header: the browser
      // writes the multipart boundary.
      const res = await fetch(appPath('/api/v1/career'), { method: 'POST', body });
      if (!res.ok) {
        const detail = await res.json().catch(() => null);
        throw new Error(
          detail?.error?.message ??
            (res.status === 429 ? 'Too many attempts. Please wait a minute and try again.' : 'Something went wrong. Please try again.'),
        );
      }
      setForm(EMPTY);
      setFile(null);
      if (fileInput.current) fileInput.current.value = '';
      setStatus('done');
    } catch (err) {
      setStatus('error');
      setSendError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  const msg = (k: keyof Errors) =>
    errors[k] ? (
      <p id={`career-${k}-error`} className={fx.fieldMessage} role="alert">
        {errors[k]}
      </p>
    ) : null;
  const sending = status === 'sending';

  return (
    <div className={fx.card} id="career-form">
      <div className={fx.header}>
        <h4 className={fx.title}>{copy.title}</h4>
        <span className={fx.accent} aria-hidden />
      </div>

      <form className={fx.fields} onSubmit={onSubmit} noValidate>
        <div className={fx.honeypot} aria-hidden>
          <label htmlFor="career-website">Website</label>
          <input id="career-website" type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className={`${fx.field} ${errors.name ? fx.fieldInvalid : ''}`}>
          <FieldIcon name="person" />
          <input
            id="career-name"
            className={fx.input}
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
            onBlur={checkField('name')}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? 'career-name-error' : undefined}
            placeholder=" "
          />
          <label className={fx.label} htmlFor="career-name">
            <RequiredMark />
            {copy.name}
          </label>
          {msg('name')}
        </div>

        <div className={`${fx.field} ${errors.email ? fx.fieldInvalid : ''}`}>
          <FieldIcon name="mail" />
          <input
            id="career-email"
            className={fx.input}
            type="email"
            name="email"
            autoComplete="email"
            value={form.email}
            onChange={(e) => set('email')(e.target.value)}
            onBlur={checkField('email')}
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? 'career-email-error' : undefined}
            placeholder=" "
          />
          <label className={fx.label} htmlFor="career-email">
            <RequiredMark />
            {copy.email}
          </label>
          {msg('email')}
        </div>

        <div className={`${fx.field} ${errors.phone ? fx.fieldInvalid : ''}`}>
          <FieldIcon name="phone" />
          <PhoneField
            id="career-phone"
            value={form.phone}
            onChange={set('phone')}
            onBlur={checkField('phone')}
            invalid={Boolean(errors.phone)}
            describedBy={errors.phone ? 'career-phone-error' : undefined}
          />
          <label className={`${fx.label} ${fx.labelFloat}`} htmlFor="career-phone">
            <RequiredMark />
            {copy.phone}
          </label>
          {msg('phone')}
        </div>

        <div className={fx.field}>
          <FieldIcon name="doc" />
          <select
            id="career-experience"
            className={`${fx.input} ${fx.select}`}
            name="experience"
            value={form.experience}
            onChange={(e) => set('experience')(e.target.value)}
          >
            {copy.experienceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <label className={`${fx.label} ${fx.labelFloat}`} htmlFor="career-experience">
            <RequiredMark />
            {copy.experience}
          </label>
        </div>

        <div className={`${styles.resume} ${errors.resume ? styles.resumeInvalid : ''}`}>
          <span className={styles.resumeLabel} id="career-resume-label">
            <RequiredMark />
            {copy.resume}
          </span>
          <input
            ref={fileInput}
            id="career-resume"
            className={styles.resumeInput}
            type="file"
            name="fileToUpload"
            onChange={(e) => onFile(e.target.files?.[0] ?? null)}
            aria-labelledby="career-resume-label"
            aria-invalid={errors.resume ? true : undefined}
            aria-describedby={errors.resume ? 'career-resume-error' : undefined}
          />
          <label className={styles.resumeButton} htmlFor="career-resume">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M21 12.5l-8.6 8.6a5.5 5.5 0 0 1-7.8-7.8l9-9a3.7 3.7 0 0 1 5.2 5.2l-9 9a1.8 1.8 0 0 1-2.6-2.6l8.4-8.4" />
            </svg>
            <span>{file ? file.name : copy.attach}</span>
          </label>
          {msg('resume')}
        </div>

        {status === 'error' && sendError && (
          <p className={fx.error} role="alert">
            {sendError}
          </p>
        )}

        <button
          type="submit"
          className={`${fx.submit} ${styles.submit}${!complete && !sending ? ` ${styles.incomplete}` : ''}`}
          disabled={sending || !complete}
        >
          {sending ? copy.sending : copy.submit}
        </button>

        {status === 'done' && (
          <p className={styles.thanks} role="status">
            {copy.thanks}
          </p>
        )}
      </form>
    </div>
  );
}
