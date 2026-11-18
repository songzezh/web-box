import '../i18n/index'
import { useCatalogTranslation } from '../i18n/useCatalogTranslation'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getSafeResourceUrl } from '../registry'
import type { ExternalResource, ToolDefinition } from '../registry'
export function ToolCard({ tool, category }: { tool: ToolDefinition; category: string }) {
  const copy = useCatalogTranslation()
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const content = <><div className="card-top"><span className="eyebrow">{category}</span><span className="tag">{tool.status === 'available' ? t('common:available') : t('common:comingSoon')}</span></div><h3>{copy.tool(tool.id, 'name')}</h3><p>{copy.tool(tool.id, 'description')}</p><div className="card-bottom"><span>{tool.status === 'available' ? t('common:openTool') : t('common:unavailable')}</span>{tool.status === 'available' && <ArrowRight size={20} aria-hidden="true" />}</div></>
  return tool.status === "available" ? <Link className="tool-card" to={tool.path}>{content}</Link> : <article className="tool-card tool-card-planned">{content}</article>
}
export function ResourceCard({ resource }: { resource: ExternalResource }) {
  const copy = useCatalogTranslation()
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  const url = getSafeResourceUrl(resource.url)
  if (!url) return null
  return <a className="tool-card" href={url.href} target="_blank" rel="noopener noreferrer"><div className="card-top"><span className="eyebrow">{url.hostname}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{resource.name}</h3><p>{copy.resource(resource.id)}</p><div className="card-bottom">{t('resources:externalLink')}</div></a>
}
export function ToolPageLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="page-grid content-page"><h1>{title}</h1><p className="lead">{description}</p>{children}</section>
}
