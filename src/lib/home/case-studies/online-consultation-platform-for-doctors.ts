import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-online-consultation-platform-for-doctors` — softsuave.com's
 * Virujh online consultation case study
 * (https://www.softsuave.com/case-study-online-consultation-platform-for-doctors),
 * rebuilt on the site's case-study template the way
 * `personalized-ecommerce-platform.ts` is (one of live's older, plainly headed
 * case studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the seven section headings, paragraphs, every list item, the technology
 * names and their links, the download panel and the related-case-study
 * heading. That includes live's quirks: "Technology Stack
 * Used" heads a list of challenges, the technology logos sit under "Bringing
 * Delight to Customers", the Electron tile links to the Android hiring page,
 * the last two sections carry copy from a real-estate case study. The contents list is live's
 * five entries; live's last two sections render without one (`nav` omitted).
 * Live gives two sections `id="section5"`; the second is `section5-2` here,
 * since an id must be unique.
 *
 * The images, logos and PDF are live's, self-hosted
 * (`public/images/case-studies/online-consultation-platform-for-doctors/`,
 * `…/technologies/`, `public/assets/case-studies/`); the PDF keeps live's path.
 *
 * Not carried over: live's hero backdrop photo (the hero is set like the
 * Vehicle Intelligence one, per review on the Personalized eCommerce page);
 * what live leaves commented out, so never renders — a stray paragraph in
 * Overview and in Client Requirement, two in Technology Stack Used, a list
 * item there and in Soft Suave Solutions, a duplicate "Bringing Delight to
 * the Client" block, and four items in the closing list; and the images'
 * terse alts, described here instead.
 */

export const onlineConsultationMeta = {
  path: "/case-study-online-consultation-platform-for-doctors",
  /** Live's `<title>`, verbatim. */
  title: "Online Doctor Consultation Platform Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Online doctor consultation platform development case study showing how telemedicine apps improved remote care and patient engagement",
} as const;

const IMG = "/images/case-studies/online-consultation-platform-for-doctors";
const TECH = "/images/case-studies/technologies";
const PDF = "/assets/case-studies/online-consultation-app-for-doctors.pdf";

export const onlineConsultationCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Remote Platform", "to Connect Doctors and Patients from Anywhere"],
    accent: "Remote Platform",
    titleSubLast: true,
    body: [
      "Soft Suave made an app that connects Doctors-Patients from anywhere to schedule and accept appointments and has an online consultation using Video call facilities.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "HealthCare" },
      platformFact([P.Android, P.iOS, P.Web]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 695,
      height: 686,
      alt: "Two phone screens of the consultation app: a doctor on a live video call, and the patient home screen with doctor search by specialty and health vitals",
      blurDataURL:
        "data:image/webp;base64,UklGRi4BAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSJYAAAABgJtt27Hn/q3YNkpzBls9Ow3wH1//ZQEbrc0F7KS1bTzBffwzRMQEAKlDSrY/HG0SETlUQjMsbPGfyKq8LzdXekN7R1735b8dsUK3P0kRKshnptBwqGSzkVxqsEA6l8iDVntLVKGDiBHHclBOPhpZIFSyWkeOgSnS1keGgThl/Fyk9oDYQcPznKde/mWy/8akmtZ5DwBWUDggcgAAALABAJ0BKhAAEAAFQHwlkAAPk+iigAAA/OqhQBC5NPLjeWZgRC0oqJ0JvWbeOIhnUy+OlYH+L8omCjYWY3tZj9tP9pJ2Y+y0jpTdZRG4VXJpA80R0muGWx8DnLPLTkpfn3xIQbAsUQyF/ekTp2t9LBwAAA==",
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
        "Virujh is an online consultation App that empowers doctors and healthcare providers to offer high-quality care virtually. This consultation app lets doctors & patients schedule & accept appointments, fix online consultations and offers downloadable ePrescription.",
        "The negative outcome of COVID-19 imposed small and medium healthcare providers to work behind closed doors. This online consultation app emerged as a winner to help doctors offer virtual consultation from anywhere, anytime.",
      ],
    },
    {
      id: "section2",
      nav: "Client Requirement",
      title: "Client Requirement",
      body: [
        "Client approached Soft Suave to build a health care solution to act as an efficient doctor & patient consultation platform. The key objective was to offer a time-saving consultation App for doctors to provide quality online check-up to patients.",
        "The ultimate goal of this app was to keep the patient and doctors engaged, on a daily basis, via an interactive online tool.",
      ],
      image: {
        src: `${IMG}/requirement.webp`,
        width: 616,
        height: 633,
        alt: "Two phone screens of the consultation app: the patient home screen with doctor search and health vitals, and a doctor's profile with fee, experience, available times and a Make Appointment button",
        blurDataURL:
          "data:image/webp;base64,UklGRgIBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHgAAAABBjfVti3LX8E2cjgRqOAUYOefqGAR3GXi/BvubpuFYNXnOVR4iYgJiN+/L16FZp8wmuj+e/2BZeTIWKA3T6bIU0SxGSmh+hy5O8hcItcDBVe/BDbIybYoVCM7ZGWR/4DCeXJEjiI5IbsvnRGRpO1MFGq2W9Js5FVWUDggZAAAANABAJ0BKhAAEAAFQHwloAJ0ALMBKQYAAP7rlddknWqaj4/n/XPmb5mM74OKK5qwpir6TxsnkRNnc559EfCFi6stRHLTKPqDCDcO6yYTmtyyyB7a3KgB3thVb5eSgZlXZnoaAAA=",
      },
    },
    {
      id: "section3",
      nav: "Soft Suave's Solution",
      title: "Soft Suave's Solution",
      body: [
        "Soft Suave teamed up with a pool of talented developers to build a Mobile App for doctors to offer online consultation seamlessly.",
      ],
      list: [
        "This online doctor consultation app saves time and money by providing 24/7 access to doctors.",
        "This online doctor consultation system allows users to search for doctors by specialty, and location to ultimately schedule appointments.",
        "Doctors can attend patients virtually from anywhere via video call.",
        "To improve the doctor’s management experience, Soft Suave developed a dashboard with the best user interaction using a minimal design approach.",
        "Designed an appointment management system that allows doctors to set their own schedule and earn additional income.",
        "Integrated chat to help doctors communicate with patients and transfer prescriptions easily.",
        "Allowed patients to obtain downloadable PDF prescriptions from doctors.",
        "Soft Suave designed a UI that gave patient’s maximum value in fewer steps.",
        "Facilitated doctors to send prescriptions through chat.",
        "Allowed patients to upload pictures of problems, reports, lab results, prescriptions and other documents to share with the doctors.",
        "Integrated video call waiting notification – Pop up for patients if doctor has arrived in the virtual consultation room and Pop up for doctors if the patients are waiting for consultation.",
      ],
      listSingle: true,
    },
    {
      id: "section4",
      nav: "Technology Stack Used",
      title: "Technology Stack Used",
      list: [
        "The lack of digital view – 360-degree view declined the sales numbers.",
        "Many customers refused to seal a deal due to lack of PDF viewer for property document and contract document.",
        "The application was built using Firebase thus, database download and storage was a challenge.",
        "Lack of back-end support created a lot of confusion during implementation.",
      ],
      listSingle: true,
    },
    {
      id: "section5",
      nav: "Bringing Delight to Customers",
      title: "Bringing Delight to Customers",
      tech: [
        {
          name: "Angular",
          logo: { src: `${TECH}/angular.svg`, width: 20, height: 22 },
          href: "/hire-angularjs-developers",
        },
        { name: "Firebase", logo: { src: `${TECH}/firebase.svg`, width: 64, height: 64 } },
        {
          name: "Electron",
          logo: { src: `${TECH}/electron.svg`, width: 64, height: 64 },
          href: "/hire-android-developers",
        },
      ],
    },
    {
      // Live's second `id="section5"`, made unique.
      id: "section5-2",
      title: "Soft Suave Solutions",
      body: [
        "The innovative developers at Soft Suave developed solutions that were affordable for the client and fulfilled all the primary business goals.",
      ],
      list: [
        "The developers created a 360-degree view for client’s properties. This digitalization allowed customers to have a detailed picture of the properties.",
        "CRM was developed successfully to manage the client’s properties effectively.",
        "iOS application was developed with minimalistic features to keep track of all the online activities.",
        "Loggers were created to track the modifications in the Database. As there was no server support, cloud function was used to develop automated logger entry.",
        "The proficient developers at Soft Suave used SQL lite to make the application usable in Offline.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/solutions.webp`,
        width: 625,
        height: 641,
        alt: "Two phone screens of the consultation app: the patient home screen with doctor search and health vitals, and a doctor on a live video call",
        blurDataURL:
          "data:image/webp;base64,UklGRgYBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHUAAAANcFtr25q88aTGnQm8pWUD2IEVoOdkJ6yCGkZwd3di33+yQkRMAJh6meM4/lGNphzvTgFOraQTcr3HOcCJIKU3BY6CQVVc/RnpAQWGZ8vIU40iI0gZoDgwDQrDpJt+ljDA4EH/BMJg1a6AgYe49nEAXqdZFyQAVlA4IGoAAADwAQCdASoQABAABUB8JbAAAt1uthzh22gA/rYO3q3hiMlv0GcnefHrtOUCHEXD+6nd0h2YGlByjRh6dXmO9VBYFsxJBYN+b44R4sdvrJc9tenZ38Dd0Y9keHVj4KjGjOP63qN/K+s6cAAA",
      },
    },
    {
      id: "section6",
      title: "Bringing Delight to the Client",
      body: [
        "The team of skilful developers at Soft Suave went the extra mile and provided innovative and delightful solutions to the client.",
      ],
      list: [
        "Offline app usage was initiated to allow customers to use the application even without the internet. In addition, SQL lite was integrated for high-performance.",
        "Separate web apps for client’s internal and external usage was developed. Admins used the internal app to manage clients and clients used external app in the form of a dedicated web app to hunt properties.",
      ],
      listSingle: true,
    },
  ],

  download: {
    navLabel: "Download",
    body: "Download this practical case study to learn how our exceptional Healthcare app solution for our client simplified telemedicine across municipalities.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "online-consultation-app-for-doctors.pdf",
    requirement:
      "Case study download: requested the Remote Platform to Connect Doctors and Patients from Anywhere case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Online Consultation Platform for Doctors",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Online Consultation Platform for Doctors case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(onlineConsultationMeta.path),
};
