import 'server-only';
import type { JSONContent } from '@tiptap/core';
import { renderTipTapToHtml, contentStats, deriveExcerpt } from './render';
import type { ContentStatus } from '@/generated/prisma/enums';
import type { Role } from '../auth/tokens';

// Shared logic for post + page writes.

/** EDITORs may only modify their own content; ADMINs modify anything. */
export function canModifyContent(session: { role: Role; sub: string }, authorId: string): boolean {
  return session.role === 'ADMIN' || session.sub === authorId;
}

export interface RenderedContent {
  contentHtml: string;
  wordCount: number;
  readingTimeMinutes: number;
  excerpt: string | null;
}

export function renderContent(contentJson: JSONContent, providedExcerpt?: string | null): RenderedContent {
  const contentHtml = renderTipTapToHtml(contentJson);
  const { wordCount, readingTimeMinutes } = contentStats(contentHtml);
  const excerpt =
    providedExcerpt && providedExcerpt.trim()
      ? providedExcerpt.trim()
      : contentHtml
        ? deriveExcerpt(contentHtml)
        : null;
  return { contentHtml, wordCount, readingTimeMinutes, excerpt };
}

export interface PublishState {
  status: ContentStatus;
  publishedAt: Date | null;
}

/**
 * Normalise (status, publishedAt): PUBLISHED gets a timestamp (now if absent),
 * SCHEDULED requires a future timestamp, DRAFT keeps whatever is set.
 */
export function resolvePublishState(
  status: ContentStatus,
  publishedAtInput: string | null | undefined,
  currentPublishedAt: Date | null,
): { ok: true; value: PublishState } | { ok: false; error: string } {
  let publishedAt: Date | null = currentPublishedAt;

  if (publishedAtInput !== undefined) {
    if (publishedAtInput === null || publishedAtInput === '') {
      publishedAt = null;
    } else {
      const d = new Date(publishedAtInput);
      if (Number.isNaN(d.getTime())) return { ok: false, error: 'Invalid publish date.' };
      publishedAt = d;
    }
  }

  if (status === 'PUBLISHED') {
    if (!publishedAt) publishedAt = new Date();
  } else if (status === 'SCHEDULED') {
    if (!publishedAt || publishedAt.getTime() <= Date.now()) {
      return { ok: false, error: 'Scheduled content needs a future publish date.' };
    }
  }

  return { ok: true, value: { status, publishedAt } };
}

export const MAX_REVISIONS = 20;
