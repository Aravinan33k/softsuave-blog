import { Badge } from '@/components/ui/badge';

export function StatusBadge({ status }: { status: string }) {
  const variant = status === 'PUBLISHED' ? 'default' : status === 'SCHEDULED' ? 'secondary' : 'outline';
  return <Badge variant={variant}>{status.toLowerCase()}</Badge>;
}
