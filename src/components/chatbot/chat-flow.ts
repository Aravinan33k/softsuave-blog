import { BUTTON_CUES } from "./chat-copy";
import type { ButtonKind, ChatEntry } from "./chat-store";

/**
 * The booking flow's rules, as softsuave.com's widget applies them: which
 * answers carry buttons, and which open questions a new message answers.
 */

/**
 * Which action buttons an answer carries, by the cue lines the assistant uses.
 * For the edit question, the field names come from its "Available fields:" list.
 */
export function buttonsFor(answer: string): { buttons: ButtonKind; fields?: string[] } | null {
  const lower = answer.toLowerCase();
  if (lower.includes(BUTTON_CUES.editfields)) {
    const list = answer.split("Available fields:")[1] ?? "";
    const fields = list
      .split(",")
      .map((f) => f.trim())
      .filter(Boolean);
    return { buttons: "editfields", fields };
  }
  if (lower.includes(BUTTON_CUES.optout)) return { buttons: "optout" };
  if (lower.includes(BUTTON_CUES.skip)) return { buttons: "skip" };
  if (lower.includes(BUTTON_CUES.yesno)) return { buttons: "yesno" };
  return null;
}

/**
 * Sending a message retires the questions it answers, by the live widget's
 * rules: "cancel"/"revert" close a slot picker and every open question;
 * confirm/edit/cancel answer the review question; any message passes the
 * phone and opt-out prompts; an `edit_…` choice or "revert" answers the
 * edit-field question.
 */
export function retireOnSend(entries: readonly ChatEntry[], query: string): ChatEntry[] {
  const q = query.trim().toLowerCase();
  const cancelling = q === "cancel" || q === "revert";
  return entries.map((e) => {
    if (e.kind === "slots") return !e.disabled && cancelling ? { ...e, disabled: true } : e;
    if (e.kind !== "buttons" || e.disabled) return e;
    const retire =
      cancelling ||
      e.buttons === "skip" ||
      e.buttons === "optout" ||
      (e.buttons === "yesno" && (q === "confirm" || q === "edit")) ||
      (e.buttons === "editfields" && q.startsWith("edit_"));
    return retire ? { ...e, disabled: true } : e;
  });
}

/** A label for an edit-field button: "edit_company_name" → "Company name". */
export function fieldLabel(field: string): string {
  const label = field.replace(/^edit_/, "").replace(/_/g, " ");
  return label.charAt(0).toUpperCase() + label.slice(1);
}
