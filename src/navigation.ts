/** 导航映射：依赖 React Router 路径匹配与 registry，供主导航、面包屑和页面标题复用。 */
import { matchPath } from 'react-router-dom'
import { categories, getCategoryById, getCategoryPath, getToolById, getResourceCategoryById } from './registry'

/**
 * 按 registry 的分类顺序生成全站主导航；label 是元数据，实际显示文案由组件翻译。
 */
export const navigationItems = [
  { label: 'Home', path: '/' },
  ...categories.map(category => ({ label: category.shortName, path: getCategoryPath(category.id) })),
  { label: 'Resources', path: '/resources' },
]

/**
 * 解析分类页及工具详情所属分类，同时兼容旧 /category/:categoryId 路径。
 * @param pathname - Router 的路径部分，不含 hash 前缀
 * @returns 对应分类；无法匹配或 ID 不存在时为 undefined
 */
export function getRouteCategory(pathname: string) {
  const toolMatch = matchPath('/tools/:toolId', pathname)
  if (toolMatch) {
    const tool = getToolById(toolMatch.params.toolId ?? '')
    return tool ? getCategoryById(tool.categoryId) : undefined
  }
  const categoryMatch = matchPath('/:categoryId', pathname) ?? matchPath('/category/:categoryId', pathname)
  return categoryMatch ? getCategoryById(categoryMatch.params.categoryId ?? '') : undefined
}

/**
 * 将工具详情映射到父分类、资源子页映射到资源入口，用于保持主导航高亮。
 * @param pathname - 当前路径
 * @returns 主导航路径；无对应入口时返回 null
 */
export function getActiveNavigationPath(pathname: string) {
  const category = getRouteCategory(pathname)
  if (category) return getCategoryPath(category.id)
  if (matchPath('/', pathname)) return '/'
  if (getRouteResourceCategory(pathname) || matchPath('/resources', pathname)) return '/resources'
  return null
}

/**
 * 按资源子页路径查找 registry 分类；未匹配或未知 ID 时返回 undefined。
 * @param pathname - 当前路径
 */
export function getRouteResourceCategory(pathname: string) {
  const match = matchPath('/resources/:resourceCategoryId', pathname)
  return match ? getResourceCategoryById(match.params.resourceCategoryId ?? '') : undefined
}
