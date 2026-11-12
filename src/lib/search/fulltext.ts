import { env } from '../env';

/**
 * Translate a user's search box input into a MySQL FULLTEXT BOOLEAN MODE query.
 *
 * ── Why this exists ─────────────────────────────────────────────────────────
 * On Postgres this was one function call: `websearch_to_tsquery('english', q)`
 * took raw user input, applied stemming and a stopword list, and could not be
 * broken by hostile input. MySQL has no equivalent — `MATCH … AGAINST (? IN
 * BOOLEAN MODE)` takes a *query language* string, so the translation has to
 * happen here, and it has to be total: every possible input must produce either
 * a valid boolean expression or nothing at all.
 *
 * The value is always passed as a bound parameter, so this is not an SQL
 * injection boundary. It is a denial-of-service and correctness boundary: a
 * stray operator makes MySQL raise a syntax error (`ER_PARSE_ERROR`) on what
 * looks to the user like an ordinary search, and unescaped operators let input
 * silently invert its own meaning — a leading `-` on every word would exclude
 * everything and return an empty page.
 *
 * ── What survived the port, and what did not ────────────────────────────────
 * Kept: AND-by-default across terms, "quoted phrases", and `-exclusion`.
 * Approximated: `or` — Postgres produced a real disjunction; here it drops the
 *   required-term flag so all terms become optional and ranking decides. Close
 *   enough for a search box, and it cannot be expressed exactly without building
 *   nested boolean groups.
 * Lost: stemming. Postgres' 'english' config matched "developer" to
 *   "developers"; MySQL FULLTEXT does no stemming at all. The trailing `*`
 *   prefix wildcard on every positive term recovers most of it — "developer*"
 *   matches "developers", "development" — but it is a prefix match, not a
 *   linguistic one, so "ran" will never match "run".
 * Lost: short terms. InnoDB refuses to index tokens below
 *   `innodb_ft_min_token_size` (default 3), so "AI", "UI", "QA" and "Go" are
 *   invisible to the index no matter what is sent. Such terms are reported in
 *   `ignored` rather than silently dropped, and if they were the *only* terms the
 *   result is `null` — meaning "no searchable query", which the caller must treat
 *   as an empty result set rather than as a match-everything query.
 */

/**
 * Anything InnoDB does not treat as a word character. Used to SPLIT terms, not to
 * delete the characters, which matters more than it looks: InnoDB tokenises the
 * indexed text on exactly these boundaries, so "e-commerce" is stored as the two
 * tokens "e" and "commerce". Stripping the hyphen instead would produce
 * `+ecommerce*`, a token that appears nowhere in the index — a search for
 * "e-commerce" would silently return nothing on a blog full of it. Splitting also
 * neutralises every BOOLEAN MODE operator (`+ - < > ( ) ~ * " @`) as a side
 * effect, since none of them is a word character.
 *
 * Underscore and apostrophe are kept: InnoDB counts both as word characters, so
 * "don't" and "some_id" must stay whole to match what was indexed.
 */
const NON_WORD = /[^\p{L}\p{N}_']+/gu;

export interface FulltextQuery {
  /**
   * The string to bind into `AGAINST (? IN BOOLEAN MODE)`, or `null` when the
   * input contains nothing the index can match. `null` MUST produce an empty
   * result set: binding an empty string is a MySQL syntax error, and dropping the
   * predicate instead would return the entire archive.
   */
  query: string | null;
  /** Terms discarded for being shorter than the server's minimum token size. */
  ignored: string[];
}

/**
 * Build a BOOLEAN MODE expression from user input. Always returns an object —
 * `ignored` is meaningful even when `query` is null, which is the case a caller
 * needs in order to explain an empty result page ("AI" is too short to index)
 * rather than implying nothing was written on the subject.
 */
export function toFulltextQuery(input: string): FulltextQuery {
  const minLen = env.SEARCH_MIN_TOKEN_SIZE;
  const ignored: string[] = [];

  // Pull quoted phrases out first, so their inner spaces survive tokenisation.
  // An unterminated quote is treated as a plain word rather than an error.
  const phrases: string[] = [];
  const rest = input.replace(/"([^"]+)"/g, (_m, phrase: string) => {
    const cleaned = phrase.replace(NON_WORD, ' ').trim();
    // A phrase needs at least one indexable word to be satisfiable. InnoDB
    // resolves a phrase by finding candidate rows through the index and then
    // verifying the sequence against the column; if every word is below the
    // minimum token size there are no candidates, so a *required* phrase of only
    // short words would silently reduce the whole query to zero rows.
    if (!cleaned) return ' ';
    if (!cleaned.split(' ').some((w) => w.length >= minLen)) {
      ignored.push(cleaned);
      return ' ';
    }
    phrases.push(cleaned);
    return ' ';
  });

  const words = rest.split(/\s+/).filter(Boolean);
  // `or` anywhere demotes every term to optional — see the note above. It is
  // also an InnoDB stopword, so it can never be a search term in its own right.
  const anyOf = words.some((w) => w.toLowerCase() === 'or');

  const positive: string[] = [];
  const negative: string[] = [];

  for (const word of words) {
    if (word.toLowerCase() === 'or') continue;
    // A leading hyphen is the exclusion operator; hyphens *inside* a word are
    // token separators (see NON_WORD). Order matters — the flag has to be read
    // before splitting, or "-front-end" would lose its negation.
    const negated = word.startsWith('-');
    for (const term of word.replace(NON_WORD, ' ').trim().split(' ')) {
      if (!term) continue;
      if (term.length < minLen) {
        ignored.push(term);
        continue;
      }
      if (negated) negative.push(`-${term}`);
      // Prefix wildcard stands in for the stemming MySQL does not do. Not applied
      // to negations: `-dev*` would exclude every post mentioning "development".
      else positive.push(`${anyOf ? '' : '+'}${term}*`);
    }
  }

  // A phrase must match exactly, so no wildcard. Required unless `or` is in play.
  const phraseTerms = phrases.map((p) => `${anyOf ? '' : '+'}"${p}"`);

  const terms = [...phraseTerms, ...positive, ...negative];
  // Deduplicated because `ignored` is rendered to the reader — "AI" typed twice
  // should not produce «the terms "AI", "AI" were too short».
  const uniqueIgnored = [...new Set(ignored)];

  // Negations alone match nothing in MySQL (there is no positive set to subtract
  // from), so a query of only exclusions is treated as no query at all.
  if (phraseTerms.length + positive.length === 0) return { query: null, ignored: uniqueIgnored };

  return { query: terms.join(' '), ignored: uniqueIgnored };
}
