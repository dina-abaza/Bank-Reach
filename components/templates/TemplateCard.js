import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

function extractVariables(body) {
  const matches = body.match(/{{(\w+)}}/g) || [];
  return [...new Set(matches.map((m) => m.slice(2, -2)))];
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function TemplateCard({ template }) {
  const variables = template.variables || extractVariables(template.body);

  return (
    <Card>
      <div className="mb-3">
        <h3 className="font-semibold text-slate-800 leading-snug">{template.name}</h3>
        {template.createdAt && (
          <p className="text-xs text-slate-400 mt-0.5">{formatDate(template.createdAt)}</p>
        )}
      </div>

      <p className="text-xs leading-relaxed mb-4 bg-slate-50 rounded-lg p-3 font-mono text-slate-700 whitespace-pre-wrap">
        {template.body}
      </p>

      {variables.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {variables.map((v) => (
            <Badge key={v} variant="blue">
              {`{{${v}}}`}
            </Badge>
          ))}
        </div>
      )}
    </Card>
  );
}
