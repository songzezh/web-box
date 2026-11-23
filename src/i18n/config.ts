export const LANGUAGE_STORAGE_KEY = 'web-box:language'
export const supportedLanguages = ['en', 'zh-CN'] as const
/**
 * 仅支持英文与简体中文；默认语言不根据浏览器语言自动推断。
 */
export type Language = typeof supportedLanguages[number]
/**
 * 读取语言偏好；缺失、非法值或读取异常统一回退英文。
 * @param storage - 可注入只读存储；省略时使用 window.localStorage
 * @returns 支持的语言标识
 */
export function readLanguage(storage?: Pick<Storage, 'getItem'>): Language {
  try {
    const saved = (storage ?? window.localStorage).getItem(LANGUAGE_STORAGE_KEY)
    return saved === 'zh-CN' || saved === 'en' ? saved : 'en'
  } catch { return 'en' }
}
/**
 * 保存支持的语言；忽略其他值并吞掉存储异常，语言切换仍可在内存中生效。
 * @param language - i18next 报告的语言标识
 * @param storage - 可注入只写存储；省略时使用 window.localStorage
 */
export function persistLanguage(language: string, storage?: Pick<Storage, 'setItem'>) {
  if (language !== 'en' && language !== 'zh-CN') return
  try { (storage ?? window.localStorage).setItem(LANGUAGE_STORAGE_KEY, language) } catch { /* Keep in-memory preference when storage is restricted. */ }
}
