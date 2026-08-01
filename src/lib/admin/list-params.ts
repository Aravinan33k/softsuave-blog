// Parsing and validation of admin list-table URL state (pagination, search,
// filters, sorting). Pure and framework-agnostic so it is trivially testable;
// the server list pages and the toolbar/pagination components share it.

export type SortDir = 'asc' | 'desc';

export interface ListParams {
  page: number;
  perPage: number;
  q: string;
  sort: string;
  dir: SortDir;
  /** Filter key → value; only non-empty values are kept. */
  filters: Record<string, string>;
}

export type RawSearchParams = Record<string, string | string[] | undefined>;

interface ParseOptions {
  /** Whitelisted sort fields — anything else falls back to defaultSort. */
  sortFields: string[];
  defaultSort: string;
  defaultDir?: SortDir;
  /** URL keys treated as filters (e.g. ['status', 'category']). */
  filterKeys?: string[];
  perPage?: number;
}

function first(v: string | string[] | undefined): string {
  return (Array.isArray(v) ? v[0] : v) ?? '';
}

export function parseListParams(sp: RawSearchParams, opts: ParseOptions): ListParams {
  const page = Math.max(1, Number.parseInt(first(sp.page), 10) || 1);
  const q = first(sp.q).trim().slice(0, 100);
  const rawSort = first(sp.sort);
  const sort = opts.sortFields.includes(rawSort) ? rawSort : opts.defaultSort;
  const rawDir = first(sp.dir);
  const dir: SortDir = rawDir === 'asc' || rawDir === 'desc' ? rawDir : (opts.defaultDir ?? 'desc');
  const filters: Record<string, string> = {};
  for (const key of opts.filterKeys ?? []) {
    const v = first(sp[key]).trim();
    if (v) filters[key] = v.slice(0, 100);
  }
  return { page, perPage: opts.perPage ?? 20, q, sort, dir, filters };
}

/**
 * Builds a query string that preserves the current list state. `sort`/`dir` are
 * always included (explicit state); `page` is omitted for page 1; overrides let
 * callers produce sort-toggle or page links.
 */
export function buildQuery(params: ListParams, overrides: { page?: number; sort?: string; dir?: SortDir } = {}): string {
  const sp = new URLSearchParams();
  if (params.q) sp.set('q', params.q);
  for (const [k, v] of Object.entries(params.filters)) {
    if (v) sp.set(k, v);
  }
  sp.set('sort', overrides.sort ?? params.sort);
  sp.set('dir', overrides.dir ?? params.dir);
  const page = overrides.page ?? params.page;
  if (page > 1) sp.set('page', String(page));
  const s = sp.toString();
  return s ? `?${s}` : '';
}
