import { describe, expect, it } from "vitest";
import { groupSlots, parseSseFrame, readableDate, toLocalDateTime } from "./chat-api";
import { BUTTON_CUES } from "./chat-copy";
import { buttonsFor, fieldLabel, retireOnSend } from "./chat-flow";
import type { ChatEntry } from "./chat-store";
import { parseInline, parseMarkdown, safeHref, spokenText } from "./markdown";
import { captionTimes, cleanTranscript, nextSentenceEnd, revealStops, splitForSpeech } from "./voice";

describe("markdown", () => {
  it("reads paragraphs, soft breaks and the booking prompt's <br>", () => {
    expect(parseMarkdown("one\ntwo\n\nthree")).toEqual([
      { t: "p", c: [{ t: "text", v: "one two" }] },
      { t: "p", c: [{ t: "text", v: "three" }] },
    ]);
    const [p] = parseMarkdown("Pick a slot.<br> (Type 'Cancel' to quit booking)");
    expect(p).toEqual({
      t: "p",
      c: [{ t: "text", v: "Pick a slot." }, { t: "br" }, { t: "text", v: "(Type 'Cancel' to quit booking)" }],
    });
  });

  it("reads bold, italic and links, and leaves snake_case alone", () => {
    expect(parseInline("**AI Development**: see [Contact](https://www.softsuave.com/contact)")).toEqual([
      { t: "strong", c: [{ t: "text", v: "AI Development" }] },
      { t: "text", v: ": see " },
      { t: "link", href: "https://www.softsuave.com/contact", c: [{ t: "text", v: "Contact" }] },
    ]);
    expect(parseInline("fields: edit_name, edit_email")).toEqual([{ t: "text", v: "fields: edit_name, edit_email" }]);
    expect(parseInline("an *idea* and 5 * 3")).toEqual([
      { t: "text", v: "an " },
      { t: "em", c: [{ t: "text", v: "idea" }] },
      { t: "text", v: " and 5 * 3" },
    ]);
  });

  it("links bare URLs and emails without swallowing the full stop", () => {
    expect(parseInline("Visit https://www.softsuave.com/about.")).toEqual([
      { t: "text", v: "Visit " },
      { t: "link", href: "https://www.softsuave.com/about", c: [{ t: "text", v: "https://www.softsuave.com/about" }] },
      { t: "text", v: "." },
    ]);
    expect(parseInline("Mail contact@softsuave.com today")).toEqual([
      { t: "text", v: "Mail " },
      { t: "link", href: "mailto:contact@softsuave.com", c: [{ t: "text", v: "contact@softsuave.com" }] },
      { t: "text", v: " today" },
    ]);
  });

  it("never renders a script link", () => {
    expect(safeHref("javascript:alert(1)")).toBeNull();
    expect(parseInline("[click](javascript:alert(1))")).toEqual([{ t: "text", v: "click" }]);
  });

  it("reads lists, nested lists and a list straight after a paragraph", () => {
    const blocks = parseMarkdown("We offer:\n1. **AI**: models\n2. Web\n   - React\n   - Node\n3. Mobile");
    expect(blocks[0]).toEqual({ t: "p", c: [{ t: "text", v: "We offer:" }] });
    const list = blocks[1];
    expect(list.t).toBe("list");
    if (list.t !== "list") return;
    expect(list.ordered).toBe(true);
    expect(list.items).toHaveLength(3);
    expect(list.items[1][1]).toMatchObject({ t: "list", ordered: false });
  });

  it("speaks links, numbers and addresses as phrases", () => {
    expect(spokenText("Call +91 99527 32708 or see [this page](https://x.com) or mail hi@softsuave.com.")).toBe(
      "Call the number in the chat or see the link in the chat or mail the email address in the chat.",
    );
    expect(spokenText("Founded in 2011, 400+ people.")).toBe("Founded in 2011, 400+ people.");
  });
});

describe("slots", () => {
  const data = {
    slots: [
      { date: "2026-10-15", slots: { "11:00-11:30": {}, "20:00-20:30": {} } },
      { date: "2026-10-16", slots: { "04:00-04:30": {} } },
    ],
  };

  it("moves UTC slots into the visitor's zone, date and all", () => {
    expect(toLocalDateTime("2026-10-15", "20:00", "Asia/Kolkata")).toEqual({ date: "2026-10-16", time: "01:30 AM" });
    const days = groupSlots(data, "Asia/Kolkata");
    expect(days.map((d) => [d.date, d.times])).toEqual([
      ["2026-10-15", ["04:30 PM"]],
      ["2026-10-16", ["01:30 AM", "09:30 AM"]],
    ]);
    expect(days[0]).toMatchObject({ day: "Thu", dateNumber: "15", monthYear: "October 2026" });
  });

  it("can move a slot to the day before", () => {
    expect(groupSlots(data, "America/New_York").map((d) => [d.date, d.times])).toEqual([
      ["2026-10-15", ["07:00 AM", "04:00 PM"]],
      ["2026-10-16", ["12:00 AM"]],
    ]);
  });

  it("formats a date without shifting it by the zone", () => {
    expect(readableDate("2026-10-15")).toBe("Oct 15");
  });
});

describe("stream", () => {
  it("parses SSE frames", () => {
    expect(parseSseFrame('event: delta\ndata: {"text":"Hi"}')).toEqual({ event: "delta", data: { text: "Hi" } });
    expect(parseSseFrame("event: start")).toBeNull();
  });

  it("finds sentence ends, never inside a link or a version number", () => {
    const text = "We build with Node.js and React. See [our work](https://x.com/a.b). Next";
    const first = nextSentenceEnd(text, 0, false);
    expect(text.slice(0, first)).toBe("We build with Node.js and React.");
    // The link's own "a.b" is not an end; the full stop after the link is.
    const second = nextSentenceEnd(text, first, false);
    expect(text.slice(first, second)).toBe(" See [our work](https://x.com/a.b).");
    // "Next" is unfinished until the stream ends.
    expect(nextSentenceEnd(text, second, false)).toBe(-1);
    expect(nextSentenceEnd(text, second, true)).toBe(text.length);
  });

  it("captions a link in one go", () => {
    const text = "Read [the guide](https://x.com/g) now";
    const stops = revealStops(text, 0, text.length).map((s) => text.slice(0, s));
    expect(stops).toEqual(["Read", "Read [the guide](https://x.com/g)", text]);
  });

  it("times captions across the clip", () => {
    const rate = 1000;
    const samples = new Float32Array(rate); // 1 s: speech, a pause, speech
    for (let i = 0; i < 400; i++) samples[i] = 0.5;
    for (let i = 600; i < 1000; i++) samples[i] = 0.5;
    const times = captionTimes([5, 5], [true, false], samples, rate);
    expect(times[0]).toBeCloseTo(0, 2);
    expect(times[1]).toBeGreaterThanOrEqual(0.58);
  });
});

describe("speech", () => {
  it("chunks long replies at sentence ends", () => {
    const text = "First sentence here. Second one follows. Third.";
    expect(splitForSpeech(text, 25)).toEqual(["First sentence here.", "Second one follows.", "Third."]);
  });

  it("cleans transcripts for exact replies", () => {
    expect(cleanTranscript(" Cancel. ")).toBe("Cancel");
    expect(cleanTranscript("Can you help?")).toBe("Can you help?");
  });
});

describe("booking flow", () => {
  it("adds the live widget's buttons by its cue lines", () => {
    expect(buttonsFor(`Here it is. ${BUTTON_CUES.yesno}`)?.buttons).toBe("yesno");
    expect(buttonsFor("Thanks! And finally, could you provide your phone number with the country code? (e.g., +91 6380x x2619)")?.buttons).toBe("skip");
    expect(buttonsFor("Which field would you like to edit? Available fields: edit_name, edit_email, edit_company_name")).toEqual({
      buttons: "editfields",
      fields: ["edit_name", "edit_email", "edit_company_name"],
    });
    expect(buttonsFor("Hello")).toBeNull();
    expect(fieldLabel("edit_company_name")).toBe("Company name");
  });

  it("retires answered questions on send", () => {
    const entries: ChatEntry[] = [
      { id: "a", kind: "buttons", buttons: "yesno", text: "", disabled: false },
      { id: "b", kind: "buttons", buttons: "skip", text: "", disabled: false },
      { id: "c", kind: "slots", field: "schedule_meeting", disabled: false },
    ];
    const afterText = retireOnSend(entries, "my number is 123");
    expect(afterText.map((e) => e.kind !== "text" && e.disabled)).toEqual([false, true, false]);
    const afterCancel = retireOnSend(entries, "CANCEL");
    expect(afterCancel.every((e) => e.kind === "text" || e.disabled)).toBe(true);
  });
});
