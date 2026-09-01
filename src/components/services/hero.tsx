'use client';

import { useRef, useState, type FormEvent } from 'react';
import FadeUp from '@/components/home/fade-up';
import SplitReveal from '@/components/home/split-reveal';
import home from '@/components/home/home.module.css';
import styles from './services.module.css';

export interface ServiceHeroProps {
  eyebrow: string;
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
 */
export default function ServiceHero({ eyebrow, title, body, badges, form }: ServiceHeroProps) {
  const [handedOff, setHandedOff] = useState(false);
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
        <span className={home.eyebrow}>{eyebrow}</span>
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
        <div className={styles.form}>
          <h2 className={styles.formTitle}>{form.title}</h2>
          <p className={styles.formBody}>{form.body}</p>

          <form ref={formRef} className={styles.formGrid} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="svc-name">
                Name
              </label>
              <input id="svc-name" name="name" className={styles.input} type="text" autoComplete="name" placeholder="Your name" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="svc-email">
                Work email
              </label>
              <input id="svc-email" name="email" className={styles.input} type="email" autoComplete="email" placeholder="you@company.com" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="svc-requirement">
                What do you want to build?
              </label>
              <textarea
                id="svc-requirement"
                name="requirement"
                className={styles.textarea}
                rows={3}
                placeholder="The problem, the data you have, and where it should run."
                required
              />
            </div>
            <button type="submit" className={`${home.pill} ${home.pillFilled} ${styles.formSubmit}`} data-cursor="Send">
              {form.submit}
            </button>
          </form>

          <p className={styles.formNote} aria-live="polite">
            {handedOff ? 'Nothing sent yet — book your slot in Business Enquiry below and we will pick it up from there.' : form.note}
          </p>
        </div>
      </FadeUp>
    </section>
  );
}
