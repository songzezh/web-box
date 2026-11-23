/** 主题 Hook：组合 localStorage 偏好与系统媒体查询，不通过全局 State 共享偏好。 */
import { useEffect, useState, useSyncExternalStore } from 'react'

/**
 * 实际应用到页面的主题；跟随系统通过独立的 null 偏好表示。
 */
export type Theme = 'light' | 'dark'
const themeKey = 'web-box-theme'
const systemQuery = '(prefers-color-scheme: dark)'

/**
 * 读取有效的显式主题偏好；未设置、值无效或 localStorage 不可用时返回 null，交由系统主题决定。
 */
function readPreference(): Theme | null {
  try {
    const saved = localStorage.getItem(themeKey)
    if (saved === 'light' || saved === 'dark') return saved
  } catch { /* Storage may be unavailable; keep the preference in memory. */ }
  return null
}

/**
 * 订阅系统配色变化，并返回清理函数；由 useSyncExternalStore 管理订阅生命周期。
 */
function subscribeToSystemTheme(onChange: () => void) {
  const media = matchMedia(systemQuery)
  media.addEventListener('change', onChange)
  return () => media.removeEventListener('change', onChange)
}

const getSystemTheme = (): Theme => matchMedia(systemQuery).matches ? 'dark' : 'light'

/**
 * 管理主题偏好，并将最终主题同步到根元素 data-theme 供 CSS 变量使用。
 * 返回当前主题、手动切换、恢复系统主题及是否跟随系统；写入失败时仍更新本组件的 State。
 */
export function useTheme() {
  const [preference, setPreference] = useState(readPreference)
  // 即使保存了显式偏好也维持系统订阅，但只有 preference 为 null 时才采用系统值。
  const systemTheme = useSyncExternalStore(subscribeToSystemTheme, getSystemTheme)
  const theme = preference ?? systemTheme

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

/**
 * 切换为当前主题的反色，并立即保存显式偏好；之后的系统变化不再决定页面配色。
 */
  function toggleTheme() {
    const nextTheme: Theme = theme === 'light' ? 'dark' : 'light'
    setPreference(nextTheme)
    try { localStorage.setItem(themeKey, nextTheme) } catch { /* In-memory switching still works. */ }
  }

/**
 * 清除显式偏好及其持久化值，使当前和后续系统主题变化重新生效。
 */
  function followSystemTheme() {
    setPreference(null)
    try { localStorage.removeItem(themeKey) } catch { /* In-memory preference still works. */ }
  }

  return { theme, toggleTheme, followSystemTheme, followsSystem: preference === null }
}
