import type { Theme } from './_contract';
import { minimalTheme } from './minimal';
import { magazineTheme } from './magazine';
import { softsuaveTheme } from './softsuave';

export const DEFAULT_THEME = 'softsuave';

export const themes: Record<string, Theme> = {
  [softsuaveTheme.id]: softsuaveTheme,
  [minimalTheme.id]: minimalTheme,
  [magazineTheme.id]: magazineTheme,
};

/** Lightweight list for the settings theme picker. */
export const themeList = Object.values(themes).map((t) => ({ id: t.id, label: t.label }));

export function getTheme(id: string | null | undefined): Theme {
  return (id && themes[id]) || themes[DEFAULT_THEME];
}
