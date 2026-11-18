import '../i18n/index'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'
import { categories, getCategoryPath, statistics } from '../registry'
import { CategoryCard } from '../components/CategoryCard'

export default function HomePage() {
  const { t } = useTranslation(['common', 'navigation', 'categories', 'resources', 'tools'])
  return (
    <>
      <section className="introduction page-grid">
        <p className="eyebrow intro-label">{t('common:homeEyebrow')}</p>
        <h1>{t('common:homeTitle')}</h1>
        <p className="lead">{t('common:homeDescription')}</p>
        <div className="intro-bottom">
          <dl className="stats">
            <div><dt>{t('common:toolCategories')}</dt><dd>{statistics.categories}</dd></div>
            <div><dt>{t('common:plannedTools')}</dt><dd>{statistics.planned}</dd></div>
            <div><dt>{t('common:availableTools')}</dt><dd>{statistics.available}</dd></div>
          </dl>
          <p className="privacy-note"><ShieldCheck size={20} aria-hidden="true" />{t('common:privacyNote')}</p>
        </div>
      </section>
      <section className="page-grid category-directory" aria-labelledby="categories-title">
        <div className="directory-intro">
          <div><p className="eyebrow">{t('common:browseCategory')}</p><h2 id="categories-title">{t('common:directoryTitle')}</h2></div>
          <p>{t('common:directoryDescription')}</p>
        </div>
        <div className="category-grid">{categories.map(category => <CategoryCard key={category.id} category={category} path={getCategoryPath(category.id)} count={t('common:plannedCount', { count: category.plannedToolCount })} />)}</div>
      </section>
      <section className="page-grid resource-entry" aria-labelledby="resource-entry-title">
        <div><p className="eyebrow">{t('common:beyondToolbox')}</p><h2 id="resource-entry-title">{t('resources:title')}</h2><p className="secondary">{t('common:resourceEntryDescription')}</p></div>
        <Link className="resource-entry-link" to="/resources">{t('common:browseResources')}<ArrowUpRight size={20} aria-hidden="true" /></Link>
      </section>
    </>
  )
}
