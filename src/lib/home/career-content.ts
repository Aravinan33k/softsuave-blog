/**
 * /softsuave-career — softsuave.com's job-detail page, word for word: the role, its experience and its job
 * description on the left, "Submit Your Application" on the right.
 *
 * It is one page that shows one role at a time, chosen by `?role=<slug>` (the careers page's Apply links write
 * them: `/softsuave-career?role=trainee-hr`). On the live site its server writes the role's text into the page; no
 * request is made for it afterwards. The text is therefore static content here too: `careerRoles` below, keyed by
 * that slug. A page opened with no role, or one that is not listed, shows the three labels with nothing after them,
 * as the live page does.
 */

export const careerMeta = {
  path: '/softsuave-career',
  shortTitle: 'Soft Suave Career',
  // The live page's <title>. It carries no meta description.
  title: 'Soft Suave Career',
} as const;

/** The three labels on the left, as the live page prints them (colon and all). */
export const careerLabels = {
  role: 'Role :',
  experience: 'Experience :',
  description: 'Job Description :',
} as const;

/** One role's details: the three values the live page writes after those labels. */
export interface CareerRole {
  /** The slug in `?role=`. */
  readonly slug: string;
  /** After "Role :". */
  readonly role: string;
  /** After "Experience :". */
  readonly experience: string;
  /** The bullets under "Job Description :", in the live page's order. */
  readonly description: readonly string[];
}

/**
 * The twenty roles, by slug (alphabetical) — each as the live page writes it: its title, its experience and its
 * job-description bullets, word for word. A slug that is not here shows the bare labels.
 *
 * Note: live's "Senior Quality Analyst" has spaces before the commas in its "User Stories , Acceptance Criteria ,"
 * bullet; they are kept as written.
 */
export const careerRoles: Readonly<Record<string, CareerRole>> = {
  "business-analyst": {
    slug: "business-analyst",
    role: "Business Analyst",
    experience: "1 - 2 years",
    description: [
      "Be confident enough in handling clients.",
      "conducting demo or presentations.",
      "Should be able to work closely with technical team and liaising directly with clients.",
      "Good understanding of SDLC of mobile and web applications.",
      "Able to gather client requirements and translate it into functionality documents.",
      "The business analyst will provide support for sales activities or teams.",
      "Should be able to clearly understand the needs of a client and recommend a solution.",
      "Play an important role in making the customer visualizations come true in the form of a software application.",
    ],
  },
  "business-associate": {
    slug: "business-associate",
    role: "Business Associate",
    experience: "0 - 2 years",
    description: [
      "Research and develop a thorough understanding of the companys people and capabilities.",
      "Identifying, qualifying, and securing business opportunities.",
      "New Client acquisition - Collaborating with sales and leadership to secure, retain, and grow accounts.",
      "In regular coordination with potential client questions and follow-up call questions.",
      "Creating & Maintaining database by generating leads (Salesforce, CRM, Excel, etc.) of prospective client information.",
      "Process - Cold Calling; Sending mails and follow up with regard to replies.",
    ],
  },
  "business-development-executive": {
    slug: "business-development-executive",
    role: "Business Development Executive",
    experience: "0 - 3 years",
    description: [
      "New Business Development",
      "Research and develop a thorough understanding of the company people and capabilities.",
      "Understand the company goal and purpose so that will continual to enhance the company performance.",
      "Identifying, qualifying, and securing business opportunities",
      "New Client acquisition - Collaborating with sales and leadership to secure, retain, and grow accounts",
      "Creating informative presentations; Presenting and delivering information to potential clients at client meetings, industry exhibits, trade shows, and conferences",
      "Work with team to develop proposals that speaks to the clients needs, concerns, and objectives. Responding to client requests for proposals (RFPs)",
      "In regular coordination with potential client questions and follow-up call questions",
      "Creating & Maintaining database by generating leads (Salesforce, CRM, Excel, etc.) of prospective client information",
      "Lead Generation - Researching potential leads from business directories, web searches, or digital resources Qualifying leads from digital campaigns, conferences, references, trade shows, etc.",
      "Process - Cold calling; making multiple outbound calls to potential clients. Email Campaigns - Sending mass mails with engaging mail content and follow up with regard to replies.",
      "Closing sales and working with client through closing process",
    ],
  },
  "executive-ui-ux-designer": {
    slug: "executive-ui-ux-designer",
    role: "Executive - UI Ux Designer",
    experience: "0-2 years",
    description: [
      "Gathering and evaluating user requirements, in collaboration with product managers and engineers.",
      "Illustrating design ideas using storyboards, process flows and sitemaps.",
      "Designing graphic user interface elements, like menus, tabs and widgets.",
    ],
  },
  "full-stack-developer-python": {
    slug: "full-stack-developer-python",
    role: "Full Stack Developer - Python",
    experience: "8 - 9 years",
    description: [
      "Disciplined approach to software engineering best practices (e.g. unit testing, code reviews, design documentation, quality assurance).",
      "Proven track record in developing high quality performance, and maintainable applications.",
      "Solid & deep understanding of the full web technology stack & Solid understanding of Application Program Interfaces.",
      "Experience with gathering and documenting technical requirements and specifications.",
      "Can take a mock and convert it to a working application end to end (from styling to web services).",
      "Handling the team of developers and responsible for client communication.",
      "This position will be directly reporting to CEO.",
    ],
  },
  "hr-assistant-executive": {
    slug: "hr-assistant-executive",
    role: "HR Assistant executive",
    experience: "0-1 years",
    description: [
      "Manage end to end recruitment from sourcing of candidates to release of offer letter.",
      "Maintaining HR records, such as those related to compensation, Incentives, health and medical insurance.",
      "Managing workplace safety issues.",
      "Communicating and explaining the organizations HR policies to the employee.",
      "Conducting various games & celebration activities, engagement activities, employee recognition acts.",
      "Conducting employee orientation and facilitating newcomers joining formalities.",
      "Maintaining and regularly updating master database (personal file, personal database, etc.) of each employee in HR module of ERP software.",
      "Resolving grievances or queries that any of the employees have.",
    ],
  },
  "hr-executive": {
    slug: "hr-executive",
    role: "HR Executive",
    experience: "2 - 5 years",
    description: [
      "Reviewing resumes and applications.",
      "Conducting recruitment interviews and providing the necessary inputs during the hiring process.",
      "Maintaining HR records, such as those related to compensation, Incentives, health and medical insurance.",
      "Managing workplace safety issues.",
      "Communicating and explaining the organization's HR policies to the employee.",
      "Preparation of Payroll.",
      "Administration of all Employee and company docs.",
      "Conducting various games & celebration activities, engagement activities, employee recognition acts.",
      "Preparing and processing timely distribution of salary, bonus, increment salary slip, leave encashment and full and final settlements.",
      "Recording, maintaining and monitoring attendance to ensure employee punctuality.",
      "Conducting employee orientation and facilitating newcomers joining formalities.",
      "Maintaining and regularly updating master database (personal file, personal database, etc.) of each employee in HR module of ERP software.",
      "Resolving grievances or queries that any of the employees have.",
      "Escalating to the right level depending on the nature of the grievance or issue.",
      "Conducting exit interviews for employees and recording them accordingly.",
      "Engaging with employees on a regular basis to understand the motivation levels of people in the organization.",
    ],
  },
  "hr-recruiter": {
    slug: "hr-recruiter",
    role: "HR Recruiter",
    experience: "2 - 5 years",
    description: [
      "Reviewing resumes and applications.",
      "Conducting recruitment interviews and providing the necessary inputs during the hiring process.",
      "Maintaining HR records, such as those related to compensation, Incentives, health and medical insurance.",
      "Managing workplace safety issues.",
      "Communicating and explaining the organization's HR policies to the employee.",
      "Preparation of Payroll.",
      "Administration of all Employee and company docs.",
      "Conducting various games & celebration activities, engagement activities, employee recognition acts.",
      "Preparing and processing timely distribution of salary, bonus, increment salary slip, leave encashment and full and final settlements.",
      "Recording, maintaining and monitoring attendance to ensure employee punctuality.",
      "Conducting employee orientation and facilitating newcomers joining formalities.",
      "Maintaining and regularly updating master database (personal file, personal database, etc.) of each employee in HR module of ERP software.",
      "Resolving grievances or queries that any of the employees have.",
      "Escalating to the right level depending on the nature of the grievance or issue.",
      "Conducting exit interviews for employees and recording them accordingly.",
      "Engaging with employees on a regular basis to understand the motivation levels of people in the organization.",
    ],
  },
  "lead-generation-executive": {
    slug: "lead-generation-executive",
    role: "Lead Generation Executive",
    experience: "1 - 2 years",
    description: [
      "Generate new leads using email marketing, social media, and other relevant marketing channels",
      "Classify hot, warm, and cold leads based on their need, budget, and decision-making capabilities",
      "Develop and execute a lead generation plan that generates leads for the sales team via various online marketing channels",
      "Assist with lead generation programs, including refinement of lead database, telephoning companies to mine information, and general database building and maintenance",
      "Create campaigns from initial concept through completion for each content area, generating targeted leads, managing campaigns, and running post-campaign measurement",
      "Use all available resources (e.g., LinkedIn) to determine target title names and contact information from target companies",
      "Help maintain database integrity of CRM system, including database cleansing",
      "Update systems to help determine Marketing Qualified Leads.",
    ],
  },
  "quality-assurance": {
    slug: "quality-assurance",
    role: "Quality Assurance",
    experience: "0 - 1 years",
    description: [
      "Should have good knowledge in testing using Selenium web driver.",
      "Knowledge on Java or Python.",
      "Possesses expertise knowledge in Manual and Automation.",
      "Maintain and Build Functional Automated TestSuite.",
      "Full participation in Release Planning and Product Roll Out.",
      "Preparation of test plans, design testcases.",
    ],
  },
  "senior-business-development-executive": {
    slug: "senior-business-development-executive",
    role: "Senior Business Development Executive",
    experience: "2 - 7 years",
    description: [
      "Research and develop a thorough understanding of the company's people and capabilities.",
      "Understand the company's goal and purpose so that will continual to enhance the company's performance.",
      "Identifying, qualifying, and securing business opportunities.",
      "New Client acquisition - Collaborating with sales and leadership to secure, retain, and grow accounts.",
      "Creating informative presentations; Presenting and delivering information to potential clients at client meetings, industry exhibits, trade shows, and conferences.",
      "Work with team to develop proposals that speaks to the client's needs, concerns, and objectives. Responding to client requests for proposals (RFPs).",
      "In regular coordination with potential client questions and follow-up call questions.",
      "Creating & Maintaining database by generating leads (Salesforce, CRM, Excel, etc.) of prospective client information.",
      "Lead Generation - Researching potential leads from business directories, web searches, or digital resources.",
      "Qualifying leads from digital campaigns, conferences, references, tradeshows, etc.",
      "Process - Cold calling; making multiple outbound calls to potential clients. Email Campaigns - Sending mass mails with engaging mail content and follow up with regard to replies.",
      "Closing sales and working with client through closing process.",
    ],
  },
  "senior-quality-analyst": {
    slug: "senior-quality-analyst",
    role: "Senior Quality Analyst",
    experience: "5 - 10 years",
    description: [
      "Working with QA team to validate web and mobile applications",
      "Creation and execution of Test Plan / Strategy.",
      "Experience in Agile Methodology",
      "Writing effective User Stories , Acceptance Criteria , Agile Scrum methodology, Backlog Grooming, Sprint Planning, Retrospective",
      "Build a QA team by evaluating people and handling performance reviews of the team.",
      "Ability to work in team in diverse/ multiple stakeholder environment",
      "Possess good Analytical and presentation skills",
      "Possess excellent oral and written communication skills- experience in client interfacing roles is an must",
      "Excellent communication and client interfacing skills – should possess the ability to work closely with multiple stakeholders Should be able to analyze test reports/results and provide high level recommendations",
      "Having experience in SQL to verify the database updates, inserts, and deletes of the records in the database.",
      "Using and customizing the Framework as per testing needs.",
    ],
  },
  "senior-ui-ux-designer": {
    slug: "senior-ui-ux-designer",
    role: "Senior UI UX Designer",
    experience: "2+ years",
    description: [
      "Manage the team.",
      "Gather and evaluate user requirements in collaboration with product managers and engineers.",
      "Illustrate design ideas using storyboards, process flows and sitemaps.",
      "Design graphic user interface elements, like menus, tabs and widgets.",
      "Build page navigation buttons and search fields.",
      "Develop UI mockups and prototypes that clearly illustrate how sites function and look like.",
      "Create original graphic designs (e.g. images, sketches and tables.",
      "Prepare and present rough drafts to internal teams and key stakeholders.",
      "Identify and troubleshoot UX problems (e.g. responsiveness).",
      "Conduct layout adjustments based on user feedback.",
      "Adhere to style standards on fonts, colors and images and design logos.",
    ],
  },
  "seo-analyst": {
    slug: "seo-analyst",
    role: "SEO Analyst - Digital Marketing",
    experience: "3 - 4 years",
    description: [
      "Perform keyword research to optimize existing marketing objectives and uncover new opportunities.",
      "Execute Search Engine Optimization Tasks which includes Complete site Audit, Mobile responsive checks, XML Sitemaps, Crawl errors, Competitor Analysis and Keyword research.",
      "Provide recommendations and execute strategies for content management in coordination with SEO goals.",
      "Monitor and evaluate the tasks executed on a timely basis to provide measurable outcomes.",
      "Communicate and collaborate effectively with the clients and within the team.",
    ],
  },
  "software-engineer": {
    slug: "software-engineer",
    role: "Software Engineer",
    experience: "0 - 2 years",
    description: [
      "Execute full software development life cycle(SDLC).",
      "Code, test and troubleshoot programs utilizing the appropriate framework, database, andprogramming technology.",
      "Write quality and clean code using prescribed specifications.",
      "Analyze performance of programs and take action to correct deficiencies.",
      "Good Communication Skill.",
    ],
  },
  "sr-bd": {
    slug: "sr-bd",
    role: "Sr. BD (Both Male & female)",
    experience: "5+ years",
    description: [
      "Identify and pursue new business opportunities through networking, referrals, and cold calling.",
      "Build and maintain a strong pipeline of potential clients and projects.",
      "Achieve monthly sales targets and execute business development plans effectively.",
      "Prepare and deliver presentations and proposals; negotiate and close deals on favorable terms.",
      "Guide and support team members, monitor performance, and handle escalation calls.",
      "Conduct market research to identify prospects, analyze trends, and track competitor activity.",
      "Collaborate with internal teams (technical, project, finance, legal) to ensure smooth deal execution and client onboarding.",
      "Participate in industry events and trade shows to promote company services.",
      "Maintain accurate sales records and submit weekly and monthly reports to management.",
    ],
  },
  "sr-software-engineer": {
    slug: "sr-software-engineer",
    role: "Sr Software Engineer",
    experience: "2 - 5 years",
    description: [
      "Determining project requirements and developing work schedules for the team.",
      "Liaising with team members, management, and clients to ensure projects are completed on time maintaining the expected quality standards.",
      "Updating work schedules and performing troubleshooting as required.",
      "Being transparent with the team about challenges, failures, and successes",
      "Delegating tasks among the team members and achieving daily, weekly, and monthly project milestones.",
      "Writing progress reports and delivering presentations to the relevant stakeholders.",
    ],
  },
  "trainee-bd": {
    slug: "trainee-bd",
    role: "Trainee - Business Development",
    experience: "0-2 years",
    description: [
      "Market Exploration: Work alongside the Business Development Manager to improve Soft Suave's market presence and help us achieve stellar growth.",
      "Client Relations: Get hands-on with client interactions, proposal writing, and managing follow-ups, all while connecting with potential clients and building new business opportunities.",
      "Competitive Edge: Stay ahead of the game by gathering insights on competitors, conducting competitive analysis, and providing smart ideas to boost Soft Suave’s market position.",
      "Collaboration & Communication: Act as acommunication bridge between clients and internal teams, ensuring smooth execution of projects and client requirements.",
    ],
  },
  "trainee-hr": {
    slug: "trainee-hr",
    role: "Trainee - HR",
    experience: "0-2 years",
    description: [
      "Design and develop interactive and visually appealing Manage end to end recruitment, from sourcing of candidates to release of the offer letter.",
      "Maintaining HR records, such as those related to compensation, Incentives, health and medical insurance.",
      "Managing workplace safety issues.",
      "Communicating and explaining the organization's HR policies to the employee.",
      "Preparation of Payroll.",
      "Conducting various games & celebration activities, engagement activities, employee recognition acts.",
      "Conducting employee orientation and facilitating newcomers joining formalities.",
      "Maintaining and regularly updating master database (personal file, personal database, etc.) of each employee in HR module of ERP software.",
      "Resolving grievances or queries that any of the employees have.",
    ],
  },
  "trainee-se": {
    slug: "trainee-se",
    role: "Trainee - Software Engineer (Male)",
    experience: "0-2 years",
    description: [
      "Execute full software development life cycle (SDLC)",
      "Code, test and troubleshoot programs utilizing the appropriate framework, database, and programming technology",
      "Write quality and clean code using prescribed specifications.",
      "Analyze performance of programs and take action to correct deficiencies",
      "Good Communication Skill",
    ],
  },
};

/** The application form's words, as the live page prints them. */
export const careerForm = {
  title: 'Submit Your Application',
  name: 'Your Name',
  email: 'Your E-mail',
  phone: 'Phone',
  experience: 'Experience',
  /** The dropdown's options, in the live order; `value` is what the live page posts. */
  experienceOptions: [
    { value: '1', label: 'Less than 1 Year' },
    { value: '2', label: '1-2 Years' },
    { value: '3', label: '2-3 Years' },
    { value: '4', label: '3-4 Years' },
    { value: '5', label: '4-5 Years' },
    { value: '6', label: 'More than 5 Years' },
  ],
  resume: 'Upload your resume(.doc and .pdf only)',
  attach: 'Attach Resume/CV',
  submit: 'Submit',
  sending: 'Sending...',
  thanks: 'Thank you for applying.',
  /** Under a field left empty. */
  required: 'Please fill in the required field.',
  /** Under an email that is not one. */
  invalidEmail: 'Please enter a valid email.',
  /** The live script's alerts, shown under the file instead. */
  wrongType: 'Upload only pdf or doc files',
  tooBig: 'Uploaded file exceeds the maximum file size of 500KB',
} as const;

/** The live script's limit: a resume must be under this many bytes. */
export const RESUME_MAX_BYTES = 500_000;
