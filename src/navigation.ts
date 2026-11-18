import { matchPath } from 'react-router-dom'
import { categories, getCategoryById, getCategoryPath, getToolById, getResourceCategoryById } from './registry'

export const navigationItems = [
  { label: 'Home', path: '/' },
  ...categories.map(category => ({ label: category.shortName, path: getCategoryPath(category.id) })),
  { label: 'Resources', path: '/resources' },
]

export function getRouteCategory(pathname: string) {
  const toolMatch = matchPath('/tools/:toolId', pathname)
  if (toolMatch) {
    const tool = getToolById(toolMatch.params.toolId ?? '')
    return tool ? getCategoryById(tool.categoryId) : undefined
  }
  const categoryMatch = matchPath('/:categoryId', pathname) ?? matchPath('/category/:categoryId', pathname)
  return categoryMatch ? getCategoryById(categoryMatch.params.categoryId ?? '') : undefined
}

export function getActiveNavigationPath(pathname: string) {
  const category = getRouteCategory(pathname)
  if (category) return getCategoryPath(category.id)
  if (matchPath('/', pathname)) return '/'
  if (getRouteResourceCategory(pathname) || matchPath('/resources', pathname)) return '/resources'
  return null
}

export function getRouteResourceCategory(pathname: string) {
  const match = matchPath('/resources/:resourceCategoryId', pathname)
  return match ? getResourceCategoryById(match.params.resourceCategoryId ?? '') : undefined
}
