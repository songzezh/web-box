import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ToolPageLayout } from '../../components/Tools'
import { ShortcutItem } from '../../components/shortcuts'
import { vimShortcuts } from './vim-data'
import { categories, modes, matchesShortcut, shortcutSteps } from './shortcut-model'
import { ApplicationSidebar } from './ApplicationSidebar'
import { applicationNameKey } from './applications'
import type { ApplicationId } from './applications'
import './shortcuts.css'

const combinations = [
  { id: 'search', key: 'k' }, { id: 'copy', key: 'c' },
  { id: 'paste', key: 'v' }, { id: 'undo', key: 'z' },
] as const
/**
 * 快捷键工具：在通用组合键与 Vim 数据间切换，以本地 State 保存平台、筛选条件和唯一展开项。
 * 平台只改变通用组合键的 Ctrl/Cmd；Vim 按键映射始终采用 ANSI 规则，不监听真实键盘输入。
 */
export default function KeyboardShortcuts() {
  const { t, i18n } = useTranslation('tools')
  const [platform, setPlatform] = useState<'windows' | 'mac'>('windows')
  const [app, setApp] = useState<ApplicationId>('general')
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [mode, setMode] = useState('')
  const [compatibility, setCompatibility] = useState('')
  const [query, setQuery] = useState('')
  const language = i18n.resolvedLanguage === 'zh-CN' ? 'zh-CN' : 'en'
  // 四组条件取交集；分类同时匹配主分类和关联分类，模式同时匹配适用模式与切换目标模式。
  // 切换应用、平台或筛选条件时清除展开项；筛选 State 本身不会因切换应用而重置。
  const visible = vimShortcuts.filter(item => (!category || item.category === category || item.relatedCategories?.some(value => value === category)) && (!mode || item.modes.includes(mode as typeof modes[number]) || item.targetMode === mode) && (!compatibility || item.compatibility === compatibility) && matchesShortcut(item, query))
  return <ToolPageLayout title={t('keyboard-shortcuts.name')} description={t('keyboard-shortcuts.description')}>
    <div className="shortcuts-layout">
    <ApplicationSidebar selected={app} onSelect={value => { setApp(value); setExpandedId(null) }} />
    <section className="shortcuts-content" aria-labelledby="shortcut-application-title">
    <h2 id="shortcut-application-title">{t(applicationNameKey(app))}</h2>
    <div className="shortcuts-controls">
      <label>{t('keyboard.platform')} <select value={platform} onChange={event => { setPlatform(event.target.value as 'windows' | 'mac'); setExpandedId(null) }}><option value="windows">Windows / Linux</option><option value="mac">macOS</option></select></label>
    </div>
    {app === 'vim' && <>
      <div className="shortcuts-controls shortcuts-filters">
        <label>{t('shortcuts.search')}<input type="search" value={query} onChange={event => { setQuery(event.target.value); setExpandedId(null) }} /></label>
        <label>{t('shortcuts.category')}<select value={category} onChange={event => { setCategory(event.target.value); setExpandedId(null) }}><option value="">{t('cheatsheet.all')}</option>{categories.map(value => <option key={value} value={value}>{t(`shortcuts.category.${value}`)}</option>)}</select></label>
        <label>{t('shortcuts.mode')}<select value={mode} onChange={event => { setMode(event.target.value); setExpandedId(null) }}><option value="">{t('cheatsheet.all')}</option>{modes.map(value => <option key={value}>{value}</option>)}</select></label>
        <label>{t('shortcuts.compatibility')}<select value={compatibility} onChange={event => { setCompatibility(event.target.value); setExpandedId(null) }}><option value="">{t('cheatsheet.all')}</option>{(['vi-vim', 'vim', 'conditional'] as const).map(value => <option key={value} value={value}>{t(`shortcuts.compatibility.${value}`)}</option>)}</select></label>
      </div>
      <p className="shortcuts-help">{t('shortcuts.instructions')}</p>
    </>}
    <div className="shortcut-results">
      <p role="status">{t('shortcuts.count', { count: app === 'general' ? combinations.length : visible.length })}</p>
      {app === 'general' ? combinations.map(combo => {
        const keys = `${platform === 'mac' ? 'Cmd' : 'Ctrl'}+${combo.key}`
        return <ShortcutItem key={combo.id} title={t(`keyboard.${combo.id}`)} keys={keys} steps={shortcutSteps({ keys, kind: 'chord' })} metadata={platform === 'mac' ? 'macOS' : 'Windows / Linux'} details={<p>{t('shortcuts.generalNote')}</p>} expanded={expandedId === combo.id} onToggle={() => setExpandedId(current => current === combo.id ? null : combo.id)} />
      }) : <>
        {visible.length === 0 && <p>{t('cheatsheet.empty')}</p>}
        {visible.map(item => <ShortcutItem key={item.id} title={item.name[language]} keys={item.keys} steps={shortcutSteps(item)} expanded={expandedId === item.id} onToggle={() => setExpandedId(current => current === item.id ? null : item.id)}
          metadata={<>{t(`shortcuts.category.${item.category}`)} · {item.modes.join(' / ')}{item.targetMode ? ` → ${item.targetMode}` : ''} · {t(`shortcuts.compatibility.${item.compatibility}`)}</>}
          details={<>
            <p>{t(`shortcuts.kind.${item.kind}`)}: <code>{item.keys}</code>{item.kind === 'command' ? ' ↵ Enter' : ''}</p>
            <p>{t('shortcuts.mode')}: {item.modes.join(' / ')}{item.targetMode ? ` → ${item.targetMode}` : ''} · {t(`shortcuts.compatibility.${item.compatibility}`)}</p>
            {item.compatibility === 'conditional' && <p>{t('shortcuts.clipboardNote')}</p>}
            {item.keys === 'r' && <p>{t('shortcuts.replaceNote')}</p>}
          </>} />)}
      </>}
    </div>
    </section>
    </div>
  </ToolPageLayout>
}
