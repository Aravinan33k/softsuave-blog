import ConsultationClose from "@/components/common/consultation-close";
import type { ManagerEnquiryContent } from "./manager-enquiry";

/**
 * An ad page's closing "Start Your 40 Hours Trial" band in the /developer-profile design (its type, colours,
 * numbered steps and the "Schedule a Call" card with its calendar icon) — the page's own copy, in
 * `ManagerEnquiryContent`'s shape. The button jumps to the form beside it.
 */
export default function ManagerClose({
  content,
  id = "ad-contact",
  idPrefix,
}: {
  content: ManagerEnquiryContent;
  /** The band's id; its form card is `${id}-enquiry`. */
  id?: string;
  /** Namespaces the form's field ids and is stored on the lead as its `sourceKey`. */
  idPrefix: string;
}) {
  const { manager } = content;
  return (
    <ConsultationClose
      id={id}
      idPrefix={idPrefix}
      ctaIcon
      content={{
        title: content.title,
        body: content.body,
        steps: content.steps,
        person: {
          image: { src: manager.photo, width: 157, height: 157, alt: "Soft Suave Manager" },
          name: manager.name,
          role: manager.role,
        },
        cta: { label: manager.cta.label, href: `#${id}-enquiry` },
        badges: content.badges,
        form: content.form,
      }}
    />
  );
}
