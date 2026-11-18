import { useCatalogTranslation } from '../i18n/useCatalogTranslation'
import '../i18n/index'
import { useTranslation } from 'react-i18next'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { getActiveNavigationPath, navigationItems } from '../navigation'

export default function GlobalNavigation({ className, id, onNavigate, onBlur, items, label }: {
  items?: { label: string; path: string }[]
  label?: string
  className: string
  id?: string
  onNavigate?: () => void
  onBlur?: React.FocusEventHandler<HTMLElement>
}) {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const copy = useCatalogTranslation()
  const { pathname } = useLocation()
  const activePath = getActiveNavigationPath(pathname)
  return (
    <nav id={id} className={className} aria-label={label ?? t('navigation:main')} onBlur={onBlur}>
      {(items ?? navigationItems).map(item => {
        const active = items ? !!matchPath(item.path, pathname) : item.path === activePath
        return <Link key={item.path} to={item.path} onClick={onNavigate} className={active ? 'active' : undefined} aria-current={active ? (!items && (pathname.startsWith('/tools/') || (pathname.startsWith('/resources/') && active)) ? 'location' : 'page') : undefined}>{items ? item.label : item.path === '/' ? t('navigation:home') : item.path === '/resources' ? t('navigation:resources') : copy.category(item.path.slice(1), 'shortName')}</Link>
      })}
    </nav>
  )
}
