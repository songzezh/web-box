import { Link, useLocation } from 'react-router-dom'
import { getActiveNavigationPath, navigationItems } from '../navigation'

export default function GlobalNavigation({ className, id, onNavigate, onBlur }: {
  className: string
  id?: string
  onNavigate?: () => void
  onBlur?: React.FocusEventHandler<HTMLElement>
}) {
  const { pathname } = useLocation()
  const activePath = getActiveNavigationPath(pathname)
  return (
    <nav id={id} className={className} aria-label="Main navigation" onBlur={onBlur}>
      {navigationItems.map(item => {
        const active = item.path === activePath
        return <Link key={item.path} to={item.path} onClick={onNavigate} className={active ? 'active' : undefined} aria-current={active ? (pathname.startsWith('/tools/') ? 'location' : 'page') : undefined}>{item.label}</Link>
      })}
    </nav>
  )
}
