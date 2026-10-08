/** A single cell's rendered state. */
export type CellValue =
  | { type: "text"; text: string }
  | { type: "yes" }
  | { type: "no" }
  /** Green dash plus a qualifier, e.g. "varies". */
  | { type: "partial"; text: string };

export type TableColumn = {
  title: string;
  subtitle: string;
  /** Tints the column and greens the header — our own offering. */
  highlight?: boolean;
};

export type TableRow = {
  capability: string;
  /** One entry per column, in the same order as `whyFdeColumns`. */
  cells: CellValue[];
};

export const whyFdeContent = {
  badge: "The Soft Suave Difference",
  headline: "Why Work With a Soft Suave FDE?",
  description: "Compare Soft Suave’s Forward Deployed Engineering approach with staff augmentation and traditional consulting to understand where each model fits best.",
  rowHeaderLabel: "Capability",
};

export const whyFdeColumns: TableColumn[] = [
  { title: "Soft Suave FDE", subtitle: "Our Approach", highlight: true },
  { title: "Staff Augmentation", subtitle: "DIY" },
  { title: "Traditional Consulting", subtitle: "Traditional" },
];

export const whyFdeRows: TableRow[] = [
  {
    capability: "Time to Deploy a Team",
    cells: [
      { type: "text", text: "Based on scope and skill needs" },
      { type: "text", text: "Depends on talent availability" },
      { type: "text", text: "Depends on engagement scope" },
    ],
  },
  {
    capability: "Pre-Vetted Engineers",
    cells: [
      { type: "text", text: "Included" },
      { type: "text", text: "Usually included" },
      { type: "text", text: "Depends on provider" },
    ],
  },
  {
    capability: "Global Talent Pool",
    cells: [{ type: "text", text: "Available" },
      { type: "text", text: "Usually available" },
      { type: "text", text: "Depends on provider" },],
  },
  {
    capability: "Flexible Scaling",
    cells: [
      { type: "text", text: "Available" },
      { type: "text", text: "Available" },
      { type: "text", text: "Depends on Engagement" },
    ],
  },
  {
    capability: "Engineer Replacement",
    cells: [
      { type: "text", text: "Based on engagement terms" },
      { type: "text", text: "Depends on provider" },
      { type: "text", text: "Usually not applicable" },
    ],
  },
  {
    capability: "Pricing Structure",
    cells: [
      { type: "text", text: "Based on engagement model" },
      { type: "text", text: "Usually resource-based" },
      { type: "text", text: "Usually project-based" },
    ],
  },
  {
    capability: "Timezone Coverage",
    cells: [
      { type: "text", text: "Global delivery support" },
      { type: "text", text: "Depends on provider" },
      { type: "text", text: "Depends on provider" },
    ],
  },
  {
    capability: "Problem Ownership",
    cells: [
      { type: "text", text: "End-to-end ownership" },
      { type: "text", text: "Primarily client-led" },
      { type: "text", text: "Primarily advisory" },
    ],
  },
  {
    capability: "Best Suited For",
    cells: [
      { type: "text", text: "Complex, evolving implementation" },
      { type: "text", text: "Additional development capacity" },
      { type: "text", text: "Strategy and specialist advice" },
    ],
  },
];
