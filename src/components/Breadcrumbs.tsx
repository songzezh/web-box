import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCategoryPath, getToolById } from '../registry'
import { getRouteCategory, getRouteResourceCategory } from '../navigation'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const toolMatch = matchPath('/tools/:toolId', pathname)
  const tool = toolMatch ? getToolById(toolMatch.params.toolId ?? '') : undefined
  const category = getRouteCategory(pathname)
  const resourceCategory = getRouteResourceCategory(pathname)
  const label = resourceCategory?.name ?? tool?.name ?? category?.name ?? ({ '/about': 'About', '/privacy': 'Privacy', '/resources': 'Resources' }[pathname] ?? 'Not found')
  return (
    <nav className="page-grid breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link><span aria-hidden="true">/</span>
      {resourceCategory && <><Link to="/resources">Resources</Link><span aria-hidden="true">/</span></>}
      {tool && category && <><Link to={getCategoryPath(category.id)}>{category.name}</Link><span aria-hidden="true">/</span></>}
      <span aria-current="page">{label}</span>
    </nav>
  )
}
