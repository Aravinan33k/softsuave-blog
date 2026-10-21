import { describe, it, expect } from 'vitest';
import { toFulltextQuery } from './fulltext';

// SEARCH_MIN_TOKEN_SIZE is unset in vitest.config.ts, so the default of 3 applies.
const MIN = 3;

/** The query string alone, for the common case. */
function q(input: string): string | null {
  return toFulltextQuery(input).query;
}

describe('toFulltextQuery', () => {
  it('requires every term and adds a prefix wildcard for the stemming MySQL lacks', () => {
    // `+` = required (AND, matching websearch_to_tsquery's default), `*` recovers
    // "developers" from a search for "developer".
    expect(q('hire developer')).toBe('+hire* +developer*');
  });

  it('keeps a quoted phrase intact and unwildcarded', () => {
    expect(q('"staff augmentation"')).toBe('+"staff augmentation"');
  });

  it('combines phrases and loose words', () => {
    expect(q('"dedicated team" cost')).toBe('+"dedicated team" +cost*');
  });

  it('treats a negated term as an exclusion, without a wildcard', () => {
    // `-upwork*` would also exclude "upworked"/"upworking"; an exclusion should be
    // exactly as broad as the user typed.
    expect(q('hiring -upwork')).toBe('+hiring* -upwork');
  });

  it('demotes every term to optional when "or" is present', () => {
    expect(q('react or angular')).toBe('react* angular*');
  });

  describe('tokenisation matches how InnoDB indexed the text', () => {
    // InnoDB splits indexed text on non-word characters, so a hyphenated word is
    // stored as separate tokens. Deleting the hyphen instead would build a term
    // that exists nowhere in the index and match nothing.
    it('splits hyphenated words instead of joining them', () => {
      expect(q('front-end developer')).toBe('+front* +end* +developer*');
    });

    it('handles "e-commerce", dropping the unindexable single letter', () => {
      const r = toFulltextQuery('e-commerce');
      expect(r.query).toBe('+commerce*');
      expect(r.ignored).toEqual(['e']);
    });

    it('splits on dots too, so "node.js" is searchable', () => {
      const r = toFulltextQuery('node.js');
      expect(r.query).toBe('+node*');
      expect(r.ignored).toEqual(['js']);
    });

    it('keeps underscores and apostrophes, which InnoDB counts as word characters', () => {
      expect(q("don't")).toBe("+don't*");
      expect(q('some_id')).toBe('+some_id*');
    });

    it('keeps a negation attached when the excluded word is hyphenated', () => {
      expect(q('hiring -front-end')).toBe('+hiring* -front -end');
    });

    it('preserves non-ASCII words', () => {
      expect(q('développeur')).toBe('+développeur*');
    });
  });

  describe('hostile and malformed input', () => {
    // The point of these: MySQL raises a syntax error on a malformed BOOLEAN MODE
    // expression, so unescaped operators turn an ordinary search into a 500.
    it('splits on an embedded operator rather than emitting it', () => {
      // Trade-off of mirroring the tokeniser: this no longer matches content
      // containing "JavaScript" (one token), because `script*` is a prefix match.
      // Accepted so that ordinary hyphenated and dotted input works.
      expect(q('java+script')).toBe('+java* +script*');
    });

    it('cannot search for a name that is only operators and short text', () => {
      // Documenting a real limitation, not asserting desired behaviour: "c++"
      // reduces to "c", which is below the minimum token size, so MySQL FULLTEXT
      // cannot find it at all. Postgres had the same blind spot for punctuation
      // but did index short lexemes.
      expect(toFulltextQuery('c++').query).toBeNull();
    });

    it('deduplicates the reported short terms', () => {
      expect(toFulltextQuery('AI AI ai').ignored).toEqual(['AI', 'ai']);
    });

    it('does not let a bare operator produce an invalid expression', () => {
      expect(q('*')).toBeNull();
      expect(q('+')).toBeNull();
      expect(q('~~~')).toBeNull();
      expect(q('()')).toBeNull();
      expect(q('@')).toBeNull();
    });

    it('neutralises an attempt to inject a proximity operator', () => {
      // The quotes make ` @1 ` parse as a phrase; the `@` is stripped and the
      // remaining "1" is too short to index, so the phrase is discarded entirely
      // rather than becoming a required term that can never match.
      const r = toFulltextQuery('foo" @1 "bar');
      expect(r.query).toBe('+foo* +bar*');
      expect(r.ignored).toEqual(['1']);
    });

    it('returns null for empty and whitespace-only input', () => {
      expect(q('')).toBeNull();
      expect(q('   ')).toBeNull();
    });

    it('treats an unterminated quote as a plain word', () => {
      expect(q('"unclosed phrase')).toBe('+unclosed* +phrase*');
    });
  });

  describe('minimum token size', () => {
    it('drops terms MySQL cannot index and reports them', () => {
      const r = toFulltextQuery('AI developer');
      expect(r.query).toBe('+developer*');
      expect(r.ignored).toEqual(['AI']);
    });

    it('returns null when every term is too short, rather than matching everything', () => {
      // The caller MUST render this as "no results". Dropping the predicate
      // instead would return the entire published archive.
      expect(toFulltextQuery('AI').query).toBeNull();
      expect(toFulltextQuery('ai ui qa').query).toBeNull();
    });

    it('accepts a term of exactly the minimum length', () => {
      expect(q('a'.repeat(MIN))).toBe(`+${'a'.repeat(MIN)}*`);
    });
  });

  it('returns null for exclusions with nothing to exclude from', () => {
    // MySQL has no positive set to subtract from, so this matches nothing.
    expect(q('-spam')).toBeNull();
    expect(q('-spam -junk')).toBeNull();
  });

  it('is not confused by extra whitespace', () => {
    expect(q('  hire   developer  ')).toBe('+hire* +developer*');
  });
});
