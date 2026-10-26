import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-telehealth-consultation-platform-for-doctors` — softsuave.com's
 * Custom Telehealth App case study
 * (https://www.softsuave.com/case-study-telehealth-consultation-platform-for-doctors),
 * rebuilt on the site's case-study template the way
 * `online-consultation-platform-for-doctors.ts` is (one of live's older,
 * plainly headed case studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the seven section headings, paragraphs, the six feature labels, every list
 * item, the technology names and their links, the download panel and the
 * related-case-study heading. That includes live's quirks:
 * Overview and Client Requirement show the same image, the PostgreSQL tile
 * links to the Ionic hiring page and the other six to the Android one, and
 * two related cards link to the online-consultation page. The "Salient
 * Features of App" icon grid is set as the template's logo tiles. Section ids
 * are live's (`#section1`…`#section7`).
 *
 * The images, icons, logos and PDF are live's, self-hosted
 * (`public/images/case-studies/telehealth-consultation-platform-for-doctors/`,
 * `…/technologies/`, `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: live's hero backdrop photo (the hero is set like the
 * Vehicle Intelligence one, per review on the Personalized eCommerce page);
 * what live leaves commented out, so never renders — the Web platform mark,
 * a stray paragraph in Overview and Client Requirement, two in Salient
 * Features, one in Challenges, seven items in the closing list and a
 * "Bringing Delight to the Client" block from another case study; the stray
 * "!" live's `og:description` ends with; and the images' terse alts,
 * described here instead.
 */

export const telehealthMeta = {
  path: "/case-study-telehealth-consultation-platform-for-doctors",
  /** Live's `<title>`, verbatim. */
  title: "Explore Telehealth Doctor Consultation Platform [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Telehealth doctor consultation platform case study shows how secure, scalable solutions enabled real-time consultations and patient engagement.",
} as const;

const IMG = "/images/case-studies/telehealth-consultation-platform-for-doctors";
const FEAT = `${IMG}/features`;
const TECH = "/images/case-studies/technologies";
const PDF = "/assets/case-studies/telehealth-app-for-doctor-consultation.pdf";

/** Live shows one image under both Overview and Client Requirement. */
const OVERVIEW_IMAGE = {
  src: `${IMG}/overview.webp`,
  width: 388,
  height: 441,
  alt: "Two phone screens of the telehealth app: a doctor's home screen with upcoming consultations and patient profiles, and the Virtual Ecosystem welcome screen",
  blurDataURL:
    "data:image/webp;base64,UklGRtAAAABXRUJQVlA4WAoAAAAQAAAADwAAEQAAQUxQSEYAAAABZ6C2kaQ2+p96g8+hDCIi4NvpTrzxXQSjSLKdrJuvACHRBcdk5ktAAufc0hAQ0f94mZIEtR3HBvXmQH3w/3nbyoMkOdkBVlA4IGQAAADwAwCdASoQABIAPzmEuVOvKKWisAgB4CcJbAC7LwAByru6RboJg0IAAP7euwukU+JrwNKJvYZwi2j8lbCUa2gP5hUkVxE/5x44H/840vdplxC5QCMtnXAKS7JOgpKdMNPgAAAA",
} as const;

export const telehealthCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Custom Telehealth App", "for Doctor Consultation"],
    accent: "Telehealth App",
    titleSubLast: true,
    body: [
      "Our client was a MedTech start-up and leading provider of online healthcare across borders. The client wanted to democratize access to advanced healthcare management for everyone with the help of mobile solutions and promote healthcare through innovation in telemedicine.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "HealthCare" },
      platformFact([P.Android, P.iOS]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 455,
      height: 469,
      alt: "Two phone screens of the telehealth app: the Virtual Ecosystem welcome screen, and a doctor's home screen with upcoming consultations and patient profiles",
      blurDataURL:
        "data:image/webp;base64,UklGRrYAAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSDYAAAABYBsAQBIaH+IXrrXzA7fOG1qpyT0iJgAYyXarU9aoFfZuR+/3pHRxF8LF85xwUqt+u6sTAUZWUDggWgAAABACAJ0BKhAAEAAFQHwlsAJ0ARB2WMF6KQAA/svQsAT0nGEX/i4k4Zp2gZlsmmwbVEqHBGS0+GCUgLxNVDOZqS9Zn9qVWH8tgvtBlMw/D0vcJFL+uxGuxkQAAA==",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the phones
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Overview",
      title: "Overview",
      body: [
        "Our client was a MedTech start-up and leading provider of online healthcare across borders. The client wanted to democratize access to advanced healthcare management for everyone with the help of mobile solutions and promote healthcare through innovation in telemedicine",
        "The chief objective of the client was to connect healthcare professionals with patients and to have video calls on topics of health and well-being.",
      ],
      image: OVERVIEW_IMAGE,
    },
    {
      id: "section2",
      nav: "Client Requirement",
      title: "Client Requirement",
      body: [
        "The client approached Soft Suave to develop an interactive and easy-to-use telemedicine app on Android and iOS platform. The client demanded the app allow qualified doctors to register and get in touch with patients that have set up appointments based on the area of concern, such as psychology or general practitioner.",
        "As the world was stuck by pandemic, the client wanted futuristic features and functionalities that deliver state-of-the-art technology to people worldwide.",
      ],
      image: OVERVIEW_IMAGE,
    },
    {
      id: "section3",
      nav: "Salient Features of App",
      title: "Salient Features of App",
      tech: [
        { name: "Easy sign-up and onboarding", logo: { src: `${FEAT}/consultation-user.svg`, width: 100, height: 100 } },
        { name: "View and schedule appointments", logo: { src: `${FEAT}/consultation-calender.svg`, width: 100, height: 100 } },
        { name: "End-to-end encrypted audio/video calls", logo: { src: `${FEAT}/multimedia-consultation.svg`, width: 100, height: 100 } },
        { name: "Quick remote online consultation", logo: { src: `${FEAT}/online-chat-consultation.svg`, width: 100, height: 100 } },
        { name: "Chat with doctors during video calls.", logo: { src: `${FEAT}/online-chat-consultation-1.svg`, width: 100, height: 100 } },
        { name: "Secure online payment", logo: { src: `${FEAT}/online-card.svg`, width: 100, height: 100 } },
      ],
    },
    {
      id: "section4",
      nav: "Challenges",
      title: "Challenges",
      body: [
        "Promoting healthcare through innovative healthcare solutions is an ambiguous task. The development team at Soft Suave overcame all the hassles with the help of proficient tech expertise and experience.",
      ],
      list: [
        "China’s ban on all VoIP services except those done through China Unicom and China Telecom made us navigate from CallKit to another supportive VoIP service.",
        "The competition in the online doctor consultation market was the biggest challenge.",
        "Scheduling appointments and organizing online consultation with doctors from anywhere and anytime.",
      ],
      listSingle: true,
    },
    {
      id: "section5",
      nav: "Soft Suave Solutions",
      title: "Soft Suave Solutions",
      body: [
        "Soft Suave developed a highly responsive cross-platform healthcare app for both iOS and Android platform. It was equipped with the latest technology, offering: quality, safety and reliability for the online interaction between professionals and patients. Through the innovation of Telemedicine, Soft Suave developed an all-app-based consultation for patients to receive healthcare from anywhere, at any time.",
        "All the users have to do is download the app, select the area of healthcare, choose from a wide range of experts, and schedule a consultation. After the payment, they will be connected through the app at the scheduled time via video call with the healthcare professional.",
      ],
      list: [
        "Built a cross-platform mobile App that saved time and money for the client.",
        "Developed an online doctor consultation system that allowed users to search for doctors by specialty, location, schedule appointments, and get an online consultation.",
        "Facilitated doctors to attend patients virtually from anywhere via video call.",
        "Soft Suave designed a UI that gave patients’ maximum value in fewer steps.",
        "To improve the doctor’s management experience, Soft Suave developed a dashboard with the best user interaction using a minimal design approach.",
        "Integrated “Stripe” payment gateway to process the payments for appointment scheduling seamlessly.",
        "Designed an appointment management system that allows doctors to set their own schedule and earn additional income.",
        "Allowed patients to upload pictures of problems, reports, lab results, prescriptions and other documents to share with the doctors.",
        "Integrated chat to help doctors communicate with patients and transfer prescriptions easily.",
        "Integrated video call waiting notification – Pop up for patients if the doctor has arrived in the virtual consultation room and Pop up for doctors if the patients are waiting for consultation.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/solutions.webp`,
        width: 401,
        height: 434,
        alt: "Two phone screens of the telehealth app: a doctor's home screen with upcoming consultations, and a patient's profile details with a share-profile option",
        blurDataURL:
          "data:image/webp;base64,UklGRrAAAABXRUJQVlA4WAoAAAAQAAAADwAAEAAAQUxQSDEAAAABYBrbViPqwlIADk8TVIimg5wkg8+wSa6NiAkAj6jOqxTlmjGdH9n/gC5dubzpBDwCAFZQOCBYAAAA0AMAnQEqEAARAD85hrlTryklorAIAeAnCUAADDAITzLlql35QCnAAP7fJCbXXgu/oRMn3sVmvDZO6s/YgOlBBvr+fjMyEYp9nc3WSf0t2T/UIWNnUwAAAA==",
      },
    },
    {
      id: "section6",
      nav: "Technology Stack Used",
      title: "Technology Stack Used",
      tech: [
        { name: "PostgreSQL", logo: { src: `${TECH}/postgresql.svg`, width: 52, height: 52 }, href: "/hire-ionic-developers" },
        { name: "Node", logo: { src: `${TECH}/node.svg`, width: 20, height: 22 }, href: "/hire-android-developers" },
        { name: "React", logo: { src: `${TECH}/react.svg`, width: 22, height: 20 }, href: "/hire-android-developers" },
        { name: "Redis", logo: { src: `${TECH}/redis.svg`, width: 52, height: 52 }, href: "/hire-android-developers" },
        { name: "Stripe", logo: { src: `${TECH}/stripe.svg`, width: 512, height: 214 }, href: "/hire-android-developers" },
        { name: "Bitbucket", logo: { src: `${TECH}/bitbucket.svg`, width: 681, height: 628 }, href: "/hire-android-developers" },
        { name: "Nest", logo: { src: `${TECH}/nest.svg`, width: 64, height: 64 }, href: "/hire-android-developers" },
      ],
    },
    {
      id: "section7",
      nav: "Bringing Delight to Customers",
      title: "Bringing Delight to Customers",
      list: [
        "Soft Suave went above and beyond to develop a satiable solution that brought patients and healthcare professionals closer together.",
        "Accomplished the client’s mission to promote the value of life through technology that offered agile and cutting-edge care, breaking barriers of time and space.",
        "Empowered healthcare providers worldwide to offer quality care through audio and video consultation from anywhere, anytime.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    body: "Discover how our Custom Telehealth App for Doctor Consultation helped improve patient outcomes and streamline healthcare delivery. Download our case study now to learn more.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "telehealth-app-for-doctor-consultation.pdf",
    requirement: "Case study download: requested the Custom Telehealth App for Doctor Consultation case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Custom Telehealth App for Doctor Consultation",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Custom Telehealth App for Doctor Consultation case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(telehealthMeta.path),
};
