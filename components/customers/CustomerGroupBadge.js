import Badge from '@/components/ui/Badge';

const groupConfig = {
  COMPLIANT: { label: 'منتظم', variant: 'green' },
  LATE: { label: 'متأخر', variant: 'yellow' },
  DEFAULTED: { label: 'متعثر', variant: 'red' },
  TRANSFERRED: { label: 'محول', variant: 'purple' },
};

export default function CustomerGroupBadge({ group }) {
  const config = groupConfig[group] || { label: group, variant: 'gray' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
