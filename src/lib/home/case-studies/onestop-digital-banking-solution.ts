import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/onestop-digital-banking-solution` — softsuave.com's Building a Highly
 * Secured One-stop Digital Banking Solution case study
 * (https://www.softsuave.com/onestop-digital-banking-solution — live's slug,
 * without the `case-study-` prefix), rebuilt on the site's case-study
 * template the way `ticket-management-system.ts` is (one of live's older,
 * plainly headed case studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the seven section headings, their sub-headings (with live's ":-"), every
 * paragraph, list item, card, loan feature, wallet option and technology
 * name, the closing download band and the related-case-study heading. That includes live's quirks: "Kind", "featurerich", "philippine",
 * "lover monthly interest rate", and the "High Bank Charges" challenge
 * repeating "Bygone Mobile Experiences"'s text word for word. Section ids are live's (`#section1`…`#section7`).
 *
 * How live's nesting is set: the challenges and loan types (a bold label,
 * then its paragraph) are bold-lead lists; Solo/Group Stash are plain cards;
 * the stack is logo tiles labelled with live's layer (`group`); the
 * in-section sub-headings — "UX and UI:-", "Stash:-", "Time Deposits:-",
 * "Loans:-", "Loan Features:-", "Top up (Wallet):-", "Solution:-" — are `sub`
 * sections, and the loan types, which live sets under the loan features with
 * no heading, an untitled one. Live's side-by-side "Wallet Options" / "Send"
 * lists are one two-column table (review). Live's
 * single-bullet Stash line is a paragraph here so it stays above the cards.
 *
 * The images, logos and PDF are live's, self-hosted
 * (`public/images/case-studies/onestop-digital-banking-solution/`,
 * `…/technologies/`, `public/assets/case-studies/`); the PDF keeps live's
 * path. React's logo is the one the earlier clones ship.
 *
 * Not carried over: live's hero backdrop (the hero is set like the Vehicle
 * Intelligence one); the loan features' left/right timeline (a plain list
 * here); and the images' terse alts ("Digital-Banking"), described here
 * instead.
 */

export const digitalBankingMeta = {
  path: "/onestop-digital-banking-solution",
  /** Live's `<title>`, verbatim. */
  title: "One Stop Digital Banking Platform | Digital Banking Solution",
  /** Live's meta description, verbatim ("casestudy" included). */
  description:
    "Explore our casestudy on how we built a highly secure one-stop digital banking solution to offer safe and convenient banking services to our customers.",
  /** Live's `og:title` / `twitter:title`, verbatim — not its `<title>`. */
  socialTitle: "One Stop Digital Banking Platform",
  /** Live's `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const IMG = "/images/case-studies/onestop-digital-banking-solution";
const TECH = "/images/case-studies/technologies";
const PDF = "/assets/case-studies/digital-banking-solution.pdf";

export const digitalBankingCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Building a Highly Secured", "One-stop Digital Banking Solution"],
    accent: "Highly Secured",
    titleSubLast: true,
    body: [
      "Interactive Neo Banking facility offering risk-free, secured digital banking – simplifies all your financial needs into single click transactions.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Banking" },
      // Live shows Android alone.
      platformFact([P.Android]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 567,
      height: 667,
      alt: "Two phone screens of the banking app: cards with a promotional rate and salary and credit card balances, and an overview of bills, deposits and credits with an Add Funds button",
      blurDataURL:
        "data:image/webp;base64,UklGRoQBAABXRUJQVlA4WAoAAAAQAAAADQAADwAAQUxQSLwAAAABgKtt//nl/SE32ty6Gu3aOgMdge1m2x1BrcZkjV1ttt36/3/1nkZEBADLho2Sm63xqgjbdQDLxTSl5CAAv0gX2KXXw5rIpoVTTxmiPqkNMyapJBeRT6P5ElpJr+QD6qgUt5H4T02mzVMqjgEnVIpd29SaZUAvpeHZHw1lKlBKY6gNNc+DgdB3ahojvVyCY2GdijRU7IHjoJVS86Z97yMdtoMcqbz8i4U/AAuBd9SetRBYFgAbHUfVKQAsAFZQOCCiAAAAUAIAnQEqDgAQAAOAWiUAXYDFTvsxOTOu+sUAAP7SLwxzJRh8Fx9nUuHHk7NwnB/03vpuUPiJ62QMKj7KiMIbqqJXew3uzG7YKKT+t/4nCNSx5CkNV26U/4Gp/DAxKFREWnGXG+NXUHgF5VrNXCoBHkanUfDZi/8eVL+4uq/CzEPmz9FjjHTV9JwEU+1x0n8SisuMoQNXoBQqsHuwvlXMDAAA",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the phones
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Out Sketch",
      title: "Out Sketch",
      body: [
        "The Client is one of the first neo-banking companies based in the Philippines with branches in Singapore and India. They want to expand their service through a mobile application that sits on everyone's phone as a secured banking platform.",
        "The brick-and-mortar Kind of bank is no longer necessary. The fully digital facility reduces transaction risks and time. The client aims to provide a secured banking service with interactive simplifications by augmenting this service to the mobile application.",
      ],
    },
    {
      id: "section2",
      nav: "The Banking Application Offers",
      title: "The Banking Application Offers",
      body: [
        "The online banking service offers everything that has been done physically into a fully digital facility so that it simplifies all the risky tasks for both the bank and customers.",
        "Using this app, you can access a variety of financial products, such as deposits, loans, savings accounts, payments, and cards, with High security. You can also interact and use offers and benefits with a smile on your face with the application as it fulfills all your financial needs. It has engaging UX/UI features and is featurerich.",
      ],
    },
    {
      id: "section3",
      nav: "Client Requirements",
      title: "Client Requirements",
      body: [
        "Our client is a philippine based banking investor who had a vision of developing the first neo banking application in central Asia. Choosing us as their trusted partner, They met us with the primary requirements as follows.",
      ],
      list: [
        "Wanted to build a mobile application for a new-age banking domain application.",
        "A secure neo banking app with features like Stashes, Time deposits, and Loans.",
        "Filipinos are the primary users.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/requirements.webp`,
        width: 714,
        height: 818,
        alt: "Two phone screens of the banking app: a Welcome log-in screen, and a Connect to your bank account sign-up form",
        blurDataURL:
          "data:image/webp;base64,UklGRg4BAABXRUJQVlA4WAoAAAAQAAAADQAADwAAQUxQSHMAAAANcFXbtqqsfZ8HgT8iaA9aEIkS/Lm7hLAE7yEX9wIRMQFGgI6V0smxpmbPIOunEIZiNn3Q2Z0NPYBzFY8zGnKvyAImSh6A4f6sB+Je/O1Zd+cXToC5O+twCo3O2lkBisucLN7acB9MmpzZq5M5iGiFewYsAFZQOCB0AAAAEAIAnQEqDgAQAAOAWiWwAnQGLzb41avBEAD+6eOKw4hq5eVAHrha/LmFECMzFaHiX3P5qi36+pPiPGrd7V5Mx/l0/RVww2p4dvTeRwshfPRJuDvWBHokh2J/hw5UVmuVhdF1OmoPXjBl+F5e9eNwFBSAAAA=",
      },
    },
    {
      id: "section4",
      nav: "Challenges",
      title: "Challenges",
      body: [
        "Building a Mobile application for a Neo Bank carries lots of challenges. As a first phase, we started to list out the challenges so we can solve them for the client’s app. Figuring this out also helps us understand more about the Banking application’s market needs and how to make it unique by adding new features.",
      ],
      list: [
        {
          lead: "Bygone Mobile Experiences: ",
          text: "The more a trend is followed, the more it gets outdated and flawed. Wanting for the new features also gets increased. For a banking application, Speed, simplification, and flexibility in transactions are very important.",
        },
        {
          lead: "High Bank Charges: ",
          // Live repeats the challenge above word for word.
          text: "The more a trend is followed, the more it gets outdated and flawed. Wanting for the new features also gets increased. For a banking application, Speed, simplification, and flexibility in transactions are very important.",
        },
        {
          lead: "Security Infringement: ",
          text: "Security is one of the major concerns for customers to trust online banking because of the frequent cyber attacks in recent years.",
        },
        {
          lead: "Pandemic Crisis: ",
          text: "When the Covid -19 outbreak happened, the pandemic situation led to direct banking transactions. That's when neo-banking was there to help people with all types of financial support.",
        },
        {
          lead: "Lengthy Signup And Verification Process: ",
          text: "People may just leave the application if the registration process itself is a complicated and confusing one. So, Simplifying particularly these portions is one important thing to consider.",
        },
        {
          lead: "Decrees and Regulations: ",
          text: "Every fintech app faces compliance challenges. Getting it right is generally time-consuming, confusing, and expensive. Many countries do not have a single fintech-centric regulation that app developers must follow.",
        },
      ],
      listSingle: true,
      image: {
        src: `${IMG}/challenges.webp`,
        width: 875,
        height: 1021,
        alt: "Two phone screens of the banking app: a Transaction screen with a QR code and barcode to scan, and a transfer form from one bank account to another",
        blurDataURL:
          "data:image/webp;base64,UklGRv4AAABXRUJQVlA4WAoAAAAQAAAADQAADwAAQUxQSGYAAAAFcBPbtqvsez85JwMZFKACTzhACjpiRUWHAChzeqd4nw4BETEBiYF9yrtx8OCrL2DqHCsyYNb/GLov6pGWWYCAEyeKzEl1/rB+BEWWJjnILjKQneadgAobIzp3LybgMJEF308/LhBWUDggcgAAABACAJ0BKg4AEAADgFolsAJ0APSvLwIyM3gA/uOEqJqAFsAR4RkX0QP356yyyqWaN5e0ykIHQsxpkesG3vDYmdlIrBQ6cc1lGwYgX6n3APo8auE7eCfHqbeHjEilNGMh7Gclmr98issaxJW9aB4F4WDAAA==",
      },
    },
    {
      id: "section5",
      nav: "Our Approach",
      title: "Our Approach",
      body: [
        "When the challenges are found, we have to fulfill them with adequate features and flexible usage. The appearance of the app is also equally important.",
      ],
    },
    {
      id: "section5-ux-ui",
      sub: true,
      title: "UX and UI:-",
      list: [
        "The importance of visibility cannot be overstated. At the same time, It is combined with user experience.",
        "Both looks and feel of the app determine its market success and get satisfied, happy users. Sometimes, banks focus more on databases and other entities without giving equal importance to the UX and UI.",
        "That makes most applications fail even though building-wise it was excellent. If the customer is impressed with the mobile app service, it will be a more beneficial thing for both customers and the business.",
      ],
      listSingle: true,
    },
    {
      id: "section6",
      nav: "Tech Stack For The Mobile App",
      title: "Tech Stack For The Mobile App",
      tech: [
        { group: "Frontend", name: "React Native", logo: { src: `${TECH}/react.svg`, width: 22, height: 20 } },
        { group: "Backend", name: "Java", logo: { src: `${TECH}/java.svg`, width: 373, height: 425 } },
        { group: "Database", name: "My Sql", logo: { src: `${TECH}/mysql-logo.svg`, width: 256, height: 252 } },
        { group: "Cloud", name: "AWS", logo: { src: `${TECH}/aws.svg`, width: 167, height: 100 } },
      ],
    },
    {
      id: "section7",
      nav: "App Features",
      title: "App Features",
      body: [
        "The neo banking mobile application features are different from a physical bank’s app. Because they offer different services, these kinds of banks mostly rely on fully online and instant simplified banking. That's how this app is designed for its needs.",
      ],
    },
    {
      id: "section7-stash",
      sub: true,
      title: "Stash:-",
      body: [
        "Save and grow your money with people you trust by stashing your cash. You can earn up to 4.5% annually. Stash helps you with customized saving accounts either personal or group to save money as an investment.",
      ],
      cards: {
        variant: "plain",
        items: [
          {
            name: "Solo Stash",
            body: "These are personal stashes. The user can choose their saving goals fully under their control. A user can have a maximum of 5 stashes either group or solo.",
          },
          {
            name: "Group Stash",
            body: "Group stashes are social ways to save money. It also allows users to invite friends and family to join a group stash so that they can contribute to whatever they're saving up for.",
          },
        ],
      },
      image: {
        src: `${IMG}/stash.webp`,
        width: 897,
        height: 1011,
        alt: "Two phone screens of the banking app: a list of completed transactions, and a Payment screen with the balance and bill categories such as water, electricity and mortgage",
        blurDataURL:
          "data:image/webp;base64,UklGRv4AAABXRUJQVlA4WAoAAAAQAAAADQAADwAAQUxQSGsAAAANcFpt27Lcz/f7n4maGIaViAxhc5BobEDSZDO4vL+TGCAiJsCn+l0Mv16mywdQFrYRojPqv2Txch0BZGNCMtINAmQG+Jmj1hOA+6rmz2b6/pIJJ8jMVa6T1ivLwqMDMoXzlYwXh0EmscE3AQBWUDggbAAAADACAJ0BKg4AEAADgFolsAJ0AQN72EHxMVEgAP7Zqpien9Ljf25D4bwj5cZKCYfvLPk6gF5uDuCB1V6QNVramZTW+Ex3KNKZ2QAmdds8Sio0nsya72jPAZfoi0iM6V4nQxcVsUdAGLnUwcpgAA==",
      },
    },
    {
      id: "section7-time-deposits",
      sub: true,
      title: "Time Deposits:-",
      body: [
        "The time deposit is similar to a savings account but earns a much higher interest the longer you keep it with us.",
      ],
      list: [
        "6% is the annual interest rate.",
        "No hidden fees.",
        "Get 1% annual interest instead if you withdraw early.",
        "Add money to the account, and the money along with the interest will be added back to the account.",
        "Interest calculation = P*R*T(investment amount*interest rate*term of TD in /days in a year).",
      ],
      listSingle: true,
    },
    {
      id: "section7-loans",
      sub: true,
      title: "Loans:-",
      body: [
        "The simplicity of this feature and the minimal documentation requirements make it more appealing. Just select the loan type — authorize your face ID — upload your ID card — verify it. Here are the various loan options.",
      ],
    },
    {
      id: "section7-loan-features",
      sub: true,
      title: "Loan Features:-",
      list: [
        "Fast approval and real-time disbursement to your tonic account.",
        "Loan amounts from 5000 to 50,000 peso",
        "Minimal documents required - only 1 valid ID and 1-month payslip.",
        "Flexible payments date - your preferred salary payout date.",
        "6, 9, 12, 18, or 24 months installment.",
        "100% digital - all loan info can be seen on the app.",
        "One bank account for application and cash disbursement.",
        // Live's wording, "lover" included.
        "The fixed monthly interest rate of 7% Enjoy a lover monthly interest rate of 5.42% when you link your salary payroll ATM card.",
        "Top up your main account. Get autodebited on your due date.",
      ],
      listSingle: true,
    },
    {
      // Live sets the loan types under the loan features with no heading.
      id: "section7-loan-types",
      sub: true,
      title: "",
      list: [
        {
          lead: "Installment Loans:- ",
          text: "Once the lender accepts a borrower's application, they can receive a lump sum amount. In EMI installments, they repay the loan over a set period of time.",
        },
        {
          lead: "Quick Loan:- ",
          text: "Quick loans are typically unsecured loans, the user doesn’t need to pledge any collateral to secure the loan. The application process can be accomplished in minutes. The users can avail of up to 50,000 pesos.",
        },
        {
          lead: "Big loan:- ",
          text: "The loan is secured by the property. An asset pledged as collateral secures the loan. An asset can either be land, a house, or commercial property. Until the entire loan against the property is repaid, the asset remains the lender's collateral.",
        },
        {
          lead: "Shop Installments:- ",
          text: "It's a new loan scheme to suit the financial needs of customers who purchase products from commercial shops. It’s a reliable loan for the big purchases you deserve.",
        },
      ],
      listSingle: true,
    },
    {
      id: "section7-top-up",
      sub: true,
      title: "Top up (Wallet):-",
      body: [
        "Having a wallet brings out lots of benefits. The money transfer and miscellaneous payments are done instantly.",
      ],
      // Live's side-by-side "Wallet Options" / "Send" lists, as one table
      // (review: "make the Wallet Options to table"); each column keeps its
      // list's items in live's order, "Send" one row shorter.
      table: {
        head: ["Wallet Options", "Send"],
        rows: [
          ["PESONET", "To another bank"],
          ["Other bank debit card", "To another customer"],
          ["Online transaction", "Over-the-Counter partners"],
          ["Over-the-counter partners"],
        ],
      },
    },
    {
      id: "section7-solution",
      sub: true,
      title: "Solution:-",
      body: [
        "Our goal is to make the application a highly secure, risk-free, and time-saving digital application. By adding new and unique features to the app, becoming a helpful banking app for customers and clients, and achieving marketing goals, Soft Suave achieved its goal.",
        "The application came out with great outcomes and achieved business goals also by gaining millions of users and 4.8 ratings in the Google play store from customers all around the world. The clients are satisfied and the customers are benefited from the product made by Soft Suave.",
      ],
    },
  ],

  download: {
    navLabel: "Download",
    // Live's closing band, verbatim.
    body: "Are you ready to revolutionize digital banking with next-level security? Dive into our case study and discover how to make it happen!",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "digital-banking-solution.pdf",
    requirement: "Case study download: requested the One-stop Digital Banking Solution case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Building a Highly Secured One-stop Digital Banking Solution",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the One-stop Digital Banking Solution case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(digitalBankingMeta.path),
};
