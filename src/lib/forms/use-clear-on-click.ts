import { useEffect, useRef, type RefObject } from "react";

/**
 * While a form is showing validation messages, clear them on the next click or
 * tap anywhere on the page — another field, the page around the form, the
 * field itself (7 Oct: "it should go off when I click another field or
 * somewhere else"). The form's own submit button is the exception: it checks
 * every field again itself, and clearing first would only make the messages
 * flash off and back on.
 *
 * Capture phase, so it runs before anything on the page can stop the event.
 */
export function useClearOnClick(
  active: boolean,
  clear: () => void,
  formRef: RefObject<HTMLFormElement | null>,
): void {
  // The latest `clear`, so the listener need not be re-attached each render.
  const clearRef = useRef(clear);
  useEffect(() => {
    clearRef.current = clear;
  });

  useEffect(() => {
    if (!active) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      if (target && formRef.current?.contains(target) && target.closest('button[type="submit"]')) return;
      clearRef.current();
    };
    // `click`, not `pointerdown`: removing the messages makes the form
    // shorter, and on a phone a tap's click is aimed AFTER its touchdown — so
    // clearing on touchdown moved the submit button under the finger and the
    // tap meant for a field submitted the form instead. A click has already
    // landed on what was touched. (Enter in a field submits via a click on the
    // submit button, which is the exception above.)
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [active, formRef]);
}
