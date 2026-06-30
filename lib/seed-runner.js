import { customersService } from '@/services/customers.service';
import { templatesService } from '@/services/templates.service';
import { campaignsService } from '@/services/campaigns.service';
import { SEED_CUSTOMERS, SEED_TEMPLATES, SEED_CAMPAIGNS } from './seed-data';

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// ────────────────────────────────────────────────
//  إضافة العملاء — بيلوب على كل عميل ويبعته
// ────────────────────────────────────────────────
export async function seedCustomers(onProgress) {
  const results = { success: 0, failed: 0, errors: [] };

  for (let i = 0; i < SEED_CUSTOMERS.length; i++) {
    const customer = SEED_CUSTOMERS[i];
    try {
      await customersService.create({
        ...customer,
        dueDate: customer.dueDate ? new Date(customer.dueDate).toISOString() : undefined,
        importedOverdueDays: customer.importedOverdueDays || undefined,
      });
      results.success++;
    } catch (err) {
      results.failed++;
      results.errors.push(`${customer.fullName}: ${err.response?.data?.message || err.message}`);
    }

    onProgress?.({
      step: 'customers',
      current: i + 1,
      total: SEED_CUSTOMERS.length,
      label: customer.fullName,
    });

    await sleep(200); // تجنب إرهاق الـ API
  }

  return results;
}

// ────────────────────────────────────────────────
//  إضافة القوالب — يرجع الـ IDs عشان تتحمل في الحملات
// ────────────────────────────────────────────────
export async function seedTemplates(onProgress) {
  const results = { success: 0, failed: 0, errors: [], ids: [] };

  for (let i = 0; i < SEED_TEMPLATES.length; i++) {
    const template = SEED_TEMPLATES[i];
    try {
      const res = await templatesService.create(template);
      results.success++;
      // استخرج الـ ID من الـ response
      const id = res?.data?.id || res?.id;
      if (id) results.ids.push(id);
    } catch (err) {
      results.failed++;
      results.errors.push(`${template.name}: ${err.response?.data?.message || err.message}`);
    }

    onProgress?.({
      step: 'templates',
      current: i + 1,
      total: SEED_TEMPLATES.length,
      label: template.name,
    });

    await sleep(200);
  }

  return results;
}

// ────────────────────────────────────────────────
//  إضافة الحملات — بتاخد أول template ID متاح
// ────────────────────────────────────────────────
export async function seedCampaigns(templateIds = [], onProgress) {
  const results = { success: 0, failed: 0, errors: [] };

  if (templateIds.length === 0) {
    results.errors.push('لا يوجد قوالب — أضف القوالب أولاً');
    return results;
  }

  for (let i = 0; i < SEED_CAMPAIGNS.length; i++) {
    const campaign = SEED_CAMPAIGNS[i];
    // كل حملة تاخد قالب مختلف (يلف على الـ IDs)
    const templateId = templateIds[i % templateIds.length];

    try {
      await campaignsService.create({
        ...campaign,
        templateId,
      });
      results.success++;
    } catch (err) {
      results.failed++;
      results.errors.push(`${campaign.title}: ${err.response?.data?.message || err.message}`);
    }

    onProgress?.({
      step: 'campaigns',
      current: i + 1,
      total: SEED_CAMPAIGNS.length,
      label: campaign.title,
    });

    await sleep(200);
  }

  return results;
}

// ────────────────────────────────────────────────
//  تشغيل كل حاجة دفعة واحدة
// ────────────────────────────────────────────────
export async function seedAll(onProgress) {
  const summary = {};

  onProgress?.({ step: 'start', message: 'بدء إضافة البيانات...' });

  summary.customers = await seedCustomers(onProgress);
  onProgress?.({ step: 'done-customers', ...summary.customers });

  summary.templates = await seedTemplates(onProgress);
  onProgress?.({ step: 'done-templates', ...summary.templates });

  summary.campaigns = await seedCampaigns(summary.templates.ids, onProgress);
  onProgress?.({ step: 'done-campaigns', ...summary.campaigns });

  onProgress?.({ step: 'finish', summary });
  return summary;
}
