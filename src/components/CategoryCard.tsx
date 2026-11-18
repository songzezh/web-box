import { Link } from 'react-router-dom'
import { ArrowRight, CaseSensitive, Braces, Binary, ShieldCheck, Clock, CodeXml, Image, BookOpen, Users, Globe, Briefcase } from 'lucide-react'
const categoryIcons = { text: CaseSensitive, data: Braces, convert: Binary, security: ShieldCheck, time: Clock, code: CodeXml, image: Image, book: BookOpen, community: Users, site: Globe, briefcase: Briefcase }
export function CategoryCard({ category, path, count }: { category: { name: string; description: string; icon: keyof typeof categoryIcons }; path: string; count: string }) {
  const Icon = categoryIcons[category.icon]
  return <Link className="category-card" to={path}>
    <Icon className="category-icon" size={24} strokeWidth={1.5} aria-hidden="true" />
    <h3>{category.name}</h3><p>{category.description}</p>
    <div className="card-bottom"><span>{count}</span><ArrowRight size={20} aria-hidden="true" /></div>
  </Link>
}
