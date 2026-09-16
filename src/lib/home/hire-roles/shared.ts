/**
 * Copy the nine hire-by-role pages genuinely share.
 *
 * Three things on these pages are the same statement about Soft Suave rather
 * than a statement about the role: the enquiry form's framing, the comparison of
 * hiring routes, and the published rate tiers. softsuave.com repeats each of
 * them verbatim across the role pages it has, so they are written once here and
 * parameterised by the role's own wording. A per-page copy would let nine pages
 * drift into nine different answers to "what does a Soft Suave engagement cost"
 * — the one thing a rate card must not do.
 *
 * Everything else — what the role does, which technologies it covers, why you
 * would hire it, its FAQs — is the role's own and lives in its own module.
 */

import type { ComparisonContent } from '@/components/generative-ai/comparison';
import type { HeroContent } from '@/components/generative-ai/hero';

/**
 * The hero's enquiry form.
 *
 * softsuave.com's role pages all put the same "Get Skilled Remote Developers"
 * form beside the H1, with the role named in its heading and its requirement
 * field. `subject` becomes the composed mail's subject line, so it has to say
 * which page the enquiry came from.
 */
export function heroForm(args: {
  /** Form heading, e.g. "Hire skilled backend developers". */
  readonly title: string;
  /** Label over the requirement textarea. */
  readonly requirementLabel: string;
  /** Placeholder inside it — a prompt for what we actually need to know. */
  readonly requirementPlaceholder: string;
  /** Mail subject, e.g. "Backend developer hiring enquiry". */
  readonly subject: string;
}): HeroContent['form'] {
  return {
    eyebrow: '40-Hour Risk-Free Trial',
    title: args.title,
    note: 'For business enquiries. Covered by NDA — to apply for a job, see our careers page.',
    submit: 'Start My Free Trial',
    sending: 'Opening your mail…',
    requirementLabel: args.requirementLabel,
    requirementPlaceholder: args.requirementPlaceholder,
    subject: args.subject,
  };
}

/**
 * Soft Suave vs an in-house hire vs a freelancer, on the eight decision factors
 * softsuave.com's role pages compare. The first column is the role's own name
 * for its developer, which is the only part that changes between pages.
 */
export function hiringComparison(args: {
  readonly title: string;
  readonly body: string;
  /** Header of the Soft Suave column, e.g. "Soft Suave QA engineer". */
  readonly column: string;
}): ComparisonContent {
  return {
    eyebrow: 'Compare Your Options',
    title: args.title,
    body: args.body,
    columns: ['Decision factor', 'In-house hire', 'Freelancer', args.column],
    rows: [
      {
        criterion: 'Talent sourcing',
        values: [
          'Managed through internal recruitment',
          'Sourced directly by your team',
          'Profiles matched to your stated requirements',
        ],
      },
      {
        criterion: 'Interview and selection',
        values: [
          'Full internal hiring process',
          'Direct evaluation and selection',
          'Interview shortlisted developers before the engagement',
        ],
      },
      {
        criterion: 'Trial before commitment',
        values: [
          'Probation period after hiring',
          'Depends on the freelancer',
          '40-hour risk-free trial on real project work',
        ],
      },
      {
        criterion: 'Engagement flexibility',
        values: [
          'Primarily permanent employment',
          'Usually project or task based',
          'Dedicated, time and material, or fixed bid',
        ],
      },
      {
        criterion: 'Team scalability',
        values: [
          'Requires another recruitment cycle',
          'Depends on individual availability',
          'Add or adjust capacity as requirements change',
        ],
      },
      {
        criterion: 'Team integration',
        values: [
          'Fully embedded in your organisation',
          'Depends on scope and availability',
          'Works inside your existing tools and workflows',
        ],
      },
      {
        criterion: 'Administrative responsibility',
        values: [
          'Managed internally',
          'Managed through contractor agreements',
          'Managed through Soft Suave',
        ],
      },
      {
        criterion: 'Best suited to',
        values: [
          'Long-term permanent roles',
          'Short-term, clearly defined assignments',
          'Flexible or ongoing engineering capacity',
        ],
      },
    ],
  };
}

/**
 * The shorter comparison softsuave.com runs on the pages that lead with speed
 * of hiring rather than with the engagement itself — onboarding time, recurring
 * overhead, vetting, risk and overlap.
 */
export function onboardingComparison(args: {
  readonly title: string;
  readonly body: string;
  readonly column: string;
}): ComparisonContent {
  return {
    eyebrow: 'Compare Your Options',
    title: args.title,
    body: args.body,
    columns: ['Decision factor', 'In-house hire', 'Freelancer', args.column],
    rows: [
      {
        criterion: 'Time to a shortlist',
        values: ['4–8 weeks of recruitment', '1–2 weeks, variable', 'Profiles within 48 hours'],
      },
      {
        criterion: 'Recurring overhead',
        values: [
          '$2,000–$3,000 a month beyond salary',
          'None, but availability is inconsistent',
          'None — hourly, with no hidden costs',
        ],
      },
      {
        criterion: 'Vetting',
        values: [
          'Your team’s time and cost',
          'Self-reported and unverified',
          'Pre-vetted, then a 40-hour trial',
        ],
      },
      {
        criterion: 'If the fit is wrong',
        values: [
          'Restart the hiring process',
          'No accountability for a replacement',
          'A replacement profile at no extra cost',
        ],
      },
      {
        criterion: 'Working-hours overlap',
        values: [
          'Already in your time zone',
          'No guaranteed overlap',
          '4–6 hours agreed before onboarding',
        ],
      },
      {
        criterion: 'Contract cover',
        values: [
          'Employment contract',
          'Varies by freelancer',
          'Signed NDA and SLA before work starts',
        ],
      },
    ],
  };
}

/**
 * The published rate tiers, for the pages where softsuave.com states all three.
 * Where a page publishes only the entry rate, its module says "from $14 per
 * hour" in prose and this table is omitted rather than filled in by inference.
 */
export function rateTiers(args: {
  readonly title: string;
  readonly body: string;
  /** e.g. "DevOps engineer" — names the row set without repeating the title. */
  readonly role: string;
}): ComparisonContent {
  return {
    eyebrow: 'Rates',
    title: args.title,
    body: args.body,
    columns: [`${args.role} tier`, 'Junior', 'Mid-level', 'Senior'],
    rows: [
      { criterion: 'Experience', values: ['0–2 years', '2–5 years', '5+ years'] },
      {
        criterion: 'Rate starts from',
        values: ['$14 / hour', '$18 / hour', '$25 / hour'],
      },
      {
        criterion: 'Trial before commitment',
        values: ['40 hours, risk-free', '40 hours, risk-free', '40 hours, risk-free'],
      },
    ],
  };
}
