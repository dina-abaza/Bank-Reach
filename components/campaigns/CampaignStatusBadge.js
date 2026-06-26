import Badge from '@/components/ui/Badge';

const statusConfig = {
  draft: { label: 'مسودة', variant: 'gray' },
  scheduled: { label: 'مجدولة', variant: 'blue' },
  running: { label: 'جارية', variant: 'yellow' },
  completed: { label: 'منتهية', variant: 'green' },
  failed: { label: 'فاشلة', variant: 'red' },
};

export default function CampaignStatusBadge({ status }) {
  const config = statusConfig[status] || { label: status, variant: 'gray' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
