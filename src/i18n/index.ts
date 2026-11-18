import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { readLanguage, persistLanguage } from './config'
import en_common from './resources/en/common.json'
import en_navigation from './resources/en/navigation.json'
import en_categories from './resources/en/categories.json'
import en_resources from './resources/en/resources.json'
import en_tools from './resources/en/tools.json'
import zh_common from './resources/zh-CN/common.json'
import zh_navigation from './resources/zh-CN/navigation.json'
import zh_categories from './resources/zh-CN/categories.json'
import zh_resources from './resources/zh-CN/resources.json'
import zh_tools from './resources/zh-CN/tools.json'
export const resources = {
  en: { common: en_common, navigation: en_navigation, categories: en_categories, resources: en_resources, tools: en_tools },
  'zh-CN': { common: zh_common, navigation: zh_navigation, categories: zh_categories, resources: zh_resources, tools: zh_tools },
}

// Report incomplete Chinese copy even when the English fallback would hide it.
if (import.meta.env.DEV) {
  for (const namespace of Object.keys(resources.en) as (keyof typeof resources.en)[]) {
    const translated = new Set(Object.keys(resources['zh-CN'][namespace]).map(key => key.replace(/_(one|other)$/, '')))
    for (const key of Object.keys(resources.en[namespace])) {
      if (!translated.has(key.replace(/_(one|other)$/, ''))) console.warn(`[i18n] Missing zh-CN translation: ${namespace}:${key}`)
    }
  }
}
i18n.on('languageChanged', language => {
  persistLanguage(language)
  if (typeof document !== 'undefined') document.documentElement.lang = language
})
void i18n.use(initReactI18next).init({
  resources, lng: readLanguage(), fallbackLng: 'en', supportedLngs: ['en', 'zh-CN'],
  defaultNS: 'common', keySeparator: false, initAsync: false,
  interpolation: { escapeValue: false },
  saveMissing: import.meta.env.DEV,
  missingKeyHandler: (_languages, namespace, key) => {
    console.warn(`[i18n] Missing translation: ${namespace}:${key}`)
  },
})
export default i18n
