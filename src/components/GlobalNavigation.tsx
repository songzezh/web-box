import { Link, matchPath, useLocation } from 'react-router-dom'
import { getActiveNavigationPath, navigationItems } from '../navigation'

export default function GlobalNavigation({ className, id, onNavigate, onBlur, items, label = 'Main navigation' }: {
  items?: { label: string; path: string }[]
  label?: string
  className: string
  id?: string
  onNavigate?: () => void
  onBlur?: React.FocusEventHandler<HTMLElement>
}) {
  const { pathname } = useLocation()
  const activePath = getActiveNavigationPath(pathname)
  return (
    <nav id={id} className={className} aria-label={label} onBlur={onBlur}>
      {(items ?? navigationItems).map(item => {
        const active = items ? !!matchPath(item.path, pathname) : item.path === activePath
        return <Link key={item.path} to={item.path} onClick={onNavigate} className={active ? 'active' : undefined} aria-current={active ? (!items && (pathname.startsWith('/tools/') || (pathname.startsWith('/resources/') && active)) ? 'location' : 'page') : undefined}>{item.label}</Link>
      })}
    </nav>
  )
}
