/**
 * Focus a form control that failed validation, with the caret after whatever
 * the reader already typed — so they carry on typing at the end instead of in
 * front of their own text (a programmatic `focus()` can leave the caret at the
 * start). Email inputs have no selection API, hence the try.
 */
export function focusAtEnd(el: Element | null | undefined): void {
  if (!(el instanceof HTMLElement)) return;
  el.focus();
  if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
    try {
      el.setSelectionRange(el.value.length, el.value.length);
    } catch {
      /* type=email: no caret to place */
    }
  }
}
