import { Navigate, useLocation, useParams } from 'react-router-dom'
import { getCategoryById, getCategoryPath, getToolsByCategory } from '../registry'
import { ToolCard, ToolPageLayout } from '../components/Tools'
import NotFoundPage from './NotFoundPage'

export default function CategoryPage() {
  const { categoryId = '' } = useParams()
  const { pathname } = useLocation()
  const category = getCategoryById(categoryId)
  if (!category) return <NotFoundPage />
  if (pathname.startsWith('/category/')) return <Navigate to={getCategoryPath(category.id)} replace />
  const tools = getToolsByCategory(category.id)
  const available = tools.filter(tool => tool.status === 'available').length

  return (
    <ToolPageLayout title={category.name} description={category.description}>
      <dl className="stats category-stats">
        <div><dt>Planned Tools</dt><dd>{category.plannedToolCount}</dd></div>
        <div><dt>Registered Tools</dt><dd>{tools.length}</dd></div>
        <div><dt>Available Tools</dt><dd>{available}</dd></div>
      </dl>
      <section aria-label={`${category.name} tools`}>
        {tools.length ? <div className="tool-grid">{tools.map(tool => <ToolCard key={tool.id} tool={tool} category={category.name} />)}</div> : (
          <div className="empty-state"><div><h2>No tools registered yet.</h2><p>Tools will appear here as this category takes shape.</p></div></div>
        )}
      </section>
    </ToolPageLayout>
  )
}
