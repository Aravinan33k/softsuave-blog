import { describe, it, expect } from 'vitest';
import { parseListParams, buildQuery, type ListParams } from './list-params';

const OPTS = { sortFields: ['title', 'updated'], defaultSort: 'updated', filterKeys: ['status', 'category'] };

describe('parseListParams', () => {
  it('applies defaults for empty params', () => {
    const p = parseListParams({}, OPTS);
    expect(p).toEqual({ page: 1, perPage: 20, q: '', sort: 'updated', dir: 'desc', filters: {} });
  });

  it('parses valid values', () => {
    const p = parseListParams({ page: '3', q: 'hello', sort: 'title', dir: 'asc', status: 'PUBLISHED', category: 'tech' }, OPTS);
    expect(p.page).toBe(3);
    expect(p.q).toBe('hello');
    expect(p.sort).toBe('title');
    expect(p.dir).toBe('asc');
    expect(p.filters).toEqual({ status: 'PUBLISHED', category: 'tech' });
  });

  it('clamps invalid page numbers to 1', () => {
    expect(parseListParams({ page: '-4' }, OPTS).page).toBe(1);
    expect(parseListParams({ page: 'abc' }, OPTS).page).toBe(1);
  });

  it('rejects non-whitelisted sort fields and bad directions', () => {
    const p = parseListParams({ sort: 'title;DROP TABLE', dir: 'sideways' }, OPTS);
    expect(p.sort).toBe('updated');
    expect(p.dir).toBe('desc');
  });

  it('takes the first value of array params and drops empty filters', () => {
    const p = parseListParams({ q: ['a', 'b'], status: '' }, OPTS);
    expect(p.q).toBe('a');
    expect(p.filters).toEqual({});
  });
});

describe('buildQuery', () => {
  const base: ListParams = { page: 2, perPage: 20, q: 'foo', sort: 'title', dir: 'asc', filters: { status: 'DRAFT' } };

  it('round-trips the current state', () => {
    expect(buildQuery(base)).toBe('?q=foo&status=DRAFT&sort=title&dir=asc&page=2');
  });

  it('omits page 1 (used when filters change)', () => {
    expect(buildQuery(base, { page: 1 })).toBe('?q=foo&status=DRAFT&sort=title&dir=asc');
  });

  it('supports sort-toggle overrides while preserving filters and page', () => {
    expect(buildQuery(base, { sort: 'updated', dir: 'desc' })).toBe('?q=foo&status=DRAFT&sort=updated&dir=desc&page=2');
  });

  it('drops empty values', () => {
    const p: ListParams = { ...base, q: '', filters: {} };
    expect(buildQuery(p, { page: 1 })).toBe('?sort=title&dir=asc');
  });
});
