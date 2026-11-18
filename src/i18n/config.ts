export const LANGUAGE_STORAGE_KEY = 'web-box:language'
export const supportedLanguages = ['en', 'zh-CN'] as const
export type Language = typeof supportedLanguages[number]
export function readLanguage(storage?: Pick<Storage, 'getItem'>): Language {
  try {
    const saved = (storage ?? window.localStorage).getItem(LANGUAGE_STORAGE_KEY)
    return saved === 'zh-CN' || saved === 'en' ? saved : 'en'
  } catch { return 'en' }
}
export function persistLanguage(language: string, storage?: Pick<Storage, 'setItem'>) {
  if (language !== 'en' && language !== 'zh-CN') return
  try { (storage ?? window.localStorage).setItem(LANGUAGE_STORAGE_KEY, language) } catch { /* Keep in-memory preference when storage is restricted. */ }
}
