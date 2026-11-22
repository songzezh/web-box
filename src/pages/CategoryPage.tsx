import '../i18n/index'
import { useCatalogTranslation } from '../i18n/useCatalogTranslation'
import { useTranslation } from 'react-i18next'
import { Navigate, useLocation, useParams } from 'react-router-dom'
import { getCategoryById, getCategoryPath, getToolsByCategory } from '../registry'
import { ToolCard, ToolPageLayout } from '../components/Tools'
import NotFoundPage from './NotFoundPage'

export default function CategoryPage() {
  const copy = useCatalogTranslation()
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const { categoryId = '' } = useParams()
  const { pathname } = useLocation()
  const category = getCategoryById(categoryId)
  if (!category) return <NotFoundPage />
  if (pathname.startsWith('/category/')) return <Navigate to={getCategoryPath(category.id)} replace />
  const tools = getToolsByCategory(category.id)
  const available = tools.filter(tool => tool.status === 'available').length

  return (
    <ToolPageLayout title={copy.category(category.id, 'name')} description={copy.category(category.id, 'description')}>
      <dl className="stats category-stats">
        <div><dt>{t('common:plannedTools')}</dt><dd>{category.plannedToolCount}</dd></div>
        <div><dt>{t('common:registeredTools')}</dt><dd>{tools.length}</dd></div>
        <div><dt>{t('common:availableTools')}</dt><dd>{available}</dd></div>
      </dl>
      <section aria-label={t('common:toolsLabel', { name: copy.category(category.id) })}>
        {tools.length ? <div className="tool-grid">{tools.map(tool => <ToolCard key={tool.id} tool={tool} />)}</div> : (
          <div className="empty-state"><div><h2>{t('common:emptyToolsTitle')}</h2><p>{t('common:emptyToolsDescription')}</p></div></div>
        )}
      </section>
    </ToolPageLayout>
  )
}
