/**
 * Copy the thirteen hire-by-role pages genuinely share.
 *
 * Three things on these pages are the same statement about Soft Suave rather
 * than a statement about the role: the enquiry form's framing, the comparison of
 * hiring routes, and the published rate tiers. softsuave.com repeats each of
 * them verbatim across the role pages it has, so they are written once here and
 * parameterised by the role's own wording. A per-page copy would let thirteen
 * pages drift into thirteen different answers to "what does a Soft Suave
 * engagement cost" — the one thing a rate card must not do.
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
    note: 'Alert: this form is for business, not candidates. To apply for jobs, see our careers page.',
    submit: 'Start My FREE Trial',
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
    // The live table reads Decision Factor | Soft Suave | In-House | Freelancer.
    // The Soft Suave column moves last here because this component accents its
    // final column; the headers and every cell are the live page's own.
    columns: ['Decision Factor', 'In-House Hire', 'Freelancer', args.column],
    rows: [
      {
        criterion: 'Talent Sourcing',
        values: [
          'Managed through internal recruitment',
          'Sourced directly by your team',
          'Profiles matched to your requirements',
        ],
      },
      {
        criterion: 'Interview & Selection',
        values: [
          'Full internal hiring process',
          'Direct evaluation and selection',
          'Interview shortlisted developers before engagement',
        ],
      },
      {
        criterion: 'Engagement Flexibility',
        values: [
          'Primarily permanent employment',
          'Usually project or task based',
          'Dedicated, Time & Material, or Fixed Bid',
        ],
      },
      {
        criterion: 'Team Scalability',
        values: [
          'Requires additional recruitment',
          'Depends on individual availability',
          'Add or adjust resources as requirements change',
        ],
      },
      {
        criterion: 'Team Integration',
        values: [
          'Fully embedded within your organization',
          'Depends on project scope and availability',
          'Works within your existing tools and workflows',
        ],
      },
      {
        criterion: 'Trial Before Commitment',
        values: [
          'Probation period after hiring',
          'Depends on the freelancer',
          '40-hour risk-free trial',
        ],
      },
      {
        criterion: 'Administrative Responsibility',
        values: [
          'Managed internally',
          'Managed through contractor agreements',
          'Managed through Soft Suave',
        ],
      },
      {
        criterion: 'Best Suited For',
        values: [
          'Long-term permanent roles',
          'Short-term or clearly defined assignments',
          'Flexible or ongoing development capacity',
        ],
      },
    ],
  };
}

/**
 * The shorter comparison softsuave.com runs on the pages that lead with speed
 * of hiring rather than with the engagement itself. Six rows, with the live
 * pages' own cell values — including the ones that are a bare figure, like the
 * `0` recurring cost, which is left as the page states it.
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
        criterion: 'Time to get right developers',
        values: ['4 - 8 Weeks', '2 - 4 Weeks', 'Within 48 hours'],
      },
      {
        criterion: 'Time to start a project',
        values: ['4 - 8 Weeks', '2 - 4 Weeks', 'Within 48 hours'],
      },
      {
        criterion: 'Recurring cost',
        values: ['$2000 to $3000', '0', '0'],
      },
      {
        criterion: 'Project failure risk',
        values: ['Low', 'High', 'Extremely Low'],
      },
      {
        criterion: 'Dedicated resources',
        values: ['Yes', 'No', 'Yes'],
      },
      {
        criterion: 'Communications',
        values: ['Seamless', 'Uncertain', 'Seamless'],
      },
    ],
  };
}

/**
 * The published rate tiers, exactly as softsuave.com tabulates them — tier,
 * hourly rate, experience — on the one page that prints the table. Where a page
 * states only the entry rate, or puts the tiers in an FAQ answer, its module
 * leaves that where the live page has it and omits this table rather than
 * inventing one.
 */
export function rateTiers(args: {
  readonly title: string;
  readonly body: string;
}): ComparisonContent {
  return {
    eyebrow: 'Rates',
    title: args.title,
    body: args.body,
    columns: ['Tier', 'Hourly Rate', 'Experience'],
    rows: [
      { criterion: 'Junior Developer', values: ['Starts from $14/hour', '0–2 years'] },
      { criterion: 'Mid-Level Developer', values: ['Starts from $18/hour', '2–5 years'] },
      { criterion: 'Senior Developer', values: ['Starts from $25/hour', '5+ years'] },
    ],
  };
}
