import { Fragment, type ReactNode } from "react";
import { isExternalHref } from "@/themes/softsuave/nav-data";

/**
 * The assistant answers in Markdown, which softsuave.com's widget renders with
 * `marked` straight into innerHTML. This is a small CommonMark/GFM subset that
 * builds React elements instead — no HTML string ever reaches the page, so a
 * reply can't inject markup. It covers what the assistant writes: paragraphs,
 * headings, lists (nested), quotes, code, bold/italic/strikethrough, links,
 * bare URLs and emails, and the `<br>` its booking prompts use.
 *
 * The same tree also yields the text voice chat reads aloud (`spokenText`).
 */

export type Inline =
  | { t: "text"; v: string }
  | { t: "strong" | "em" | "del"; c: Inline[] }
  | { t: "code"; v: string }
  | { t: "link"; href: string; c: Inline[] }
  | { t: "br" };

export type Block =
  | { t: "p"; c: Inline[] }
  | { t: "h"; level: number; c: Inline[] }
  | { t: "list"; ordered: boolean; start: number; items: Block[][] }
  | { t: "quote"; c: Block[] }
  | { t: "pre"; v: string }
  | { t: "hr" };

const LIST_ITEM = /^(\s*)([-*+•]|\d{1,9}[.)])\s+(.*)$/;
const HEADING = /^ {0,3}(#{1,6})\s+(.*?)\s*#*\s*$/;
const RULE = /^ {0,3}([-*_])(?:\s*\1){2,}\s*$/;
const FENCE = /^ {0,3}(```|~~~)/;
const QUOTE = /^ {0,3}>\s?(.*)$/;

export function parseMarkdown(source: string): Block[] {
  const lines = source.replace(/\r\n?/g, "\n").split("\n");
  return parseBlocks(lines);
}

function parseBlocks(lines: string[]): Block[] {
  const blocks: Block[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    const fence = FENCE.exec(line);
    if (fence) {
      const body: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trimStart().startsWith(fence[1])) body.push(lines[i++]);
      i++;
      blocks.push({ t: "pre", v: body.join("\n") });
      continue;
    }
    const heading = HEADING.exec(line);
    if (heading) {
      blocks.push({ t: "h", level: heading[1].length, c: parseInline(heading[2]) });
      i++;
      continue;
    }
    if (RULE.test(line)) {
      blocks.push({ t: "hr" });
      i++;
      continue;
    }
    if (QUOTE.test(line)) {
      const body: string[] = [];
      while (i < lines.length && lines[i].trim() && QUOTE.test(lines[i])) body.push(QUOTE.exec(lines[i])![1]);
      blocks.push({ t: "quote", c: parseBlocks(body) });
      continue;
    }
    if (LIST_ITEM.test(line)) {
      const [list, next] = parseList(lines, i);
      blocks.push(list);
      i = next;
      continue;
    }
    const para: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !(para.length && (HEADING.test(lines[i]) || FENCE.test(lines[i]) || QUOTE.test(lines[i]) || LIST_ITEM.test(lines[i])))
    ) {
      para.push(lines[i++]);
    }
    blocks.push({ t: "p", c: parseInline(para.join("\n")) });
  }
  return blocks;
}

function indentOf(line: string) {
  return line.length - line.trimStart().length;
}

/** A run of list items starting at `start`; returns the list and the next line index. */
function parseList(lines: string[], start: number): [Block, number] {
  const first = LIST_ITEM.exec(lines[start])!;
  const baseIndent = first[1].length;
  const ordered = /\d/.test(first[2]);
  const items: Block[][] = [];
  let i = start;
  while (i < lines.length) {
    const m = LIST_ITEM.exec(lines[i]);
    if (!m || m[1].length !== baseIndent || /\d/.test(m[2]) !== ordered) break;
    const body = [m[3]];
    i++;
    // The item's own continuation: deeper-indented lines (nested lists included)
    // and, until a blank line, lazy continuation text.
    while (i < lines.length) {
      const next = lines[i];
      if (!next.trim()) {
        const after = lines.slice(i + 1).find((l) => l.trim());
        if (after !== undefined && indentOf(after) > baseIndent) {
          body.push("");
          i++;
          continue;
        }
        break;
      }
      const nextItem = LIST_ITEM.exec(next);
      if (nextItem && nextItem[1].length <= baseIndent) break;
      if (!nextItem && indentOf(next) <= baseIndent && body[body.length - 1] === "") break;
      body.push(next.slice(Math.min(indentOf(next), baseIndent + 2)));
      i++;
    }
    items.push(parseBlocks(body));
    // A blank line between items keeps the list going.
    if (i < lines.length && !lines[i].trim()) {
      const after = lines.slice(i + 1).findIndex((l) => l.trim());
      const nextLine = after >= 0 ? lines[i + 1 + after] : undefined;
      const m2 = nextLine ? LIST_ITEM.exec(nextLine) : null;
      if (m2 && m2[1].length === baseIndent && /\d/.test(m2[2]) === ordered) i = i + 1 + after;
    }
  }
  return [{ t: "list", ordered, start: ordered ? parseInt(first[2], 10) || 1 : 1, items }, i];
}

/* ---------- inline ---------- */

// Sticky (`y`): each matches only at `lastIndex`, so no slice of the rest is made per character.
const URL_START = /(?:https?:\/\/|www\.)[^\s<]+/iy;
const EMAIL = /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/y;
const BR_TAG = /<br\s*\/?>/iy;
const AUTOLINK = /<((?:https?:\/\/|mailto:)[^\s>]+)>/iy;

function stickyMatch(re: RegExp, src: string, at: number): RegExpExecArray | null {
  re.lastIndex = at;
  return re.exec(src);
}

function isWordChar(ch: string | undefined) {
  return !!ch && /[\p{L}\p{N}]/u.test(ch);
}

/** Trailing punctuation that ends a sentence, not the URL (GFM's rule, simplified). */
function trimUrl(url: string): string {
  let out = url.replace(/[.,:;!?'"*_~]+$/, "");
  while (out.endsWith(")") && (out.match(/\(/g)?.length ?? 0) < (out.match(/\)/g)?.length ?? 0)) out = out.slice(0, -1);
  return out;
}

export function parseInline(src: string): Inline[] {
  const out: Inline[] = [];
  let text = "";
  const flush = () => {
    if (text) out.push({ t: "text", v: text });
    text = "";
  };
  let i = 0;
  while (i < src.length) {
    const ch = src[i];
    const prev = src[i - 1];

    if (ch === "\\" && i + 1 < src.length && /[!-/:-@[-`{-~]/.test(src[i + 1])) {
      text += src[i + 1];
      i += 2;
      continue;
    }
    if (ch === "\n") {
      // Two trailing spaces (or a backslash) make a hard break; otherwise a space, as in Markdown.
      if (text.endsWith("  ")) {
        text = text.replace(/ +$/, "");
        flush();
        out.push({ t: "br" });
      } else {
        text = text.replace(/ +$/, "") + " ";
      }
      i++;
      continue;
    }
    const br = ch === "<" ? stickyMatch(BR_TAG, src, i) : null;
    if (br) {
      text = text.replace(/ +$/, "");
      flush();
      out.push({ t: "br" });
      i += br[0].length;
      while (src[i] === " ") i++;
      continue;
    }
    if (ch === "`") {
      const end = src.indexOf("`", i + 1);
      if (end > i + 1) {
        flush();
        out.push({ t: "code", v: src.slice(i + 1, end) });
        i = end + 1;
        continue;
      }
    }
    if (ch === "[") {
      const link = matchLink(src, i);
      if (link) {
        flush();
        out.push(link.href ? { t: "link", href: link.href, c: parseInline(link.label) } : { t: "text", v: link.label });
        i = link.end;
        continue;
      }
    }
    if (ch === "<") {
      const auto = stickyMatch(AUTOLINK, src, i);
      if (auto) {
        flush();
        out.push({ t: "link", href: auto[1], c: [{ t: "text", v: auto[1].replace(/^mailto:/i, "") }] });
        i += auto[0].length;
        continue;
      }
    }
    if ((ch === "h" || ch === "H" || ch === "w" || ch === "W") && !isWordChar(prev)) {
      const url = stickyMatch(URL_START, src, i);
      if (url) {
        const raw = trimUrl(url[0]);
        flush();
        out.push({ t: "link", href: /^www\./i.test(raw) ? `https://${raw}` : raw, c: [{ t: "text", v: raw }] });
        i += raw.length;
        continue;
      }
    }
    if (isWordChar(ch) && !isWordChar(prev) && prev !== "@" && prev !== ".") {
      const email = stickyMatch(EMAIL, src, i);
      if (email) {
        flush();
        out.push({ t: "link", href: `mailto:${email[0]}`, c: [{ t: "text", v: email[0] }] });
        i += email[0].length;
        continue;
      }
    }
    if (ch === "*" || ch === "_" || ch === "~") {
      const span = matchEmphasis(src, i);
      if (span) {
        flush();
        out.push({ t: span.type, c: parseInline(span.inner) });
        i = span.end;
        continue;
      }
    }
    text += ch;
    i++;
  }
  flush();
  return out;
}

function matchLink(src: string, start: number): { label: string; href: string | null; end: number } | null {
  let depth = 0;
  let close = -1;
  for (let j = start; j < src.length; j++) {
    if (src[j] === "\\") {
      j++;
      continue;
    }
    if (src[j] === "[") depth++;
    else if (src[j] === "]" && --depth === 0) {
      close = j;
      break;
    }
  }
  if (close < 0 || src[close + 1] !== "(") return null;
  let parens = 0;
  let end = -1;
  for (let j = close + 1; j < src.length; j++) {
    if (src[j] === "(") parens++;
    else if (src[j] === ")" && --parens === 0) {
      end = j;
      break;
    }
  }
  if (end < 0) return null;
  const target = src.slice(close + 2, end).trim().replace(/\s+"[^"]*"$/, "").replace(/^<|>$/g, "");
  return { label: src.slice(start + 1, close), href: safeHref(target), end: end + 1 };
}

/** Only web, mail and phone links, and this site's own paths. */
export function safeHref(target: string): string | null {
  if (/^(https?:|mailto:|tel:)/i.test(target)) return target;
  if (/^www\./i.test(target)) return `https://${target}`;
  if (target.startsWith("/") && !target.startsWith("//")) return target;
  return null;
}

function matchEmphasis(src: string, start: number): { type: "strong" | "em" | "del"; inner: string; end: number } | null {
  const ch = src[start];
  const double = src[start + 1] === ch;
  if (ch === "~" && !double) return null;
  const marker = double ? ch + ch : ch;
  const type = ch === "~" ? "del" : double ? "strong" : "em";
  const open = start + marker.length;
  if (!src[open] || /\s/.test(src[open])) return null;
  // `_` only emphasises at word edges, so snake_case and edit_name stay intact.
  if (ch === "_" && isWordChar(src[start - 1])) return null;
  let from = open;
  for (;;) {
    const close = src.indexOf(marker, from);
    if (close < 0) return null;
    const before = src[close - 1];
    const after = src[close + marker.length];
    const tripled = !double && src[close + 1] === ch; // `*` inside `**`
    if (close > open && !/\s/.test(before) && !tripled && !(ch === "_" && isWordChar(after))) {
      return { type, inner: src.slice(open, close), end: close + marker.length };
    }
    from = close + (tripled ? 2 : 1);
  }
}

/* ---------- React ---------- */

/**
 * softsuave.com links to a page this app serves become this app's own path, so
 * an answer never sends a visitor back to the old site for a page that exists here.
 */
function resolveHref(href: string): string {
  const m = /^https?:\/\/(?:www\.)?softsuave\.com(\/[^?#]*)?([?#].*)?$/i.exec(href);
  if (!m) return href;
  const path = (m[1] || "/").replace(/(.)\/$/, "$1");
  return isExternalHref(path) ? href : path + (m[2] ?? "");
}

export function Markdown({ text, linkClassName }: { text: string; linkClassName?: string }) {
  return <>{parseMarkdown(text).map((b, i) => renderBlock(b, i, linkClassName))}</>;
}

function renderBlock(block: Block, key: number, link?: string): ReactNode {
  switch (block.t) {
    case "p":
      return <p key={key}>{renderInline(block.c, link)}</p>;
    case "h":
      return <p key={key}><strong>{renderInline(block.c, link)}</strong></p>;
    case "list": {
      const items = block.items.map((item, i) => <li key={i}>{renderItem(item, link)}</li>);
      return block.ordered ? <ol key={key} start={block.start}>{items}</ol> : <ul key={key}>{items}</ul>;
    }
    case "quote":
      return <blockquote key={key}>{block.c.map((b, i) => renderBlock(b, i, link))}</blockquote>;
    case "pre":
      return <pre key={key}><code>{block.v}</code></pre>;
    case "hr":
      return <hr key={key} />;
  }
}

/** A tight list item's single paragraph renders as bare text, as Markdown does. */
function renderItem(blocks: Block[], link?: string): ReactNode {
  if (blocks.length === 1 && blocks[0].t === "p") return renderInline(blocks[0].c, link);
  return blocks.map((b, i) => renderBlock(b, i, link));
}

function renderInline(nodes: Inline[], link?: string): ReactNode {
  return nodes.map((n, i) => {
    switch (n.t) {
      case "text":
        return <Fragment key={i}>{n.v}</Fragment>;
      case "br":
        return <br key={i} />;
      case "code":
        return <code key={i}>{n.v}</code>;
      case "strong":
        return <strong key={i}>{renderInline(n.c, link)}</strong>;
      case "em":
        return <em key={i}>{renderInline(n.c, link)}</em>;
      case "del":
        return <del key={i}>{renderInline(n.c, link)}</del>;
      case "link":
        return (
          <a key={i} href={resolveHref(n.href)} target="_blank" rel="noopener noreferrer" className={link}>
            {renderInline(n.c, link)}
          </a>
        );
    }
  });
}

/* ---------- speech ---------- */

const SPOKEN_PHONE = /(?:\+ ?)?\(?\d[\d ().-]{6,}\d/g;
const SPOKEN_EMAIL = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;

/** A phone number has 10+ digits (8+ after a "+"); years, prices and ranges don't. */
export function isPhoneNumber(text: string): boolean {
  const digits = text.replace(/\D/g, "").length;
  return digits >= 10 || (digits >= 8 && text.trim().startsWith("+"));
}

export const SPOKEN_PHONE_RE = SPOKEN_PHONE;

/** Numbers and addresses are on screen; reading them out character by character helps no one. */
export function speakableText(text: string): string {
  return text
    .replace(SPOKEN_EMAIL, "the email address in the chat")
    .replace(SPOKEN_PHONE, (match) => (isPhoneNumber(match) ? "the number in the chat" : match));
}

/** A reply as it should be heard: links become "the link in the chat", and so on. */
export function spokenText(markdown: string): string {
  const parts: string[] = [];
  const inline = (nodes: Inline[]) => {
    for (const n of nodes) {
      if (n.t === "text" || n.t === "code") parts.push(n.v);
      else if (n.t === "br") parts.push(" ");
      else if (n.t === "link") {
        const href = n.href.toLowerCase();
        parts.push(href.startsWith("tel:") ? "the number in the chat" : href.startsWith("mailto:") ? "the email address in the chat" : "the link in the chat");
      } else inline(n.c);
    }
  };
  const block = (b: Block) => {
    if (b.t === "p" || b.t === "h") inline(b.c);
    else if (b.t === "list") b.items.forEach((item) => item.forEach(block));
    else if (b.t === "quote") b.c.forEach(block);
    else if (b.t === "pre") parts.push(b.v);
    parts.push(" ");
  };
  parseMarkdown(markdown).forEach(block);
  return speakableText(parts.join("").replace(/\s+/g, " ").trim());
}

/* ---------- the visitor's own messages ---------- */

/**
 * A visitor's message is shown as typed, with its links, URLs, phone numbers
 * and email addresses made clickable — the live widget's `formatMessage`.
 */
export function UserText({ text, linkClassName }: { text: string; linkClassName?: string }) {
  const pattern =
    /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?\d{1,4}[\s-]?\(?\d{2,3}\)?[\s-]?\d{3,4}[\s-]?\d{4})/g;
  const out: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const [whole, label, labelUrl, url, email, phone] = m;
    const href = labelUrl ?? (url ? trimUrl(url) : email ? `mailto:${email}` : `tel:${phone?.replace(/[\s()-]/g, "")}`);
    const shown = label ?? (url ? trimUrl(url) : (email ?? phone ?? whole));
    out.push(
      <a key={m.index} href={href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
        {shown}
      </a>,
    );
    last = m.index + (url ? trimUrl(url).length : whole.length);
    pattern.lastIndex = last;
  }
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
