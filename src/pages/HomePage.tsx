import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CaseSensitive, Braces, Binary, ShieldCheck, Clock, CodeXml, Image } from 'lucide-react'
import { categories, getCategoryPath, statistics } from '../registry'
import type { CategoryIcon, ToolCategory } from '../registry'

const categoryIcons = { text: CaseSensitive, data: Braces, convert: Binary, security: ShieldCheck, time: Clock, code: CodeXml, image: Image } satisfies Record<CategoryIcon, typeof CaseSensitive>

function CategoryCard({ category }: { category: ToolCategory }) {
  const Icon = categoryIcons[category.icon]
  return (
    <Link className="category-card" to={getCategoryPath(category.id)}>
      <Icon className="category-icon" size={24} strokeWidth={1.5} aria-hidden="true" />
      <h3>{category.name}</h3>
      <p>{category.description}</p>
      <div className="card-bottom"><span>{category.plannedToolCount} planned tools</span><ArrowRight size={20} aria-hidden="true" /></div>
    </Link>
  )
}

export default function HomePage() {
  return (
    <>
      <section className="introduction page-grid">
        <p className="eyebrow intro-label">YOUR BROWSER. YOUR WORKSPACE.</p>
        <h1>Tools for everyday work.</h1>
        <p className="lead">A collection of lightweight, privacy-first utilities that run directly in your browser.</p>
        <div className="intro-bottom">
          <dl className="stats">
            <div><dt>Tool Categories</dt><dd>{statistics.categories}</dd></div>
            <div><dt>Planned Tools</dt><dd>{statistics.planned}</dd></div>
            <div><dt>Available Tools</dt><dd>{statistics.available}</dd></div>
          </dl>
          <p className="privacy-note"><ShieldCheck size={20} aria-hidden="true" />Local by design. Private by default.</p>
        </div>
      </section>
      <section className="page-grid category-directory" aria-labelledby="categories-title">
        <div className="directory-intro">
          <div><p className="eyebrow">BROWSE BY CATEGORY</p><h2 id="categories-title">Find your starting point.</h2></div>
          <p>Choose a category to explore its tools and availability.</p>
        </div>
        <div className="category-grid">{categories.map(category => <CategoryCard key={category.id} category={category} />)}</div>
      </section>
      <section className="page-grid resource-entry" aria-labelledby="resource-entry-title">
        <div><p className="eyebrow">BEYOND THE TOOLBOX</p><h2 id="resource-entry-title">External resources</h2><p className="secondary">Explore the separate directory of destinations outside Web Box.</p></div>
        <Link className="resource-entry-link" to="/resources">Browse resources<ArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
    </>
  )
}
