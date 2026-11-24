"use client";

import { useCallback, useRef } from "react";
import { appPath } from "@/lib/media-url";
import { DRAFT_ID_KEY, type DraftType } from "./lead-routing";

export type DraftValues = {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  company?: string;
};

function readId(key: string): string | undefined {
  try {
    return sessionStorage.getItem(key) ?? undefined;
  } catch {
    return undefined;
  }
}

function writeId(key: string, id: string) {
  try {
    sessionStorage.setItem(key, id);
  } catch {
    /* storage blocked: the next save simply starts a new row, as a fresh visit would */
  }
}

/** After a lead is submitted the live pages forget every draft id, so the next form of the visit starts a new row. */
export function clearLeadDrafts() {
  for (const key of Object.values(DRAFT_ID_KEY)) {
    try {
      sessionStorage.removeItem(key);
    } catch {
      /* nothing stored */
    }
  }
}

/**
 * Saves what the visitor has typed when they leave a field — softsuave.com's `handleFieldBlur*` (see
 * `lib/leads/draft.ts`). Returns `save(values)`; call it from the fields the live form watched (email, phone and
 * the message). It does nothing when the form is empty, when the honeypot is filled, or when the values are the
 * same as the last save; it never blocks or reports errors to the visitor.
 */
export function useLeadDraft(type: DraftType, sourcePath: string) {
  const last = useRef<string>("");
  const inFlight = useRef<Promise<void> | null>(null);

  return useCallback(
    (values: DraftValues, honeypot = "") => {
      if (honeypot) return;
      const typed = Object.values(values).some((v) => v && v.replace(/^\+\d{1,4}\s*/, "").trim());
      if (!typed) return;
      const snapshot = JSON.stringify(values);
      if (snapshot === last.current) return;
      last.current = snapshot;

      const key = DRAFT_ID_KEY[type];
      const send = async () => {
        // One save at a time, so the first save's id is stored before the next one goes out and the visit stays one row.
        if (inFlight.current) await inFlight.current.catch(() => {});
        try {
          const res = await fetch(appPath("/api/v1/enquiry/draft"), {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ type, uniqueid: readId(key), fields: values, sourcePath }),
            keepalive: true,
          });
          if (!res.ok) return;
          const data = (await res.json().catch(() => null)) as { id?: string } | null;
          if (data?.id && !readId(key)) writeId(key, data.id);
        } catch {
          /* a lost draft costs nothing: the submit still sends the full lead */
        }
      };
      inFlight.current = send();
    },
    [type, sourcePath],
  );
}
