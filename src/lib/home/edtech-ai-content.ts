/**
 * Copy for the "AI Solutions in EdTech" landing page
 * (`/ai-solutions-in-edutech`).
 *
 * Follows the live softsuave.com page: its H1, its five solution cards, its six
 * "where AI is changing EdTech" areas, its six benefits and its FAQ set are all
 * carried over. The live FAQ runs to sixteen entries, several of which restate
 * one another ("how long does it take" and "what does it cost" both resolve to
 * "contact us"); the eight kept here are the ones that answer something.
 *
 * The live page ships no process section, so this page has none either. An
 * earlier draft added one; it was removed to keep the page's sections matched
 * to the live page's.
 */

import type { HeroContent } from "@/components/landing/hero";
import type { OverviewContent } from "@/components/landing/overview";
import type { ServicesContent } from "@/components/landing/services";
import type { CardGridContent } from "@/components/landing/industries";
import type { CtaBandContent } from "@/components/landing/cta-band";
import type { FaqContent } from "@/components/landing/faq";
import { industryHeroBadges, industryEnquiryForm, NDA_NOTE } from "./industry-shared";
import { overviewImage } from "./overview-images";

export const edtechMeta = {
  slug: "ai-solutions-in-edutech",
  path: "/ai-solutions-in-edutech",
  title: "AI Solutions in EdTech",
  description:
    "Custom EdTech AI from Soft Suave — adaptive assignments, auto-grading, student progress analytics and learning assistants, integrated with your LMS.",
} as const;

export const edtechHero: HeroContent = {
  titleLines: ["AI-Driven EdTech", "for the Digital Era"],
  body: [
    "Build learning experiences that adapt to the individual student, mark work the moment it is submitted, and give teachers back the hours currently spent on administration. We build EdTech AI that plugs into the LMS you already run.",
    "The gains here are measurable in a way they are not in every sector: completion rates, time-to-mastery, and staff hours reclaimed are all things a platform already tracks, so a model either moves them or it does not.",
  ],
  points: [
    "Adaptive assignments and learning paths",
    "Automated grading and instant feedback",
    "Student progress and risk analytics",
    "Integrates with Moodle, Canvas, Google Classroom",
    "FERPA and GDPR-aligned student data handling",
  ],
  badges: industryHeroBadges,
  form: industryEnquiryForm({
    title: "Plan your EdTech AI build",
    note: NDA_NOTE,
    requirementLabel: "What should the system do?",
    requirementPlaceholder:
      "The learning or administrative workflow you want to improve, your LMS and student information systems, learner volumes, and the data rules you operate under.",
    subject: "EdTech AI solutions enquiry",
  }),
  image: {
    src: "/images/four/ind-edtech-hero.webp",
    width: 1200,
    height: 860,
    alt: "Students learning on a digital platform driven by adaptive AI recommendations",
  },
};

export const edtechOverview: OverviewContent = {
  image: overviewImage("ai-solutions-in-edutech"),
  eyebrow: "The Short Answer",
  title: "What AI Changes About How People Learn",
  paragraphs: [
    "A classroom moves at one pace, and that pace is wrong for most of the people in it. Adaptive systems are the first genuinely scalable answer to that: content, difficulty, and sequencing that respond to what an individual student has actually demonstrated rather than to where the syllabus says the cohort should be.",
    "The second change is speed of feedback. Work marked a week later teaches far less than work marked immediately, because the student has moved on from the reasoning that produced the mistake. Automated assessment closes that loop, and does it at a volume no teaching team could staff.",
    "The third is visibility. Progress analytics surface the students drifting toward failure while there is still time to intervene — which is the intervention that actually changes outcomes, as opposed to the one that happens after a failed assessment.",
  ],
  pullQuote:
    "Feedback a week late teaches almost nothing. The value of automated assessment is the timing, not the marking.",
};

export const edtechServices: ServicesContent = {
  eyebrow: "What We Build",
  title: "EdTech AI Solutions Soft Suave Delivers",
  body: "Five solution areas covering the teaching loop end to end — setting work, marking it, tracking who is struggling, and answering the questions that arrive at eleven at night.",
  items: [
    {
      name: "AI-Powered Assignment Generation",
      tag: "Adaptive Learning",
      body: "Intelligent assignment generators that personalise tasks to a student's pace, demonstrated ability, and the topics they have not yet secured, so practice targets the gap rather than the syllabus average.",
    },
    {
      name: "Student Progress Monitoring & Analytics",
      tag: "Analytics",
      body: "Real-time progress tracking, predictive analytics, and behaviour-based insight that identify students drifting toward failure early enough for an intervention to matter.",
    },
    {
      name: "Automated Chatbots for Student Queries",
      tag: "Support",
      body: "Assistants that answer student questions instantly and consistently at any hour, cutting support delays and escalating anything academic or pastoral to the right member of staff.",
    },
    {
      name: "AI-Powered Auto-Grading",
      tag: "Assessment",
      body: "Scoring against your rubrics with adaptive assessment logic, returning feedback while the student still remembers their reasoning — and removing the inconsistency that creeps into marking at volume.",
    },
    {
      name: "Study Content Recommendation",
      tag: "Personalisation",
      body: "Tailored content suggestions based on each student's demonstrated strengths and weaknesses, sequencing what to study next rather than presenting a catalogue and leaving the choice to them.",
    },
  ],
};

export const edtechBenefits: CardGridContent = {
  eyebrow: "Benefits",
  title: "What EdTech AI Changes",
  body: "Outcomes an institution or platform can measure on data it already holds — completion, attainment, staff time, and support load.",
  items: [
    {
      name: "Learning That Fits the Student",
      icon: "users",
      body: "Adaptive paths and intelligent tutoring respond to demonstrated ability in real time, which helps the students a fixed pace leaves behind and the ones it holds back.",
    },
    {
      name: "Staff Time Reclaimed",
      icon: "gauge",
      body: "Automating grading, scheduling, attendance, and reporting returns hours to teaching, which is the part of the job that a machine cannot do and the part administration keeps displacing.",
    },
    {
      name: "Immediate Feedback & Academic Integrity",
      icon: "book",
      body: "Instant assessment closes the feedback loop while it still teaches, and plagiarism and anomaly detection protect the credibility of the qualification being awarded.",
    },
    {
      name: "Earlier Intervention on At-Risk Students",
      icon: "shield",
      body: "Predictive analytics flag disengagement and likely failure from behavioural signals weeks before an assessment would, which is when support still changes the outcome.",
    },
    {
      name: "Accessibility and Reach",
      icon: "globe",
      body: "Speech recognition, captioning, translation, and adaptive interfaces widen who can use the platform, extending reach without a proportional increase in staffing.",
    },
  ],
};

export const edtechSegments: CardGridContent = {
  eyebrow: "Where AI Applies",
  title: "How AI Is Changing EdTech",
  body: "Six areas where institutions and learning platforms are deploying AI, from the routine and easily justified to the more ambitious.",
  items: [
    {
      name: "Adaptive & Personalised Learning",
      body: "Content and difficulty that respond to demonstrated mastery, giving each student a path through the material rather than a shared pace through it.",
    },
    {
      name: "Automated Grading & Administration",
      body: "Marking, attendance, scheduling, and reporting — the highest-volume work in any institution, and the easiest place to return staff time.",
    },
    {
      name: "Accessibility & Inclusive Learning",
      body: "Speech-to-text, captioning, translation, and adaptive interfaces that make the same material usable by students a standard format excludes.",
    },
    {
      name: "Resource Optimisation",
      body: "Timetabling, room and cohort allocation, and staffing models that respond to actual demand rather than to last year's template.",
    },
    {
      name: "Immersive & Interactive Learning",
      body: "Simulation, interactive tutoring, and generated practice material that raise engagement on subjects where reading alone loses students.",
    },
    {
      name: "Predictive Analytics for Institutions",
      body: "Forecasting attainment, retention, and enrolment so course design and support resourcing are decided on evidence rather than on the previous cycle.",
    },
  ],
};

export const edtechMidCta: CtaBandContent = {
  eyebrow: "Talk It Through",
  title: "Not Sure Whether to Start With Grading or Personalisation?",
  body: "Auto-grading pays back fastest and clears governance most easily; adaptive learning changes outcomes more. A short conversation will tell you which fits your platform and your data today.",
  cta: { label: "Book a free consultation", href: "#enquiry" },
};

export const edtechFaqs: FaqContent = {
  eyebrow: "FAQs",
  title: "FAQs About AI in EdTech",
  body: "Common questions from institutions, platform teams, and EdTech founders evaluating AI for a learning product.",
  items: [
    {
      q: "Can AI be integrated into our existing LMS without a rebuild?",
      a: "Yes. We integrate with Moodle, Canvas, Google Classroom, and proprietary systems through their APIs and plugin interfaces, so adaptive learning, grading, or analytics appear inside the platform staff and students already use. A full rebuild is almost never the right route — the LMS is rarely the problem, and replacing it puts a migration between you and the outcome you wanted.",
    },
    {
      q: "How do you protect student data and meet FERPA and GDPR?",
      a: "Student data is minimised and anonymised wherever the use case allows, access is role-controlled and logged, and retention and deletion run as scheduled jobs. Lawful basis and consent — including the additional care that applies to minors — are settled before training begins, because they determine what may be used at all. Where data may not leave your infrastructure, we train inside it.",
    },
    {
      q: "What is the difference between traditional EdTech software and AI-powered EdTech?",
      a: "Traditional EdTech delivers the same content in the same order to everyone and records what happened. AI-powered EdTech changes what a given student sees next based on what they have demonstrated, marks work without waiting for staff capacity, and predicts who is about to disengage. The platform stops being a delivery mechanism and starts being responsive.",
    },
    {
      q: "How does AI improve learning outcomes compared with a standard digital platform?",
      a: "Through three mechanisms: content matched to demonstrated ability rather than to cohort pace, feedback returned while the student still remembers their reasoning, and early identification of disengagement while intervention still helps. The size of the gain depends heavily on the subject, the cohort, and the baseline — a platform with strong teaching support has less headroom than one where students largely self-serve.",
    },
    {
      q: "What can realistically be automated in an EdTech platform?",
      a: "Grading against rubrics, feedback generation, content recommendation, attendance and scheduling, first-line student support, and progress reporting are all routinely automated. What should not be fully automated is anything that decides a student's academic standing or pastoral support without a human confirming it — not because the model cannot, but because the consequences of being wrong sit on a person.",
    },
    {
      q: "Can smaller institutions and EdTech startups use AI, or is it only viable at scale?",
      a: "Smaller organisations can benefit, and often faster, because they have fewer systems to integrate and shorter approval chains. Personalisation, chatbots, and auto-grading are all available at a scale that suits a single institution or an early-stage platform. What scale does change is how much a custom-trained model beats a general one — with less data, building on a foundation model is usually the right call.",
    },
    {
      q: "Do you build teacher-facing tools as well as student-facing ones?",
      a: "Yes, and they are often the better first build. Curriculum planning support, lesson assistants, automated reporting, and cohort analytics return staff time immediately and carry far less governance risk than anything that acts on a student directly. Teacher-facing tools also tend to see faster adoption, because the person using them chose to.",
    },
    {
      q: "How long does it take, and what does it cost?",
      a: "Both depend on integration surface and data readiness more than on the model. A grading assistant integrated with one LMS is a different proposition from an adaptive learning engine spanning several systems and a student information database. We size the integration and data work explicitly in discovery, so the estimate reflects your platform rather than a generic average.",
      link: {
        label: "Book a free consultation",
        href: "https://www.softsuave.com/30-min-free-consultation",
        tail: "and we will scope it against your platform.",
      },
    },
  ],
};
