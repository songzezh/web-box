import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getSafeResourceUrl } from '../registry'
import type { ExternalResource, ToolDefinition } from '../registry'
export function ToolCard({ tool, category }: { tool: ToolDefinition; category: string }) {
  const content = <><div className="card-top"><span className="eyebrow">{category}</span><span className="tag">{tool.status === 'available' ? 'Available' : 'Coming soon'}</span></div><h3>{tool.name}</h3><p>{tool.description}</p><div className="card-bottom"><span>{tool.status === 'available' ? 'Open tool' : 'Not available yet'}</span>{tool.status === 'available' && <ArrowRight size={20} aria-hidden="true" />}</div></>
  return tool.status === "available" ? <Link className="tool-card" to={tool.path}>{content}</Link> : <article className="tool-card tool-card-planned">{content}</article>
}
export function ResourceCard({ resource }: { resource: ExternalResource }) {
  const url = getSafeResourceUrl(resource.url)
  if (!url) return null
  return <a className="tool-card" href={url.href} target="_blank" rel="noopener noreferrer"><div className="card-top"><span className="eyebrow">{url.hostname}</span><ArrowUpRight size={20} aria-hidden="true" /></div><h3>{resource.name}</h3><p>{resource.description}</p><div className="card-bottom">External resource · opens in a new tab</div></a>
}
export function ToolPageLayout({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return <section className="page-grid content-page"><h1>{title}</h1><p className="lead">{description}</p>{children}</section>
}
