import Badge from '@/components/ui/Badge';

const categoryConfig = {
  MARKETING: { label: 'تسويقي', variant: 'gold' },
  UTILITY: { label: 'خدمي', variant: 'blue' },
};

export default function TemplateCategoryBadge({ category }) {
  if (!category) return null;
  const config = categoryConfig[category] || { label: category, variant: 'gray' };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}
