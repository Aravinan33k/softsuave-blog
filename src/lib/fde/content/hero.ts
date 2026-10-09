import { contactEmailHref, contactPageHref } from "@/lib/fde/contact";

export type HeroStat = {
  value: string;
  label: string;
  /** Renders the value in brand green when true. */
  highlight?: boolean;
};

export type HeroContent = {
  badge: { tag: string; text: string };
  /**
   * The headline is split into runs so the italic serif accents stay
   * data-driven instead of hard-coded in the markup. `breakAfter` forces the
   * two-line layout from the `lg` breakpoint up.
   */
  headline: Array<{ text: string; accent?: boolean; breakAfter?: boolean }>;
  description: string;
  actions: Array<{
    label: string;
    href: string;
    variant: "primary" | "outline";
    icon?: "message" | "mail";
  }>;
  newsletter: {
    prompt: string;
    placeholder: string;
    submitLabel: string;
    successLabel: string;
  };
  stats: HeroStat[];
};

export const heroContent: HeroContent = {
  badge: { tag: "New", text: "FDEs for Complex Business Needs" },
  headline: [
    { text: "Hire " },
    { text: "Forward Deployed Engineers", accent: true, breakAfter: true },
    { text: " for " },
    { text: "AI", accent: true },
    { text: " Implementation" },
  ],
  description:
    "Hire Forward Deployed Engineers to turn complex AI ideas into working solutions that fit your systems, workflows, and real business needs, with rates starting from $14/hour.",
  actions: [
    {
      label: "Talk to us",
      // This app serves /contact.
      href: contactPageHref,
      variant: "primary",
      icon: "message",
    },
    {
      label: "Write to us",
      href: contactEmailHref,
      variant: "outline",
      icon: "mail",
    },
  ],
  newsletter: {
    prompt: "Subscribe to our newsletter for the latest FDE insights.",
    placeholder: "Enter your work email",
    submitLabel: "Subscribe",
    successLabel: "Subscribed",
  },
  stats: [
    { value: "13+", label: "Years of Engineering Experience" },
    { value: "400+", label: "AI & Engineering Specialists" },
    { value: "20+", label: "Countries Served" },
  ],
};
