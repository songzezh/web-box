import { useTranslation } from 'react-i18next'
import type { resources } from './index'
import './index'
/**
 * 将稳定的目录 ID 转换为对应 namespace 的翻译键，避免展示组件直接拼接键名。
 * category、resourceCategory、tool 省略 field 时取 name；resource 返回外部资源说明。
 * 类型断言仅辅助 TypeScript，不对运行时 ID 做有效性校验。
 */
export function useCatalogTranslation() {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  return {
    category: (id: string, field: 'name' | 'description' | 'shortName' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.categories, { ns: 'categories' }),
    resourceCategory: (id: string, field: 'name' | 'description' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.resources, { ns: 'resources' }),
    tool: (id: string, field: 'name' | 'description' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.tools, { ns: 'tools' }),
    resource: (id: string) => t(`items.${id}.description` as keyof typeof resources.en.resources, { ns: 'resources' }),
  }
}
