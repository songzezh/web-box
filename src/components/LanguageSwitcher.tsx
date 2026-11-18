import { Languages } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import '../i18n'

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
