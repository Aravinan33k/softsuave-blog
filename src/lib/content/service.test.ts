import { describe, it, expect } from 'vitest';
import { resolvePublishState, canModifyContent } from './service';

describe('resolvePublishState', () => {
  it('PUBLISHED sets now when no date given', () => {
    const r = resolvePublishState('PUBLISHED', undefined, null);
    expect(r.ok && r.value.publishedAt).toBeTruthy();
  });
  it('SCHEDULED rejects a past date', () => {
    expect(resolvePublishState('SCHEDULED', '2000-01-01T00:00:00Z', null).ok).toBe(false);
  });
  it('SCHEDULED accepts a future date', () => {
    expect(resolvePublishState('SCHEDULED', '2999-01-01T00:00:00Z', null).ok).toBe(true);
  });
  it('DRAFT keeps publishedAt null', () => {
    const r = resolvePublishState('DRAFT', undefined, null);
    expect(r.ok && r.value.publishedAt).toBeNull();
  });
  it('rejects an invalid date', () => {
    expect(resolvePublishState('PUBLISHED', 'not-a-date', null).ok).toBe(false);
  });
});

describe('canModifyContent', () => {
  it('ADMIN can modify anything', () => {
    expect(canModifyContent({ role: 'ADMIN', sub: 'a' }, 'b')).toBe(true);
  });
  it('EDITOR can modify only their own', () => {
    expect(canModifyContent({ role: 'EDITOR', sub: 'a' }, 'a')).toBe(true);
    expect(canModifyContent({ role: 'EDITOR', sub: 'a' }, 'b')).toBe(false);
  });
});
