import '../i18n/index'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ToolPageLayout } from '../components/Tools'

export default function NotFoundPage() {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  return <ToolPageLayout title={t('common:notFoundTitle')} description={t('common:notFoundDescription')}><Link className="text-link" to="/">{t('common:returnCategories')}</Link></ToolPageLayout>
}
