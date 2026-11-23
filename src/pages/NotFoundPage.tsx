import '../i18n/index'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ToolPageLayout } from '../components/Tools'

/**
 * 统一的未找到页面，复用工具页面壳并提供返回首页的内部链接。
 */
export default function NotFoundPage() {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  return <ToolPageLayout title={t('common:notFoundTitle')} description={t('common:notFoundDescription')}><Link className="text-link" to="/">{t('common:returnCategories')}</Link></ToolPageLayout>
}
