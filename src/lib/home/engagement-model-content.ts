/**
 * /engagement-model — softsuave.com's "Our Flexible Engagement Models" page,
 * word for word. Images live under /images/engagement-model.
 */

export const engagementModelMeta = {
  path: '/engagement-model',
  shortTitle: 'Engagement Models',
  title: 'Explore Soft Suave Technologies Flexible Engagement Models',
  description:
    'Request a quote from Soft Suave for offshore software development, AI solutions and other services. Explore flexible engagement models tailored to your needs.',
} as const;

export const engagementModelHero = {
  titleLines: ['Our Flexible', 'Engagement Models', 'For High-Impact Solutions'],
  accent: 'Engagement Models',
  body: 'Soft Suave is one of the top development companies in India, and we serve clients worldwide. With 13+ years of experience and a whopping 400+ developers, we help clients build a partnership-based working process. More than immediate results, we strive to help clients reach their long-term business goals by crafting attractive and sensible solutions.',
} as const;

export const engagementModelPerks = {
  title: 'Perks of Hiring From Soft Suave',
  accent: 'Hiring',
  body: 'With Soft Suave you can cut down costs of searching, screening, and recruiting new developers and hire them quickly as our vetting process only allows for top talents. Partner with us to procure skilled developers who fit in just right with your project requirements, and are knowledgeable of all the technical know-how.',
  tabs: [
    { id: 'dedicated-team', label: 'Dedicated Team' },
    { id: 'time-and-materials', label: 'Time & Materials' },
    { id: 'fixed-price', label: 'Fix Price' },
  ],
} as const;

export interface EngagementBlock {
  readonly title: string;
  /** The words of the title the live page colours. */
  readonly accent: string;
  /** Paragraph pieces; a `{ text, href }` piece is an inline link. */
  readonly body: readonly (string | { readonly text: string; readonly href: string })[];
  readonly chips?: readonly string[];
}

export interface EngagementGroup {
  readonly id: string;
  readonly image: { readonly src: string; readonly alt: string; readonly width: number; readonly height: number };
  readonly blocks: readonly EngagementBlock[];
  readonly cards?: readonly {
    readonly title: string;
    readonly icon: string;
    readonly body: readonly (string | { readonly text: string; readonly href: string })[];
    readonly chips: readonly string[];
  }[];
  /** Blocks shown after the cards. */
  readonly afterCards?: readonly EngagementBlock[];
}

const IMG = '/images/engagement-model';

export const engagementGroups: readonly EngagementGroup[] = [
  {
    id: 'dedicated-team',
    image: { src: `${IMG}/dedicated-team.webp`, alt: 'engagement model - dedicated team', width: 747, height: 508 },
    blocks: [
      {
        title: 'Supercharge Development With Soft Suave',
        accent: 'Supercharge',
        body: [
          'Level up your tech team with the right developers. We source pre-vetted developers, project managers, Scrum Masters, and ',
          { text: 'QA testers', href: '/hire-qa-testers-india' },
          " who match your project's needs. Build a winning team to launch a market-dominating product.",
        ],
      },
    ],
    cards: [
      {
        title: 'Offshore',
        icon: `${IMG}/icon-offshore.webp`,
        body: [
          'Hire highly skilled ',
          { text: 'dedicated developers', href: '/hire-dedicated-developers' },
          ' at competitive rates, freeing up budget for other areas. Find specialists you might not have access to locally.',
        ],
        chips: ['Global Talent', 'Cost Savings'],
      },
      {
        title: 'ODC / BOT',
        icon: `${IMG}/icon-odc-bot.webp`,
        body: [
          'Build a custom offshore team that mirrors your company culture. Gain full control over a team of specialists and seamlessly scale as your project evolves.',
        ],
        chips: ['Custom Team', 'Scalable Growth'],
      },
      {
        title: 'Hybrid',
        icon: `${IMG}/icon-hybrid.webp`,
        body: [
          'Hybrid teams ensure increased productivity with clear communication, eliminating language barriers. Experience unmatched flexibility with our Agile development model.',
        ],
        chips: ['Agile Delivery', 'Zero Friction'],
      },
    ],
    afterCards: [
      {
        title: 'Advantages Of Hiring A Dedicated Team From Soft Suave',
        accent: 'Advantages',
        body: [
          "Soft Suave empowers you to build your dream development team with unparalleled flexibility. Choose from a pool of highly experienced developers and use our expertise to craft the perfect fit for your project. We're passionate about delivering exceptional service, ensuring your project receives the best talent and unwavering dedication, no matter where you are in the world.",
        ],
        chips: [
          'Scalable Expertise',
          'Cost-Effective Talent',
          'Agile Development',
          'Evolving Requirements',
          'Early-Stage Innovation',
          'Unparalleled Control',
        ],
      },
    ],
  },
  {
    id: 'time-and-materials',
    image: { src: `${IMG}/time-and-materials.webp`, alt: 'engagement model - time & materials', width: 736, height: 481 },
    blocks: [
      {
        title: 'Deliver On Schedule, Every Time With Soft Suave',
        accent: 'On Schedule,',
        body: [
          "Our flexible Time and Material (T&M) model empowers you to define your project scope and budget upfront, ensuring you get exactly what you need when you need it. Our skilled developers deliver high-quality software that meets your specific deadlines and market demands. Focus on your vision, and we'll handle the development, guaranteeing a successful and timely product launch.",
        ],
        chips: [
          'Long-Term Development Needs',
          'Entering New Markets',
          'Agile Development',
          'Evolving Requirements',
          'Early-Stage Innovation',
          'Unparalleled Control',
        ],
      },
      {
        title: 'Best Benefits Of Time And Material Model With Soft Suave',
        accent: 'Benefits',
        body: [
          "Soft Suave's Time & Material model offers transparency (clear costs, real-time updates) and top-notch resources. Adapt to changing needs with ease – you control your project's direction.",
        ],
        chips: [
          'Rapid Launch',
          'Market Agility',
          'Test & Refine',
          'Uncompromising Quality',
          'Full Visibility',
          'Market-Driven Development',
        ],
      },
    ],
  },
  {
    id: 'fixed-price',
    image: { src: `${IMG}/fixed-price.webp`, alt: 'engagement model - fix price', width: 736, height: 481 },
    blocks: [
      {
        title: 'Save Your Product From Inflating Costs',
        accent: 'Inflating Costs',
        body: [
          "Lock in your budget and development timeline with our Fixed-price model. Our expert analysts will meticulously analyze your concept and craft a clear roadmap to deliver your software vision. Soft Suave's Fixed Price model guarantees upfront costs and a clear roadmap for success.",
        ],
        chips: ['Defined Scope', 'MVP Focus', 'Cost Certainty', 'Guaranteed Delivery', 'Efficient Development'],
      },
      {
        title: 'Pros Of Opting For Fixed Price Engagement Model With Soft Suave',
        accent: 'Fixed Price',
        body: [
          "This service takes your vision from concept to deployment with a clear, fixed price. We'll guide you through every step, ensuring a smooth product development journey.",
        ],
        chips: [
          'Concept to Completion',
          'On-Time Deployment',
          'Effortless Management',
          'Cost Certainty',
          'Crystal-Clear Scope',
          'Efficient Communication',
        ],
      },
    ],
  },
];

const T = `${IMG}/tech`;

export const engagementTech = {
  title: 'Choose Offshore Developers In Various Technologies',
  accent: 'Choose',
  body: 'Expand your development reach. Access a global pool of skilled professionals across diverse technologies.',
  groups: [
    {
      title: 'Frontend',
      body: 'Craft stunning, user-friendly web interfaces with our offshore front-end developers. They master cutting-edge frameworks for an interactive experience.',
      logos: [
        { name: 'React', src: `${T}/react.webp`, alt: 'Hire ReactJS Developers in India', href: '/hire-reactjs-developers' },
        { name: 'Angular', src: `${T}/angular.webp`, alt: 'Hire Angular Developers in India', href: '/hire-angularjs-developers' },
        { name: 'Vue.js', src: `${T}/vue-9-1.webp`, alt: 'Vue-js' },
        { name: 'HTML5', src: `${T}/html-5.webp`, alt: 'HTML' },
        { name: 'Bootstrap', src: `${T}/bootstrap.webp`, alt: 'Bootstrap' },
        { name: 'JavaScript', src: `${T}/javascript-1.webp`, alt: 'Javascript' },
      ],
    },
    {
      title: 'Backend',
      body: 'Empower your web applications with unmatched security and scalability. Hire our offshore backend developers to handle all your back-end needs expertly.',
      logos: [
        { name: '.NET', src: `${T}/dot-net.webp`, alt: '.NET', href: '/hire-dot-net-developers' },
        { name: 'Java', src: `${T}/java.webp`, alt: 'Java', href: '/hire-java-developers' },
        { name: 'PHP', src: `${T}/php.webp`, alt: 'PHP', href: '/hire-php-developers' },
        { name: 'Node.js', src: `${T}/node.webp`, alt: 'Node', href: '/hire-nodejs-developers' },
        { name: 'Python', src: `${T}/python.webp`, alt: 'Python', href: '/hire-python-developers' },
        { name: 'Laravel', src: `${T}/laravel.webp`, alt: 'Laravel' },
      ],
    },
    {
      title: 'Mobility',
      body: 'Utilize our offshore mobile app developer’s cutting-edge skills to build top-tier apps with exceptional quality.',
      logos: [
        { name: 'Android', src: `${T}/android.webp`, alt: 'Android', href: '/hire-android-developers' },
        { name: 'iOS', src: `${T}/apple.webp`, alt: 'iOS', href: '/hire-ios-developers' },
        { name: 'React Native', src: `${T}/react-native.webp`, alt: 'React Native', href: '/hire-react-native-developers' },
        { name: 'Flutter', src: `${T}/flutter.webp`, alt: 'Flutter', href: '/hire-flutter-developers' },
        { name: 'Swift', src: `${T}/swift.webp`, alt: 'Swift' },
      ],
    },
    {
      title: 'DevOps & Cloud Solution',
      body: "Soft Suave empowers your business growth with our programmers' expertise across the latest technologies and solutions.",
      logos: [
        { name: 'Azure', src: `${T}/azure.webp`, alt: 'Azure' },
        { name: 'AWS', src: `${T}/aws.webp`, alt: 'AWS' },
        { name: 'TensorFlow', src: `${T}/tensorflow.webp`, alt: 'TensorFlow' },
        { name: 'Dialogflow', src: `${T}/dialog.webp`, alt: 'Dialogflow' },
      ],
    },
  ],
} as const;

export const engagementAwards = { title: 'Awards & Certifications' } as const;

export const engagementClients = {
  eyebrow: 'Our Clients',
  title: 'A Place Driven by Values and Focused on Innovation!',
  more: { label: 'View More Clients', href: '/clients' },
  logos: [
    { name: 'Poorvika', src: '/brand/clients/poorvika.webp' },
    { name: 'Office Space', src: '/brand/clients/officespace.webp' },
    { name: 'Utiliko', src: '/brand/clients/utiliko.webp' },
    { name: 'Decathlon', src: '/brand/clients/decathlon.webp' },
    { name: 'Lottosocial', src: '/brand/clients/lottosocial.webp' },
    { name: 'Ducont', src: '/brand/clients/ducont.webp' },
    { name: 'Outsource', src: '/brand/clients/outsource.webp' },
    { name: 'Wrench', src: `${IMG}/client-wrench.webp` },
  ],
} as const;

export const engagementFooterCta = { label: 'Get Free Estimate', href: '/free-cost-estimation' } as const;
