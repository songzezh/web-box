import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { KeyboardKey } from '../keyboard'
import './shortcuts.css'

export interface ShortcutSequenceStep { label: string; codes: readonly string[] }

function keyLegends(step: ShortcutSequenceStep) {
  if (!/^(Ctrl|Shift|Alt|Cmd|Meta)\+/.test(step.label)) return [{ code: step.codes.join('+'), label: step.label === ' ' ? 'Space' : step.label }]
  const modifiers: Record<string, string> = { ControlLeft: 'Ctrl', ShiftLeft: 'Shift', AltLeft: 'Alt', MetaLeft: '⌘' }
  return step.codes.map(code => ({ code, label: modifiers[code] ?? (code.startsWith('Key') ? code.slice(3) : code.startsWith('Digit') ? code.slice(5) : step.label.split('+').at(-1) ?? step.label) }))
}

export function ShortcutSequence({ steps, compact = false, highlighted = false }: { steps: readonly ShortcutSequenceStep[]; compact?: boolean; highlighted?: boolean }) {
  const { t } = useTranslation('tools')
  return <ol className={compact ? 'shortcut-sequence shortcut-row-keys' : 'shortcut-sequence'} aria-label={t('shortcut.sequence')}>
    {steps.map((step, index) => {
      const keys = keyLegends(step)
      return <li key={index}>
        {index > 0 && <span className="shortcut-sequence-arrow" aria-hidden="true">→</span>}
        <div className="shortcut-sequence-step">
          {!compact && <span>{t('shortcut.step')} {index + 1}</span>}
          <span className="shortcut-sequence-keys">{keys.map((key, keyIndex) => <Fragment key={key.code}>
            {keyIndex > 0 && <span aria-hidden="true">+</span>}
            <KeyboardKey keyCode={key.code} label={key.label} size={key.label.length > 2 ? 'wide' : 'default'} state={highlighted ? 'highlighted' : 'default'} readOnly />
          </Fragment>)}</span>
          {!compact && <small>{t(keys.length > 1 ? 'shortcut.pressTogether' : index > 0 ? 'shortcut.pressNext' : 'shortcut.press')}{keys.length === 1 ? ` ${keys[0].label}` : ''}</small>}
        </div>
      </li>
    })}
  </ol>
}
