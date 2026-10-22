import { contactPageHref } from "@/lib/fde/contact";

export type CtaAction = {
  label: string;
  href: string;
  /** The banner sits on a dark image, so both actions use the ink variants. */
  variant: "primaryInk" | "outlineInk";
  /** Icon before the label. */
  leadingIcon?: "mail" | "message";
  /** Glyph after the label. */
  trailingArrow?: boolean;
};

export const ctaBannerContent = {
  headline: "Ready to Move Your AI Initiative Into Production?",
  description:
    "Work with Forward Deployed Engineers who can understand your requirements, build the solution, connect to your existing systems, and support implementation through production deployment.",
  actions: [
    {
      label: "Discuss Your FDE Requirement",
      // This app serves /contact.
      href: contactPageHref,
      variant: "primaryInk",
      trailingArrow: true,
    },
  ] satisfies CtaAction[],
};
