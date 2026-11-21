import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Star, Copy } from 'lucide-react'
import { ToolPageLayout } from '../../components/Tools'
import { vimShortcuts } from './vim-data'
import { categories, modes, matchesShortcut, shortcutSteps } from './shortcut-model'
import type { Shortcut } from './shortcut-model'
import './shortcuts.css'

const combinations = [
  { id: 'search', keys: ['KeyK'] }, { id: 'copy', keys: ['KeyC'] },
  { id: 'paste', keys: ['KeyV'] }, { id: 'undo', keys: ['KeyZ'] },
] as const
const storageKey = 'web-box-shortcut-favorites'
function readFavorites(): string[] {
  try { const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]'); return Array.isArray(value) ? value.filter((id): id is string => typeof id === 'string') : [] } catch { return [] }
}
export default function KeyboardShortcuts() {
  const { t, i18n } = useTranslation('tools')
  const [platform, setPlatform] = useState<'windows' | 'mac'>('windows')
  const [app, setApp] = useState('general')
  const [selected, setSelected] = useState<Shortcut | null>(null)
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState('')
  const [compatibility, setCompatibility] = useState('')
  const [query, setQuery] = useState('')
  const [favorites, setFavorites] = useState(readFavorites)
  const [onlyFavorites, setOnlyFavorites] = useState(false)
  const [message, setMessage] = useState('')
  const language = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  const steps = selected ? shortcutSteps(selected) : []
  const visible = vimShortcuts.filter(item => (!category || item.category === category || item.relatedCategories?.some(value => value === category)) && (!mode || item.modes.includes(mode as typeof modes[number]) || item.targetMode === mode) && (!compatibility || item.compatibility === compatibility) && (!onlyFavorites || favorites.includes(item.id)) && matchesShortcut(item, query))
  function toggleFavorite(id: string) {
    const next = favorites.includes(id) ? favorites.filter(value => value !== id) : [...favorites, id]
    setFavorites(next)
    try { localStorage.setItem(storageKey, JSON.stringify(next)) } catch { setMessage(t('shortcuts.storageFailed')) }
  }
  async function copy(keys: string) {
    try { await navigator.clipboard.writeText(keys); setMessage(t('cheatsheet.copied')) } catch { setMessage(t('cheatsheet.failed')) }
  }
  return <ToolPageLayout title={t('keyboard-shortcuts.name')} description={t('keyboard-shortcuts.description')}>
    <div className="shortcuts-controls">
      <label>{t('shortcuts.app')} <select value={app} onChange={event => { setApp(event.target.value); setSelected(null) }}><option value="general">{t('shortcuts.general')}</option><option value="vim">Vim / Vi</option></select></label>
      <label>{t('keyboard.platform')} <select value={platform} onChange={event => setPlatform(event.target.value as 'windows' | 'mac')}><option value="windows">Windows / Linux</option><option value="mac">macOS</option></select></label>
    </div>
    {app === 'general' ? <div className="shortcuts-presets" role="group" aria-label={t('keyboard.presets')}>
      {combinations.map(combo => <button key={combo.id} type="button" onClick={() => copy(`${platform === 'mac' ? '⌘' : 'Ctrl'}+${combo.keys[0].slice(3)}`)}>{t(`keyboard.${combo.id}`)} · {platform === 'mac' ? '⌘' : 'Ctrl'} + {combo.keys[0].slice(3)}</button>)}
    </div> : <>
      <div className="shortcuts-controls shortcuts-filters">
        <label>{t('shortcuts.search')}<input type="search" value={query} onChange={event => setQuery(event.target.value)} /></label>
        <label>{t('shortcuts.category')}<select value={category} onChange={event => setCategory(event.target.value)}><option value="">{t('cheatsheet.all')}</option>{categories.map(value => <option key={value} value={value}>{t(`shortcuts.category.${value}`)}</option>)}</select></label>
        <label>{t('shortcuts.mode')}<select value={mode} onChange={event => setMode(event.target.value)}><option value="">{t('cheatsheet.all')}</option>{modes.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>{t('shortcuts.compatibility')}<select value={compatibility} onChange={event => setCompatibility(event.target.value)}><option value="">{t('cheatsheet.all')}</option>{(['vi-vim', 'vim', 'conditional'] as const).map(value => <option key={value} value={value}>{t(`shortcuts.compatibility.${value}`)}</option>)}</select></label>
        <label><input type="checkbox" checked={onlyFavorites} onChange={event => setOnlyFavorites(event.target.checked)} />{t('shortcuts.favorites')}</label>
      </div>
      <p className="shortcuts-help">{t('shortcuts.instructions')}</p>
      {selected && <div className="shortcut-preview">
        <strong>{selected.name[language]}</strong> <code>{selected.keys}{selected.kind === 'command' ? ' ↵ Enter' : ''}</code>
        <p>{t(`shortcuts.kind.${selected.kind}`)} · {selected.modes.join(' / ')}{selected.targetMode ? ` → ${selected.targetMode}` : ''} · {t(`shortcuts.compatibility.${selected.compatibility}`)}</p>
        {selected.compatibility === 'conditional' && <p>{t('shortcuts.clipboardNote')}</p>}
        {selected.keys === 'r' && <p>{t('shortcuts.replaceNote')}</p>}
        <div className="shortcut-steps" role="group" aria-label={t('shortcuts.steps')}>{steps.map((value, index) => <span key={index}><span>{index + 1}.</span> <kbd>{value.label === ' ' ? 'Space' : value.label}</kbd></span>)}</div>
      </div>}
    </>}
    {app === 'vim' && <div className="shortcut-results">
      <p role="status">{t('shortcuts.count', { count: visible.length })}</p>
      {visible.length === 0 && <p>{t('cheatsheet.empty')}</p>}
      {visible.map(item => <div className="shortcut-row" key={item.id} data-selected={selected?.id === item.id || undefined}>
        <button className="shortcut-select" type="button" aria-pressed={selected?.id === item.id} onClick={() => setSelected(item)}><code>{item.keys}{item.kind === 'command' ? ' ↵' : ''}</code><span>{item.name[language]}<small>{t(`shortcuts.category.${item.category}`)} · {item.modes.join(' / ')}{item.targetMode ? ` → ${item.targetMode}` : ''} · {t(`shortcuts.compatibility.${item.compatibility}`)}</small></span></button>
        <button type="button" aria-label={t('shortcuts.favorite', { name: item.name[language] })} aria-pressed={favorites.includes(item.id)} onClick={() => toggleFavorite(item.id)}><Star size={16} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} /></button>
        <button type="button" aria-label={t('shortcuts.copy', { name: item.name[language] })} onClick={() => copy(item.keys)}><Copy size={16} /></button>
      </div>)}
    </div>}
    {message && <p role="status">{message}</p>}
  </ToolPageLayout>
}
