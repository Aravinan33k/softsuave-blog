import Link from 'next/link';
import { File, FileText, Image as ImageIcon, Tag, Tags, Users, Plus, Upload } from 'lucide-react';
import { prisma } from '@/lib/db';
import { requireSession } from '@/lib/auth/guards';
import { formatDateTime } from '@/lib/utils';
import { PageHeader } from '@/components/admin/page-header';
import { StatCard, type Trend } from '@/components/admin/stat-card';
import { Badge } from '@/components/ui/badge';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const dynamic = 'force-dynamic';

type DailyRow = { day: string; n: number };

// Start of the 14-day sparkline window. Kept outside the component body so
// the react-hooks/purity rule doesn't flag Date.now() during render — this
// is a server component rendered once per request.
function dailyWindowStart(): Date {
  return new Date(Date.now() - 13 * 86400_000);
}

export default async function AdminDashboard() {
  await requireSession();
  const fourteenDaysAgo = dailyWindowStart();

  const [posts, pages, media, categories, tags, users, recent, postDaily, mediaDaily] = await Promise.all([
    prisma.post.count(),
    prisma.page.count(),
    prisma.media.count(),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.user.count(),
    prisma.post.findMany({
      orderBy: { updatedAt: 'desc' },
      take: 5,
      select: { id: true, title: true, status: true, updatedAt: true },
    }),
    prisma.$queryRaw<DailyRow[]>`
      SELECT date_trunc('day', "createdAt")::date::text AS day, count(*)::int AS n
      FROM "Post" WHERE "createdAt" >= ${fourteenDaysAgo} GROUP BY 1`,
    prisma.$queryRaw<DailyRow[]>`
      SELECT date_trunc('day', "createdAt")::date::text AS day, count(*)::int AS n
      FROM "Media" WHERE "createdAt" >= ${fourteenDaysAgo} GROUP BY 1`,
  ]);

  const postSeries = dailySeries(postDaily);
  const mediaSeries = dailySeries(mediaDaily);

  const stats = [
    { label: 'Posts', value: posts, href: '/admin/posts', icon: FileText, trend: trendOf(postSeries), series: postSeries },
    { label: 'Pages', value: pages, href: '/admin/pages', icon: File },
    { label: 'Media', value: media, href: '/admin/media', icon: ImageIcon, trend: trendOf(mediaSeries), series: mediaSeries },
    { label: 'Categories', value: categories, href: '/admin/categories', icon: Tags },
    { label: 'Tags', value: tags, href: '/admin/tags', icon: Tag },
    { label: 'Users', value: users, href: '/admin/users', icon: Users },
  ];

  const quickActions = [
    { label: 'New post', href: '/admin/posts/new', icon: Plus },
    { label: 'Upload media', href: '/admin/media', icon: Upload },
    { label: 'New page', href: '/admin/pages/new', icon: File },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back — here's what's happening."
      />

      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {quickActions.map((a) => (
          <Link key={a.href} href={a.href} className={buttonVariants({ variant: 'outline', size: 'sm' })}>
            <a.icon className="mr-1.5 h-4 w-4" />
            {a.label}
          </Link>
        ))}
      </div>

      {/* Stats */}
      <div className="grid items-start gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent activity</CardTitle>
        </CardHeader>
        <CardContent>
          {recent.length === 0 ? (
            <p className="text-sm text-muted-foreground">No posts yet — create your first one.</p>
          ) : (
            <ul className="divide-y">
              {recent.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-4 py-2.5 first:pt-0 last:pb-0">
                  <Link
                    href={`/admin/posts/${p.id}`}
                    className="-mx-2 flex-1 truncate rounded-md px-2 py-1 text-sm font-medium transition-colors hover:bg-muted/60 hover:text-primary"
                  >
                    {p.title}
                  </Link>
                  <div className="flex shrink-0 items-center gap-3">
                    <Badge variant={p.status === 'PUBLISHED' ? 'default' : 'secondary'}>{p.status.toLowerCase()}</Badge>
                    <span className="hidden text-xs text-muted-foreground tabular-nums sm:inline">{formatDateTime(p.updatedAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>

    </div>
  );
}

// Fills a zero-padded daily series for the last 14 days (oldest → newest).
function dailySeries(rows: DailyRow[], days = 14): number[] {
  const byDay = new Map(rows.map((r) => [r.day, r.n]));
  const out: number[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400_000);
    out.push(byDay.get(d.toISOString().slice(0, 10)) ?? 0);
  }
  return out;
}

// Percentage change of the last 7 days vs the previous 7.
function trendOf(series: number[]): Trend {
  const last = series.slice(7).reduce((a, b) => a + b, 0);
  const prev = series.slice(0, 7).reduce((a, b) => a + b, 0);
  if (prev === 0) return { pct: last > 0 ? 100 : 0 };
  return { pct: Math.round(((last - prev) / prev) * 100) };
}
