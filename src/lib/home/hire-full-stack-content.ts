import type { HeroContent } from '@/components/landing/hero';
import type { FaqContent } from '@/components/landing/faq';
import type { EngagementModelsContent } from '@/components/ad/engagement-models';
import { heroForm } from '@/lib/home/hire-roles/shared';
import { sharedHeroBadges } from '@/lib/home/delivery-shared';
import { HOURLY_RATE } from '@/lib/company-figures';

/**
 * /hire-full-stack-developers-in-india — softsuave.com's "Hire Full Stack Developers Remotely Within 48
 * Hours" page, word for word: the banner with its quote form, the overview, the eight stack combinations,
 * the reasons to hire in India, the three hiring models, the benefits, the rate-card band, the four steps,
 * the trust band, the FAQs and the closing "Book Free Consultation" band. Images are under
 * /images/hire-full-stack.
 */

export const fsMeta = {
  path: '/hire-full-stack-developers-in-india',
  shortTitle: 'Hire Full Stack Developers',
  title: 'Hire Full Stack Developers India at Affordable Rates',
  description:
    'Hire full-stack developers India remotely with Soft Suave, Offers certified full stack developers on an hourly, and full-time with 5 days free trial.',
} as const;

const IMG = '/images/hire-full-stack';
/** The marks the Full Stack ad page already uses. */
const TECH = '/brand/ad/stack';

/** The live button is a plain link to this page (no popup); SiteLink sends it to softsuave.com while we don't serve it. */
export const RATE_CARD_HREF = '/developer-rate-card';

export const fsHero: HeroContent = {
  titleLines: ["Hire Full Stack Developers Remotely Within 48 Hours"],
  accent: 'Full Stack Developers',
  titleScale: 'home',
  body: ["Soft Suave helps companies hire experienced full stack developers from India without long recruitment cycles. Our experts work across React, Angular, Node.js, Python, Java, .NET, databases, APIs, cloud deployment, and end-to-end product development. Scale teams quickly with pre-vetted developers and flexible hiring models.", "See why businesses choose Soft Suave for their full-stack developer hiring.", "*Satisfaction Guaranteed – Get 40-hour Free Trial"],
  points: ["40-Hour Risk-Free Trial", "Hire Top Full Stack Developers in India", "Time-Zone & Language Aligned Teams", "Airtight NDA & IP Protection", "Strong Delivery Governance from Day One"],
  badges: sharedHeroBadges,
  ctas: [
    { label: 'Start 40 Hours Free Trial →', href: '/free-7-days-trial' },
    { label: 'Book a Meeting', href: 'https://calendly.com/soft_suave/dedicated-teams', external: true },
  ],
  ctaSeparator: 'OR',
  form: {
    ...heroForm({
      title: "Get Skilled Remote Developers",
      requirementLabel: 'How Can We Help (Requirement)',
      requirementPlaceholder: 'How Can We Help(Requirement)',
      subject: 'Full stack developer hiring enquiry',
      noEyebrow: true,
    }),
  },
};

export const fsAbout = {
  title: "Onboard Offshore Full-Stack Developers For All Your IT Needs",
  image: { src: `${IMG}/banner.webp`, alt: 'Hire Dedicated Ionic Developers from Soft Suave', width: 529, height: 600 },
  paragraphs: [
  "If you're a new tech business, you'd know that full-stack developers are an essential element of your tech lineup with a diverse range of skills, including both front-end and back-end.",
  "Onboard full-stack developers from Soft Suave to develop advanced and feature-rich applications with a wide range of stack combinations with convenient IT outsourcing services. Rather than hiring various developers for different projects, you can hire one full-stack developer who can handle the whole project with expertise in multiple technologies.",
  "By partnering with us, you can benefit from our offshore development model, which allows you to access top-notch talent at a competitive cost. Our dedicated remote developers are proficient in various technologies and frameworks, ensuring that we can meet your specific project requirements.",
  "We understand the importance of effective communication and collaboration in remote working scenarios. Our team utilizes advanced project management tools and practices to ensure smooth coordination throughout the development process. We are dedicated to delivering high-quality solutions that align with your business objectives and timelines.",
  "If you are looking to onboard offshore Full-Stack Developers for your IT needs, Soft Suave can offer you the expertise and support you require with a 40-hour free trial before onboarding. Feel free to reach out to us to discuss your specific project requirements."
],
} as const;

export const fsStack = {
  title: "Unleash Tech Potential With Full-Stack Experts",
  accent: 'Full-Stack Experts',
  body: "Our Full Stack developers are highly qualified, full-time, and in-house employees who can provide you with flexible and Advanced solutions.",
  linkLabel: 'Know more',
  items: [
    { name: "Hire MEAN Stack Developers", body: "Hire Full Stack MEAN developers who are highly experienced in MongoDB, ExpressJS, Angular, and NodeJS.", href: "/hire-mean-stack-developers-india", icons: [{ src: `${TECH}/angular.webp`, alt: "Angular developers" }, { src: `${TECH}/mongodb.webp`, alt: "MongoDB developers" }, { src: `${TECH}/express.webp`, alt: "Express developers" }, { src: `${TECH}/node.webp`, alt: "Node developers" }] },
    { name: "Hire MERN Stack Developers", body: "Build performant monolithic, multitier, and microservice architectures with MERN Stack developers.", href: "/hire-mern-stack-developers-india", icons: [{ src: `${TECH}/mongodb.webp`, alt: "MongoDB developers" }, { src: `${TECH}/express.webp`, alt: "Express developers" }, { src: `${TECH}/react.webp`, alt: "React developers" }, { src: `${TECH}/node.webp`, alt: "Node developers" }] },
    { name: "Laravel + VueJs", body: "Using Laravel + VueJS, our developers can integrate with Symfony, Yii, CakePHP, and Codeigniter.", href: "/hire-php-developers", icons: [{ src: `${TECH}/laravel.webp`, alt: "Laravel developers" }, { src: `${TECH}/vue.webp`, alt: "VueJS developers" }] },
    { name: ".NET + Angular", body: "Find .NET developers who can design, develop, deploy, integrate, and handle front-end development with Angular.", href: "/hire-dot-net-developers", icons: [{ src: `${TECH}/dotnet.webp`, alt: ".Net developers" }, { src: `${TECH}/angular.webp`, alt: "Angular developers" }] },
    { name: "React + React Native + MongoDB", body: "Our React experts can develop both React web apps and hybrid mobile apps based on React Native, which can scale on demand.", href: "/hire-reactjs-developers", icons: [{ src: `${TECH}/mongodb.webp`, alt: "MongoDB developers" }, { src: `${TECH}/react.webp`, alt: "React developers" }] },
    { name: "Android + Flutter", body: "Our team includes Android developers who are also capable of developing cross-platform mobile apps using Flutter.", href: "/hire-android-developers", icons: [{ src: `${TECH}/android.webp`, alt: "Android developers" }, { src: `${TECH}/flutter.webp`, alt: "Flutter developers" }] },
    { name: "React Native + Electron js", body: "Using Electron JS and React Native, our Full Stack engineers can build scalable desktop applications from a single codebase.", href: "/hire-react-native-developers", icons: [{ src: `${TECH}/electron.webp`, alt: "Electron JS developers" }, { src: `${TECH}/react.webp`, alt: "React developers" }] },
    { name: "Java + JS (React/Angular) + Firebase", body: "Our Full Stack specialists can work with Java, J2EE, Spring, Angular, React & Firebase to get the desired result.", href: "/hire-java-developers", icons: [{ src: `${TECH}/angular.webp`, alt: "Angular developers" }, { src: `${TECH}/java.webp`, alt: "Java developers" }, { src: `${TECH}/react.webp`, alt: "React developers" }, { src: `${TECH}/firebase.webp`, alt: "Firebase developers" }] },
  ],
} as const;

export interface IconCard {
  readonly name: string;
  readonly body: string | readonly (string | { readonly text: string; readonly href: string })[];
  readonly icon: string;
}

export const fsWhy = {
  title: "Why Hire Remote Full Stack Developers in India?",
  accent: 'Hire Remote Full Stack Developers in India?',
  body: "There are several reasons why hiring full-stack developers in India can be a beneficial choice",
  pills: ["Significant Growth of Skilled Developers", "Friendly Outsourcing Environment", "Problem-Solving Skills", "Domain Expertise", "Language Proficiency", "Affordable Cost"],
  cta: { label: "Start 40 Hours Free Trial", href: '/free-7-days-trial' },
  items: [
    { name: "Significant Growth of Developers", body: "India has experienced significant growth in its developer community, with a large pool of remote full-stack developers. This means you have a wide range of skilled professionals to choose from, increasing the chances of finding the right fit for your project.", icon: `${IMG}/why/growth.svg` },
    { name: "Friendly Outsourcing Environment", body: "Global businesses have embraced India as a favorable outsourcing destination. With a well-developed IT infrastructure, supportive government policies, and a business-friendly environment, it is easier to collaborate and work remotely with fullstack developers.", icon: `${IMG}/why/outsourcing.svg` },
    { name: "Problem-Solving Skills", body: "Full-stack developers in India are known for their strong problem-solving skills. They are adept at finding innovative solutions and can tackle complex challenges, which can be invaluable for your development projects.", icon: `${IMG}/why/skills.svg` },
    { name: "Domain Expertise", body: "Many full-stack developers have a wealth of experience in various domains and industries. This allows them to bring valuable insights and expertise to your projects, helping you build applications that cater to specific industry requirements.", icon: `${IMG}/why/domain.svg` },
    { name: "Language Proficiency", body: "English proficiency is widespread among Indian developers, making communication smooth and efficient. Effective communication is crucial for successful collaboration, and language proficiency can significantly reduce misunderstandings and improve project outcomes.", icon: `${IMG}/why/language.svg` },
    { name: "Affordable Cost", body: "Hiring full-stack developers in India often comes at a more affordable cost compared to other countries. The lower cost of living and favorable currency exchange rates make it possible to access high-quality development talent at a competitive price.", icon: `${IMG}/why/cost.svg` },
  ] as readonly IconCard[],
} as const;

export const fsModels: EngagementModelsContent = {
  title: "Collaborate With The Offshore Full Stack Developers In India",
  body: "Hire Software developers using Soft Suave’s hiring models are designed based on the best interests of our client's requirements.",
  models: [
    { name: "PART-TIME HIRING", image: { src: '/brand/ad/java/model-half-time.webp', alt: 'Part-time hiring' }, facts: [{"label": "Duration", "value": "4 Hrs/Day – 5 Days/Week (80 Hrs/Month)"}, {"label": "Billing", "value": "Monthly"}, {"label": "Timeline", "value": "Based on Project"}] },
    { name: "FULL-TIME HIRING", image: { src: '/brand/ad/java/model-full-time-hire.webp', alt: 'Full-time hiring' }, facts: [{"label": "Duration", "value": "8 Hrs/Day – 5 Days/Week (160 Hrs/Month)"}, {"label": "Billing", "value": "Monthly"}, {"label": "Timeline", "value": "Based on Project"}] },
    { name: "MILESTONE HIRING", image: { src: '/brand/ad/java/model-milestone.webp', alt: 'Milestone hiring' }, facts: [{"label": "Duration", "value": "8 Hrs/Day – 5 Days/Week"}, {"label": "Billing", "value": "Weekly/Daily/Monthly"}, {"label": "Timeline", "value": "Based on Project"}] },
  ],
  cta: { label: "Hire Full Stack Developers", href: '#enquiry' },
};

export const fsBenefits = {
  title: "Benefits of Hiring Soft Suave's Remote Full Stack Developers",
  body: "There are several reasons why you should consider hiring full-stack developers",
  items: [
    { name: "Flexible Hiring Models", body: "We understand that every project and organization has unique requirements and you may have faced challenges with traditional hiring models. Our flexible hiring models allow you to hire resources as and when you need them, so you can scale up or down as needed. This helps to reduce overhead costs and maximize your return on investment.", icon: `${IMG}/benefits/sec-1.svg` },
    { name: "Integrated Stack Expertise", body: ["Full stack developers minimize the risk of adding up many resources to the team and allow them to easily manage the entire project. Our ", {"text": "dedicated developers", "href": "/hire-dedicated-developers"}, " can handle the entire development process, from concept to deployment. So, choosing talented full-stack developers from Soft Suave helps you speed up development and get the best product."], icon: `${IMG}/benefits/sec-2.svg` },
    { name: "Technological Advancements", body: "Technology evolves quickly, and so too our solutions. We stay ahead of the curve and find ways to stay relevant. Our developers are working to create innovative products that solve real-world problems. We are open to new ideas and approaches and are willing to take risks in order to stay ahead.", icon: `${IMG}/benefits/morden-solution.svg` },
    { name: "Client-Centric Approach", body: "We believe in bringing up strong communication and collaboration throughout the development process to ensure that your vision is brought to life. Our full-stack developers actively engage with you to understand your project's specifics, ensuring that the solutions we deliver align with your business objectives.", icon: `${IMG}/benefits/sec-3.svg` },
    { name: "40 Hours Free Trial", body: "When you outsource developers, you may have no idea of what they are capable of, Are they good enough? At Soft Suave, You can evaluate developers' work quality, problem-solving capabilities, and communication skills with our 40 hours free trial to ensure that they are the right fit for your team. This allows you to assess their skills, expertise, and compatibility with your project before making a commitment.", icon: `${IMG}/benefits/free-trial.svg` },
    { name: "Time Zone Overlaps 4 Hours", body: "Different time zones between clients and developers cause communication and cooperation issues. We understand the importance of real-time communication for project success. With our team's time zone overlapping by 4 hours with yours, we ensure effective collaboration and timely communication, minimizing any potential delays in project progress.", icon: `${IMG}/benefits/time-zone.svg` },
  ] as readonly IconCard[],
} as const;

export const fsRate = {
  title: `Access Our Full-Stack Developers Starting at ${HOURLY_RATE}`,
  body: "We will provide you with remote full stack developers that work from India. Contact us to take a look at CVs.",
  cta: { label: "Request Rate Card", href: RATE_CARD_HREF },
} as const;

export const fsSteps = {
  title: "Four Easy Steps to Onboard a Full-Stack Developer",
  body: [
    'Below is the simple ',
    { b: 'Full-time Hiring Process' },
    ' that we follow while offering ',
    { b: '40 Hours free trial' },
    ' to our clients.',
  ] as const,
  web: { src: `${IMG}/steps-web.webp`, alt: 'hire steps for web view', width: 1921, height: 309 },
  mobile: { src: `${IMG}/steps-mobile.webp`, alt: 'hire steps for web view', width: 415, height: 1080 },
} as const;

export const fsTrust = {
  title: "The World's Top Companies Trust Soft Suave",
  body: [
    'Our experience in setting up ',
    { text: 'offshore development teams', href: '/hire-software-developers' },
    " has helped companies of all sizes and industries excel. When you hire Full Stack developers from Soft Suave, you can be confident that we have.",
  ] as const,
  points: ["Strict NDA and Transparency.", "Agile development environment.", "Sound knowledge of languages, tools, and technologies.", "Best-in-class project management."],
  /** The sixteen marks of the live picture, as the /clients strip runs them. */
  logos: [
    ['Netsmartz', 'netsmartz'], ['PaceWisdom', 'pacewisdom'], ['Ducont', 'ducont'], ['Teamicate', 'teamicate'],
    ['Mcbird', 'mcbird'], ['McLaren Strategic Ventures', 'mclaren-strategic-ventures'], ['LyncSpace', 'lyncspace'], ['Omri', 'omri'],
    ['Decathlon', 'decathlon'], ['Ad.net', 'adnet'], ["Who's Up", 'whos-up'], ['Arcturus', 'arcturus'],
    ['DocToc', 'doctoc'], ['TrafficSpy', 'trafficspy'], ['Oasis Digital', 'oasis-digital'], ['Appinux', 'appinux'],
  ].map(([name, file]) => ({ name, src: `/brand/clients/${file}.webp` })),
} as const;

export const fsFaqs: FaqContent = {
  eyebrow: '',
  title: 'Frequently Asked Questions',
  body: 'Know more about our processes and how we work, with the help of the following FAQs.',
  links: [{ text: '40 hours free trial', href: '/free-7-days-trial' }],
  items: [
    {
      q: 'Are full-stack developers in demand?',
      a: 'A full-stack developer is a valuable asset to any organization. Their wide-ranging knowledge makes them flexible, adaptable, and agile. Soft Suave makes the hiring process easy if you are looking to hire a proficient full-stack developer.',
      points: [
        'Analyze the developer’s portfolio',
        'Identifying current and past clients',
        'Always look for developer’s platform compatibility',
        'Fix clear and effective communication channels',
      ],
    },
    {
      q: 'Why should I hire a full-stack developer?',
      a: 'Due to the fact that a full-stack developer can fulfill multiple roles, you do not need to hire other developers. For outstanding results, you can also choose a full-stack development company with extensive experience. Whenever you need both front-end and back-end developers, go for a full-stack developer.',
      points: [
        'Frontend Technologies: HTML5, Bootstrap, AngularJS, ReactJS, JavaScript.',
        'Backend Technologies: NodeJS, Laravel, ExpressJS, CodeIgniter.',
        'Database & Server: Apache, AWS, MySQL, MongoDB, PostgreSQL, NGINX.',
      ],
    },
    {
      q: 'Why Soft Suave is the Best place to hire Full stack developers?',
      a: 'Soft Suave provides 40 hours free trial for developers, Known for having the best remote full stack programmers, Soft Suave developers are good at understanding the tasks, have good communication skills, and adequate experience, and they are trained to be the powerhouse of all technolohy knowledge.',
    },
  ],
};
