import { Download } from 'lucide-react';
import { requireRolePage } from '@/lib/auth/guards';
import { PageHeader } from '@/components/admin/page-header';
import { ImportPanel } from '@/components/admin/tools/import-panel';
import { WpPullPanel } from '@/components/admin/tools/wp-pull-panel';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export const metadata = { title: 'Tools' };

export default async function ToolsPage() {
  await requireRolePage('ADMIN');

  return (
    <>
      <PageHeader title="Tools" description="Import from WordPress and export all content." />
      <div className="mb-6">
        <WpPullPanel />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <ImportPanel />

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Export content</CardTitle>
            <CardDescription>Download all posts, pages, and taxonomy. No lock-in.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <a href="/api/v1/admin/export?format=json" className={buttonVariants({ variant: 'outline' })} download>
              <Download className="mr-1 h-4 w-4" /> Export JSON
            </a>
            <a href="/api/v1/admin/export?format=markdown" className={buttonVariants({ variant: 'outline' })} download>
              <Download className="mr-1 h-4 w-4" /> Export Markdown
            </a>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
