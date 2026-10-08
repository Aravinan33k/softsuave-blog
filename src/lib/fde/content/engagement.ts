import { contactPageHref } from "@/lib/fde/contact";

export type EngagementIconName = "code" | "layers" | "rocket";

export type EngagementModel = {
  /** Small green line above the title. */
  eyebrow: string;
  title: string;
  description: string;
  icon: EngagementIconName;
  points: string[];
  href: string;
  /** Renders the raised treatment plus the "Most Popular" ribbon. */
  featured?: boolean;
};

export const engagementContent = {
  badge: "How We Work",
  headline: [
    { text: "Flexible", accent: true },
    { text: " Engagement Models" },
  ],
  description:
    "Choose an engagement model based on how clearly defined your requirements are and how much flexibility the project needs.",
  featuredLabel: "Most Popular",
  footerPrompt: "Not sure which model fits your needs?",
  // This app serves /contact.
  footerCta: { label: "Talk to an expert", href: contactPageHref },
};

export const engagementModels: EngagementModel[] = [
  {
    eyebrow: "Flexible, evolving requirements",
    title: "Time & Material",
    description:
      "Work with Forward Deployed Engineers as requirements, priorities, integrations, and implementation decisions evolve throughout the engagement.",
    icon: "code",
    points: [
      "Flexible scope and requirements",
      "FDE rates from $14/hour",
      "Scale capacity as needed",
      "Sprint-based delivery",
    ],
    href: "/services/dedicated-fde-teams",
  },
  {
    eyebrow: "Defined project requirements",
    title: "Fixed Bid",
    description:
      "Use a structured engagement when the expected solution, deliverables, scope, and major implementation requirements can be clearly defined.",
    icon: "layers",
    points: [
      "Discovery and design",
      "Clear deliverables and timeline",
      "Development and integration",
      "Testing, deployment, and support",
    ],
    href: "/services/project-based-pods",
    featured: true,
  },
  {
    eyebrow: "Complex delivery needs",
    title: "Dedicated FDE Team",
    description:
      "Add a coordinated FDE team when the requirement involves multiple workflows, systems, integrations, or engineering responsibilities.",
    icon: "rocket",
    points: [
      "Dedicated engineering team",
      "Cross-functional expertise",
      "Flexible team scaling",
      "Coordinated delivery",
    ],
    href: "/startup-accelerator",
  },
];
