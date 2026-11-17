import type { HeroContent } from '@/components/generative-ai/hero';
import type { FaqContent } from '@/components/generative-ai/faq';
import type { ServicesContent } from '@/components/home/services';
import { heroForm } from '@/lib/home/hire-roles/shared';

/**
 * /construction-employee-time-tracking-app — softsuave.com's construction employee time tracking app page,
 * word for word: the banner with its quote form, the overview and its four cards, the six-feature
 * showcase, the steps, the mobile and web applications, the free-demo band, the "why" cards, the FAQs and
 * the closing "Book Free Consultation" band. Images are under /images/construction-time-tracking.
 */

export const timeTrackingMeta = {
  path: '/construction-employee-time-tracking-app',
  shortTitle: 'Construction Employee Time Tracking App',
  title: 'Construction employee time tracking app case study',
  description:
    'Custom construction employee time tracking app development case study highlighting how real-time tracking and automation streamlined operations',
} as const;

const IMG = '/images/construction-time-tracking';

/** A run of copy: plain text, a bold phrase, or a link. */
export type Piece = string | { readonly b: string } | { readonly text: string; readonly href: string };

export const timeTrackingHero: HeroContent = {
  titleLines: ['Construction Employee Time Tracking App Development'],
  accent: 'Employee Time Tracking',
  titleScale: 'home',
  body: ['Monitor your remote employees and track their productivity in real-time with the most advanced and automated time tracking application.'],
  points: [],
  background: { src: `${IMG}/mobile-ba.webp` },
  ctas: [{ label: 'Get FREE Quote Now!!!', href: '#enquiry' }],
  // The same form wording the hire pages' heroes use (`heroForm`); only the heading is this page's own.
  form: heroForm({
    title: '40-hour Trial, 100% Risk Free',
    requirementLabel: 'How Can We Help (Requirement)',
    requirementPlaceholder: 'How Can We Help(Requirement)',
    subject: 'Construction employee time tracking app enquiry',
    noEyebrow: true,
  }),
};

export const timeTrackingIntro = {
  title: 'Construction Time Tracking Software Development',
  accent: 'Time Tracking',
  body: 'Get insights about your entire construction operations and optimize your workflow to the maximum extent.',
  paragraphs: [
    [
      'Soft Suave, renowned for its ',
      { text: 'best App Development Company', href: '/mobile-application-development-company' },
      ', is also rated as the best ',
      { b: 'time tracking app development company in India' },
      '. Employee time tracking is the most common concern faced by many start-ups and SMB owners. Developing the best and most reliable construction employee time tracking app requires excellent technical expertise and hands-on experience. The skilful developers at Soft Suave are equipped to handle any robust time tracking application development for the construction industry. The developers’ expertise in cutting-edge technologies also makes Soft Suave the fitting place to ',
      { b: 'develop construction employee time tracking app' },
      ' with the latest features and functionalities. The dedicated app developers have more than 5+ years of working experience with clients worldwide on-time tracking tools for several industry verticals.',
    ],
    [
      'Being the best ',
      { b: 'time tracking app development company' },
      ', Soft Suave develops affordable time tracking solutions that increase construction employees productivity, promotes strict time tracking, and centralizes timekeeping and hours logging efficiently for a seamless payroll process. The development team is well-versed and equipped technically to bring all your custom employee time tracking requirements from scratch to a successful working application.',
    ],
  ] as readonly (readonly Piece[])[],
  image: { src: `${IMG}/employee-time-tracking-rlt.webp`, alt: 'Construction Employee Time Tracking Software Development company Soft Suave', width: 400, height: 275 },
} as const;

export const timeTrackingBenefits = [
  { name: 'Employee Productivity', icon: `${IMG}/productivity.svg`, alt: 'Employee Productivity Tracker by Soft Suave', body: 'Use push notifications to prompt your construction employees to clock in and clock out so you can monitor and increase their productivity directly.' },
  { name: 'Time & Attendance Tracking', icon: `${IMG}/time-attendance.svg`, alt: 'Employee Time & Attendance Tracking Software by Soft Suave', body: 'Track your construction field crew’s time & attendance efficiently to assign and manage jobs in real-time according to field employees’ availability.' },
  { name: 'Vehicle and Plant Monitoring', icon: `${IMG}/booking.svg`, alt: 'Vehicle & Plant Monitoring Software by Soft Suave', body: 'Monitor any number of vehicles and plants used in the field with a single click of a button in the time and attendance software and make your routine inspections stress-free.' },
  { name: 'Improved payment process', icon: `${IMG}/wallet.svg`, alt: 'Improved Payment Processing', body: 'Automated mobile time tracking, report generation, and accurate payroll processing will help you with an accurate and hassle-free payment process.' },
] as const;

/** The six-feature showcase, drawn by the homepage's services carousel. */
export const timeTrackingFeatures: ServicesContent = {
  title: 'Increase your Field Employees’ Productivity with Soft Suave.',
  body: "Run a profitable construction business with Soft Suave's most flexible and productive time tracking software.",
  items: [
    {
      key: 'task-distribution',
      name: 'Task Distribution and Status Tracking',
      body: 'Our time tracking App allows employers to distribute tasks to field employees directly. Managers can also check the construction employees’ real-time availability in the field and assign tasks seamlessly. Employers and managers can even track the status of all the allocated tasks to the employees from anywhere, anytime. This feature allows them to follow the team’s progress with ease, simplicity and increase productivity effortlessly.',
      src: `${IMG}/UDL-screen.webp`,
    },
    {
      key: 'google-maps',
      name: 'Google Maps Integration',
      body: 'Integrated Google maps into Employee Time Tracking Software to track employees’ real- time working location, work status, breaks, and completion of work. The accurate positioning and colour tags will help you to know the real-time status of your construction field employees and manage their work directly.',
      src: `${IMG}/map.webp`,
    },
    {
      key: 'clock-in-out',
      name: 'Clock-in and Clock-out',
      body: 'Our time tracking software is integrated with one-touch clock-in and clock-out features to facilitate field employees to mark their attendance and indicate their productive hours to their employer. Employers can check this in real-time and plan the day accordingly. This feature acts as a time clock app that avoids time theft by the remote workers.',
      src: `${IMG}/mobile-large.webp`,
    },
    {
      key: 'monitoring-inspection',
      name: 'Easy Monitoring and Inspection',
      body: 'Developed a provision for construction field employees to upload images of the field vehicles and plants before and after usage. This facility ensured the vehicles and plants were in good condition, although regular monitoring and inspection were done online.',
      src: `${IMG}/kiosk-large.webp`,
    },
    {
      key: 'payroll',
      name: 'Automated Payroll Management',
      body: 'Configured an efficient payroll and accounts management service system to synchronize the client’s data and manage financials accurately. Moreover, automated timesheets and report generation helped to process payroll accurately.',
      src: `${IMG}/payroll.webp`,
    },
    {
      key: 'mdm',
      name: 'Mobile Device Management',
      body: 'The Field Workforce Management Solution is integrated with MDM – Mobile Device Management. This tool helps you work without any worries of losing any data from your company. It monitors, manages, and secures employees’ devices when used in the workspace.',
      src: `${IMG}/crew-large.webp`,
    },
  ],
};

export const timeTrackingSteps = {
  title: 'Employee Time Tracking Software for your Construction Industry',
  accent: 'Construction Industry',
  body: 'Monitor your remote employees and track their productivity in real-time with the most advanced and automated time tracking application.',
  heading: 'Steps to Track your Construction Field Employees',
  intro: 'Time tracking increases productivity. When you use our award-winning remote time and attendance tracking software to track your employees, you get accurate data on efficiency and time, which helps you understand their actual productivity and estimate their labour cost with accuracy. Moreover, we have successfully deployed our solution for many clients whose employees’ productivity at present is increasing exponentially. Let us see how you can get started.',
  stepWord: 'Step',
  steps: [
    'Download our time tracking software for construction and install it in the respective devices of employers and employees.',
    'Give user access to your construction field employees, and admin access to employers and managers.',
    'Allow your field employees to clock in to start tracking their time and location.',
    'Invite employers to monitor the active hours of remote employees and manage work accordingly.',
    'Set due dates in the time and attendance systems to automate the payroll process.',
    'Verify the timesheets and complete the payroll process in a single click.',
  ],
  image: { src: `${IMG}/steps-tracking.webp`, alt: 'Track your Construction Field Employees by Soft Suave', width: 540, height: 422 },
} as const;

export const timeTrackingApps = {
  mobile: {
    title: 'Mobile Application for Construction Field Employees',
    body: 'Employee time tracking application from Soft Suave comprises of a mobile application for field employees. GPS is integrated into the mobile application to track accurate location of the remote workforce. It has all the essential features that help the field employees to make their presence felt in the construction site. Starting from clocking-in to the clocking-out, employees have to update their status throughout the day. This will help the employer to have a vast understanding of the tasks completed by the on-field employees.',
    image: { src: `${IMG}/mobile-app.webp`, alt: 'Track your Construction Field Employees by Soft Suave', width: 1000, height: 1141 },
  },
  web: {
    title: 'Web Application for Employers',
    body: 'Web application in the Employee time tracking solution helps employers to monitor all the activities of the construction field employees through time cards. It also facilitates them to manage team members and assign tasks to the employees according to their availability status. The automated payroll management does not include any manual intervention; thus, the employer only needs to review the document and proceed to release the payment for the employees. Additionally, the web application also shows the exact location of the field employees in the real-time map for employers.',
    image: { src: `${IMG}/web.webp`, alt: 'Web Application For Employees', width: 1507, height: 864 },
  },
} as const;

export const timeTrackingDemo = {
  title: 'Test our Employee Time Tracking Software for your Construction Industry',
  body: 'Download our time tracking application to experience the most effective and accurate time tracking and automated payroll management tool at zero cost. Check your business fit and develop your own custom time tracking application for construction industry in less than 30 days.',
  cta: { label: 'Get Free Demo', href: '/free-quote' },
} as const;

export const timeTrackingWhy = {
  title: 'Why Construction Worker Location Tracking App?',
  accent: 'Worker Location Tracking App?',
  body: 'Employee Time Tracking Software from Soft Suave is efficient and accurate time sheet app. We have a proven track record of success in the construction and other on-field companies that have primarily succeeded by using our tool. Moreover, several companies have also reported a drastic increase in productivity, which has directly impacted the revenues of the companies.',
  items: [
    { name: 'Easy Customization', icon: `${IMG}/layout.svg`, alt: 'Web Application For Employees' },
    { name: '3rd Party Feature Integration', icon: `${IMG}/support.svg`, alt: 'Third Party Feature Integration' },
    { name: 'Innovative and Cost-effective', icon: `${IMG}/inovative.svg`, alt: 'Innovative & Cost Effective' },
    { name: 'Highly-responsive Functionalities', icon: `${IMG}/responsive.svg`, alt: 'Highly Responsive Functionality' },
  ],
} as const;

export const timeTrackingFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  items: [
    {
      q: 'When does the Employee Time Tracking Application track employee’s locations?',
      a: 'Employee Time Tracking Application starts time tracking when the employee clocks in from the construction site. The location data will be available on real-time for the employers to monitor the time and work efficiency of the employees. Moreover, there are a few tags that will highlight if an employee is on a break.',
    },
    {
      q: 'How much data and battery power does the mobile app from the Employee Time Tracking solution use?',
      a: 'The data consumption is very low. It will never take more than 5% of your monthly data usage. Battery power depends based on your usage and the type of device you use.',
    },
    {
      q: 'Can I track the progress of a project based on tasks?',
      a: 'Yes. With our time tracking application for field workers, you can manually manage the project and make the app follow the progress of your project. You can oversee the real-time project completion data and allocate tasks to your construction field employees accordingly.',
    },
    {
      q: 'How accurate will the payroll be processed?',
      a: 'The Employee Time Tracking Application calculates the time and generates data in the form of timesheets. These timesheets are sent to the payroll management tool to get in sync with the resource data available in the application. Finally, you get an exact amount according to their contributions in the field. Moreover, all these payroll management processes are automated.',
    },
  ],
};
