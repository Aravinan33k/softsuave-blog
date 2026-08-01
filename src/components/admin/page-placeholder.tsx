import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PageHeader } from './page-header';

// Temporary placeholder for admin sections whose full UI arrives in a later
// phase. Keeps nav links resolvable and the shell demonstrable now.
export function PagePlaceholder({
  title,
  phase,
  description,
}: {
  title: string;
  phase: string;
  description?: string;
}) {
  return (
    <>
      <PageHeader title={title} description={description} />
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Coming in {phase}</CardTitle>
          <CardDescription>
            This section is scaffolded and route-protected. Its full functionality lands in {phase}.
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
}
