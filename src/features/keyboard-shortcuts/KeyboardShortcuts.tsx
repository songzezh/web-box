import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Keyboard } from '../../components/keyboard'
import type { KeyboardPlatform } from '../../components/keyboard'
import { ToolPageLayout } from '../../components/Tools'
import './shortcuts.css'

const combinations = [
  { id: 'search', keys: ['KeyK'] },
  { id: 'copy', keys: ['KeyC'] },
  { id: 'paste', keys: ['KeyV'] },
  { id: 'undo', keys: ['KeyZ'] },
] as const

export default function KeyboardShortcuts() {
  const { t } = useTranslation('tools')
  const [platform, setPlatform] = useState<KeyboardPlatform>('windows')
  const [activeKeys, setActiveKeys] = useState<string[]>([])
  const [listen, setListen] = useState(true)
  const modifier = platform === 'mac' ? 'MetaLeft' : 'ControlLeft'
  return <ToolPageLayout title={t('keyboard-shortcuts.name')} description={t('keyboard-shortcuts.description')}>
    <div className="shortcuts-controls">
      <label>{t('keyboard.platform')} <select value={platform} onChange={event => { setPlatform(event.target.value as KeyboardPlatform); setActiveKeys([]) }}>
        <option value="windows">Windows / Linux</option><option value="mac">macOS</option>
      </select></label>
      <label><input type="checkbox" checked={listen} onChange={event => setListen(event.target.checked)} /> {t('keyboard.listen')}</label>
      <button type="button" onClick={() => setActiveKeys([])}>{t('keyboard.clear')}</button>
    </div>
    <div className="shortcuts-presets" role="group" aria-label={t('keyboard.presets')}>
      {combinations.map(combo => <button key={combo.id} type="button" onClick={() => setActiveKeys([modifier, ...combo.keys])}>{t(`keyboard.${combo.id}`)} · {platform === 'mac' ? '⌘' : 'Ctrl'} + {combo.keys[0].slice(3)}</button>)}
    </div>
    <Keyboard platform={platform} activeKeys={activeKeys} listenToKeyboard={listen} onKeyClick={code => setActiveKeys(keys => keys.includes(code) ? keys.filter(key => key !== code) : [...keys, code])} />
    <p className="keyboard-help">{t('keyboard.limitations')}</p>
    <p className="keyboard-help">{t('keyboard.credit')}</p>
  </ToolPageLayout>
}
