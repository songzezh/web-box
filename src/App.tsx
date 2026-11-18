import { useEffect } from 'react'
import { Link, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import { getCategoryById, getCategoryPath, getToolById, projectUrl } from './registry'
import Header from './components/Header'
import { getRouteCategory } from './navigation'
import { ToolPageLayout } from './components/Tools'
import Breadcrumbs from './components/Breadcrumbs'
import HomePage from './pages/HomePage'
import CategoryPage from './pages/CategoryPage'
import ResourcesPage from './pages/ResourcesPage'
import NotFound from './pages/NotFoundPage'
import './App.css'

function ToolPage() {
  const { toolId = '' } = useParams()
  const tool = getToolById(toolId)
  if (!tool) return <NotFound />
  return <ToolPageLayout title={tool.name} description={tool.description}><div className="empty-state"><div><span className="tag">Coming soon</span><h2>This tool is planned.</h2><p>No tool functionality is available yet. No input is collected.</p><Link to={getCategoryPath(tool.categoryId)}>Back to {getCategoryById(tool.categoryId)?.name}</Link></div></div></ToolPageLayout>
}
function RouteEffects() {
  const location = useLocation()
  useEffect(() => {
    const title = location.pathname === '/' ? 'Tools for everyday work' : getRouteCategory(location.pathname) && !location.pathname.startsWith('/tools/') ? getRouteCategory(location.pathname)?.name : location.pathname.startsWith('/tools/') ? getToolById(location.pathname.split('/')[2])?.name ?? 'Page not found' : ({ '/about': 'About', '/privacy': 'Privacy', '/resources': 'External resources' }[location.pathname] ?? 'Page not found')
    document.title = `${title} — Web Box`
    window.scrollTo(0, 0)
    document.getElementById('main-content')?.focus()
  }, [location])
  return null
}
export default function App() {
  return <><a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); document.getElementById('main-content')?.focus() }}>Skip to content</a><Header /><RouteEffects /><main id="main-content" tabIndex={-1}><Breadcrumbs /><Routes><Route path="/" element={<HomePage />} /><Route path="/resources" element={<ResourcesPage />} /><Route path="/category/:categoryId" element={<CategoryPage />} /><Route path="/:categoryId" element={<CategoryPage />} /><Route path="/tools/:toolId" element={<ToolPage />} /><Route path="/about" element={<ToolPageLayout title="Small tools. Thoughtfully built." description="Web Box is a lightweight, privacy-first collection of utilities for everyday work."><h2>A toolbox in progress</h2><p>Browse seven categories of planned browser utilities. Each tool is clearly marked with its availability; the current examples are not functional tools yet.</p><h2>Built for your browser</h2><p>No account is required. This directory uses local metadata and does not depend on an external API.</p></ToolPageLayout>} /><Route path="/privacy" element={<ToolPageLayout title="Your work stays yours." description="Privacy is part of the foundation of Web Box."><h2>What we store</h2><p>Only your selected theme preference is saved in localStorage under “web-box-theme”. No tool input, files, or results are stored or uploaded by this application.</p><h2>Your choice</h2><p>Your device appearance is followed until you toggle the theme. Clear this site’s browser storage to remove the saved preference and follow your device again.</p><h2>Network requests and external links</h2><p>The hosting provider receives normal requests when delivering the site and its local fonts. Web Box includes no analytics or tracking scripts. External sites have their own privacy policies; links are clearly identified and open without access to this window.</p></ToolPageLayout>} /><Route path="*" element={<NotFound />} /></Routes></main><footer><div className="page-grid footer-inner"><div><Link className="footer-brand" to="/">Web Box</Link><p>Simple tools. Local processing. Privacy first.</p></div><nav aria-label="Footer navigation"><Link to="/about">About</Link><Link to="/privacy">Privacy</Link><a href={projectUrl} target="_blank" rel="noopener noreferrer">GitHub <ArrowUpRight size={16} aria-hidden="true" /><span className="sr-only"> (opens in a new tab)</span></a></nav><span className="footer-caption">Built for everyday work.</span></div></footer></>
}
