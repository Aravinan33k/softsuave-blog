export type ComparisonColumn = {
  title: string;
  icon: "alert" | "users";
  points: string[];
  /** Renders the brand border, glow, corner ribbon and footer band. */
  featured?: boolean;
  /** Corner banner text, featured card only. */
  ribbon?: string;
  /** Band across the card's bottom edge, featured card only. */
  footnote?: string;
};

export const comparisonContent = {
  badge: "The FDE Advantage",
  headline: [
    { text: "Complex AI Projects Need a Different " },
    { text: "Engineering Approach", accent: true },
  ],
  description:
    "Forward Deployed Engineers work with business and technical teams to solve evolving problems while avoiding the delay and overhead of building an in-house team through permanent hiring.",
};

export const comparisonColumns: ComparisonColumn[] = [
  {
    title: "Challenges in Traditional Hiring",
    icon: "alert",
    points: [
      "Long Hiring Cycles",
      "High Recruitment Overhead",
      "Limited Talent Availability",
      "Slow Team Scaling",
      "Ongoing Onboarding Effort",
    ],
  },
  {
    title: "How Our FDEs Help",
    icon: "users",
    featured: true,
    footnote: "Built for Business. Ready to Scale.",
    points: [
      "Pre-Vetted Engineering Talent",
      "Reduced Recruitment Costs",
      "Dedicated FDE Support",
      "Flexible Team Scaling",
      "Global Delivery Coverage",
    ],
  },
];
