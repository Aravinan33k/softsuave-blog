import fx from "./enquiry-form.module.css";

/**
 * The enquiry form's field markers.
 *
 * These used to be four inline SVGs written out in `landing/hero.tsx` and
 * nowhere else, which is why that card carried icons and the other two — the
 * generative-AI hero and the services hero — did not. Same form, three
 * different labels. They live here now so all three draw from one set.
 *
 * Purely decorative: every one is `aria-hidden`, and the label text beside it
 * is what actually names the field.
 */
export type FieldIconName = "person" | "mail" | "phone" | "doc";

const PATHS: Record<FieldIconName, React.ReactNode> = {
  person: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c0-4.3 3.4-6.8 7.5-6.8s7.5 2.5 7.5 6.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4.5 7l7.5 5.5L19.5 7" />
    </>
  ),
  phone: (
    <path d="M5.5 4h3l1.6 4.4-2.1 2.1a11 11 0 005.5 5.5l2.1-2.1L20 15.5v3a1.5 1.5 0 01-1.6 1.5C10.7 19.6 4.4 13.3 4 5.6A1.5 1.5 0 015.5 4z" />
  ),
  doc: (
    <>
      <rect x="5" y="3.5" width="14" height="17" rx="2" />
      <path d="M8.5 9h7M8.5 12.5h7M8.5 16h4.5" />
    </>
  ),
};

export default function FieldIcon({ name }: { name: FieldIconName }) {
  return (
    <svg
      className={fx.fieldIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {PATHS[name]}
    </svg>
  );
}

/**
 * Required-field marker. Decorative — the real semantics are the `required`
 * attribute on the control itself, so this is hidden from assistive tech.
 */
export function RequiredMark() {
  return (
    <span className={fx.required} aria-hidden>
      *
    </span>
  );
}
