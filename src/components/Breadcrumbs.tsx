import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCategoryPath, getToolById } from '../registry'
import { getRouteCategory } from '../navigation'

export default function Breadcrumbs() {
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const toolMatch = matchPath('/tools/:toolId', pathname)
  const tool = toolMatch ? getToolById(toolMatch.params.toolId ?? '') : undefined
  const category = getRouteCategory(pathname)
  const label = tool?.name ?? category?.name ?? ({ '/about': 'About', '/privacy': 'Privacy', '/resources': 'Resources' }[pathname] ?? 'Not found')
  return (
    <nav className="page-grid breadcrumbs" aria-label="Breadcrumb">
      <Link to="/">Home</Link><span aria-hidden="true">/</span>
      {tool && category && <><Link to={getCategoryPath(category.id)}>{category.name}</Link><span aria-hidden="true">/</span></>}
      <span aria-current="page">{label}</span>
    </nav>
  )
}
