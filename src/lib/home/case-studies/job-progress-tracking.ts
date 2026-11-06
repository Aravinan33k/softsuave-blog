import type { CaseStudyContent } from "@/components/case-study/case-study";
import { HERO_PLATFORM_ICONS as P, platformFact } from "./platform-icons";
import { relatedCaseStudies } from "./related";

/**
 * `/case-study-job-progress-tracking` — softsuave.com's Job Progress Tracking
 * case study (https://www.softsuave.com/case-study-job-progress-tracking),
 * rebuilt on the site's case-study template the way
 * `ticket-management-system.ts` is (one of live's older, plainly headed case
 * studies).
 *
 * Every line of copy is the live page's, verbatim and in live's order — hero,
 * the five section headings, paragraphs, the icon-grid sentences, the list,
 * the three "Delight To Customers" features, the closing download band and
 * the related-case-study heading. That includes live's typos
 * ("in a single glace", twice). The two icon grids whose items are a bare
 * sentence are set two ways: Client Requirement's as the template's logo
 * tiles with live's icons, in their wide icon-beside-text form (`techWide` —
 * the narrow tiles wrapped the sentences into towers); Existing Challenges'
 * as name-less icon cards, matching the titled features under "Delight To
 * Customers" (review). Section ids are live's (`#section1`…`#section5`).
 *
 * The images, icons and PDF are live's, self-hosted
 * (`public/images/case-studies/job-progress-tracking/`,
 * `public/assets/case-studies/`); the PDF keeps live's path. Live's two app
 * screenshots are SVGs wrapping a raster, so they are served here as the
 * WebP they really are.
 *
 * Not carried over: live's hero backdrop (the hero is set like the Vehicle
 * Intelligence one); what live leaves commented out, so never renders — the
 * Web platform mark and the icon grids' headings; live's Existing Challenges
 * and "Delight" icons (the icon cards draw the site's own badges); and the
 * images' terse
 * alts, described here instead.
 */

export const jobProgressMeta = {
  path: "/case-study-job-progress-tracking",
  /** Live's `<title>`, verbatim. */
  title: "Job Progress Tracking Software Development [Case Study]",
  /** Live's meta description, verbatim. */
  description:
    "Discover how our innovative job tracking tool enhances customer satisfaction, streamlines customer communication, and improves delivery with this case study.",
  /** Live's `og:title` / `twitter:title`, verbatim — not its `<title>`. */
  socialTitle: "Job Progress Tracking Software Development Case Study",
  /** Live's `og:description` / `twitter:description`, verbatim — not its meta description. */
  socialDescription:
    "As the number of projects mounts and tasks increases, a perfect Job Progress Tracking tool is the best way to handle projects at ease. View case study.",
  /** Live's `og:site_name`, verbatim. */
  ogSiteName: "Soft Suave Technologies",
} as const;

const IMG = "/images/case-studies/job-progress-tracking";
const ICON = `${IMG}/icons`;
const PDF = "/assets/case-studies/Job-progress-tracking-platform.pdf";

const icon = (file: string, size = 100) => ({ src: `${ICON}/${file}`, width: size, height: size });

export const jobProgressCaseStudy: CaseStudyContent = {
  hero: {
    // Live's H1, word for word, set the way the Vehicle Intelligence hero is:
    // a headline with its highlight over the smaller sub-line.
    titleLines: ["Effective Tool to track the Jobs", "or Projects for the Customers"],
    accent: "track the Jobs",
    titleSubLast: true,
    body: [
      "A standout job tracking solution app made by Soft Suave to ease the complex processes, for the customers to use and track the individual projects and Jobs more flexibly.",
    ],
    points: [],
    facts: [
      { label: "Industry :", value: "Consulting" },
      // Live shows Android and iOS; its Web mark is commented out.
      platformFact([P.Android, P.iOS]),
    ],
    aside: {
      src: `${IMG}/hero.webp`,
      width: 583,
      height: 594,
      alt: "Two phone screens of the job tracking app's Statistics view: a line chart for July 21–25, and a monthly ring chart, each over billable and non-billable totals",
      blurDataURL:
        "data:image/webp;base64,UklGRggBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHAAAAABcFpr25u8f1Q2iMoIFIlsG2DbDhDLAmyBY4CuswAOi+q9d/jrx7dCREzAWNqHUHS6taQApDuTkFLKZbtIRZaUJ2roGhLZm6tONKQ7QcSuqSBerhYIssT5BZwROE1WgXP1gXhtT9bWAH966ah/qAIAVlA4IHIAAABQAgCdASoQABAAA4BaJQAB8oXgBvuJcMHyWAAA/vZhit3o4924L9wvod9dB8UMxRhjlgETzI0wncUw8vNi+FECi5E32oFqzUExVTIeZsAjD0jCGF07+1q9LO8Mut3U5daHb4BnqRsJ3mped46jKKaAAAA=",
    },
    // No backdrop photo: the hero stands on the flat dark surface, the phones
    // beside the copy its image.
  },

  tocTitle: "Case Study",

  sections: [
    {
      id: "section1",
      nav: "Client Overview",
      title: "Client Overview",
      body: [
        "Job progress tracking is a process that breaks a massive task into manageable smaller tasks to make the job goals achievable. Job tracking facilitates the users to focus on the crucial tasks and aligns them to make moves in the right direction by forecasting the future and eliminating the risks that come in the way of achieving targets.",
        "Every industry is prepping its business to go into the job progress tracking methodology of work to make the task or project management more effortless. The demand for tracking a job or project is increasing day by day with the outnumbering of the outsourcing companies.",
        "Our client is a consulting company that serves the construction and real estate industry in New York City and has customers who are building owners, property managers, architects, engineers and contractors.",
      ],
      image: {
        src: `${IMG}/overview.webp`,
        width: 637,
        height: 589,
        alt: "Two phone screens of the job tracking app's Statistics view: a monthly ring chart, and a bar chart for July 21–25, each over billable and non-billable totals",
        blurDataURL:
          "data:image/webp;base64,UklGRkoBAABXRUJQVlA4WAoAAAAQAAAADwAADgAAQUxQSK8AAAABgJpt27LlwZpL9chBYwIOsvsE7u4OI7g7NB2A7JapHh1eeS7kGyIiJkBCZfl+JDtGUutra2uackMk8Q7V59VDPMpHmOTgrYIz/124TOBQXs7xgIocBdzO4AAk6QXFsdOPDSjDg6OhCRMwiQUlsyMo4hKP5076gjIMimNXRoMqceBokbGgTSygWTISoI+oM9xEyjDvxhjXdfyGZVGkH4PyKZJSsf6WJ5Le1tLS3FkEAFZQOCB0AAAA8AEAnQEqEAAPAAOAWiWIAA+PcDJaMgggAP7v45pB9nwwiqnJO/00KP1sulmIfjkydXaqCfVfflE7hdXJ87WlhmtUaftTSpemAmJABPequicTXvfjhWdtIY3EN+btmzVeYoRGd+/XbxgC4ipukECplX6QAAA=",
      },
    },
    {
      id: "section2",
      nav: "Client Requirement",
      title: "Client Requirement",
      body: [
        "The objective of the client was to develop a tool that tracks the progress of several projects in a single glace & delegate it according to the resource available and understand where the every individual project status stands precisely.",
        "With this job progress tracking solution, tasks can be defined for oneself, assigned to a colleague, or delegated after being received. Assignments pertaining to a specific project are stored and accessed only by those users who are relevant to the project. Time spent on each task within the project can be tracked and jobs are moved to the deliverables group if the project is completed.",
      ],
      tech: [
        { name: "To track the progress of several projects in a single glace.", logo: icon("files-track.svg") },
        { name: "To delegate work according to resource availability.", logo: icon("resource-requirment.svg", 229) },
        // Live repeats the first tile's icon here.
        { name: "To understand where every individual project status stands exactly", logo: icon("files-track.svg") },
        { name: "To create proposals according to the project requirements.", logo: icon("files-tik.svg") },
      ],
      techWide: true,
    },
    {
      id: "section3",
      nav: "Existing Challenges",
      title: "Existing Challenges",
      // Set like "Delight To Customers" (review), as name-less icon cards:
      // live's items are a bare sentence each, its headings commented out.
      cards: {
        variant: "icon",
        items: [
          // The badge reads "code" and "globe" off these two; name the glyphs.
          { body: "Developing customized notification alerts for a few personalized features.", iconKey: "bell" },
          { body: "Critical bug fixes were essential before beginning the feature enhancements in the application" },
          {
            body: "Communication was decisive between developers, as frontend and backend works were divided.",
            iconKey: "message",
          },
        ],
      },
    },
    {
      id: "section4",
      nav: "Soft Suave Solutions",
      title: "Soft Suave Solutions",
      list: [
        "A solution to assign tasks to self, to a colleague, or delegate to resources after receiving.",
        "A solution to store and access tasks only by those users who are relevant to the project.",
        "Job progress tracking solution to track time spent on each task within the project.",
        "A solution to add photos to match the report of the completed task.",
      ],
      listSingle: true,
      image: {
        src: `${IMG}/solutions.webp`,
        width: 546,
        height: 583,
        alt: "Two phone screens of the job tracking app's Statistics view: a bar chart and a line chart for July 21–25, each over billable and non-billable totals",
        blurDataURL:
          "data:image/webp;base64,UklGRsoAAABXRUJQVlA4WAoAAAAQAAAADgAADwAAQUxQSFoAAAABcFrbtho1EcUpgKERquCn46hhyeTC717zV9z4iJgAK4+TuDD9L0Fhd+WyLrw0KzeCbzVpIACELzVrtOC7/VtqJACIaF5q5kbwV16Xfuhl1xEU7g0nCcMgMQFWUDggSgAAAPABAJ0BKg8AEAADgFoljAAC3QKJEyJXyAD+8mXO9UqVWF/JyWm26syO8/GEK5vhs0sQX6LhU7i9cgDTEkoXtPqMhnNhFJzFQAAA",
      },
    },
    {
      id: "section5",
      nav: "Delight To Customers",
      title: "Delight To Customers",
      body: [
        "The client was delighted with the additional solution provided by us; employee workload management that helped the supervisors to check the tasks that are close to the due date and then delegate that task with the team accordingly.",
      ],
      cards: {
        variant: "icon",
        items: [
          { name: "Payment Management System", body: "Feature to make payment for the work done." },
          { name: "Deadline Management System", body: "Keep track of deadlines to avoid procrastination." },
          { name: "Cost Management System", body: "Feature to manage cost according to the requirement." },
        ],
      },
    },
  ],

  download: {
    navLabel: "Download",
    // Live's closing band, verbatim.
    body: "Check out this case study to discover an effective tool for tracking jobs or projects for your customers. Download now to learn more.",
    label: "Download Case Study",
    pdf: PDF,
    fileName: "Job-progress-tracking-platform.pdf",
    requirement: "Case study download: requested the Job Progress Tracking case study PDF.",
    form: {
      title: "Download Case Study!!!",
      submit: "Download",
      sending: "Sending...",
      // The download card asks for no requirement (`fixedRequirement`).
      requirementLabel: "",
      requirementPlaceholder: "",
      subject: "Case study download – Effective Tool to track the Jobs or Projects for the Customers",
    },
    done: {
      title: "Thank you!",
      body: "Your copy of the Job Progress Tracking case study is downloading.",
      cta: "Download the PDF",
    },
  },

  // The previous study and the next four in the case-study listing
  // (see `related.ts`).
  related: relatedCaseStudies(jobProgressMeta.path),
};
