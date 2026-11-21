import { useEffect, useEffectEvent, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ansiKeyboardLayout } from './keyboard-layout'
import type { KeyboardProps } from './keyboard.types'
import './Keyboard.css'

export function Keyboard({ platform = 'windows', layout = ansiKeyboardLayout, activeKeys = [], interactive = true, listenToKeyboard = false, onKeyClick, onKeyDown, onKeyUp, className = '' }: KeyboardProps) {
  const { t } = useTranslation('tools')
  const helpId = useId()
  const [pressed, setPressed] = useState<ReadonlySet<string>>(new Set())
  const notifyDown = useEffectEvent((code: string) => onKeyDown?.(code))
  const notifyUp = useEffectEvent((code: string) => onKeyUp?.(code))

  useEffect(() => {
    if (!listenToKeyboard) return
    const known = new Set(layout.flat().filter(key => key.detectable !== false).map(key => key.code))
    const held = new Set<string>()
    const clear = () => {
      held.clear()
      setPressed(new Set())
    }
    const down = (event: KeyboardEvent) => {
      if (!known.has(event.code) || event.repeat || held.has(event.code)) return
      held.add(event.code)
      setPressed(new Set(held))
      notifyDown(event.code)
    }
    const up = (event: KeyboardEvent) => {
      if (!held.delete(event.code)) return
      // macOS may swallow other keyup events while Command is held.
      if (event.code === 'MetaLeft' || event.code === 'MetaRight') held.clear()
      setPressed(new Set(held))
      notifyUp(event.code)
    }
    const visibility = () => { if (document.hidden) clear() }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    window.addEventListener('blur', clear)
    document.addEventListener('visibilitychange', visibility)
    return () => {
      clear()
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
      window.removeEventListener('blur', clear)
      document.removeEventListener('visibilitychange', visibility)
    }
  }, [listenToKeyboard, layout])

  return <div className={`keyboard ${className}`}>
    <p id={helpId} className="keyboard-help">{t('keyboard.help')}</p>
    <div className="keyboard-scroll" role="region" aria-label={t('keyboard.label')} aria-describedby={helpId} tabIndex={0}>
      <div className="keyboard-board" role="group" aria-label={platform === 'mac' ? 'macOS ANSI' : 'Windows / Linux ANSI'}>
        {layout.map((row, index) => <div className="keyboard-row" key={index}>
          {row.map(key => {
            const highlighted = activeKeys.includes(key.code)
            const physical = listenToKeyboard && pressed.has(key.code)
            const label = platform === 'mac' ? key.macLabel ?? key.label : key.label
            const props = {
              className: 'keyboard-key',
              style: { flexGrow: key.units, flexBasis: 0 },
              'data-code': key.code,
              'data-highlighted': highlighted || undefined,
              'data-physical': physical || undefined,
              'aria-label': t('keyboard.keyLabel', { label: label || 'Space', code: key.code, state: highlighted || physical ? t('keyboard.highlighted') : t('keyboard.idle') }),
            }
            return interactive
              ? <button {...props} key={key.code} type="button" aria-pressed={highlighted || physical} onClick={() => onKeyClick?.(key.code)}>{label}</button>
              : <span {...props} key={key.code}>{label}</span>
          })}
        </div>)}
      </div>
    </div>
  </div>
}
