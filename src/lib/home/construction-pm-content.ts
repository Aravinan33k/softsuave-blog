import type { HeroContent } from '@/components/generative-ai/hero';
import { heroForm } from '@/lib/home/hire-roles/shared';
import type { Piece } from '@/lib/home/construction-time-tracking-content';

/**
 * /construction-project-management-software — softsuave.com's construction project management software
 * page, word for word: the banner with its quote form, the overview, the ten features, the three customer
 * groups, the free-quote band, the portfolio piece and the closing "Book Free Consultation" band.
 * Images are under /images/construction-pm.
 */

export const pmMeta = {
  path: '/construction-project-management-software',
  shortTitle: 'Construction Project Management Software',
} as const;

const IMG = '/images/construction-pm';

/** The "Get Free Quote" button every band shares: it opens the quote form. */
export const QUOTE_HREF = '#get-quote';

export const pmHero: HeroContent = {
  titleLines: ['Construction Management Software Development in India'],
  accent: 'Software Development',
  titleScale: 'home',
  body: ['Collaborate, track and manage your team’s projects effortlessly with the best one-stop Construction Project Management Software for small business industries.'],
  points: [],
  background: { src: `${IMG}/project-management-banner.webp` },
  ctas: [{ label: 'GET FREE QUOTE', href: QUOTE_HREF }],
  form: {
    ...heroForm({
      title: "Let's Discuss Your Project",
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help(Requirement)',
      subject: 'Construction project management software enquiry',
      noEyebrow: true,
    }),
    body: 'Get free rough quote in 24 hrs',
  },
};

/** The "Get a FREE Quote Today!!!" form the Get Free Quote buttons open. */
export const pmQuoteForm = {
  title: 'Get a FREE Quote Today!!!',
  accent: 'FREE Quote',
  body: 'Fill this form to get a personalized quote from experts at Soft Suave.',
  name: 'Full Name',
  email: 'Email',
  phone: 'Phone',
  project: 'Describe your Project',
  required: 'Please fill in the required field.',
  phoneInvalid: 'Please enter a valid phone number.',
  submit: 'Submit',
  sending: 'Sending...',
  close: 'Close',
} as const;

export const pmIntro = {
  title: 'Construction Project Management Software',
  accent: 'Project Management Software',
  body: 'One software to plan your construction project, manage Personnel, Processes, Performance, and Paperwork.',
  paragraphs: [
    [
      'Soft Suave is the leading Software Development Company in India renowned for developing project management software for the construction industry. The development team at Soft Suave has impeccable hands-on experience working with time tracking apps for construction employees. Moreover, the developers are well-versed in all the latest technologies to develop ground-breaking project management tools. Our project management software helps construction crew to manage their project efficiently and reach new productivity peaks. The unique features in the ',
      { b: 'Construction Project Management Software' },
      ' allow the top-level management to perform quoting, scheduling, time tracking, invoicing and reporting from anyplace, anytime. Soft Suave designs and develops convenient project management software for construction companies to let their teams monitor and optimize project workflows from start to finish.',
    ],
    [
      'Our software acts as a WorkflowMax clone and facilitates civil engineering companies to prioritize tasks and meet its deadline seamlessly. We are well aware that each project has its own complexities; thereby, we develop ',
      { b: 'Construction Management Software' },
      ' that offers uninterrupted project workflows right from conception to completion. Being the best construction project management software development company, Soft Suave develops solutions that clears all the challenges and allows your team to deliver remarkable results.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/content-img.webp`, alt: 'crm-app-img', width: 400, height: 270 },
} as const;

export const pmFeatures = {
  title: 'Features to Boost Your Productivity & Profit',
  accent: 'Boost Your Productivity & Profit',
  body: [
    'Soft Suave has covered all essential features to make your ',
    { b: 'construction project management' },
    ' hassle-free.',
  ] as readonly Piece[],
  items: [
    { name: 'Employee Productivity Tracking', icon: `${IMG}/productivity.webp`, alt: 'Employee Productivity Tracking by SoftSuave', body: 'Assign tasks and track your construction employees’ level of productivity.' },
    { name: 'Time & Attendance Tracking', icon: `${IMG}/attendance.webp`, alt: 'Time & Attendance Tracking by SoftSuave', body: 'One-stop solution to track in-time, out-time and attendance of field employees.' },
    { name: 'Task Distribution & Status Tracking', icon: `${IMG}/task.webp`, alt: 'Task Distribution & Status Tracking by SoftSuave', body: 'Manage, distribute and track your tasks based on deadlines from one place.' },
    { name: 'Invoicing & Reporting', icon: `${IMG}/invoice.webp`, alt: 'Invoicing & Reporting by SoftSuave', body: 'Accurate invoicing and reporting to ensure no time or work is left unbilled.' },
    { name: 'Purchase Order', icon: `${IMG}/purchase-order.webp`, alt: 'Purchase Order', body: 'Compile all your purchases to calculate all your expenses within seconds.' },
    { name: 'Task & Staff Management', icon: `${IMG}/staff-management.webp`, alt: 'Task & Staff Management Software Development Company SoftSuave', body: 'Manage your resources in accordance with the number of tasks in the project.' },
    { name: 'Document Management', icon: `${IMG}/file.svg`, alt: 'Document Management Software Development Company SoftSuave', body: 'Connect with other apps to store, manage and share documents in WorkflowMax.' },
    { name: 'Xero Integraiton', icon: `${IMG}/integrate.svg`, alt: 'Xero Integraiton Software Development Company SoftSuave', body: 'Keep your job management and accounting data fully reconciled in real time.' },
    { name: 'Mobile Apps', icon: `${IMG}/mobile-app.svg`, alt: 'Mobile Apps Development Company SoftSuave', body: 'Wherever you are, you can track time, view jobs and contacts, and record your time on the go.' },
    { name: 'Notifications', icon: `${IMG}/chat.svg`, alt: 'Notifications Software Development Company SoftSuave', body: 'Create your own unique job notifications and never miss a deadline again.' },
  ],
} as const;

export const pmCustomers = {
  title: 'Our Valuable Customers',
  body: 'Trusted by Renowned Construction Clients Worldwide.',
  items: [
    { name: 'Architects', icon: `${IMG}/construction-2.webp`, alt: 'Project Management Software for Architects' },
    { name: 'Building & Construction', icon: `${IMG}/construction-3.webp`, alt: 'Project Management Software for Building & Construction' },
    { name: 'Engineers', icon: `${IMG}/construction-1.webp`, alt: 'Project Management Software for Engineers' },
  ],
} as const;

export const pmTry = {
  title: 'Try Our Project Management Software on Your Construction Company',
  body: [
    'Get in touch with our experts to get a free quote of our ',
    { b: 'Construction Management Software' },
    ' and test them on your business at zero cost.',
  ] as readonly Piece[],
  cta: { label: 'Get Free Quote', href: QUOTE_HREF },
} as const;

export const pmPortfolio = {
  title: 'Portfolio',
  body: 'App development team at Soft Suave has designed several construction project management software to help construction Startups and SMBs scale up their business cost-effectively and successfully.',
  heading: 'Project Management Software for Construction Business',
  accent: 'Project Management Software',
  text: 'Soft Suave is the leading Web and Mobile App Development Company in India that has expanded its industry verticals into Real Estate. The experienced Real Estate Software Development team at Soft Suave augment the new-age technologies to revamp and build versatile CRM softwares for Real Estate.',
  image: { src: `${IMG}/mobile-screen-1.webp`, alt: 'CRM app development soft suave', width: 1280, height: 1152 },
  cta: { label: 'Get Free Quote', href: QUOTE_HREF },
} as const;
