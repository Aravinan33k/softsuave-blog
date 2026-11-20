import { speak, transcribe } from "./chat-api";
import { CHAT_COPY } from "./chat-copy";
import { SPOKEN_PHONE_RE, isPhoneNumber, spokenText } from "./markdown";

/**
 * Voice for the chat widget, ported from softsuave.com's own widget (same
 * thresholds, same states, same wording):
 *
 *  - VoiceInput — the mic button. Record, then the transcript lands in the
 *    message box for the visitor to review and send; nothing is sent by itself.
 *  - VoiceChat — hands-free, ChatGPT-style: listen until the visitor stops
 *    talking, send the transcript as a normal message, read the reply aloud,
 *    listen again.
 *  - ReplyStream — one streamed answer: shown as it arrives when typing, or in
 *    voice chat spoken sentence by sentence, each word captioned as it's heard.
 *
 * Silence never reaches the transcriber: it answers silence with invented
 * text, so a level meter must hear real speech first.
 */

const VOICE_LEVEL_THRESHOLD = 0.01; // RMS of a 100 ms sample; speech is well above, quiet rooms well below
const VOICE_SAMPLE_MS = 100;
const MIN_RECORDING_MS = 500; // shorter = an accidental tap
const MIN_VOICED_MS = 300; // less = nothing was said
const VOICE_MAX_SECONDS = 60;

const VC_END_SILENCE_MS = 1200; // this much silence after speech ends the visitor's turn
const VC_MAX_TURN_MS = 60_000;
const VC_IDLE_LIMIT_MS = 90_000; // no speech for this long ends voice chat
const VC_SPEAK_CHUNK_CHARS = 300; // a reply is spoken in sentence chunks so audio starts quickly
const STREAM_MIN_SENTENCE_CHARS = 25; // shorter pieces join the next, so speech isn't choppy

type AudioCtor = typeof AudioContext;

function audioContextCtor(): AudioCtor | undefined {
  if (typeof window === "undefined") return undefined;
  return window.AudioContext ?? (window as unknown as { webkitAudioContext?: AudioCtor }).webkitAudioContext;
}

export function voiceSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    window.isSecureContext &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined"
  );
}

export function voiceChatSupported(): boolean {
  return voiceSupported() && !!audioContextCtor();
}

function pickAudioMimeType(): string {
  const types = ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"];
  return types.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

function newRecorder(stream: MediaStream): MediaRecorder {
  const mimeType = pickAudioMimeType();
  return mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
}

function rms(samples: Float32Array): number {
  let sum = 0;
  for (let i = 0; i < samples.length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / samples.length);
}

function heardSpeech(spokenMs: number, durationMs: number) {
  return durationMs >= MIN_RECORDING_MS && spokenMs >= MIN_VOICED_MS;
}

/**
 * Transcripts end in punctuation ("Cancel.", "arun@gmail.com.") that would
 * break exact replies like "cancel"; a trailing "?" stays, as questions read better.
 */
export function cleanTranscript(text: string): string {
  return text.trim().replace(/[.!,;:]+$/, "").trim();
}

function getMic(): Promise<MediaStream> {
  return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true } });
}

/* ============================================================
   Mic button
   ============================================================ */

export type MicState = "idle" | "recording" | "busy";

type VoiceInputCallbacks = {
  state(state: MicState): void;
  /** "Listening… 0:07 (tap ■ to stop)" while recording; null restores the box's own. */
  placeholder(text: string | null): void;
  transcript(text: string): void;
  error(message: string): void;
  activity(): void;
  sessionId(): string | null;
};

export class VoiceInput {
  private recorder: MediaRecorder | null = null;
  private stream: MediaStream | null = null;
  private chunks: Blob[] = [];
  private timer: ReturnType<typeof setInterval> | undefined;
  private seconds = 0;
  private discardNext = false;
  private transcribing = false;
  private levelCtx: AudioContext | null = null;
  private levelTimer: ReturnType<typeof setInterval> | undefined;
  private levelActive = false;
  private voicedMs = 0;
  private startedAt = 0;

  constructor(private readonly cb: VoiceInputCallbacks) {}

  get busy(): boolean {
    return this.transcribing || this.recorder?.state === "recording";
  }

  async toggle() {
    if (this.transcribing) return;
    if (this.recorder?.state === "recording") {
      this.recorder.stop();
      return;
    }
    // Created inside the click, before awaiting the mic, so the browser lets it run.
    this.createLevelContext();
    try {
      this.stream = await getMic();
    } catch {
      this.stopLevelMeter();
      this.cb.error(CHAT_COPY.micDenied);
      return;
    }

    const recorder = newRecorder(this.stream);
    this.recorder = recorder;
    this.chunks = [];
    this.discardNext = false;
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) this.chunks.push(event.data);
    };
    recorder.onstop = () => {
      // Read the meter before release() shuts it down.
      const durationMs = Date.now() - this.startedAt;
      const spokenMs = this.levelMeterWorked() ? this.voicedMs : durationMs; // no meter: let it through
      clearInterval(this.timer);
      this.release();
      this.cb.placeholder(null);
      this.cb.state("idle");
      this.cb.activity();
      if (this.discardNext || this.chunks.length === 0) return;
      if (!heardSpeech(spokenMs, durationMs)) {
        this.cb.error(CHAT_COPY.nothingHeard);
        return;
      }
      void this.transcribe(new Blob(this.chunks, { type: recorder.mimeType || "audio/webm" }));
    };

    this.startLevelMeter(this.stream);
    recorder.start();
    this.startedAt = Date.now();
    this.cb.activity();
    this.seconds = 0;
    this.cb.state("recording");
    this.cb.placeholder("Listening… 0:00 (tap ■ to stop)");
    this.timer = setInterval(() => {
      this.seconds += 1;
      const secs = String(this.seconds % 60).padStart(2, "0");
      this.cb.placeholder(`Listening… ${Math.floor(this.seconds / 60)}:${secs} (tap ■ to stop)`);
      if (this.seconds >= VOICE_MAX_SECONDS && recorder.state === "recording") recorder.stop();
    }, 1000);
  }

  /** Stop without transcribing (chat closed, slot picker opened, a message sent…). */
  discard() {
    if (this.recorder?.state === "recording") {
      this.discardNext = true;
      this.recorder.stop();
    } else {
      this.release();
    }
  }

  private async transcribe(blob: Blob) {
    this.transcribing = true;
    this.cb.state("busy");
    try {
      const result = await transcribe(blob, this.cb.sessionId());
      if (!result.ok) throw new Error(result.message);
      const text = cleanTranscript(result.text);
      if (!text) throw new Error("Couldn't hear anything, please try again.");
      this.cb.transcript(text);
      this.cb.activity();
    } catch (error) {
      this.cb.error(error instanceof Error && error.message ? error.message : CHAT_COPY.transcribeFailed);
    } finally {
      this.transcribing = false;
      this.cb.state("idle");
    }
  }

  private release() {
    this.stopLevelMeter();
    this.stream?.getTracks().forEach((track) => track.stop()); // turns off the browser's mic indicator
    this.stream = null;
  }

  private createLevelContext() {
    const Ctor = audioContextCtor();
    if (!Ctor) return;
    try {
      this.levelCtx = new Ctor();
      if (this.levelCtx.state === "suspended") this.levelCtx.resume().catch(() => {});
    } catch {
      this.levelCtx = null;
    }
  }

  private startLevelMeter(stream: MediaStream) {
    this.voicedMs = 0;
    this.levelActive = false;
    const ctx = this.levelCtx;
    if (!ctx) return;
    try {
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const samples = new Float32Array(analyser.fftSize);
      this.levelTimer = setInterval(() => {
        analyser.getFloatTimeDomainData(samples);
        if (rms(samples) > VOICE_LEVEL_THRESHOLD) this.voicedMs += VOICE_SAMPLE_MS;
      }, VOICE_SAMPLE_MS);
      this.levelActive = true;
    } catch {
      this.levelActive = false;
    }
  }

  /** A suspended context reads everything as silence, so only trust a meter that ran. */
  private levelMeterWorked() {
    return this.levelActive && this.levelCtx?.state === "running";
  }

  private stopLevelMeter() {
    clearInterval(this.levelTimer);
    this.levelTimer = undefined;
    this.levelActive = false;
    this.levelCtx?.close().catch(() => {});
    this.levelCtx = null;
  }
}

/* ============================================================
   Voice chat
   ============================================================ */

export type VoiceState = "off" | "listening" | "thinking" | "speaking" | "muted" | "paused";

type VoiceChatCallbacks = {
  state(state: VoiceState, label: string): void;
  /** The orb swells with the visitor's voice: 0–1. */
  level(level: number): void;
  /** A finished turn's transcript, to send as a normal message. */
  send(text: string): void;
  error(message: string): void;
  activity(): void;
  sessionId(): string | null;
};

export class VoiceChat {
  state: VoiceState = "off";
  ctx: AudioContext | null = null;
  speakToken = 0;
  activeStream: ReplyStream | null = null;
  private stream: MediaStream | null = null;
  private analyser: AnalyserNode | null = null;
  private samples: Float32Array<ArrayBuffer> | null = null;
  private meterTimer: ReturnType<typeof setInterval> | undefined;
  private recorder: MediaRecorder | null = null;
  private chunks: Blob[] = [];
  private discardTurn = false;
  private turnStartedAt = 0;
  private voicedMs = 0;
  private lastVoiceAt = 0;
  private lastActivityAt = 0;
  private source: AudioBufferSourceNode | null = null;

  constructor(private readonly cb: VoiceChatCallbacks) {}

  get on(): boolean {
    return this.state !== "off";
  }

  private setState(state: VoiceState, label?: string) {
    this.state = state;
    this.cb.state(state, label ?? (state === "off" ? "" : CHAT_COPY.voiceStatus[state]));
    if (state !== "listening") this.cb.level(0);
  }

  /** A streamed reply's first sentence has started playing. */
  markSpeaking() {
    this.setState("speaking");
  }

  /** A suspended context reads as silence; turns then end by tapping the orb. */
  private meterRunning() {
    return this.ctx?.state === "running";
  }

  async start() {
    if (this.on) return;
    const Ctor = audioContextCtor();
    // Created inside the click so the browser allows playback for the whole session.
    try {
      if (!Ctor) throw new Error("no AudioContext");
      this.ctx = new Ctor();
      if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    } catch {
      this.cb.error(CHAT_COPY.voiceUnsupported);
      return;
    }
    this.setState("thinking", CHAT_COPY.voiceStatus.starting);

    let stream: MediaStream;
    try {
      stream = await getMic();
    } catch {
      this.end(CHAT_COPY.micDenied);
      return;
    }
    if (!this.on) {
      // Ended while the permission prompt was open.
      stream.getTracks().forEach((track) => track.stop());
      return;
    }
    this.stream = stream;
    const ctx = this.ctx!;
    this.analyser = ctx.createAnalyser();
    this.analyser.fftSize = 2048;
    ctx.createMediaStreamSource(stream).connect(this.analyser); // analysis only, never to the speakers
    this.samples = new Float32Array(this.analyser.fftSize);
    this.meterTimer = setInterval(() => this.onMeterTick(), VOICE_SAMPLE_MS);
    this.lastActivityAt = Date.now();
    this.cb.activity();
    this.startListening();
  }

  private onMeterTick() {
    if (this.state !== "listening" || !this.analyser || !this.samples) return;
    const now = Date.now();
    this.analyser.getFloatTimeDomainData(this.samples);
    const level = rms(this.samples);
    this.cb.level(Math.min(1, level * 8));
    if (level > VOICE_LEVEL_THRESHOLD) {
      this.voicedMs += VOICE_SAMPLE_MS;
      this.lastVoiceAt = now;
      this.lastActivityAt = now;
    }
    const finishedSpeaking = this.voicedMs >= MIN_VOICED_MS && now - this.lastVoiceAt >= VC_END_SILENCE_MS;
    if (finishedSpeaking || now - this.turnStartedAt >= VC_MAX_TURN_MS) {
      this.finishTurn();
    } else if (this.voicedMs === 0 && this.meterRunning() && now - this.lastActivityAt >= VC_IDLE_LIMIT_MS) {
      this.end(CHAT_COPY.voiceIdle);
    }
  }

  startListening() {
    if (!this.on || !this.stream) return;
    this.stopTurnRecorder(true);
    const recorder = newRecorder(this.stream);
    this.recorder = recorder;
    this.chunks = [];
    this.discardTurn = false;
    this.voicedMs = 0;
    this.lastVoiceAt = 0;
    this.turnStartedAt = Date.now();
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) this.chunks.push(event.data);
    };
    recorder.onstop = () => {
      if (this.discardTurn || recorder !== this.recorder || !this.on) return;
      const durationMs = Date.now() - this.turnStartedAt;
      const spokenMs = this.meterRunning() ? this.voicedMs : durationMs; // no meter: can't judge, let it through
      if (!heardSpeech(spokenMs, durationMs) || this.chunks.length === 0) {
        this.startListening(); // nothing said: keep listening, never upload silence
        return;
      }
      void this.transcribeTurn(new Blob(this.chunks, { type: recorder.mimeType || "audio/webm" }));
    };
    recorder.start();
    this.setState("listening");
  }

  private finishTurn() {
    if (this.recorder?.state === "recording") {
      this.setState("thinking");
      this.recorder.stop();
    }
  }

  /** discard: stop without transcribing (mute, an interrupting tap, end). */
  private stopTurnRecorder(discard: boolean) {
    if (this.recorder?.state === "recording") {
      this.discardTurn = discard;
      this.recorder.stop();
    }
  }

  private async transcribeTurn(blob: Blob) {
    this.setState("thinking");
    try {
      const result = await transcribe(blob, this.cb.sessionId());
      const text = result.ok ? cleanTranscript(result.text) : "";
      if (!this.on) return;
      if (!text) {
        this.startListening(); // "nothing heard" or a failed upload: just listen again
        return;
      }
      this.cb.activity();
      this.cb.send(text); // the reply comes back through onReply()
    } catch {
      if (this.on) this.startListening();
    }
  }

  /** Any send (spoken, typed, a button, a slot) moves voice chat to "thinking". */
  onSend() {
    if (!this.on) return;
    this.stopTurnRecorder(true);
    this.stopSpeaking();
    this.setState("thinking");
  }

  /**
   * The reply is on screen. "streamed": the stream already spoke it and resumes
   * listening itself; "slot": a picker is waiting; "text": speak `text`.
   */
  onReply(kind: "text" | "slot" | "none" | "streamed", text?: string) {
    if (!this.on || kind === "streamed") return;
    if (kind === "slot") {
      void this.speakText(CHAT_COPY.voicePickSlot, () => this.setState("paused"));
    } else if (kind === "text" && text) {
      void this.speakText(spokenText(text), () => this.startListening());
    } else {
      this.startListening();
    }
  }

  fetchSpeech(text: string): Promise<ArrayBuffer> {
    return speak(text, this.cb.sessionId());
  }

  decode(buffer: ArrayBuffer): Promise<AudioBuffer> {
    // The callback form also works on older Safari.
    return new Promise((resolve, reject) => this.ctx!.decodeAudioData(buffer, resolve, reject));
  }

  /** Speak chunk by chunk (fetching the next while the current plays), then call onDone. */
  private async speakText(text: string, onDone: () => void) {
    const token = ++this.speakToken;
    const chunks = splitForSpeech(text, VC_SPEAK_CHUNK_CHARS);
    if (!chunks.length) {
      onDone();
      return;
    }
    this.setState("speaking");
    try {
      let next = this.fetchSpeech(chunks[0]);
      for (let i = 0; i < chunks.length; i++) {
        const audio = await next;
        if (i + 1 < chunks.length) next = this.fetchSpeech(chunks[i + 1]);
        if (token !== this.speakToken) return; // interrupted or ended
        const buffer = await this.decode(audio);
        if (token !== this.speakToken) return;
        await this.play(buffer);
        if (token !== this.speakToken) return;
      }
    } catch {
      // The text is already on screen; voice chat simply carries on.
      if (token !== this.speakToken) return;
    }
    onDone();
  }

  play(buffer: AudioBuffer): Promise<void> {
    return new Promise((resolve) => {
      const ctx = this.ctx;
      if (!ctx) {
        resolve();
        return;
      }
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => {
        if (this.source === source) this.source = null;
        resolve();
      };
      this.source = source;
      source.start();
    });
  }

  stopSpeaking() {
    this.speakToken++;
    if (this.source) {
      try {
        this.source.stop();
      } catch {
        // already stopped
      }
      this.source = null;
    }
    this.activeStream?.voiceStopped(); // a streamed reply shows its full text
  }

  orbClick() {
    if (this.state === "speaking") {
      // Interrupt the reply and listen.
      this.stopSpeaking();
      this.startListening();
    } else if (this.state === "listening") {
      // "I'm done talking."
      if (this.voicedMs > 0 || !this.meterRunning()) this.finishTurn();
    } else if (this.state === "paused") {
      // e.g. say "cancel" instead of picking a slot
      this.startListening();
    }
  }

  toggleMute() {
    if (this.state === "muted") {
      this.lastActivityAt = Date.now();
      this.startListening();
    } else if (this.state === "listening") {
      this.stopTurnRecorder(true);
      this.setState("muted");
    }
  }

  end(message?: string) {
    if (!this.on) return;
    this.stopSpeaking();
    this.stopTurnRecorder(true);
    clearInterval(this.meterTimer);
    this.meterTimer = undefined;
    this.stream?.getTracks().forEach((track) => track.stop()); // turns off the browser's mic indicator
    this.stream = null;
    this.ctx?.close().catch(() => {});
    this.ctx = null;
    this.analyser = null;
    this.recorder = null;
    this.setState("off");
    if (message) this.cb.error(message);
  }
}

/** Sentence-sized chunks of at most `maxChars`, cutting an overlong sentence at a space. */
export function splitForSpeech(text: string, maxChars: number): string[] {
  const sentences = text.match(/[^.!?]+[.!?]*\s*/g) ?? [text];
  const chunks: string[] = [];
  let current = "";
  for (let sentence of sentences) {
    while (sentence.length > maxChars) {
      const space = sentence.lastIndexOf(" ", maxChars);
      const cut = space > 0 ? space : maxChars;
      if (current.trim()) chunks.push(current.trim());
      current = "";
      chunks.push(sentence.slice(0, cut).trim());
      sentence = sentence.slice(cut);
    }
    if ((current + sentence).length > maxChars && current.trim()) {
      chunks.push(current.trim());
      current = "";
    }
    current += sentence;
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter(Boolean);
}

/* ============================================================
   Streamed replies
   ============================================================ */

/**
 * End index (exclusive) of the next complete sentence in text[from..], or -1.
 * Never ends inside a Markdown link, and "Node.js" or "5.5" are not sentence ends.
 */
export function nextSentenceEnd(text: string, from: number, final: boolean): number {
  let depth = 0;
  let inUrl = false;
  for (let i = from; i < text.length; i++) {
    const ch = text[i];
    if (inUrl) {
      if (ch === ")") inUrl = false;
      continue;
    }
    if (ch === "[") {
      depth++;
      continue;
    }
    if (ch === "]") {
      depth = Math.max(0, depth - 1);
      if (text[i + 1] === "(") {
        inUrl = true;
        i++;
      }
      continue;
    }
    if (depth > 0) continue;
    const boundary = ch === "\n" || (".!?".includes(ch) && i + 1 < text.length && /\s/.test(text[i + 1]));
    if (boundary && text.slice(from, i + 1).replace(/\s+/g, " ").trim().length >= STREAM_MIN_SENTENCE_CHARS) {
      return i + 1;
    }
  }
  return final && text.slice(from).trim() ? text.length : -1;
}

/**
 * Where in text[start..end) a caption may stop: after each word, never inside
 * a link or bold span (they'd flash as raw Markdown). Always ends at `end`.
 */
export function revealStops(text: string, start: number, end: number): number[] {
  const segment = text.slice(start, end);
  const atomic = [...segment.matchAll(/\[[^\]]*\]\([^)]*\)|\*\*[^*]+\*\*/g)].map(
    (m) => [m.index!, m.index! + m[0].length] as const,
  );
  // A phone number is spoken as one phrase ("the number in the chat"), so it is captioned in one go too.
  for (const m of segment.matchAll(SPOKEN_PHONE_RE)) {
    if (isPhoneNumber(m[0])) atomic.push([m.index!, m.index! + m[0].length]);
  }
  const stops: number[] = [];
  for (const m of segment.matchAll(/\S+/g)) {
    const pos = m.index! + m[0].length;
    if (!atomic.some(([s, e]) => pos > s && pos < e)) stops.push(start + pos);
  }
  if (stops[stops.length - 1] !== end) stops.push(end);
  return stops;
}

const CAPTION_FRAME_S = 0.02; // audio is analysed in 20 ms frames
const CAPTION_MIN_PAUSE_S = 0.15; // a silence this long separates two spoken phrases
const CAPTION_LOUDNESS = 0.06; // a frame is speech above 6% of the clip's loudest
const CAPTION_MID_PHRASE_COST = 0.004; // discourages a pause where the text has no punctuation

/**
 * When (seconds into the clip) each word starts being spoken. The clip is cut
 * into its spoken phrases at real silences, the words are matched to those
 * phrases in order (preferring breaks at punctuation), and each phrase's time
 * is shared out by its words' spoken length. `weights`: letters spoken per
 * word; `pauseAfter`: the word ends in punctuation.
 */
export function captionTimes(weights: number[], pauseAfter: boolean[], samples: Float32Array, sampleRate: number): number[] {
  const n = weights.length;
  const duration = samples.length / sampleRate;
  const evenly = () => weights.map((_, i) => (i * duration) / n);
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  if (!n || !totalWeight) return evenly();

  const frame = Math.max(1, Math.round(sampleRate * CAPTION_FRAME_S));
  const levels: number[] = [];
  let loudest = 0;
  for (let i = 0; i + frame <= samples.length; i += frame) {
    let peak = 0;
    for (let j = i; j < i + frame; j++) {
      const v = Math.abs(samples[j]);
      if (v > peak) peak = v;
    }
    levels.push(peak);
    if (peak > loudest) loudest = peak;
  }
  if (!loudest) return evenly();

  const minGap = Math.round(CAPTION_MIN_PAUSE_S / CAPTION_FRAME_S);
  const spans: [number, number][] = [];
  let start = -1;
  let last = -1;
  levels.forEach((level, f) => {
    if (level <= loudest * CAPTION_LOUDNESS) return;
    if (start < 0) start = f;
    else if (f - last > minGap) {
      spans.push([start, last + 1]);
      start = f;
    }
    last = f;
  });
  if (start >= 0) spans.push([start, last + 1]);
  const spokenWords = weights.filter((w) => w > 0).length;
  while (spans.length > spokenWords) {
    // More pauses than words: close the shortest gap.
    let best = 0;
    for (let k = 1; k < spans.length - 1; k++) {
      if (spans[k + 1][0] - spans[k][1] < spans[best + 1][0] - spans[best][1]) best = k;
    }
    spans.splice(best, 2, [spans[best][0], spans[best + 1][1]]);
  }
  const S = spans.length;
  if (!S) return evenly();
  const spokenTotal = spans.reduce((a, [s0, s1]) => a + (s1 - s0), 0);

  // dp[k][b] = best cost of putting words 0..b-1 into phrases 0..k
  const prefix = [0];
  weights.forEach((w) => prefix.push(prefix[prefix.length - 1] + w));
  const dp = Array.from({ length: S }, () => new Array<number>(n + 1).fill(Infinity));
  const from = Array.from({ length: S }, () => new Array<number>(n + 1).fill(-1));
  const cost = (k: number, a: number, b: number) => {
    const groupWeight = prefix[b] - prefix[a];
    if (!groupWeight) return Infinity; // every phrase must contain something spoken
    const share = groupWeight / totalWeight - (spans[k][1] - spans[k][0]) / spokenTotal;
    const midPhrase = b < n && !pauseAfter[b - 1] ? CAPTION_MID_PHRASE_COST : 0;
    return share * share + midPhrase;
  };
  for (let b = 1; b <= n; b++) dp[0][b] = cost(0, 0, b);
  for (let k = 1; k < S; k++) {
    for (let b = k + 1; b <= n; b++) {
      for (let a = k; a < b; a++) {
        const c = dp[k - 1][a] + cost(k, a, b);
        if (c < dp[k][b]) {
          dp[k][b] = c;
          from[k][b] = a;
        }
      }
    }
  }
  if (!Number.isFinite(dp[S - 1][n])) return evenly();

  const bounds = new Array<number>(S + 1);
  bounds[S] = n;
  for (let k = S - 1; k > 0; k--) bounds[k] = from[k][bounds[k + 1]];
  bounds[0] = 0;

  const times = new Array<number>(n);
  for (let k = 0; k < S; k++) {
    const [s0, s1] = spans[k];
    const a = bounds[k];
    const b = bounds[k + 1];
    const groupWeight = prefix[b] - prefix[a];
    for (let i = a; i < b; i++) {
      const before = (prefix[i] - prefix[a]) / groupWeight;
      times[i] = (s0 + before * (s1 - s0)) * CAPTION_FRAME_S;
    }
  }
  return times;
}

type StreamItem = { start: number; end: number; audio: Promise<AudioBuffer | null> | null };

/**
 * One streamed answer. Typed chat shows the text as it arrives; in voice chat
 * each finished sentence goes to /speak at once and its words appear as they
 * are spoken. `finish()` takes the authoritative final text.
 *
 * `show(markdown)` updates the reply bubble (`null` = the typing dots);
 * `done()` hands the bubble over to the final message.
 */
export class ReplyStream {
  private raw = "";
  private finalText: string | null = null;
  private renderPending = false;
  private voice: boolean;
  private readonly startedVoice: boolean;
  private readonly token: number;
  private mismatch = false;
  private items: StreamItem[] = [];
  private queuedTo = 0;
  private playIndex = 0;
  private playing = false;
  private shownFirst = false;
  private finished = false;

  constructor(
    private readonly vc: VoiceChat,
    private readonly show: (markdown: string | null) => void,
    private readonly done: () => void,
  ) {
    this.voice = vc.on;
    this.startedVoice = vc.on;
    this.token = vc.speakToken;
    vc.activeStream = this;
  }

  private voiceActive() {
    return this.voice && this.vc.on && this.vc.speakToken === this.token;
  }

  private complete() {
    if (this.finished) return;
    this.finished = true;
    if (this.vc.activeStream === this) this.vc.activeStream = null;
    this.done();
  }

  onDelta = (text: string) => {
    if (!text) return;
    this.raw += text;
    if (this.voiceActive()) {
      this.queueSentences(false);
    } else if (!this.renderPending) {
      this.renderPending = true;
      requestAnimationFrame(() => {
        this.renderPending = false;
        if (!this.voiceActive() && this.finalText === null && !this.finished) this.show(this.raw);
      });
    }
  };

  hasText() {
    return this.raw !== "";
  }

  /** True when this stream did the speaking, so the reply mustn't be spoken again. */
  ownsVoice() {
    return this.startedVoice && this.raw !== "" && !this.mismatch;
  }

  finish(finalText: string) {
    this.finalText = finalText;
    const streamed = this.raw.replace(/\s+/g, " ").trim();
    const consistent = finalText.replace(/\s+/g, " ").trim().startsWith(streamed);
    if (this.voiceActive() && !consistent) {
      // e.g. replaced by an outage message: show it, and let the caller speak it whole.
      this.mismatch = true;
      this.vc.stopSpeaking();
    }
    if (this.voiceActive()) {
      this.queueSentences(true);
      if (!this.playing) {
        this.complete();
        this.vc.startListening();
      }
    } else {
      this.complete();
    }
  }

  /** The request failed: drop the partial answer (an error replaces it). */
  discard() {
    this.voice = false;
    this.complete();
  }

  /** Speech was stopped (interrupt, End, a new message): show the text in full. */
  voiceStopped() {
    if (!this.voice) return;
    this.voice = false;
    if (this.finalText !== null) this.complete();
    else if (this.raw) this.show(this.raw);
  }

  private queueSentences(final: boolean) {
    let end: number;
    while ((end = nextSentenceEnd(this.raw, this.queuedTo, final)) > 0) {
      this.items.push({ start: this.queuedTo, end, audio: null });
      this.queuedTo = end;
    }
    this.pump();
  }

  private pump() {
    // Audio for the playing sentence and the next one only, so an interruption wastes little.
    for (let i = this.playIndex; i < Math.min(this.items.length, this.playIndex + 2); i++) {
      const item = this.items[i];
      if (item.audio) continue;
      const text = spokenText(this.raw.slice(item.start, item.end));
      item.audio = text
        ? this.vc
            .fetchSpeech(text)
            .then((buf) => this.vc.decode(buf))
            .catch(() => null) // still shown, just not spoken
        : Promise.resolve(null);
    }
    if (!this.playing && this.playIndex < this.items.length) void this.playLoop();
  }

  private async playLoop() {
    this.playing = true;
    while (this.playIndex < this.items.length) {
      const item = this.items[this.playIndex];
      this.pump();
      const buffer = await item.audio;
      if (!this.voiceActive()) return;
      if (!this.shownFirst) {
        this.shownFirst = true;
        this.vc.markSpeaking();
      }
      if (buffer) {
        const played = this.vc.play(buffer); // the sound starts now
        this.revealOver(item, buffer);
        await played;
        if (!this.voiceActive()) return;
      }
      this.show(this.raw.slice(0, item.end));
      this.playIndex++;
    }
    this.playing = false;
    if (this.finalText !== null) {
      this.complete();
      this.vc.startListening();
    }
  }

  /**
   * Caption the sentence in step with its audio: each word appears when it is
   * actually spoken, using the clip's real pauses and the audio clock.
   */
  private revealOver(item: StreamItem, buffer: AudioBuffer) {
    const ctx = this.vc.ctx;
    if (!ctx) return;
    const stops = revealStops(this.raw, item.start, item.end);
    let previous = item.start;
    const words = stops.map((stop) => {
      const piece = this.raw.slice(previous, stop);
      previous = stop;
      return piece;
    });
    // Weight = how much is actually said: a link counts as "the link in the chat", not its URL.
    const weights = words.map((word) => spokenText(word).replace(/[^\p{L}\p{N}]/gu, "").length);
    const pauseAfter = words.map((word) => /[,.;:!?]["')\]*_]*\s*$/.test(word));
    const times = captionTimes(weights, pauseAfter, buffer.getChannelData(0), buffer.sampleRate);
    const startedAt = ctx.currentTime + (ctx.outputLatency || 0); // when the sound reaches the ears

    let shown = -1;
    const tick = () => {
      if (!this.voiceActive() || this.items[this.playIndex] !== item || !this.vc.ctx) return;
      const heard = this.vc.ctx.currentTime - startedAt;
      let upTo = shown;
      while (upTo + 1 < stops.length && times[upTo + 1] <= heard) upTo++;
      if (upTo > shown) {
        shown = upTo;
        this.show(this.raw.slice(0, stops[upTo]));
      }
      if (shown < stops.length - 1) requestAnimationFrame(tick);
    };
    tick();
  }
}
