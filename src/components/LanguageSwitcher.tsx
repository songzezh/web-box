import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import '../i18n'

/**
 * 在 en 与 zh-CN 间直接切换；持久化和文档 lang 同步由 i18n 入口监听器处理。
 */
export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  const action = t('selectLanguage')

  function toggleLanguage() {
    const nextLanguage = currentLanguage === 'en' ? 'zh-CN' : 'en'
    void i18n.changeLanguage(nextLanguage)
  }

  return <button type="button" className="theme-toggle language-switcher language-toggle" title={action} aria-label={action} onClick={toggleLanguage}>
    <Languages size={20} strokeWidth={1.5} aria-hidden="true" />
  </button>
}
