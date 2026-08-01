import 'server-only';
import { prisma } from '../db';
import { getTheme } from '@/themes/registry';
import type { Theme } from '@/themes/_contract';

// Resolve the active theme. `override` (from a ?theme= query) powers the admin
// live preview without changing the saved setting.
export async function getActiveTheme(override?: string | null): Promise<Theme> {
  if (override) return getTheme(override);
  try {
    const settings = await prisma.siteSettings.findUnique({
      where: { id: 'singleton' },
      select: { activeTheme: true },
    });
    return getTheme(settings?.activeTheme);
  } catch {
    // DB unreachable at build time — fall back to the default theme.
    return getTheme(null);
  }
}
