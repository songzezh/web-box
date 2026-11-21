import { useId } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ShortcutSequence } from './ShortcutSequence'
import type { ShortcutSequenceStep } from './ShortcutSequence'
import './shortcuts.css'

export interface ShortcutItemProps {
  title: string
  keys: string
  steps: readonly ShortcutSequenceStep[]
  metadata?: ReactNode
  details?: ReactNode
  expanded: boolean
  onToggle: () => void
}

/** Controlled presentation shared by every shortcut application. */
export function ShortcutItem({ title, keys, steps, metadata, details, expanded, onToggle }: ShortcutItemProps) {
  const { t } = useTranslation('tools')
  const id = useId()
  return <div className="shortcut-row" data-shortcut-keys={keys} data-selected={expanded || undefined}>
    <div className="shortcut-summary">
      <div className="shortcut-select">
        <ShortcutSequence steps={steps} compact highlighted={expanded} />
        <span className="shortcut-description">{title}{metadata && <small>{metadata}</small>}</span>
      </div>
      <button className="shortcut-expand" type="button" aria-expanded={expanded} aria-controls={id} aria-label={`${t(expanded ? 'shortcut.collapse' : 'shortcut.expand')}: ${title}`} onClick={event => { event.stopPropagation(); onToggle() }}><ChevronDown size={16} aria-hidden="true" /></button>
    </div>
    <div id={id} className="shortcut-expansion" data-expanded={expanded || undefined} aria-hidden={!expanded} inert={!expanded}>
      <div className="shortcut-expansion-clip">
        <div className="shortcut-expanded-content">
          <section aria-labelledby={`${id}-description`}>
            <h3 id={`${id}-description`}>{t('shortcut.details')}</h3>
            <p>{title}</p>
            {details}
          </section>
          <section aria-labelledby={`${id}-sequence`}>
            <h3 id={`${id}-sequence`}>{t('shortcut.sequence')}</h3>
            <ShortcutSequence steps={steps} highlighted />
          </section>
        </div>
      </div>
    </div>
  </div>
}
