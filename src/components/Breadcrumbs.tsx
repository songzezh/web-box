import '../i18n/index'
import { useCatalogTranslation } from '../i18n/useCatalogTranslation'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { getCategoryPath, getToolById } from '../registry'
import { getRouteCategory, getRouteResourceCategory } from '../navigation'

/**
 * 按当前路径生成面包屑；工具页补充父分类、资源子页补充资源入口，首页隐藏。
 */
export default function Breadcrumbs() {
  const copy = useCatalogTranslation()
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const { pathname } = useLocation()
  if (pathname === '/') return null
  const toolMatch = matchPath('/tools/:toolId', pathname)
  const tool = toolMatch ? getToolById(toolMatch.params.toolId ?? '') : undefined
  const category = getRouteCategory(pathname)
  const resourceCategory = getRouteResourceCategory(pathname)
  const label = (resourceCategory ? copy.resourceCategory(resourceCategory.id, 'name') : undefined) ?? (tool ? copy.tool(tool.id, 'name') : undefined) ?? (category ? copy.category(category.id, 'name') : undefined) ?? ({ '/about': t('navigation:about'), '/privacy': t('navigation:privacy'), '/resources': t('navigation:resources') }[pathname] ?? t('navigation:notFound'))
  return (
    <nav className="page-grid breadcrumbs" aria-label={t('navigation:breadcrumb')}>
      <Link to="/">{t('navigation:home')}</Link><span aria-hidden="true">/</span>
      {resourceCategory && <><Link to="/resources">{t('navigation:resources')}</Link><span aria-hidden="true">/</span></>}
      {tool && category && <><Link to={getCategoryPath(category.id)}>{copy.category(category.id, 'name')}</Link><span aria-hidden="true">/</span></>}
      <span aria-current="page">{label}</span>
    </nav>
  )
}
