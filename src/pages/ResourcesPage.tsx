import { ResourceCard, ToolPageLayout } from '../components/Tools'
import { CategoryCard } from '../components/CategoryCard'
import GlobalNavigation from '../components/GlobalNavigation'
import { externalResourceCategories, getResourceCategoryById, getResourceCategoryPath, getResourcesByCategory } from '../registry'
import NotFound from './NotFoundPage'

const resourceNavigation = [
  { label: 'Overview', path: '/resources' },
  ...externalResourceCategories.map(category => ({ label: category.name, path: getResourceCategoryPath(category.id) })),
]
export default function ResourcesPage({ resourceCategoryId }: { resourceCategoryId?: string }) {
  const category = resourceCategoryId ? getResourceCategoryById(resourceCategoryId) : undefined
  if (resourceCategoryId && !category) return <NotFound />
  const resources = category ? getResourcesByCategory(category.id) : []
  return <ToolPageLayout title={category?.name ?? 'External resources'} description={category?.description ?? 'Browse external resources collected by Web Box by category.'}>
    <GlobalNavigation className="resource-nav" items={resourceNavigation} label="External resource categories" />
    {category ? <section aria-label={`${category.name} resources`}>
      {resources.length ? <div className="tool-grid">{resources.map(resource => <ResourceCard key={resource.id} resource={resource} />)}</div> :
        <div className="empty-state"><div><h2>No resources yet.</h2><p>No resources have been added to this category yet. Explore another category.</p></div></div>}
    </section> : <div className="category-grid">{externalResourceCategories.map(category => <CategoryCard key={category.id} category={category} path={getResourceCategoryPath(category.id)} count={`${getResourcesByCategory(category.id).length} resources`} />)}</div>}
  </ToolPageLayout>
}
