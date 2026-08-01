import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/db';
import { Prisma } from '@/generated/prisma/client';
import { handleRouteError, jsonError } from '@/lib/http';
import { requireApiRole } from '@/lib/auth/session';
import { logAudit } from '@/lib/audit';
import { settingsSchema } from '@/lib/validation/settings';
import { themes } from '@/themes/registry';
import { revalidateContent } from '@/lib/revalidate';

// GET /api/v1/admin/settings — current site settings (ADMIN only).
export async function GET(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: {},
      create: { id: 'singleton' },
      include: { logo: true, favicon: true },
    });
    return NextResponse.json({ settings });
  } catch (err) {
    return handleRouteError(err, 'admin/settings GET');
  }
}

// PUT /api/v1/admin/settings — replace site settings (ADMIN only).
export async function PUT(req: NextRequest) {
  try {
    const session = await requireApiRole(req, 'ADMIN');
    if (session instanceof NextResponse) return session;

    const body = await req.json().catch(() => null);
    const parsed = settingsSchema.safeParse(body);
    if (!parsed.success) return jsonError(400, 'invalid_request', 'Invalid settings.');
    const d = parsed.data;

    if (!themes[d.activeTheme]) return jsonError(400, 'invalid_request', 'Unknown theme.');

    const data = {
      siteTitle: d.siteTitle,
      tagline: d.tagline ?? null,
      siteDescription: d.siteDescription ?? null,
      accentColor: d.accentColor,
      fontChoice: d.fontChoice,
      activeTheme: d.activeTheme,
      socialLinksJson: d.socialLinks as unknown as Prisma.InputJsonValue,
      analyticsSnippet: d.analyticsSnippet ?? null,
      logoMediaId: d.logoMediaId ?? null,
      faviconMediaId: d.faviconMediaId ?? null,
    };

    const settings = await prisma.siteSettings.upsert({
      where: { id: 'singleton' },
      update: data,
      create: { id: 'singleton', ...data },
      include: { logo: true, favicon: true },
    });

    await logAudit({ action: 'UPDATE', userId: session.sub, targetType: 'settings', targetId: 'singleton', req });
    revalidateContent(); // site identity/theme affects home + feeds
    return NextResponse.json({ settings });
  } catch (err) {
    return handleRouteError(err, 'admin/settings PUT');
  }
}
