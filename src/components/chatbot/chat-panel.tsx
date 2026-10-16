"use client";

import { useEffect, useEffectEvent, useLayoutEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { bookingTimeZone, fetchSlots, readableDate, requestAnswer, type SlotDay } from "./chat-api";
import { CHAT_COPY, FOLLOW_UP_QUERY, MARKERS } from "./chat-copy";
import { buttonsFor, fieldLabel, retireOnSend } from "./chat-flow";
import { FOLLOW_UP_AFTER_MS, HISTORY_KEY, SESSION_TIMEOUT_MS, newId, store, type ChatEntry } from "./chat-store";
import { closeSession } from "./close-session";
import { CloseRing, LogoMark, MicIcon, MicMuteIcon, ScrollDownIcon, SendIcon, StopIcon, WaveIcon } from "./icons";
import { Markdown, UserText } from "./markdown";
import SlotPicker from "./slot-picker";
import { ReplyStream, VoiceChat, VoiceInput, voiceChatSupported, voiceSupported, type MicState, type VoiceState } from "./voice";
import styles from "./chatbot.module.css";

/** The live widget caps a message at 1 500 words. */
const MAX_WORDS = 1500;

/** The reply being written: `text` null shows the typing dots. */
type Live = { id: string; text: string | null };

type Props = {
  open: boolean;
  onMinimize: () => void;
  /** The session was ended: the widget remounts this panel on a fresh one. */
  onEnded: () => void;
  onUnread: (count: number) => void;
};

/**
 * The chat panel: softsuave.com's "Soft Suave - Live Chat", feature for
 * feature — streamed answers, the booking flow's buttons and slot picker,
 * the mic and hands-free voice chat, the "end the session?" confirmation, the
 * one follow-up nudge after two quiet minutes, the hour-long session, and a
 * thread shared across pages and tabs.
 *
 * It stays mounted (hidden) while closed once a conversation exists, so the
 * follow-up still arrives — counted on the launcher's badge, as on the live site.
 */
export default function ChatPanel({ open, onMinimize, onEnded, onUnread }: Props) {
  const [entries, setEntries] = useState<ChatEntry[]>(() => store.history());
  const [slots, setSlots] = useState<SlotDay[] | null>(() => {
    const cached = store.slots();
    return Array.isArray(cached) ? (cached as SlotDay[]) : null;
  });
  const [live, setLive] = useState<Live | null>(null);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [confirmEnd, setConfirmEnd] = useState(false);
  const [mic, setMic] = useState<MicState>("idle");
  const [micPlaceholder, setMicPlaceholder] = useState<string | null>(null);
  const [voice, setVoice] = useState<{ state: VoiceState; label: string }>({ state: "off", label: "" });
  const [level, setLevel] = useState(0);
  const [awayFromBottom, setAwayFromBottom] = useState(false);
  const [supports] = useState(() => ({ mic: voiceSupported(), voiceChat: voiceChatSupported() }));

  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const openRef = useRef(open);
  const lockedRef = useRef(false);
  const sendingRef = useRef(false);
  const sendRef = useRef<(query: string, display?: string) => void>(() => {});

  const locked = entries.some((e) => e.kind === "slots" && !e.disabled);
  const shown: ChatEntry[] = entries.length ? entries : [GREETING];

  /** A reply arrived while the panel is closed: count it on the launcher. */
  function noteIncoming() {
    if (openRef.current) return;
    const count = store.unread() + 1;
    store.setUnread(count);
    onUnread(count);
  }

  function addNotice(text: string) {
    setEntries((prev) => [...withGreeting(prev), { id: newId(), kind: "text", sender: "ai", text, local: true }]);
    noteIncoming();
  }

  const [voiceInput] = useState(
    () =>
      new VoiceInput({
        state: setMic,
        placeholder: setMicPlaceholder,
        transcript: (text) => {
          if (lockedRef.current) return; // a slot picker took the box while we waited
          setDraft((d) => (d.trim() ? `${d.trim()} ${text}` : text));
          textareaRef.current?.focus();
        },
        error: (message) => addNotice(message),
        activity: store.touch,
        sessionId: store.sessionId,
      }),
  );

  const [voiceChat] = useState(
    () =>
      new VoiceChat({
        state: (state, label) => setVoice({ state, label }),
        level: setLevel,
        send: (text) => sendRef.current(text),
        error: (message) => addNotice(message),
        activity: store.touch,
        sessionId: store.sessionId,
      }),
  );

  async function loadSlots(): Promise<SlotDay[]> {
    const days = await fetchSlots();
    store.saveSlots(days);
    setSlots(days);
    return days;
  }

  async function send(rawQuery: string, display?: string) {
    const query = rawQuery.trim();
    if (!query || sendingRef.current) return;
    sendingRef.current = true;
    setSending(true);
    store.touch();
    voiceChat.onSend();
    voiceInput.discard();

    const followUp = query === FOLLOW_UP_QUERY;
    if (!followUp) {
      setEntries((prev) => [
        ...retireOnSend(withGreeting(prev), query),
        { id: newId(), kind: "text", sender: "user", text: display ?? query },
      ]);
      setDraft("");
    }

    const replyId = newId();
    setLive({ id: replyId, text: null });
    const stream = new ReplyStream(
      voiceChat,
      (text) => setLive((l) => (l?.id === replyId ? { ...l, text } : l)),
      () => setLive((l) => (l?.id === replyId ? null : l)),
    );

    try {
      const sessionId = store.ensureSession();
      const data = await requestAnswer(sessionId, query, stream.onDelta);
      const answer = (data.answer ?? "").trim();

      if (answer === MARKERS.schedule || answer === MARKERS.editSlot) {
        await loadSlots();
        stream.discard();
        const edit = answer === MARKERS.editSlot;
        setEntries((prev) => [
          ...withGreeting(prev),
          { id: newId(), kind: "text", sender: "ai", text: edit ? CHAT_COPY.slotEditPrompt : CHAT_COPY.slotPrompt },
          { id: replyId, kind: "slots", field: edit ? "edit_slot" : "schedule_meeting", disabled: false },
        ]);
        noteIncoming();
        voiceChat.onReply("slot");
        return;
      }
      if (answer === MARKERS.noFollowUp) {
        stream.discard();
        voiceChat.onReply("none");
        return;
      }

      const text = answer ? (data.answer as string) : CHAT_COPY.unexpected;
      const extra = buttonsFor(text);
      const entry: ChatEntry = extra
        ? {
            id: replyId,
            kind: "buttons",
            buttons: extra.buttons,
            fields: extra.fields,
            text: extra.buttons === "editfields" ? CHAT_COPY.editFieldsPrompt : text,
            disabled: false,
          }
        : { id: replyId, kind: "text", sender: "ai", text };
      setEntries((prev) => [...withGreeting(prev), entry]);
      if (stream.hasText() && entry.kind === "text") stream.finish(text);
      else stream.discard();
      noteIncoming();
      voiceChat.onReply(stream.ownsVoice() ? "streamed" : "text", entry.text);
    } catch {
      stream.discard();
      addNotice(CHAT_COPY.error);
      voiceChat.onReply("text", CHAT_COPY.error);
    } finally {
      sendingRef.current = false;
      setSending(false);
    }
  }

  useEffect(() => {
    sendRef.current = (query, display) => void send(query, display);
    openRef.current = open;
    lockedRef.current = locked;
  });

  // The thread is shared: every change is stored, and other tabs' changes land here.
  useEffect(() => {
    store.saveHistory(entries);
  }, [entries]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== HISTORY_KEY && e.key !== null) return;
      if (e.newValue === null) {
        // The session was ended in another tab.
        voiceChat.end();
        voiceInput.discard();
        onEnded();
        return;
      }
      setEntries(store.history());
      const cached = store.slots();
      if (Array.isArray(cached)) setSlots(cached as SlotDay[]);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [onEnded, voiceChat, voiceInput]);

  // A restored thread with a slot picker but no cached slots: fetch them again.
  const needsSlots = slots === null && entries.some((e) => e.kind === "slots");
  useEffect(() => {
    if (!needsSlots) return;
    fetchSlots()
      .then((days) => {
        store.saveSlots(days);
        setSlots(days);
      })
      .catch(() => setSlots([]));
  }, [needsSlots]);

  // The one follow-up nudge: two quiet minutes into a session, nothing half-typed.
  const followUpTick = useEffectEvent(() => {
    if (!store.sessionId() || store.followUpsSent() >= 1 || sendingRef.current) return;
    const last = store.lastActivity();
    if (!last || Date.now() - last <= FOLLOW_UP_AFTER_MS) return;
    if (draft.trim() || voiceInput.busy || voiceChat.on) return;
    store.markFollowUpSent();
    void send(FOLLOW_UP_QUERY);
  });
  // An hour without activity while open ends the session, as closing it would.
  const timeoutTick = useEffectEvent(() => {
    const last = store.lastActivity();
    if (openRef.current && last && Date.now() - last > SESSION_TIMEOUT_MS) endSession();
  });
  useEffect(() => {
    const followUp = window.setInterval(() => followUpTick(), 1000);
    const timeout = window.setInterval(() => timeoutTick(), 60_000);
    return () => {
      window.clearInterval(followUp);
      window.clearInterval(timeout);
    };
  }, []);

  // Voice stops with the page, and with the panel.
  useEffect(() => {
    const stop = () => {
      voiceChat.end();
      voiceInput.discard();
    };
    window.addEventListener("pagehide", stop);
    return () => {
      window.removeEventListener("pagehide", stop);
      stop();
    };
  }, [voiceChat, voiceInput]);

  // Focus follows the conversation: the message box when the panel opens, the
  // first time slot while a picker holds the (disabled) box, the box again after.
  useEffect(() => {
    if (!open) return;
    if (!store.lastActivity()) store.touch();
    const id = requestAnimationFrame(() => {
      const target = locked
        ? listRef.current?.querySelector<HTMLElement>("[data-slot-active] [data-slot-time]")
        : textareaRef.current;
      target?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(id);
  }, [open, locked]);

  // Scrolling, as the live widget does it: a visitor's message scrolls to the
  // bottom; a reply scrolls to the question above it, so the answer reads from its start.
  const lastEntry = entries[entries.length - 1];
  const lastKey = `${entries.length}:${lastEntry?.id}:${live ? "live" : ""}:${open}`;
  useLayoutEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const last = list.lastElementChild as HTMLElement | null;
    if (!last) return;
    if (last.dataset.sender === "ai") {
      const prev = last.previousElementSibling as HTMLElement | null;
      if (prev?.dataset.sender === "user") list.scrollTop = prev.offsetTop - 5;
      else list.scrollTop = list.scrollHeight;
    } else {
      list.scrollTop = list.scrollHeight;
    }
  }, [lastKey]);

  // The "jump to latest" button: shown whenever the newest message is out of view.
  useEffect(() => {
    const list = listRef.current;
    if (!list || !open) return;
    const check = () => setAwayFromBottom(list.scrollHeight - list.scrollTop - list.clientHeight >= 20);
    const observer = new ResizeObserver(check);
    observer.observe(list);
    for (const child of Array.from(list.children)) observer.observe(child);
    list.addEventListener("scroll", check, { passive: true });
    return () => {
      observer.disconnect();
      list.removeEventListener("scroll", check);
    };
  }, [open, lastKey]);

  // The message box grows with its text, up to four lines.
  useLayoutEffect(() => {
    const box = textareaRef.current;
    if (!box) return;
    box.style.height = "auto";
    box.style.height = `${Math.min(box.scrollHeight, 112)}px`;
  }, [draft, open]);

  function endSession() {
    voiceInput.discard();
    voiceChat.end();
    const sessionId = store.sessionId();
    if (sessionId) void closeSession(sessionId);
    store.clear();
    onEnded();
  }

  function minimize() {
    voiceInput.discard();
    voiceChat.end();
    setConfirmEnd(false);
    onMinimize();
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    void send(draft);
  }

  function onKeyDown(e: KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault();
      void send(draft);
    }
  }

  function onDraftChange(value: string) {
    const words = value.match(/\S+\s*/g) ?? [];
    setDraft(words.length > MAX_WORDS ? words.slice(0, MAX_WORDS).join("") : value);
  }

  function onPanelKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key !== "Escape") return;
    e.stopPropagation();
    if (confirmEnd) setConfirmEnd(false);
    else minimize();
  }

  function retire(id: string) {
    setEntries((prev) => prev.map((e) => (e.id === id && e.kind !== "text" ? { ...e, disabled: true } : e)));
  }

  function pickSlot(id: string, date: string, time: string) {
    retire(id);
    void send(
      `I prefer on '${date}' at '${time}' (timezone: '${bookingTimeZone()}')`,
      `I’d like to schedule on ${readableDate(date)} at ${time}`,
    );
  }

  function skipSlot(id: string) {
    retire(id);
    void send("CANCEL");
  }

  function reply(id: string, value: string, display?: string) {
    retire(id);
    void send(value, display);
  }

  if (!open) return null;

  const voiceOn = voice.state !== "off";
  const hasText = draft.trim() !== "";
  const showMic = supports.mic && !voiceOn && !locked;
  const showVoice = supports.voiceChat && !voiceOn && !locked && !hasText;
  const showSend = !voiceOn && !locked && !showVoice;

  return (
    <div
      className={styles.panel}
      role="dialog"
      aria-modal="false"
      aria-labelledby="ss-chat-title"
      onKeyDown={onPanelKeyDown}
      data-lenis-prevent
    >
      <div className={styles.head}>
        <LogoMark className={styles.headLogo} />
        <h2 id="ss-chat-title" className={styles.headTitle}>
          {CHAT_COPY.title}
          <span className={styles.onlineDot} aria-label="online" />
        </h2>
        <button type="button" className={styles.headClose} onClick={() => setConfirmEnd(true)} aria-label="End chat">
          <CloseRing />
        </button>
      </div>

      <div className={styles.body}>
        <div ref={listRef} className={styles.list} aria-live="polite" aria-busy={sending || undefined}>
          {shown.map((entry) => renderEntry(entry))}
          {live && !entries.some((e) => e.id === live.id) && (
            <div key={live.id} className={`${styles.ai} ${live.text === null ? styles.loading : styles.streaming}`} data-sender="ai">
              {live.text === null ? <TypingDots /> : <Markdown text={live.text} linkClassName={styles.link} />}
            </div>
          )}
        </div>

        {awayFromBottom && (
          <button
            type="button"
            className={styles.toBottom}
            onClick={() => listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })}
            aria-label="Scroll to the latest message"
          >
            <ScrollDownIcon />
          </button>
        )}

        <form className={styles.composer} onSubmit={onSubmit}>
          {voiceOn ? (
            <div className={styles.voiceBar}>
              <button
                type="button"
                className={`${styles.orb} ${styles[`orb_${voice.state}`] ?? ""}`}
                style={{ ["--level" as string]: level.toFixed(2) }}
                onClick={() => voiceChat.orbClick()}
                aria-label="Voice chat status"
              >
                <span className={styles.orbBars} aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
              </button>
              <span className={styles.voiceStatus} aria-live="polite">
                {voice.label}
              </span>
              <button
                type="button"
                className={`${styles.muteButton} ${voice.state === "muted" ? styles.muteButtonOn : ""}`}
                onClick={() => voiceChat.toggleMute()}
                aria-label={voice.state === "muted" ? "Unmute microphone" : "Mute microphone"}
                aria-pressed={voice.state === "muted"}
              >
                <MicMuteIcon muted={voice.state === "muted"} />
              </button>
              <button type="button" className={styles.endButton} onClick={() => voiceChat.end()}>
                End
              </button>
            </div>
          ) : (
            <textarea
              ref={textareaRef}
              className={`${styles.input} ${locked ? styles.inputLocked : ""}`}
              rows={1}
              value={draft}
              onChange={(e) => onDraftChange(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={locked ? CHAT_COPY.lockedPlaceholder : (micPlaceholder ?? CHAT_COPY.placeholder)}
              aria-label={CHAT_COPY.placeholder}
              disabled={locked}
            />
          )}

          {showMic && (
            <button
              type="button"
              className={`${styles.micButton} ${mic === "recording" ? styles.micRecording : ""} ${mic === "busy" ? styles.micBusy : ""}`}
              onClick={() => void voiceInput.toggle()}
              disabled={sending || mic === "busy"}
              title={mic === "recording" ? "Stop recording" : "Speak your message"}
              aria-label={mic === "recording" ? "Stop recording" : "Speak your message"}
            >
              {mic === "recording" ? <StopIcon /> : mic === "busy" ? <span className={styles.spinner} aria-hidden /> : <MicIcon />}
            </button>
          )}
          {showVoice && (
            <button
              type="button"
              className={styles.voiceButton}
              onClick={() => void voiceChat.start()}
              disabled={sending || voiceInput.busy}
              title="Start voice chat"
              aria-label="Start voice chat"
            >
              <WaveIcon />
            </button>
          )}
          {showSend && (
            <button type="submit" className={styles.sendButton} disabled={sending || !hasText} aria-label="Send message">
              <SendIcon />
            </button>
          )}
        </form>

        {confirmEnd && (
          <div className={styles.confirmOverlay} onClick={(e) => e.target === e.currentTarget && setConfirmEnd(false)}>
            <div className={styles.confirmBox} role="alertdialog" aria-modal="true" aria-labelledby="ss-chat-end">
              <p id="ss-chat-end">{CHAT_COPY.endConfirm}</p>
              <div className={styles.confirmActions}>
                <button type="button" className={styles.confirmYes} onClick={endSession} autoFocus>
                  {CHAT_COPY.yes}
                </button>
                <button type="button" className={styles.confirmNo} onClick={minimize}>
                  {CHAT_COPY.no}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  function renderEntry(entry: ChatEntry) {
    if (entry.kind === "text" && entry.sender === "user") {
      return (
        <div key={entry.id} className={styles.user} data-sender="user">
          <UserText text={entry.text} linkClassName={styles.userLink} />
        </div>
      );
    }
    if (entry.kind === "slots") {
      return (
        <div key={entry.id} className={`${styles.ai} ${styles.aiForm}`} data-sender="ai">
          {slots ? (
            <SlotPicker
              days={slots}
              active={!entry.disabled}
              onPick={(date, time) => pickSlot(entry.id, date, time)}
              onSkip={() => skipSlot(entry.id)}
            />
          ) : (
            <TypingDots />
          )}
        </div>
      );
    }
    const override = live?.id === entry.id ? live : null;
    const text = override ? override.text : entry.text;
    return (
      <div key={entry.id} className={`${styles.ai} ${override ? (text === null ? styles.loading : styles.streaming) : ""}`} data-sender="ai">
        {text === null ? <TypingDots /> : <Markdown text={text} linkClassName={styles.link} />}
        {entry.kind === "buttons" && (
          <div className={styles.chips}>
            {entry.buttons === "yesno" &&
              ["Confirm", "Edit", "Cancel"].map((value) => (
                <button key={value} type="button" className={styles.chip} disabled={entry.disabled} onClick={() => reply(entry.id, value)}>
                  {value}
                </button>
              ))}
            {entry.buttons === "skip" && (
              <button type="button" className={styles.chip} disabled={entry.disabled} onClick={() => reply(entry.id, "Skip")}>
                Skip
              </button>
            )}
            {entry.buttons === "optout" && (
              <button type="button" className={styles.chip} disabled={entry.disabled} onClick={() => reply(entry.id, "Opt Out")}>
                Opt Out
              </button>
            )}
            {entry.buttons === "editfields" && (
              <>
                {(entry.fields ?? []).map((field) => (
                  <button
                    key={field}
                    type="button"
                    className={styles.chip}
                    disabled={entry.disabled}
                    onClick={() => reply(entry.id, field, `I want to edit ${field.replace(/^edit_/, "").replace(/_/g, " ")}`)}
                  >
                    {fieldLabel(field)}
                  </button>
                ))}
                <button type="button" className={styles.chip} disabled={entry.disabled} onClick={() => reply(entry.id, "Revert")}>
                  Revert
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  }
}

/** Shown until the visitor's first message, then stored with the thread. */
const GREETING: ChatEntry = { id: "greeting", kind: "text", sender: "ai", text: CHAT_COPY.greeting };

function withGreeting(entries: readonly ChatEntry[]): ChatEntry[] {
  return entries.length ? [...entries] : [GREETING];
}

function TypingDots() {
  return (
    <span className={styles.dots} role="status" aria-label="Assistant is typing">
      <span />
      <span />
      <span />
    </span>
  );
}
