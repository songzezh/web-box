import { useEffect, useState, useSyncExternalStore } from 'react'

export type Theme = 'light' | 'dark'
const themeKey = 'web-box-theme'
const systemQuery = '(prefers-color-scheme: dark)'

function readPreference(): Theme | null {
  try {
    const saved = localStorage.getItem(themeKey)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* Storage may be unavailable; keep the preference in memory. */ }
  return null
}

function subscribeToSystemTheme(onChange: () => void) {
  const media = matchMedia(systemQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const getSystemTheme = (): Theme => matchMedia(systemQuery).matches ? 'dark' : 'light'

export function useTheme() {
  const [preference, setPreference] = useState(readPreference)
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme)
  const theme = preference ?? systemTheme

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  function toggleTheme() {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setPreference(nextTheme)
    try { localStorage.setItem(themeKey, nextTheme) } catch { /* In-memory switching still works. */ }
  }

  function followSystemTheme() {
    setPreference(null)
    try { localStorage.removeItem(themeKey) } catch { /* In-memory preference still works. */ }
  }

  return { theme, toggleTheme, followSystemTheme, followsSystem: preference === null }
}
