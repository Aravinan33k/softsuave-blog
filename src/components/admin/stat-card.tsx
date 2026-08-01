import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkline } from './sparkline';

export interface Trend {
  // Percentage change of the last 7 days vs the previous 7 days.
  pct: number;
}

// Dashboard stat card: tinted icon, tabular count, optional 7-day trend badge
// and sparkline. Whole card links to the section it counts. Server-safe.
export function StatCard({
  label,
  value,
  href,
  icon: Icon,
  trend,
  series,
}: {
  label: string;
  value: number;
  href: string;
  icon: LucideIcon;
  trend?: Trend;
  series?: number[];
}) {
  return (
    <Link href={href} className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
      <Card className="h-full shadow-sm transition-all duration-150 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:ring-primary/40">
        <CardContent className="space-y-3 px-4">
          <div className="flex items-center justify-between gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Icon className="h-4 w-4" />
            </span>
            {trend && <TrendBadge pct={trend.pct} />}
          </div>
          <div>
            <p className="text-3xl font-semibold tracking-tight tabular-nums">{value}</p>
            <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          </div>
          {series && <Sparkline data={series} />}
        </CardContent>
      </Card>
    </Link>
  );
}

function TrendBadge({ pct }: { pct: number }) {
  const flat = pct === 0;
  const up = pct > 0;
  return (
    <span
      title="vs previous 7 days"
      className={cn(
        'flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-medium tabular-nums',
        flat
          ? 'bg-muted text-muted-foreground'
          : up
            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
            : 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
      )}
    >
      {flat ? <Minus className="h-3 w-3" /> : up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
      {flat ? '0%' : `${up ? '+' : ''}${pct}%`}
    </span>
  );
}
