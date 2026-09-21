'use client';

import { useRef, useState, type FormEvent } from 'react';
import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import styles from './services.module.css';
import fx from '@/components/common/enquiry-form.module.css';
import FieldIcon, { RequiredMark } from '@/components/common/field-icon';
import PhoneField from '@/components/common/phone-field';

export interface ServiceHeroProps {
  title: string;
  body: string;
  badges: readonly string[];
  form: { title: string; body: string; submit: string; note: string };
}

/**
 * Service-page hero: H1 + intro + trust badges on the left, enquiry card on the
 * right.
 *
 * The card has **no backend**. Nothing is transmitted and nothing is stored, so
 * it never claims a submission succeeded — on submit it hands the visitor to the
 * page's real enquiry section (`#contact`, the same CTA the homepage uses) and
 * says so plainly. To make it a real lead form, POST the field values to a new
 * endpoint from `onSubmit` and replace `handoff` with the response handling; the
 * markup below does not need to change.
 *
 * That discard now includes a phone number, which the reader has been asked
 * for — it was added for consistency with the enquiry card on every other
 * marketing page, knowingly and ahead of the backend. A `FormData` read of
 * this form yields the whole number, country code included: `PhoneField`
 * carries it on a hidden input for exactly that reason.
 */
export default function ServiceHero({ title, body, badges, form }: ServiceHeroProps) {
  const [handedOff, setHandedOff] = useState(false);
  // The only controlled field on an otherwise uncontrolled form: `PhoneField`
  // owns a country code beside the number and has to lift the combined value
  // somewhere. Everything else here is read from the DOM — or would be, if
  // this card posted anywhere (see the note above).
  const [phone, setPhone] = useState('');
  const formRef = useRef<HTMLFormElement | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHandedOff(true);
    // Anchor scrolling belongs to Lenis: ScrollProvider intercepts clicks on
    // in-page links and eases to the target (landing #contact on its revealed
    // state, not the start of its scrub). Driving that through a real anchor
    // click keeps this in step with every other CTA on the page instead of
    // fighting the smooth scroller with a native jump.
    const link = document.createElement('a');
    link.href = '#contact';
    formRef.current?.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <section className={styles.hero} id="top">
      <div>
        <SplitReveal as="h1" className={styles.heroTitle} type="words">
          {title}
        </SplitReveal>
        <FadeUp delay={0.1}>
          <p className={styles.heroBody}>{body}</p>
          <ul className={styles.badges}>
            {badges.map((b) => (
              <li key={b} className={styles.badge}>
                {b}
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>

      <FadeUp delay={0.18}>
        <div className={fx.card}>
          <div className={fx.header}>
            <p className={fx.title}>{form.title}</p>
            <span className={fx.accent} aria-hidden />
            <p className={fx.body}>{form.body}</p>
          </div>

          <form ref={formRef} className={fx.fields} onSubmit={onSubmit}>
            <div className={fx.field}>
              <label className={fx.label} htmlFor="svc-name">
                <FieldIcon name="person" />
                Name
                <RequiredMark />
              </label>
              <input id="svc-name" name="name" className={fx.input} type="text" autoComplete="name" placeholder="Your name" required />
            </div>
            <div className={fx.field}>
              <label className={fx.label} htmlFor="svc-email">
                <FieldIcon name="mail" />
                Work email
                <RequiredMark />
              </label>
              <input id="svc-email" name="email" className={fx.input} type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>
            <div className={fx.field}>
              <label className={fx.label} htmlFor="svc-phone">
                <FieldIcon name="phone" />
                Phone <span className={fx.optional} aria-hidden>(optional)</span>
              </label>
              <PhoneField id="svc-phone" value={phone} onChange={setPhone} />
            </div>
            <div className={fx.field}>
              <label className={fx.label} htmlFor="svc-requirement">
                <FieldIcon name="doc" />
                What do you want to build?
                <RequiredMark />
              </label>
              <textarea
                id="svc-requirement"
                name="requirement"
                className={fx.textarea}
                rows={3}
                placeholder="The problem, the data you have, and where it should run."
                required
              />
            </div>
            <button type="submit" className={fx.submit} data-cursor="Send">
              {form.submit}
            </button>
          </form>

          <p className={fx.note} aria-live="polite">
            {handedOff ? 'Nothing sent yet — book your slot in Business Enquiry below and we will pick it up from there.' : form.note}
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
