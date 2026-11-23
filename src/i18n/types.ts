import 'i18next'
import type { resources } from './index'
/**
 * 扩展 i18next 的 TypeScript 类型，以英文资源约束 namespace 和翻译键；不产生运行时代码。
 */
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'common'
    resources: typeof resources.en
    keySeparator: false
  }
}
