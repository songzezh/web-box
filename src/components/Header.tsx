import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Box, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import GlobalNavigation from './GlobalNavigation'

export default function Header() {
  const { theme, toggleTheme } = useTheme()
  const themeAction = theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
  const [open, setOpen] = useState(false)
  const header = useRef<HTMLElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)

  function closeMenu() {
    setOpen(false)
    toggle.current?.focus()
  }

  useEffect(() => {
    if (!open) return
    const firstLink = header.current?.querySelector<HTMLAnchorElement>('#mobile-navigation a[aria-current]') ?? header.current?.querySelector<HTMLAnchorElement>('#mobile-navigation a')
    firstLink?.focus()
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        setOpen(false)
        toggle.current?.focus()
      }
    }
    const onResize = () => {
      if (window.innerWidth >= 1056) {
        const focusInMenu = header.current?.querySelector('#mobile-navigation')?.contains(document.activeElement)
        setOpen(false)
        if (focusInMenu || document.activeElement === toggle.current) {
          const desktopLink = header.current?.querySelector<HTMLAnchorElement>('.desktop-nav a[aria-current]') ?? header.current?.querySelector<HTMLAnchorElement>('.brand')
          desktopLink?.focus()
        }
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !header.current?.contains(event.target)) {
        setOpen(false)
        if (header.current?.querySelector('#mobile-navigation')?.contains(document.activeElement)) toggle.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="header" ref={header}>
      <div className="header-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}><Box size={24} strokeWidth={1.5} aria-hidden="true" /><span>Web <strong>Box</strong></span></Link>
        <GlobalNavigation className="desktop-nav" />
        <button type="button" className="theme-toggle" aria-label={themeAction} title={themeAction} onClick={toggleTheme}>
          {theme === 'light' ? <Moon size={20} strokeWidth={1.5} aria-hidden="true" /> : <Sun size={20} strokeWidth={1.5} aria-hidden="true" />}
        </button>
        <button ref={toggle} type="button" className="menu-toggle" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}>{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
      </div>
      {open && <GlobalNavigation id="mobile-navigation" className="mobile-nav" onNavigate={closeMenu} onBlur={event => {
        if (event.relatedTarget !== toggle.current && !event.currentTarget.contains(event.relatedTarget)) setOpen(false)
      }} />}
    </header>
  )
}
