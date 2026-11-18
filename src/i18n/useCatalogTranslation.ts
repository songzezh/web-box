import { useTranslation } from 'react-i18next'
import type { resources } from './index'
import './index'
export function useCatalogTranslation() {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  return {
    category: (id: string, field: 'name' | 'description' | 'shortName' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.categories, { ns: 'categories' }),
    resourceCategory: (id: string, field: 'name' | 'description' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.resources, { ns: 'resources' }),
    tool: (id: string, field: 'name' | 'description' = 'name') => t(`${id}.${field}` as keyof typeof resources.en.tools, { ns: 'tools' }),
    resource: (id: string) => t(`items.${id}.description` as keyof typeof resources.en.resources, { ns: 'resources' }),
  }
}
