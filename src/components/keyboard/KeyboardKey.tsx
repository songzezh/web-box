/*
 * From Uiverse.io by Cksunandh
 * https://uiverse.io/Cksunandh/stale-dog-84
 *
 * MIT License
 * Copyright (c) Cksunandh (Sunandh ck)
 */
import { memo } from 'react'
import type { CSSProperties, ReactNode } from 'react'
import './KeyboardKey.css'

/**
 * 键帽宽度预设；space 用于空格键，显式 width 可覆盖 CSS 默认宽度。
 */
export type KeyboardKeySize = 'default' | 'wide' | 'extra-wide' | 'space'
/**
 * 键帽视觉状态；disabled 状态与 disabled Props 都会禁用交互。
 */
export type KeyboardKeyState = 'default' | 'highlighted' | 'pressed' | 'disabled'

/**
 * 通用键帽 Props；keyCode 提供物理键标识，label 为显示文字。
 */
export interface KeyboardKeyProps {
  /** 物理键标识，写入 data-key-code，供展示关联使用。 */
  keyCode: string
  /** 键帽主要文字，同时作为默认可访问名称。 */
  label: string
  /** 可选辅助文字；省略时不渲染，存在时并入默认可访问名称。 */
  secondaryLabel?: string
  /** 宽度预设，默认 default；支持 wide、extra-wide 和 space。 */
  size?: KeyboardKeySize
  /** 视觉状态，默认 default；highlighted 与 pressed 同时设置 aria-pressed。 */
  state?: KeyboardKeyState
  /** 可选显式宽度；数字转换为 px，字符串直接传入 CSS 变量，省略时采用尺寸预设。 */
  width?: number | string
  /** 可选装饰图标；省略时仅显示文字，图标本身不向读屏暴露。 */
  icon?: ReactNode
  /** 默认 false；与 state 为 disabled 的情况合并判断。 */
  disabled?: boolean
  /** Render a non-interactive key legend, outside the Tab order. */
  /** 默认 false；true 时渲染只读 kbd，onClick 不绑定。 */
  readOnly?: boolean
  /** 可选点击回调，仅交互按钮模式使用。 */
  onClick?: () => void
  /** 附加样式类，默认空字符串。 */
  className?: string
  /** 可选可访问名称；省略时根据主文字和辅助文字组合。 */
  'aria-label'?: string
}

/**
 * 可复用键帽 Component；readOnly 默认 false，开启时渲染不进入 Tab 顺序的 kbd。
 * 其余情况渲染 button，以 onClick 通知调用方；memo 避免 Props 未变时重复渲染。
 */
export const KeyboardKey = memo(function KeyboardKey({
  keyCode, label, secondaryLabel, size = 'default', state = 'default',
  width, icon, disabled = false, readOnly = false, onClick, className = '',
  'aria-label': ariaLabel,
}: KeyboardKeyProps) {
  const isDisabled = disabled || state === 'disabled'
  const props = {
    className: `keyboard-key keyboard-key--${size} keyboard-key--${isDisabled ? 'disabled' : state}${icon ? ' keyboard-key--with-icon' : ''} ${className}`.trim(),
    style: width === undefined ? undefined : { '--keyboard-key-width': typeof width === 'number' ? `${width}px` : width, flex: '0 0 auto' } as CSSProperties,
    'data-key-code': keyCode,
    'aria-label': ariaLabel ?? (secondaryLabel ? `${label}, ${secondaryLabel}` : label),
  }
  const content = <span className="keyboard-key__content">
    {secondaryLabel && <span className="keyboard-key__secondary">{secondaryLabel}</span>}
    <span className="keyboard-key__face">
      {icon && <span className="keyboard-key__icon" aria-hidden="true">{icon}</span>}
      <span className="keyboard-key__label">{label}</span>
    </span>
  </span>

  return readOnly
    ? <kbd {...props} aria-disabled={isDisabled || undefined}>{content}</kbd>
    : <button {...props} type="button" disabled={isDisabled} aria-pressed={state === 'highlighted' || state === 'pressed'} onClick={onClick}>{content}</button>
})
