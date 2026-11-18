import '../i18n/index'
import { useCatalogTranslation } from '../i18n/useCatalogTranslation'
import { useTranslation } from 'react-i18next'
import { ResourceCard, ToolPageLayout } from '../components/Tools'
import { CategoryCard } from '../components/CategoryCard'
import GlobalNavigation from '../components/GlobalNavigation'
import { externalResourceCategories, getResourceCategoryById, getResourceCategoryPath, getResourcesByCategory } from '../registry'
import NotFound from './NotFoundPage'

export default function ResourcesPage({ resourceCategoryId }: { resourceCategoryId?: string }) {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const copy = useCatalogTranslation()
  const resourceNavigation = [
    { label: t('resources:overview'), path: '/resources' },
    ...externalResourceCategories.map(category => ({ label: copy.resourceCategory(category.id, 'name'), path: getResourceCategoryPath(category.id) })),
  ]

  const category = resourceCategoryId ? getResourceCategoryById(resourceCategoryId) : undefined
  if (resourceCategoryId && !category) return <NotFound />
  const resources = category ? getResourcesByCategory(category.id) : []
  return <ToolPageLayout title={(category ? copy.resourceCategory(category.id, 'name') : undefined) ?? t('resources:title')} description={(category ? copy.resourceCategory(category.id, 'description') : undefined) ?? t('resources:description')}>
    <GlobalNavigation className="resource-nav" items={resourceNavigation} label={t('resources:navigation')} />
    {category ? <section aria-label={t('resources:listLabel', { name: copy.resourceCategory(category.id) })}>
      {resources.length ? <div className="tool-grid">{resources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}</div> :
        <div className="empty-state"><div><h2>{t('resources:emptyTitle')}</h2><p>{t('resources:emptyDescription')}</p></div></div>}
    </section> : <div className="category-grid">{externalResourceCategories.map(category => <CategoryCard key={category.id} category={category} path={getResourceCategoryPath(category.id)} count={t('resources:resourceCount', { count: getResourcesByCategory(category.id).length })} />)}</div>}
  </ToolPageLayout>
}
