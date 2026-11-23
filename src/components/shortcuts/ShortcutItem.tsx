import { useId } from 'react'
import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { ShortcutSequence } from './ShortcutSequence'
import type { ShortcutSequenceStep } from './ShortcutSequence'
import './shortcuts.css'

/**
 * 受控快捷键条目；展开状态由父组件统一维护，便于同一列表只展开一项。
 */
export interface ShortcutItemProps {
  /** 当前语言的操作名称。 */
  title: string
  /** 原始按键串，用于条目数据标记。 */
  keys: string
  /** 解析后的顺序步骤，摘要和详情共用。 */
  steps: readonly ShortcutSequenceStep[]
  /** 可选分类、平台或模式信息；省略时不显示。 */
  metadata?: ReactNode
  /** 可选详情内容；省略时仍展示标题与按键步骤。 */
  details?: ReactNode
  /** 父级控制的展开状态。 */
  expanded: boolean
  /** 请求父级切换展开项；组件不自行更新 State。 */
  onToggle: () => void
}

/** Controlled presentation shared by every shortcut application. */
/**
 * 展示摘要、说明和按键步骤；onToggle 请求父级切换 expanded，不在组件内保存展开状态。
 * useId 关联展开按钮与详情；收起时通过 aria-hidden 与 inert 同时屏蔽读屏和内部交互。
 */
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
